import React, { useState } from 'react';
import {
  Box,
  Divider,
  IconButton,
  Link,
  Card,
  CardContent,
  Avatar,
  Typography,
  Chip,
  Button,
  Stack
} from '@mui/material';
import {
  Star,
  Circle,
  MapPin,
  Award,
  Clock,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ThumbsUp
} from 'lucide-react';
import Grid from '@mui/material/Grid2';
import {
  archivements,
  doctorData,
  educations,
  timeSlots,
  weekDays,
  works
} from 'src/utils/generate-mock';

const StaffDetail = () => {
  const [selectedDate, setSelectedDate] = useState<number>(4);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  return (
    <div className='h-auto flex flex-col md:flex-row gap-8 px-4'>
      <Box className='w-full md:w-2/5 lg:w-1/3 flex flex-col gap-y-6'>
        <Card className='shadow-lg border rounded-lg p-5' sx={{ borderRadius: '10px' }}>
          <CardContent className='flex flex-col items-center text-center p-6 gap-2'>
            <Stack spacing={2} alignItems='center'>
              {/* Avatar và Tên */}
              <Stack spacing={2} alignItems='center'>
                <Avatar
                  src='https://th.bing.com/th/id/OIP.WZuFeD-_Btx-rRmknaI_9AHaHa?rs=1&pid=ImgDetMain'
                  alt='Doctor Name'
                  sx={{
                    width: 128,
                    height: 128,
                    objectFit: 'cover',
                    borderRadius: '50%',
                    border: '1px solid #ddd',
                    boxShadow: 1
                  }}
                />
                <Typography variant='h6' fontWeight='600'>
                  Mr. Doctor Name
                </Typography>
                <Stack direction='row' alignItems='center' spacing={1}>
                  <Star className='text-yellow-500' />
                  <Typography variant='body2'>4.7</Typography>
                </Stack>
              </Stack>

              {/* Chuyên môn */}
              <Stack spacing={0.5} textAlign='center'>
                <Typography variant='body2' color='gray'>
                  MDS - Periodontology and Oral Implantology, BDS
                </Typography>
                <Typography variant='body2' color='gray'>
                  Oral And MaxilloFacial Surgeon, Dentist
                </Typography>
                <Typography variant='body2' color='gray'>
                  18 Years Experience Overall (18 years as specialist)
                </Typography>
              </Stack>

              {/* Thông tin xác nhận */}
              <Stack spacing={2} alignItems='center' py={3}>
                <Stack direction='row' alignItems='center' spacing={1}>
                  <ThumbsUp size={16} />
                  <Typography variant='body2' fontWeight={500}>
                    98% (250 votes)
                  </Typography>
                </Stack>
                <Stack direction='row' alignItems='center' spacing={1}>
                  <ShieldCheck size={16} />
                  <Typography variant='body2' fontWeight={500}>
                    Medical Registration Verified
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

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
                  <Stack direction='row' alignItems='center' spacing={1}>
                    <Box className='flex items-center justify-end'>
                      <Award fontSize='small' className='text-yellow-500' />
                      <Typography variant='body2'>5 Star</Typography>
                    </Box>

                    <Box className='flex items-center'>
                      <Clock fontSize='small' className='text-blue-600' />
                      <Typography variant='body2'>Max 15 mins wait</Typography>
                    </Box>
                  </Stack>

                  <Typography variant='h6'>$220</Typography>
                </Box>

                <Box className='flex items-center gap-1'>
                  <MapPin fontSize='small' className='text-gray-500' />
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
              <Box
                sx={{
                  py: 4,
                  borderBottom: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  overflowX: 'auto',
                  boxShadow: 3,
                  background: 'linear-gradient(to bottom, #E0E7FF, #FFFFFF)'
                }}
              >
                <IconButton>
                  <ChevronLeft />
                </IconButton>

                <Box sx={{ display: 'flex', gap: 1, width: '100%', overflowX: 'auto' }}>
                  {weekDays.map((day, index) => (
                    <Button
                      key={day}
                      variant={selectedDate === index + 1 ? 'contained' : 'outlined'}
                      color='primary'
                      sx={{
                        minWidth: 0,
                        px: 4,
                        py: 1,
                        backgroundColor:
                          selectedDate === index + 1 ? 'primary.main' : 'transparent',
                        color: selectedDate === index + 1 ? 'white' : 'primary.main',
                        '&:hover': {
                          backgroundColor:
                            selectedDate === index + 1 ? 'primary.dark' : 'action.hover'
                        }
                      }}
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
              </Box>
            </Card>

            {/* Time Slots Grid */}
            <Grid columns={12} container spacing={1} className='mb-2'>
              {timeSlots.map((slot, index) => {
                return (
                  <Grid size={4} key={index}>
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant='h6'>Biography</Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            Jacob Jones, PPCNP, is a pediatric nurse practitioner who was born and raised in the
            Maryland and Washington, D.C., area. She attended Elon University in North Carolina,
            where she completed undergraduate studies with a B.A. in psychology and triple minor
            degrees in neuroscience, anthropology and African–American studies. Allergy and
            Immunology.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6 }}>
          {/* Education Section */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: { xs: '100%', sm: '50%' }
            }}
          >
            <Typography variant='h6'>Education</Typography>

            {educations.map((edu, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                <Circle
                  size={8}
                  fill='currentColor'
                  style={{ color: '#6b7280', marginTop: 4, minWidth: 16 }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant='body2' fontWeight={600}>
                    {edu.institution}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {edu.degree}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {edu.year}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Work & Experience Section */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: { xs: '100%', sm: '50%' }
            }}
          >
            <Typography variant='h6'>Work & Experience</Typography>

            {works.map((work, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                <Circle
                  size={8}
                  fill='currentColor'
                  style={{ color: '#6b7280', marginTop: 4, minWidth: 16 }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant='body2' fontWeight={600}>
                    {work.company}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {work.year}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Divider />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Achievements Section */}
          <Typography variant='h6'>Achievements</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'no-wrap' }}>
            {archivements.map((achievement, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 2, width: { xs: '100%', md: '50%' } }}>
                <Circle
                  size={8}
                  fill='currentColor'
                  style={{ color: '#6b7280', marginTop: 4, minWidth: 16 }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant='body2' fontWeight={600}>
                    {achievement.title}
                  </Typography>
                  <Typography variant='body2' fontWeight={600}>
                    {achievement.date}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {achievement.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Divider />

          {/* Services Section */}
          <Typography variant='h6'>Services</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {doctorData.services.map((service, index) => (
              <Chip key={index} label={service} variant='outlined' />
            ))}
          </Box>

          {/* Specializations Section */}
          <Typography variant='h6'>Specializations</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {doctorData.specializations.map((specialization, index) => (
              <Chip key={index} label={specialization} variant='outlined' />
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default StaffDetail;
