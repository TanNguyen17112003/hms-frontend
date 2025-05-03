import React, { useMemo } from 'react';
import { AppointmentDetailConfig } from '../appointment-management-table-config';
import { Box, Button, Card, Divider, Grid, Stack, Typography } from '@mui/material';
import { formatStandardDate, formatTime } from 'src/utils/format-time-currency';
import { useAuth } from '@hooks';
import { AppointmentApi } from 'src/api/appointment';
import { useDialog } from '@hooks';
import AppointmentRescheduleDIalog from './appointment-reschedule-dialog';
import { getDateFromWeekandDate } from 'src/utils/format-time-currency';

interface AppointmentDetailInfoProps {
  appointment: AppointmentDetailConfig;
}

const AppointmentDetailInfo: React.FC<AppointmentDetailInfoProps> = ({ appointment }) => {
  const { user } = useAuth();
  const rescheduleDialog = useDialog();
  const appointmentInfo = useMemo(() => {
    return [
      {
        title: 'Appointment Type',
        value: appointment?.type === 'FIRST_VISIT' ? 'Initial' : 'Follow-up'
      },
      {
        title: 'Doctor',
        value: appointment?.doctor?.fullName || 'N/A'
      },
      {
        title: 'Status',
        value: appointment?.status || 'N/A'
      },
      {
        title: 'Time',
        value: `${appointment?.timeSlot?.startTime as string} - ${appointment?.timeSlot?.endTime}`
      },
      {
        title: 'Date',
        value: getDateFromWeekandDate(appointment?.timeSlot?.week, appointment?.timeSlot?.date)
      },
      {
        title: 'Reason for Consultations',
        value: appointment?.reason || 'N/A'
      },
      {
        title: 'Review Notes',
        value: appointment?.notes || 'N/A'
      }
    ];
  }, [appointment]);

  return (
    <Card className='px-4 py-5 h-full'>
      <Stack direction='row' alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant='h6' fontWeight='bold' className='text-bg-primary'>
          Appointment Details
        </Typography>
        {(user?.role === 'STAFF' || user?.role === 'DOCTOR') &&
          appointment?.status !== 'COMPLETED' && (
            <Box display={'flex'} alignItems={'center'} gap={2}>
              <Button
                variant='contained'
                color='primary'
                onClick={async () => {
                  try {
                    await AppointmentApi.completeAppointment(appointment?.id);
                    window.location.reload();
                  } catch (error) {
                    console.error('Error completing appointment:', error);
                  }
                }}
                sx={{ ml: 'auto' }}
              >
                Complete
              </Button>
              {appointment?.status !== 'CANCELLED' && (
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={async () => {
                    try {
                      await AppointmentApi.cancelAppointment(appointment?.id);
                      window.location.reload();
                    } catch (error) {
                      console.error('Error canceling appointment:', error);
                    }
                  }}
                  sx={{ ml: 'auto' }}
                >
                  Cancel
                </Button>
              )}
              <Button
                variant='contained'
                color='warning'
                onClick={() => rescheduleDialog.handleOpen()}
                sx={{ ml: 'auto' }}
              >
                Reschedule
              </Button>
            </Box>
          )}
      </Stack>

      <Divider className='py-2' />
      <Grid container spacing={3} pt={2}>
        {appointmentInfo.map((info, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Box>
              <Typography variant='body2' color='textSecondary'>
                {info.title}
              </Typography>
              <Typography variant='body2' className='text-bg-primary' fontWeight='bold'>
                {info.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <AppointmentRescheduleDIalog
        open={rescheduleDialog.open}
        onClose={rescheduleDialog.handleClose}
      />
    </Card>
  );
};

export default AppointmentDetailInfo;
