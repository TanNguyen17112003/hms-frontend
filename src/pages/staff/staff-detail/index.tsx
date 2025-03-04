import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import { useAuth } from '@hooks';
import React, { useState } from 'react';
import { Box, Divider, IconButton, Paper } from '@mui/material';
import UserProvider from 'src/contexts/user/user-context';
import AppointmentProvider from 'src/contexts/appointment/appointment-context';
import { Card, CardContent, Avatar, Typography, Chip, Button } from '@mui/material';
import {
  Star,
  Circle,
  LocationOn,
  StarRate,
  Schedule,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';
import { ShieldCheck, ThumbsUp } from 'lucide-react';
import { Grid } from '@mui/system';

const doctorData = {
  biography:
    'Jacob Jones, FPCNPC, is a pediatric nurse practitioner who was born and raised in the Maryland and Washington, DC area...',
  education: [
    {
      institution: 'Chattagram International Dental College & Hospital',
      degree: 'MDS - Periodontology and Oral Implantology, BDS',
      year: '1998-2003'
    },
    {
      institution: 'US Dental Medical University',
      degree: 'Oral And MaxilloFacial Surgeon, Dentist',
      year: '2003-2005'
    }
  ],
  workExperience: [
    {
      hospital: 'Ibn Sina Specialized Hospital',
      period: '2010 - Present',
      duration: '5 years'
    },
    {
      hospital: 'Dhaka Dental College and Hospital',
      period: '2007-2010',
      duration: '3 years'
    },
    {
      hospital: 'Smile Dental Care',
      period: '2005-2007',
      duration: '2 years'
    }
  ],
  achievements: [
    {
      title: 'Best Dentist Award 2021',
      date: 'July 2019',
      description:
        'Dr. Firstname and his team are the proud recipients of the New Jersey Top Dentist award for 2019'
    },
    {
      title: 'The Dental Professional of The Year Award',
      date: 'May 2010',
      description:
        'Nicole Elting and Doron True are finalists for the Student Dentist of the Year and Student Dental Hygienist of the Year 2020 respectively'
    }
  ],
  services: [
    'Tooth cleaning',
    'Root Canal Therapy',
    'Implants',
    'Surgical Extraction',
    'Fissure Sealants',
    'Composite Bonding',
    'Orthodontics',
    'Tooth extractions',
    'Wisdom tooth removal'
  ],
  specializations: [
    'Dental Care',
    'Children Care',
    'Oral and Maxillofacial Surgery',
    'Orthodontics',
    'Prosthodontics',
    'Periodontist',
    'Pediatric Dentistry'
  ]
};

const Page: PageType = () => {
  const { user } = useAuth();
  return (
    <div className='h-auto bg-white flex flex-col md:flex-row gap-4 p-4'>
      <Box className='w-full md:w-1/2 lg:w-1/3'>
        <Card className='shadow-lg rounded-2xl border'>
          <CardContent className='flex flex-col items-center text-center p-6 gap-4'>
            <div className='flex flex-col items-center'>
              <Avatar
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFc0Cry8E_MF-5Qkl5umnXnZ77LI0B8tYKTn-nIG48KTFKnzxLHhIP2Usqb8Hsq0ERpH8_pM0M06a1kB-A0CToMw'
                alt='Doctor Name'
                className='!w-[96px] !h-[96px]'
              />
              <Typography variant='h6' className='font-semibold mt-2'>
                Mr. Doctor Name
              </Typography>
              <div className='flex items-center gap-1 mt-2'>
                <Star className='text-yellow-500' />
                <Typography variant='body2'>4.7</Typography>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <Typography variant='body2' className='text-gray-600'>
                MDS - Periodontology and Oral Implantology, BDS
              </Typography>
              <Typography variant='body2' className='text-gray-600'>
                18 Years Experience Overall (18 years as specialist)
              </Typography>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2'>
                <ThumbsUp size={16} />
                <Typography variant='body2'>98% (250 votes)</Typography>
              </div>
              <div className='flex items-center gap-2'>
                <ShieldCheck size={16} />
                <Typography variant='body2'>Medical Registration Verified</Typography>
              </div>
            </div>
            <Button variant='outlined' className='mt-4'>
              Share your Feedback
            </Button>
          </CardContent>
        </Card>
        <Card className='shadow-lg rounded-2xl border mt-6'>
          <CardContent className='p-6'>
            <Typography variant='h6'>Available Time</Typography>
            <Divider sx={{ my: 2, mx: -6 }} />
          </CardContent>
        </Card>
      </Box>
      <div className='w-full md:w-1/2 lg:w-2/3'>
        <div>
          <Typography variant='h6'>Biography</Typography>
          <Typography
            variant='body2'
            sx={{
              mt: 1
            }}
          >
            Jacob Jones, PPCNP, is a pediatric nurse practitioner who was born and raised in the
            Maryland and Washington, D.C., area. She attended Elon University in North Carolina,
            where she completed undergraduate studies with a B.A. in psychology and triple minor
            degrees in neuroscience, anthropology and African–American studies. Allergy and
            Immunology.
          </Typography>
        </div>
        <div className='mt-4 flex flex-col gap-4'>
          <Typography variant='h6'>Education</Typography>
          <div className='flex gap-4'>
            <Circle sx={{ color: '#070B5C', width: '12px' }} />
            <div className='flex flex-col gap-1'>
              <Typography
                variant='body2'
                sx={{
                  fontWeight: 'bold'
                }}
              >
                Chattagram International Dental College & Hospital
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                MDS - Periodonyology and Oral Impantology, BDS
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                1998 - 2003{' '}
              </Typography>
            </div>
          </div>
          <div className='flex gap-4'>
            <Circle sx={{ color: '#070B5C', width: '12px' }} />
            <div className='flex flex-col gap-1'>
              <Typography
                variant='body2'
                sx={{
                  fontWeight: 'bold'
                }}
              >
                US Dental Medical University
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Oral And MaxilloFacial Surgeon, Dentist
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                1998 - 2003
              </Typography>
            </div>
          </div>
        </div>
        <div className='mt-4 flex flex-col gap-4'>
          <Typography variant='h6'>Work & Experience</Typography>
          <div className='flex gap-4'>
            <Circle sx={{ color: '#070B5C', width: '12px' }} />
            <div className='flex flex-col gap-1'>
              <Typography
                variant='body2'
                sx={{
                  fontWeight: 'bold'
                }}
              >
                Chattagram International Dental College & Hospital
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                1998 - 2003{' '}
              </Typography>
            </div>
          </div>
          <div className='flex gap-4'>
            <Circle sx={{ color: '#070B5C', width: '12px' }} />
            <div className='flex flex-col gap-1'>
              <Typography
                variant='body2'
                sx={{
                  fontWeight: 'bold'
                }}
              >
                Ibn Sina Specialized Hospital
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                2010 - Present (5 years)
              </Typography>
            </div>
          </div>
        </div>
        <Divider
          sx={{
            my: 4
          }}
        />
        <div className='mt-4 flex flex-col gap-4'>
          <Typography variant='h6'>Achievements</Typography>
          <div className='flex gap-4'>
            <Circle sx={{ color: '#070B5C', width: '12px' }} />
            <div className='flex flex-col gap-1'>
              <Typography
                variant='body2'
                sx={{
                  fontWeight: 'bold'
                }}
              >
                Best Dentist Award 2021
              </Typography>
              <Typography
                variant='body2'
                sx={{
                  fontWeight: 'bold'
                }}
              >
                May 2010
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Dr. Friedman and his team are the proud recipients of the New Jersey Top Dentist
                award for 2019. We are proud to be selected for this honor by our wonderful
                patients.
              </Typography>
            </div>
          </div>
        </div>
        <Box sx={{ mb: 3, mt: 4 }}>
          <Typography
            variant='h6'
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2
            }}
          >
            Services
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {doctorData.services.map((service, index) => (
              <Chip key={index} label={service} variant='outlined' />
            ))}
          </Box>
        </Box>
      </div>
    </div>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    <UserProvider>
      <AppointmentProvider>{page}</AppointmentProvider>
    </UserProvider>
  </DashboardLayout>
);

export default Page;
