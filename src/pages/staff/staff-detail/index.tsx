import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import { useAuth } from '@hooks';
import React, { useState } from 'react';
import { Box, Divider, IconButton, Link, Paper } from '@mui/material';
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
import { border, Grid } from '@mui/system';

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
  const [selectedDate, setSelectedDate] = useState<number>(4);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const weekDays = ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'];
  const timeSlots = [
    '09:00 am',
    '09:30 am',
    '10:00 am',
    '10:30 am',
    '11:00 am',
    '11:30 am',
    '12:00 pm',
    '12:30 pm',
    '01:00 pm',
    '01:30 pm',
    '02:00 pm'
  ];

  return (
    <div className='h-auto bg-white flex flex-col md:flex-row gap-8 px-4'>
      <Box className='w-full md:w-2/5 lg:w-1/3 flex flex-col gap-y-6'>
        <Card className='shadow-lg border rounded-lg p-5' sx={{ borderRadius: '10px' }}>
          <CardContent className='flex flex-col items-center text-center p-6 gap-2'>
            <div className='flex flex-col gap-y-2 items-center'>
              <Avatar
                src='https://th.bing.com/th/id/OIP.WZuFeD-_Btx-rRmknaI_9AHaHa?rs=1&pid=ImgDetMain'
                alt='Doctor Name'
                className='!w-32 !h-32 object-cover rounded-full border shadow-sm'
              />
              <Typography variant='h6' className='font-semibold'>
                Mr. Doctor Name
              </Typography>
              <div className='flex items-center gap-1'>
                <Star className='text-yellow-500' />
                <Typography variant='body2'>4.7</Typography>
              </div>
            </div>

            <div className='flex flex-col gap-1'>
              <Typography variant='body2' className='text-gray-600'>
                MDS - Periodontology and Oral Implantology, BDS
              </Typography>
              <Typography variant='body2' className='text-gray-600'>
                Oral And MaxilloFacial Surgeon, Dentist
              </Typography>
              <Typography variant='body2' className='text-gray-600'>
                18 Years Experience Overall (18 years as specialist)
              </Typography>
            </div>

            <div className='flex flex-col items-center gap-2 py-3'>
              <div className='flex items-center gap-2'>
                <ThumbsUp size={16} />
                <Typography variant='body2' fontWeight={500}>
                  98% (250 votes)
                </Typography>
              </div>
              <div className='flex items-center gap-2'>
                <ShieldCheck size={16} />
                <Typography variant='body2' fontWeight={500}>
                  Medical Registration Verified
                </Typography>
              </div>
            </div>

            <Link href='' fontSize={15}>
              Share your Feedback.
            </Link>
          </CardContent>
        </Card>
        <Card className='shadow-lg border rounded-lg p-5'>
          <Box className='flex items-start justify-between flex-col gap-y-5'>
            {/* Hospital Information Section */}
            <Box className='flex flex-col gap-y-5 w-full'>
              <Typography variant='h6'>Available Time</Typography>
              <Divider />
            </Box>

            <Box className='flex flex-col gap-y-5 w-full'>
              <Box className='flex flex-col gap-y-2 w-full'>
                <Typography variant='body2' fontWeight={500}>
                  United Hospital Limited
                </Typography>

                <Box className='flex items-center w-full justify-between'>
                  <div className='flex items-center gap-3'>
                    <Box className='flex items-center justify-end'>
                      <StarRate fontSize='small' className='text-yellow-500 mr-1' />
                      <Typography variant='body2'>5 Star</Typography>
                    </Box>

                    <Box className='flex items-center gap-x-1'>
                      <Schedule fontSize='small' className='text-blue-600' />
                      <Typography variant='body2'>Max 15 mins wait</Typography>
                    </Box>
                  </div>

                  <Typography variant='h6'>$220</Typography>
                </Box>

                <Box className='flex items-center gap-1'>
                  <LocationOn fontSize='small' className='text-gray-500' />
                  <Typography variant='body2' className='text-gray-500'>
                    Sylhet, Bangladesh
                  </Typography>
                </Box>
              </Box>
              <Divider />
            </Box>

            {/* Date Selection Section */}
            <Card
              className='flex flex-row items-center w-full justify-between shadow-lg'
              sx={{ borderRadius: '10px' }}
            >
              <div className='py-4 !border-sm flex items-center overflow-x-scroll shadow-lg bg-gradient-to-b from-indigo-100 to-white pb-4'>
                <IconButton>
                  <ChevronLeft />
                </IconButton>

                <Box className='flex gap-1 w-full overflow-x-scroll'>
                  {weekDays.map((day, index) => (
                    <Button
                      key={day}
                      variant={selectedDate === index + 1 ? 'contained' : 'outlined'}
                      color='primary'
                      className={`min-w-0 px-2 py-1 ${
                        selectedDate === index + 1
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'text-blue-600'
                      }`}
                      onClick={() => setSelectedDate(index + 1)}
                    >
                      {day}
                      <br />
                      {index + 1}
                    </Button>
                  ))}
                </Box>
                <IconButton>
                  <ChevronRight />
                </IconButton>
              </div>
            </Card>

            {/* Time Slots Grid */}
            <Grid columns={12} container spacing={1} className='mb-2'>
              {timeSlots.map((slot, index) => {
                return (
                  <Grid size={4} key={index} className=''>
                    <Button
                      fullWidth
                      variant={selectedTimeSlot === slot ? 'contained' : 'outlined'}
                      className={`
                      ${
                        selectedTimeSlot === slot
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'text-blue-600'
                      }`}
                      onClick={() => setSelectedTimeSlot(slot)}
                    >
                      {slot}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>

            {/* Book Appointment Button */}
            <Button
              variant='contained'
              fullWidth
              disabled={!selectedTimeSlot}
              className={`
            ${
              selectedTimeSlot ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
            >
              Book Appointment
            </Button>
          </Box>
        </Card>
      </Box>
      <Box className='w-full md:w-3/5 lg:w-2/3 flex flex-col gap-y-8 p-2'>
        <div className='flex flex-col gap-5'>
          <Typography variant='h6'>Biography</Typography>
          <Typography variant='body2' className='text-gray-600'>
            Jacob Jones, PPCNP, is a pediatric nurse practitioner who was born and raised in the
            Maryland and Washington, D.C., area. She attended Elon University in North Carolina,
            where she completed undergraduate studies with a B.A. in psychology and triple minor
            degrees in neuroscience, anthropology and African–American studies. Allergy and
            Immunology.
          </Typography>
        </div>
        <div className='flex flex-col md:flex-row gap-y-6'>
          <div className='flex flex-col gap-5 w-full sm:w-1/2'>
            <Typography variant='h6'>Education</Typography>
            <div className='flex gap-4'>
              <Circle sx={{ color: '#070B5C', width: '10px' }} />
              <div className='flex flex-col gap-1'>
                <Typography variant='body2' fontWeight={600}>
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
              <Circle sx={{ color: '#070B5C', width: '10px' }} />
              <div className='flex flex-col gap-1'>
                <Typography variant='body2' fontWeight={600}>
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
          <div className='flex flex-col gap-5 w-full sm:w-1/2'>
            <Typography variant='h6'>Work & Experience</Typography>
            <div className='flex gap-4'>
              <Circle sx={{ color: '#070B5C', width: '10px' }} />
              <div className='flex flex-col gap-1'>
                <Typography variant='body2' fontWeight={600}>
                  Chattagram International Dental College & Hospital
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  1998 - 2003
                </Typography>
              </div>
            </div>
            <div className='flex gap-4'>
              <Circle sx={{ color: '#070B5C', width: '10px' }} />
              <div className='flex flex-col gap-1'>
                <Typography variant='body2' fontWeight={600}>
                  Ibn Sina Specialized Hospital
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  2010 - Present (5 years)
                </Typography>
              </div>
            </div>
            <div className='flex gap-4'>
              <Circle sx={{ color: '#070B5C', width: '10px' }} />
              <div className='flex flex-col gap-1'>
                <Typography variant='body2' fontWeight={600}>
                  Smile Dental Cares
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  2005 - 2007 (3 years)
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className='flex flex-col gap-y-5'>
          <Typography variant='h6'>Achievements</Typography>
          <div className='flex gap-4'>
            <div className='flex gap-4 w-full md:w-1/2'>
              <Circle sx={{ color: '#070B5C', width: '10px' }} />
              <div className='flex flex-col gap-1'>
                <Typography variant='body2' fontWeight={600}>
                  Best Dentist Award 2021
                </Typography>
                <Typography variant='body2' fontWeight={600}>
                  May 2019
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Dr. Friedman and his team are the proud recipients of the New Jersey Top Dentist
                  award for 2019. We are proud to be selected for this honor by our wonderful
                  patients.
                </Typography>
              </div>
            </div>
            <div className='flex gap-4 w-full md:w-1/2'>
              <Circle sx={{ color: '#070B5C', width: '10px' }} />
              <div className='flex flex-col gap-1'>
                <Typography variant='body2' fontWeight={600}>
                  The Dental Professional of The Year Award
                </Typography>
                <Typography variant='body2' fontWeight={600}>
                  May 2010
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Nicole Elango and Deeon Trute are finalists for the Student Dentist of the year
                  and Student Dental Hygienist and/or Therapist of the Year 2020 respectively.
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className='flex flex-col gap-y-5'>
          <Typography variant='h6'>Services</Typography>
          <Box className='flex flex-wrap gap-3'>
            {doctorData.services.map((service, index) => (
              <Chip key={index} label={service} variant='outlined' />
            ))}
          </Box>
        </div>
        <div className='flex flex-col gap-y-5'>
          <Typography variant='h6'>Specializations</Typography>
          <Box className='flex flex-wrap gap-3'>
            {doctorData.specializations.map((service, index) => (
              <Chip key={index} label={service} variant='outlined' />
            ))}
          </Box>
        </div>
      </Box>
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
