import { Avatar, Box, Button, Chip, Stack, Tooltip, Typography } from '@mui/material';

import { CustomTableConfig } from 'src/components/custom-table';
import { formatStandardDate, formatTime } from 'src/utils/format-time-currency';
import { AppointmentDetail } from 'src/types/appointment';
import { Check, DownloadIcon, X } from 'lucide-react';
import { useAuth } from '@hooks';
import { PatientDetail, UserDetail } from 'src/types/user';
import { Staff } from 'src/types/staff';

export interface AppointmentDetailConfig extends AppointmentDetail {
  patient?: PatientDetail | undefined;
  doctor: Staff;
}

const getAppointmentManangementTableConfig = ({
  onClickApprove,
  onClickDecline,
  user
}: {
  onClickApprove?: (data: AppointmentDetailConfig) => void;
  onClickDecline?: (data: AppointmentDetailConfig) => void;
  user: UserDetail;
}): CustomTableConfig<AppointmentDetailConfig['id'], AppointmentDetailConfig>[] => {
  const baseConfig: CustomTableConfig<AppointmentDetailConfig['id'], AppointmentDetailConfig>[] = [
    {
      key: 'bookingId',
      headerLabel: 'BookingID',
      type: 'string',
      renderCell: (data) => <Typography fontWeight={'light'}>#{data.id.slice(0, 5)}</Typography>
    },
    {
      key: 'Date and Time',
      headerLabel: 'Date',
      type: 'string',
      renderCell: (data) => <Typography variant='body1'>{data.date}</Typography>
    },
    {
      key: 'Type',
      headerLabel: 'Appointment Type',
      type: 'string',
      renderCell: (data) => (
        <Chip label={data.type} color={data.type === 'FIRST_VISIT' ? 'primary' : 'secondary'} />
      )
    },
    {
      key: 'Status',
      headerLabel: 'Status',
      type: 'string',
      renderCell: (data) => (
        <Chip
          label={data.status}
          color={
            data.status === 'PENDING' || data.status === 'RESCHEDULED'
              ? 'warning'
              : ['COMPLETED', 'ACCEPTED'].includes(data.status)
                ? 'success'
                : 'error'
          }
        />
      )
    },
    {
      key: 'reason',
      headerLabel: 'Reason',
      type: 'string',
      renderCell: (data) => <Typography>{data.reason}</Typography>
    },
    {
      key: 'notes',
      headerLabel: 'Notes',
      type: 'string',
      renderCell: (data) => (
        <DownloadIcon
          className='cursor-pointer'
          onClick={(e) => {
            e.stopPropagation();
            data.note.forEach(async (item: string, index: number) => {
              const response = await fetch(item);
              const blob = await response.blob();
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = `note${index}`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(link.href);
            });
            // const blob = new Blob([data.note[0] || ''], { type: '*' });
            // const url = URL.createObjectURL(blob);
            // const a = document.createElement('a');
            // a.href = url;
            // a.download = `notes-${data.id}.pdf`;
            // a.click();
            // URL.revokeObjectURL(url);
          }}
        />
      )
    }
  ];

  // Role-specific configuration
  if (user?.role === 'ADMIN') {
    baseConfig.splice(1, 0, {
      key: 'patient',
      headerLabel: 'Patient',
      type: 'string',
      renderCell: (data) => (
        <Stack direction='row' alignItems={'center'} spacing={1}>
          <Box>
            <Typography variant='body1'>{data.patient?.fullName}</Typography>
            <Typography variant='body2' color='textSecondary'>
              {data.patient?.ssn as string}
            </Typography>
          </Box>
        </Stack>
      )
    });

    baseConfig.splice(2, 0, {
      key: 'doctor',
      headerLabel: 'Doctor',
      type: 'string',
      renderCell: (data) =>
        data.doctor && (
          <Stack direction='row' alignItems={'center'} spacing={1}>
            <Box>
              <Typography variant='body1'>{data.doctor?.fullName}</Typography>
              <Typography variant='body2' color='textSecondary'>
                {data.doctor?.email as string}
              </Typography>
            </Box>
          </Stack>
        )
    });

    baseConfig.push({
      key: 'action',
      headerLabel: '',
      type: 'string',
      renderCell: (data) =>
        data.status === 'PENDING' && (
          <Stack direction='row' spacing={2}>
            <Tooltip title='Approve Appointment'>
              <Button
                startIcon={<Check />}
                variant='contained'
                color='success'
                onClick={(event) => {
                  event.stopPropagation();
                  onClickApprove?.(data);
                }}
              >
                Approve
              </Button>
            </Tooltip>
            <Tooltip title='Decline Appointment'>
              <Button
                startIcon={<X />}
                variant='contained'
                color='error'
                onClick={(event) => {
                  event.stopPropagation();
                  onClickDecline?.(data);
                }}
              >
                Decline
              </Button>
            </Tooltip>
          </Stack>
        )
    });
  } else if (user?.role === 'PATIENT') {
    baseConfig.splice(1, 0, {
      key: 'doctor',
      headerLabel: 'Doctor',
      type: 'string',
      renderCell: (data) =>
        data.doctor ? (
          <Stack direction='row' alignItems={'center'} spacing={1}>
            <Box>
              <Typography variant='body1'>{data.doctor?.fullName}</Typography>
              <Typography variant='body2' color='textSecondary'>
                {data.doctor?.email as string}
              </Typography>
            </Box>
          </Stack>
        ) : (
          <Typography variant='body1'>Not Assigned</Typography>
        )
    });
  } else if (user?.role === 'STAFF' || user?.role === 'DOCTOR') {
    baseConfig.splice(1, 0, {
      key: 'patient',
      headerLabel: 'Patient',
      type: 'string',
      renderCell: (data) => (
        <Stack direction='row' alignItems={'center'} spacing={1}>
          <Box>
            <Typography variant='body1'>{data.patient?.fullName}</Typography>
            <Typography variant='body2' color='textSecondary'>
              {data.patient?.ssn as string}
            </Typography>
          </Box>
        </Stack>
      )
    });
  }

  return baseConfig;
};

export default getAppointmentManangementTableConfig;
