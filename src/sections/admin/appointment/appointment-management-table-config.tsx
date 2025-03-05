import { Avatar, Box, Button, Chip, Stack, Tooltip, Typography } from '@mui/material';

import { CustomTableConfig } from 'src/components/custom-table';
import { formatStandardDate, formatTime } from 'src/utils/format-time-currency';
import { AppointmentDetail } from 'src/types/appointment';
import { Check, X } from 'lucide-react';
import { PatientDetail, StaffDetail } from 'src/types/user';

export interface AppointmentDetailConfig extends AppointmentDetail {
  patient: PatientDetail | undefined;
  doctor: StaffDetail | undefined;
}

const getAppointmentManangementTableConfig = ({
  onClickApprove,
  onClickDecline
}: {
  onClickApprove: (data: AppointmentDetailConfig) => void;
  onClickDecline: (data: AppointmentDetailConfig) => void;
}): CustomTableConfig<AppointmentDetailConfig['id'], AppointmentDetailConfig>[] => [
  {
    key: 'bookingId',
    headerLabel: 'BookingID',
    type: 'string',
    renderCell: (data) => <Typography fontWeight={'light'}>#{data.id.slice(0, 5)}</Typography>
  },
  {
    key: 'patient',
    headerLabel: 'Patient',
    type: 'string',
    renderCell: (data) => (
      <Stack direction='row' alignItems={'center'} spacing={1}>
        <Avatar src={data.patient?.photoUrl} />
        <Box>
          <Typography variant='body1'>{data.patient?.name}</Typography>
          <Typography variant='body2' color='textSecondary'>
            {data.patient?.email as string}
          </Typography>
        </Box>
      </Stack>
    )
  },
  {
    key: 'doctor',
    headerLabel: 'Doctor',
    type: 'string',
    renderCell: (data) =>
      data.status === 'COMPLETED' && (
        <Stack direction='row' alignItems={'center'} spacing={1}>
          <Avatar src={data.doctor?.photoUrl} />
          <Box>
            <Typography variant='body1'>{data.doctor?.name}</Typography>
            <Typography variant='body2' color='textSecondary'>
              {data.doctor?.email as string}
            </Typography>
          </Box>
        </Stack>
      )
  },
  {
    key: 'Date',
    headerLabel: 'Date',
    type: 'string',
    renderCell: (data) => (
      <Typography variant='body1'>
        {formatTime(data.timeSlot.startTime)} - {formatTime(data.timeSlot.endTime)},{' '}
        {formatStandardDate(data.timeSlot.date)}
      </Typography>
    )
  },
  {
    key: 'Type',
    headerLabel: 'Appointment Type',
    type: 'string',
    renderCell: (data) => (
      <Chip label={data.type} color={data.type === 'INITIAL' ? 'primary' : 'secondary'} />
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
          data.status === 'PENDING' ? 'warning' : data.status === 'COMPLETED' ? 'success' : 'error'
        }
      />
    )
  },
  {
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
                onClickApprove(data);
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
                onClickDecline(data);
              }}
            >
              Decline
            </Button>
          </Tooltip>
        </Stack>
      )
  }
];

export default getAppointmentManangementTableConfig;
