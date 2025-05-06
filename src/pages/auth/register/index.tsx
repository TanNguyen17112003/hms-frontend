import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { default as backgroundAuth } from 'public/background-auth.jpg';
import React, { useCallback, useState } from 'react';
import PasswordInput from 'src/components/password-input';
import FormInput from 'src/components/ui/FormInput';
import { paths } from 'src/paths';
import type { Page as PageType } from 'src/types/page';
import * as Yup from 'yup';
import { ArrowLeft } from 'iconsax-react';
import { useRouter } from 'next/router';
import { SignUpRequest, UsersApi } from 'src/api/user';
import useFunction from 'src/hooks/use-function';
import { useMounted } from '@hooks';
import useAppSnackbar from 'src/hooks/use-app-snackbar';
import { LoadingProcess } from '@components';

export const registerSchema = Yup.object({
  fullName: Yup.string().required('You must enter a name'),
  email: Yup.string().required('You must enter an email'),
  password: Yup.string()
    .required('You must enter a password')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .required('You must confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  ssn: Yup.string().required('You must enter a SSN'),
  phoneNumber: Yup.string()
    .required('You must enter a phone number')
    .matches(/^\d+$/, 'Phone number must be digits only')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be at most 15 digits')
    .test('is-valid-phone', 'Phone number is not valid', (value) => {
      const phoneRegex = /^\d{10,15}$/;
      return phoneRegex.test(value || '');
    })
});

const Page: PageType = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mounted = useMounted();
  const [showPassword, setShowPassword] = useState(false);
  const { showSnackbarSuccess } = useAppSnackbar();
  const router = useRouter();
  const handleSignUp = useCallback(
    async (values: SignUpRequest) => {
      setIsLoading(true);
      try {
        const response = await UsersApi.signUp(values);
        if (response && mounted()) {
          showSnackbarSuccess('Sign up successfully');
          router.push(paths.auth.login);
        }
      } catch (error) {
        console.error('Sign up failed:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [UsersApi.signUp]
  );

  const handleSignUpHelper = useFunction(handleSignUp, {});
  const formik = useFormik<SignUpRequest & { confirmPassword: string }>({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      ssn: '',
      phoneNumber: ''
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await handleSignUpHelper.call({
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          ssn: values.ssn,
          phoneNumber: values.phoneNumber
        });
      } catch (error) {
        console.error('Sign up failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
  });

  return (
    <Box className='flex bg-white relative'>
      {isLoading && <LoadingProcess />}
      <Stack
        direction={'row'}
        spacing={2}
        alignItems={'center'}
        justifyContent={'start'}
        justifySelf={'center'}
        marginBottom={3}
        className='absolute top-4 left-4'
      >
        <IconButton
          onClick={() => router.push(paths.auth.login)}
          className='bg-white p-2 rounded-md'
        >
          <ArrowLeft className='w-6 h-6' />
        </IconButton>
      </Stack>
      <Box className='w-full lg:w-1/2 flex items-center justify-center py-5 h-screen'>
        <Box className='w-full max-w-md px-6'>
          <Stack
            direction='row'
            spacing={2}
            alignItems='center'
            justifyContent={'start'}
            justifySelf={'center'}
            marginBottom={3}
          >
            <Box className=''>
              <Image src='/logo-black.png' alt='Health360 Logo' width={50} height={50} />
            </Box>
            <Typography variant='h3'>HealthPro</Typography>
          </Stack>

          <Stack spacing={2}>
            <Stack spacing={1} alignItems={'center'}>
              <Typography variant='h4' fontWeight='bold'>
                Create an account
              </Typography>
              <Typography color='text.secondary'>Start your 30-day free trial</Typography>
            </Stack>

            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={2}>
                <Box display={'flex'} gap={2}>
                  <Stack spacing={1}>
                    <Stack direction='row' alignItems='center'>
                      <Typography variant='subtitle2'>Email</Typography>
                      <Typography color='red'> *</Typography>
                    </Stack>
                    <FormInput
                      type='text'
                      className='w-full px-3 rounded-lg bg-white'
                      {...formik.getFieldProps('email')}
                      error={formik.touched.email && !!formik.errors.email}
                      helperText={formik.touched.email && formik.errors.email}
                      placeholder='Enter your email'
                    />
                  </Stack>
                  <Stack spacing={1}>
                    <Stack direction='row' alignItems='center'>
                      <Typography variant='subtitle2'>Name </Typography>
                      <Typography color='red'> *</Typography>
                    </Stack>
                    <FormInput
                      type='text'
                      className='w-full px-3 rounded-lg bg-white'
                      {...formik.getFieldProps('fullName')}
                      error={formik.touched.fullName && !!formik.errors.fullName}
                      helperText={formik.touched.fullName && formik.errors.fullName}
                      placeholder='Enter your name'
                    />
                  </Stack>
                </Box>
                <Box display={'flex'} gap={2}>
                  <Stack spacing={1}>
                    <Stack direction='row' alignItems='center'>
                      <Typography variant='subtitle2'>SSN</Typography>
                      <Typography color='red'> *</Typography>
                    </Stack>
                    <FormInput
                      type='text'
                      className='w-full px-3 rounded-lg bg-white'
                      {...formik.getFieldProps('ssn')}
                      error={formik.touched.ssn && !!formik.errors.ssn}
                      helperText={formik.touched.ssn && formik.errors.ssn}
                      placeholder='Enter your SSN'
                    />
                  </Stack>
                  <Stack spacing={1}>
                    <Stack direction='row' alignItems='center'>
                      <Typography variant='subtitle2'>Phone Number</Typography>
                      <Typography color='red'> *</Typography>
                    </Stack>
                    <FormInput
                      type='text'
                      className='w-full px-3 rounded-lg bg-white'
                      {...formik.getFieldProps('phoneNumber')}
                      error={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
                      helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                      placeholder='Enter your phone number'
                    />
                  </Stack>
                </Box>

                <Stack spacing={1}>
                  <Stack direction='row' alignItems='center'>
                    <Typography variant='subtitle2'>Password</Typography>
                    <Typography color='red'> *</Typography>
                  </Stack>
                  <PasswordInput
                    {...formik.getFieldProps('password')}
                    showPassword={showPassword}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && !!formik.errors.password}
                    helperText={formik.touched.password && formik.errors.password}
                    className='bg-white'
                    placeholder='Enter your password'
                    togglePasswordVisibility={() => setShowPassword(!showPassword)}
                  />
                  <Typography variant='caption' color='text.secondary'>
                    Must be at least 8 characters.
                  </Typography>
                </Stack>

                <Stack spacing={1}>
                  <Stack direction='row' alignItems='center'>
                    <Typography variant='subtitle2'>Confirm Password </Typography>
                    <Typography color='red'> *</Typography>
                  </Stack>
                  <PasswordInput
                    {...formik.getFieldProps('confirmPassword')}
                    showPassword={showPassword}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    className='bg-white'
                    placeholder='Confirm your password'
                    togglePasswordVisibility={() => setShowPassword(!showPassword)}
                  />
                </Stack>
                <Button
                  type='submit'
                  fullWidth
                  className='rounded-xs'
                  sx={{
                    backgroundColor: '#0E1680',
                    color: 'white',
                    padding: '10px 18px',
                    '&:hover': {
                      backgroundColor: '#1e40af'
                    }
                  }}
                >
                  Get Started
                </Button>
              </Stack>
            </form>

            {/* Divider */}
            <Divider className='my-6'>
              <Typography color='text.secondary'>OR</Typography>
            </Divider>

            <Stack direction='row' spacing={1.5} justifyContent='center'>
              {['Facebook', 'Google', 'Apple'].map((provider) => (
                <IconButton
                  key={provider}
                  className='w-[112px] h-[44px] p-[10px] hover:bg-[#F9FAFB] hover:border-[#D0D5DD]'
                  sx={{
                    borderRadius: '8px',
                    border: '1px solid #D0D5DD'
                  }}
                >
                  {provider === 'Facebook' && (
                    <FacebookIcon className='w-[24px] h-[24px]' sx={{ color: '#1877F2' }} />
                  )}
                  {provider === 'Google' && (
                    <GoogleIcon className='w-[24px] h-[24px]' sx={{ color: '#DB4437' }} />
                  )}
                  {provider === 'Apple' && (
                    <AppleIcon className='w-[24px] h-[24px]' sx={{ color: '#000000' }} />
                  )}
                </IconButton>
              ))}
            </Stack>

            <Stack
              direction='row'
              spacing={1}
              justifyContent='center'
              alignItems='center'
              className='mt-6'
            >
              <Typography color='text.secondary'>Already have an account?</Typography>
              <Link href={paths.auth.login} className='text.tetiary font-medium'>
                <Typography color='primary' fontWeight={'bold'}>
                  Log in
                </Typography>
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Box>

      <Box className='hidden lg:block w-1/2 '>
        <Box className='w-full'>
          <Image
            src={backgroundAuth}
            alt='Background Image'
            className='w-[100%] h-screen object-contain'
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
