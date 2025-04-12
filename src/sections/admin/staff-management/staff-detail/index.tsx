import React, { useEffect, useState } from 'react';
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
  Stack,
  Breadcrumbs,
  TextField
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
  ThumbsUp,
  ArrowLeft,
  User,
  PlusIcon,
  Pencil
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
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { useStaffContext } from 'src/contexts/staff/staff-context';
import { FaMars, FaVenus } from 'react-icons/fa6';
import { useDialog } from '@hooks';
import StaffDialog from '../staff-dialog';

const StaffDetail = () => {
  const [selectedDate, setSelectedDate] = useState<number>(4);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const staffId = searchParams.get('staffId');
  const { getStaffDetail } = useStaffContext();
  const editDialog = useDialog();

  const handleGetStaffDetail = async () => {
    await getStaffDetail.call(staffId ? staffId : '');
  };

  useEffect(() => {
    handleGetStaffDetail();
    console.log(89, getStaffDetail);
  }, []);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    router.push('/staff');
  }

  const breadcrumbs = [
    <Link
      underline='hover'
      key='1'
      color='#0E1680'
      onClick={handleClick}
      className='!font-semibold cursor-pointer'
    >
      Staff Management
    </Link>,
    <Typography key='3' sx={{ color: '#0E1680' }} className='!font-semibold'>
      {getStaffDetail?.data?.fullName}
    </Typography>
  ];

  return (
    <div>
      <StaffDialog
        dialog={editDialog}
        type='edit'
        staffDetail={getStaffDetail.data}
        refetch={handleGetStaffDetail}
      />
      <div className='w-full flex justify-between items-center mb-5'>
        <div className='flex gap-5'>
          <button className='text-[#0E1680]' onClick={() => router.push('/staff')}>
            <ArrowLeft />
          </button>
          <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb'>
            {breadcrumbs}
          </Breadcrumbs>
        </div>
        <Button
          variant='contained'
          startIcon={<Pencil size={20} />}
          sx={{ backgroundColor: '#0E1680', ':hover': { backgroundColor: 'orange' } }}
          onClick={editDialog.handleOpen}
        >
          <Typography variant={'body1'}>Edit</Typography>
        </Button>
      </div>
      <div className='h-auto flex flex-col md:flex-row gap-8'>
        <Box className='w-full md:w-2/5 lg:w-1/3 flex flex-col gap-y-6'>
          <Card className='shadow-lg border rounded-lg' sx={{ borderRadius: '10px' }}>
            <CardContent className='flex flex-col items-center text-center gap-2 relative'>
              <div
                className={`absolute right-5 top-5 w-3 h-3 rounded-full ${getStaffDetail?.data?.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'}`}
              ></div>
              <Stack spacing={2} alignItems='center'>
                {/* Avatar và Tên */}
                <Stack spacing={2} alignItems='center'>
                  <Avatar
                    src=''
                    alt={getStaffDetail?.data?.fullName}
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
                    {getStaffDetail?.data?.fullName}
                  </Typography>
                  {/* <Stack direction='row' alignItems='center' spacing={1}>
                    <Star className='text-yellow-500' />
                    <Typography variant='body2'>4.7</Typography>
                  </Stack> */}
                  <Stack direction={'row'} spacing={1}>
                    <Typography variant='body2' fontWeight={'light'}>
                      {getStaffDetail?.data?.role}
                    </Typography>
                    {getStaffDetail?.data?.sex === 'MALE' ? (
                      <FaMars size={16} className='text-blue-500' />
                    ) : (
                      <FaVenus size={16} className='text-pink-500' />
                    )}
                  </Stack>
                </Stack>

                {/* Chuyên môn */}
                {/* <Stack spacing={0.5} textAlign='center'> */}
                {/*
                  <Typography variant='body2' color='gray'>
                  MDS - Periodontology and Oral Implantology, BDS
                </Typography>
                 <Typography variant='body2' color='gray'>
                    Oral And MaxilloFacial Surgeon, Dentist
                  </Typography>
                  <Typography variant='body2' color='gray'>
                    18 Years Experience Overall (18 years as specialist)
                  </Typography> */}
                {/* </Stack> */}
                {/* <Stack direction={'row'} spacing={1}>
                  <Hospital size={16} />
                  <Typography variant='body2' fontWeight={'light'}>
                    <strong>Department: </strong>{getStaffDetail?.data?.department}
                  </Typography>
                </Stack> */}

                {/* Thông tin xác nhận */}
                {/* <Stack spacing={2} alignItems='center' py={3}>
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
                </Stack> */}
              </Stack>

              {/* <Link href='' fontSize={15}>
                Share your Feedback.
              </Link> */}
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
              {getStaffDetail?.data?.biography}
            </Typography>
          </Box>
          <div className='grid grid-cols-2 gap-5'>
            <div className='flex items-center gap-3'>
              <div className='font-semibold'>SSN:</div>
              <div>{getStaffDetail?.data?.ssn}</div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='font-semibold'>Date of Birth:</div>
              <div>{getStaffDetail?.data?.dateOfBirth}</div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='font-semibold'>Email:</div>
              <div>{getStaffDetail?.data?.email}</div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='font-semibold'>Phone number:</div>
              <div>{getStaffDetail?.data?.phoneNumber}</div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='font-semibold'>Address:</div>
              <div>{getStaffDetail?.data?.address}</div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='font-semibold'>Nationality:</div>
              <div>{getStaffDetail?.data?.nationality}</div>
            </div>
          </div>
          <div className='w-full flex flex-col gap-3'>
            {/* <div className='flex flex-col gap-2'>
              <div className='font-semibold'>Address:</div>
              <TextField
                variant='outlined'
                disabled
                value={getStaffDetail?.data?.address}
                className='w-full'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <div className='font-semibold'>Nationality:</div>
              <TextField
                variant='outlined'
                disabled
                value={getStaffDetail?.data?.nationality}
                className='w-full'
              />
            </div> */}
            <div className='flex flex-col gap-2'>
              <div className='font-semibold'>Start working date:</div>
              <TextField
                variant='outlined'
                disabled
                value={getStaffDetail?.data?.startWorkingDate}
                className='w-full'
              />
            </div>
            {getStaffDetail?.data?.role !== 'ADMIN' && (
              <>
                <div className='flex flex-col gap-2'>
                  <div className='font-semibold'>Department:</div>
                  <TextField
                    variant='outlined'
                    disabled
                    value={getStaffDetail?.data?.department}
                    className='w-full'
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='font-semibold'>Qualification:</div>
                  <TextField
                    variant='outlined'
                    disabled
                    value={getStaffDetail?.data?.qualification}
                    className='w-full'
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='font-semibold'>License number:</div>
                  <TextField
                    variant='outlined'
                    disabled
                    value={getStaffDetail?.data?.licenseNumber}
                    className='w-full'
                  />
                </div>
              </>
            )}
          </div>
          {getStaffDetail?.data?.role === 'DOCTOR' && (
            <>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Specializations Section */}
                <Typography variant='h6'>Specializations</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  {getStaffDetail?.data?.specializations?.map((specialization, index) => (
                    <Chip key={index} label={specialization} variant='outlined' />
                  ))}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Services Section */}
                <Typography variant='h6'>Services</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {getStaffDetail?.data?.services?.map((service, index) => (
                    <Chip key={index} label={service} variant='outlined' />
                  ))}
                </Box>
              </Box>
            </>
          )}
        </Box>
      </div>
    </div>
  );
};

export default StaffDetail;
