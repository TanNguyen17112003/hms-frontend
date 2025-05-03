import { Avatar, Badge, Box, Chip, Stack, Tooltip, Typography } from '@mui/material';
import { Trash, Edit, CloseCircle, Edit2, UserAdd, PenAdd } from 'iconsax-react';
import { Pencil } from 'lucide-react';
import { DoctorTimeslotResponseItem } from 'src/api/timeSlot';

import { CustomTableConfig } from 'src/components/custom-table';
import { UserDetail } from 'src/types/user';

const getDoctorTimeslotResponseItemOwnedManagementTableConfig = ({
  onClickRemove,
  onClickAssign
}: {
  onClickRemove: (data: DoctorTimeslotResponseItem) => void;
  onClickAssign?: (data: DoctorTimeslotResponseItem) => void;
}): CustomTableConfig<DoctorTimeslotResponseItem['id'], DoctorTimeslotResponseItem>[] => [
  {
    key: 'id',
    headerLabel: 'ID',
    type: 'string',
    renderCell: (data) => <Typography variant='body1'>TSL{data.id.slice(0, 5)}</Typography>
  },

  {
    key: 'week',
    headerLabel: 'Week',
    type: 'string',
    renderCell: (data) => <Typography variant='body1'>{data.timeSlot.week}</Typography>
  },
  {
    key: 'date',
    headerLabel: 'Date',
    type: 'string',
    renderCell: (data) => <Typography variant='body1'>{data.timeSlot.date}</Typography>
  },
  {
    key: 'startTime',
    headerLabel: 'Start Time',
    type: 'string',
    renderCell: (data) => <Typography>{data.timeSlot.startTime}</Typography>
  },
  {
    key: 'endTime',
    headerLabel: 'End Time',
    type: 'string',
    renderCell: (data) => <Typography>{data.timeSlot.endTime}</Typography>
  },
  {
    key: 'maxAppoiintments',
    headerLabel: 'Max Appointments',
    type: 'string',
    renderCell: (data) => <Typography>{data.maxAppointment}</Typography>
  },
  {
    key: 'numberOfAppointments',
    headerLabel: 'Number of Appointments',
    type: 'string',
    renderCell: (data) => <Typography>{data.appointmentInfoDTOs.length}</Typography>
  }
];

export default getDoctorTimeslotResponseItemOwnedManagementTableConfig;
