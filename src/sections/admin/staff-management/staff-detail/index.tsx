import React, { useEffect, useMemo, useState } from 'react';
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
  TextField,
  Switch,
  FormControlLabel
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
import { archivements, doctorData, educations, weekDays, works } from 'src/utils/generate-mock';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { useStaffContext } from 'src/contexts/staff/staff-context';
import { FaMars, FaVenus } from 'react-icons/fa6';
import { useDialog } from '@hooks';
import StaffDialog from '../staff-dialog';
import { Staff } from 'src/types/staff';
import { defaultStaff } from 'src/constants/staff';
import { LoadingProcess } from '@components';
import useAppSnackbar from 'src/hooks/use-app-snackbar';
import { TimeSlotApi } from 'src/api/timeSlot';
import useFunction from 'src/hooks/use-function';
import { getDateFromWeekandDate } from 'src/utils/format-time-currency';

const StaffDetail = () => {
  const [selectedDate, setSelectedDate] = useState<number>(4);
  const getOwnedTimeSlots = useFunction(TimeSlotApi.getDoctorTimeSlots);
  const timeSlots = useMemo(() => {
    return getOwnedTimeSlots.data || [];
  }, [getOwnedTimeSlots.data]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const staffId = searchParams.get('staffId');
  const { getStaffDetail, editStaff } = useStaffContext();
  const editDialog = useDialog();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [staffDetail, setStaffDetail] = useState<Staff>(defaultStaff);
  const { showSnackbarSuccess } = useAppSnackbar();

  const handleGetStaffDetail = async () => {
    setIsLoading(true);
    try {
      const res = await getStaffDetail.call(staffId ?? '');
      console.log(333, res);
      if (res.data) {
        setStaffDetail(res.data);
      }
    } catch (err: any) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeStatus = async (status: string) => {
    setIsLoading(true);
    try {
      const res = await editStaff.call({
        id: staffDetail.id,
        body: {
          status: status
        }
      });
      if (res.data) {
        await handleGetStaffDetail();
        showSnackbarSuccess('Change successfully');
      }
    } catch (err: any) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetStaffDetail();
  }, []);

  useEffect(() => {
    if (staffDetail?.role === 'DOCTOR') {
      getOwnedTimeSlots.call(router.query.staffId as string);
    }
  }, [router.query.staffId, staffDetail]);

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
      {staffDetail.fullName}
    </Typography>
  ];

  return (
    <div>
      {isLoading && <LoadingProcess />}
      <StaffDialog
        dialog={editDialog}
        type='edit'
        staffDetail={getStaffDetail.data}
        refetch={handleGetStaffDetail}
      />
      <div className='w-full flex justify-between items-center mb-5'>
        <div className='flex gap-5 items-center'>
          <button className='text-[#0E1680]' onClick={() => router.push('/staff')}>
            <ArrowLeft />
          </button>
          <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb'>
            {breadcrumbs}
          </Breadcrumbs>
        </div>
        {staffDetail.role !== 'ADMIN' && (
          <div className='flex gap-5 items-center'>
            <FormControlLabel
              control={
                <Switch
                  checked={staffDetail.status === 'ACTIVE'}
                  onChange={(e: any) => {
                    handleChangeStatus(staffDetail.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE');
                  }}
                  inputProps={{ 'aria-label': 'status' }}
                  color='success'
                />
              }
              label='Status'
              labelPlacement='start'
            />

            <Button
              variant='contained'
              startIcon={<Pencil size={20} />}
              sx={{ backgroundColor: '#0E1680', ':hover': { backgroundColor: 'orange' } }}
              onClick={editDialog.handleOpen}
            >
              <Typography variant={'body1'}>Edit</Typography>
            </Button>
          </div>
        )}
      </div>
      <div className='h-auto flex flex-col md:flex-row gap-8'>
        <Box className='w-full md:w-2/5 lg:w-1/3 flex flex-col gap-y-6'>
          <Card className='shadow-lg border rounded-lg' sx={{ borderRadius: '10px' }}>
            <CardContent className='flex flex-col items-center text-center gap-2 relative'>
              <div
                className={`absolute right-5 top-5 w-3 h-3 rounded-full ${staffDetail.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'}`}
              ></div>
              <Stack spacing={2} alignItems='center'>
                <Stack spacing={2} alignItems='center'>
                  <Avatar
                    src=''
                    alt={staffDetail.fullName}
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
                    {staffDetail.fullName}
                  </Typography>

                  <Stack direction={'row'} spacing={1}>
                    <Typography variant='body2' fontWeight={'light'}>
                      {staffDetail.role}
                    </Typography>
                    {staffDetail.sex === 'MALE' ? (
                      <FaMars size={16} className='text-blue-500' />
                    ) : (
                      <FaVenus size={16} className='text-pink-500' />
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
          {staffDetail.role === 'DOCTOR' && (
            <Card className='shadow-lg border rounded-lg p-5'>
              <Box className='flex items-start justify-between flex-col gap-y-5'>
                {/* Hospital Information Section */}
                <Box className='flex flex-col gap-y-5 w-full'>
                  <Typography variant='h6'>Available Time</Typography>
                </Box>
                {/* Time Slots Grid */}
                <Stack spacing={1} className='mb-2' width={'100%'}>
                  {timeSlots.map((slot, index) => {
                    return (
                      <Card className='w-full p-5' key={index}>
                        <Typography fontWeight={'bold'}>Date</Typography>
                        <Typography>
                          {getDateFromWeekandDate(slot.timeSlot.week, slot.timeSlot.date)}
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Typography fontWeight={'bold'}>Time</Typography>
                        <Typography>{`${slot.timeSlot.startTime} - ${slot.timeSlot.endTime}`}</Typography>
                        <Divider sx={{ my: 1 }} />
                        <Typography fontWeight={'bold'}>Current appointments</Typography>
                        <Typography>{slot.appointmentInfoDTOs.length}</Typography>
                      </Card>
                    );
                  })}
                </Stack>
              </Box>
            </Card>
          )}
        </Box>
        <Box className='w-full md:w-3/5 lg:w-2/3 flex flex-col gap-y-8 p-2'>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant='h6'>Biography</Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              {staffDetail.biography}
            </Typography>
          </Box>
          <div className='grid grid-cols-2 gap-5'>
            <div className='flex items-center gap-3'>
              <div className='font-semibold'>SSN:</div>
              <div>{staffDetail.ssn}</div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='font-semibold'>Date of Birth:</div>
              <div>{staffDetail.dateOfBirth}</div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='font-semibold'>Email:</div>
              <div>{staffDetail.email}</div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='font-semibold'>Phone number:</div>
              <div>{staffDetail.phoneNumber}</div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='font-semibold'>Address:</div>
              <div>{staffDetail.address}</div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='font-semibold'>Nationality:</div>
              <div>{staffDetail.nationality}</div>
            </div>
          </div>
          <div className='w-full flex flex-col gap-3'>
            {/* <div className='flex flex-col gap-2'>
              <div className='font-semibold'>Address:</div>
              <TextField
                variant='outlined'
                disabled
                value={staffDetail.address}
                className='w-full'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <div className='font-semibold'>Nationality:</div>
              <TextField
                variant='outlined'
                disabled
                value={staffDetail.nationality}
                className='w-full'
              />
            </div> */}
            <div className='flex flex-col gap-2'>
              <div className='font-semibold'>Start working date:</div>
              <TextField
                variant='outlined'
                disabled
                value={staffDetail.startWorkingDate}
                className='w-full'
              />
            </div>
            {staffDetail.role !== 'ADMIN' && (
              <>
                <div className='flex flex-col gap-2'>
                  <div className='font-semibold'>Department:</div>
                  <TextField
                    variant='outlined'
                    disabled
                    value={staffDetail.department}
                    className='w-full'
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='font-semibold'>Qualification:</div>
                  <TextField
                    variant='outlined'
                    disabled
                    value={staffDetail.qualification}
                    className='w-full'
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='font-semibold'>License number:</div>
                  <TextField
                    variant='outlined'
                    disabled
                    value={staffDetail.licenseNumber}
                    className='w-full'
                  />
                </div>
              </>
            )}
          </div>
          {staffDetail.role === 'DOCTOR' && (
            <>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Specializations Section */}
                <Typography variant='h6'>Specializations</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  {staffDetail.specializations?.map((specialization, index) => (
                    <Chip key={index} label={specialization} color='default' />
                  ))}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Services Section */}
                <Typography variant='h6'>Services</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {staffDetail.services?.map((service, index) => (
                    <Chip key={index} label={service} color='default' />
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
