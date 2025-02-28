import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { default as backgroundAuth } from 'public/background-auth.jpg';
import React, { useEffect, useState } from 'react';
import PasswordInput from 'src/components/password-input';
import FormInput from 'src/components/ui/FormInput';
import { paths } from 'src/paths';
import type { Page as PageType } from 'src/types/page';
import * as Yup from 'yup';
import { ArrowLeft } from 'iconsax-react';
import { useRouter } from 'next/router';

export const registerSchema = Yup.object({
  name: Yup.string().required('Name không được để trống'),
  email: Yup.string().required('Email không được để trống'),
  password: Yup.string().required('Mật khẩu không được để trống'),
  cic: Yup.string().required('Số định danh không được để trống')
});

const Page: PageType = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      cic: ''
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
    }
  });

  return (
    <Box className='flex bg-white relative'>
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
              <Image src='/logo.png' alt='Health360 Logo' width={50} height={50} />
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

            {/* Form */}
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={2}>
                <Stack spacing={1}>
                  <Stack direction='row' alignItems='center'>
                    <Typography variant='subtitle2'>Name </Typography>
                    <Typography color='red'> *</Typography>
                  </Stack>
                  <FormInput
                    type='text'
                    className='w-full px-3 rounded-lg bg-white'
                    {...formik.getFieldProps('email')}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && !!formik.errors.name}
                    helperText={formik.touched.name && formik.errors.name}
                    placeholder='Enter your name'
                  />
                </Stack>
                <Stack spacing={1}>
                  <Stack direction='row' alignItems='center'>
                    <Typography variant='subtitle2'>Email </Typography>
                    <Typography color='red'> *</Typography>
                  </Stack>
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
                  <Stack direction='row' alignItems='center'>
                    <Typography variant='subtitle2'>Password </Typography>
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
                  />
                  <Typography variant='caption' color='text.secondary'>
                    Must be at least 8 characters.
                  </Typography>
                </Stack>
                <Stack spacing={1}>
                  <Stack direction='row' alignItems='center'>
                    <Typography variant='subtitle2'>Citizen Identity Card </Typography>
                    <Typography color='red'> *</Typography>
                  </Stack>
                  <FormInput
                    type='text'
                    className='w-full px-3 rounded-lg bg-white'
                    {...formik.getFieldProps('email')}
                    value={formik.values.cic}
                    onChange={formik.handleChange}
                    error={formik.touched.cic && !!formik.errors.cic}
                    helperText={formik.touched.cic && formik.errors.cic}
                    placeholder='Enter your CIC'
                  />
                </Stack>

                <Button
                  type='submit'
                  disabled={formik.isSubmitting}
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
            className='w-[100%] h-screen object-cover'
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
