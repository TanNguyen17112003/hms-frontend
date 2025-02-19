import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { default as backgroundAuth } from 'public/ui/background-auth.png';
import React, { useEffect, useState } from 'react';
import PasswordInput from 'src/components/password-input';
import FormInput from 'src/components/ui/FormInput';
import { paths } from 'src/paths';
import type { Page as PageType } from 'src/types/page';
import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().required('Email không được để trống'),
  password: Yup.string().required('Mật khẩu không được để trống')
});

const Page: PageType = () => {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      general: ''
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log('Email:', values.email);
      console.log('Password:', values.password);
      setSubmitting(true);
    }
  });

  // const handleBack = useCallback(() => {
  //   router.push(paths.auth.login);
  // }, [router]);

  useEffect(() => {
    if (formik.values.email || formik.values.password) {
      formik.setFieldError('general', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.email, formik.values.password]);

  return (
    <Box className='min-h-screen flex bg-white'>
      {/* Left side - Form */}
      <Box className='w-full lg:w-1/2 flex items-center justify-center'>
        <Box className='w-full max-w-md px-6'>
          {/* Logo */}
          <Stack direction='row' spacing={1} alignItems='center' className='mb-16'>
            <Box className='w-[232px] h-8'>
              <Image src='ui/icons/Logo.svg' alt='Health360 Logo' width={232} height={32} />
            </Box>
          </Stack>

          {/* Form Container */}
          <Stack spacing={4}>
            {/* Header */}
            <Stack spacing={1}>
              <Typography variant='h4' fontWeight='bold'>
                Sign in to your account
              </Typography>
              <Typography color='text.secondary'>
                Welcome back! Please enter your details.
              </Typography>
            </Stack>

            {/* Form */}
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <Stack spacing={1}>
                  <Typography variant='subtitle2'>Email *</Typography>
                  <FormInput
                    type='text'
                    className='w-full px-3 rounded-lg bg-white'
                    {...formik.getFieldProps('email')}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && !!formik.errors.email}
                    helperText={formik.touched.email && formik.errors.email}
                    placeholder='Enter your email'
                  />
                </Stack>

                <Stack spacing={1}>
                  <Typography variant='subtitle2'>Password *</Typography>
                  <PasswordInput
                    {...formik.getFieldProps('password')}
                    showPassword={showPassword}
                    togglePasswordVisibility={() => setShowPassword(!showPassword)}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && !!formik.errors.password}
                    helperText={formik.touched.password && formik.errors.password}
                    className='bg-white'
                  />
                  <Typography variant='caption' color='text.secondary'>
                    Must be at least 8 characters.
                  </Typography>
                </Stack>

                {formik.errors.general && (
                  <Typography color='error' align='center'>
                    {formik.errors.general}
                  </Typography>
                )}

                <Button
                  type='submit'
                  disabled={formik.isSubmitting}
                  fullWidth
                  sx={{
                    backgroundColor: '#0E1680',
                    color: 'white',
                    padding: '10px 18px',
                    '&:hover': {
                      backgroundColor: '#1e40af'
                    },
                    '&:disabled': {
                      backgroundColor: '#94a3b8',
                      color: 'white'
                    },
                    radius: '8px'
                  }}
                >
                  Log in
                </Button>
              </Stack>
            </form>

            {/* Divider */}
            <Divider className='my-6'>
              <Typography color='text.secondary'>OR</Typography>
            </Divider>

            {/* Social Login */}
            <Stack
              direction='row'
              spacing={1.5} // gap: 12px
              justifyContent='center'
            >
              {['Facebook', 'Google', 'Apple'].map((provider) => (
                <IconButton
                  key={provider}
                  sx={{
                    width: 112,
                    height: 44,
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #D0D5DD',
                    '&:hover': {
                      backgroundColor: '#F9FAFB',
                      borderColor: '#D0D5DD'
                    }
                  }}
                >
                  {provider === 'Facebook' && (
                    <FacebookIcon sx={{ width: 24, height: 24, color: '#1877F2' }} />
                  )}
                  {provider === 'Google' && (
                    <GoogleIcon sx={{ width: 24, height: 24, color: '#DB4437' }} />
                  )}
                  {provider === 'Apple' && (
                    <AppleIcon sx={{ width: 24, height: 24, color: '#000000' }} />
                  )}
                </IconButton>
              ))}
            </Stack>

            {/* Sign Up Link */}
            <Stack
              direction='row'
              spacing={1}
              justifyContent='center'
              alignItems='center'
              className='mt-6'
            >
              <Typography color='text.secondary'>I&apos;m don&apos;t have an account?</Typography>
              <Link
                href={paths.auth.register.index}
                className='text.tetiary underline font-medium hover:text-blue-800'
              >
                <Typography>Log in</Typography>
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Box>

      {/* Right side - Image */}
      <Box className='hidden lg:block w-1/2 relative'>
        <Box className='absolute right-6 top-6 w-[784px] h-[976px] rounded-3xl overflow-hidden transform scale-75 origin-top-right'>
          <Image src={backgroundAuth} alt='Background' layout='fill' objectFit='cover' />
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
