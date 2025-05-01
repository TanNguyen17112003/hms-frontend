import { Avatar, Badge, Box, Chip, Stack, Tooltip, Typography } from '@mui/material';
import { Trash, Edit, CloseCircle, Edit2, UserAdd, PenAdd } from 'iconsax-react';
import { Pencil } from 'lucide-react';

import { CustomTableConfig } from 'src/components/custom-table';
import { TimeSlot } from 'src/types/appointment';
import { UserDetail } from 'src/types/user';

const getTimeSlotManagementTableConfig = ({
  onClickRemove,
  onClickAssign,
  user,
  isDoctorOwned = false
}: {
  onClickRemove: (data: TimeSlot) => void;
  onClickAssign?: (data: TimeSlot) => void;
  user: UserDetail;
  isDoctorOwned: boolean;
}): CustomTableConfig<TimeSlot['id'], TimeSlot>[] => [
  {
    key: 'id',
    headerLabel: 'TimeSlot ID',
    type: 'string',
    renderCell: (data) => <Typography variant='body1'>TSL{data.id.slice(0, 5)}</Typography>
  },

  {
    key: 'week',
    headerLabel: 'Week',
    type: 'string',
    renderCell: (data) => <Typography variant='body1'>{data.week}</Typography>
  },
  {
    key: 'date',
    headerLabel: 'Date',
    type: 'string',
    renderCell: (data) => <Typography variant='body1'>{data.date}</Typography>
  },
  {
    key: 'startTime',
    headerLabel: 'Start Time',
    type: 'string',
    renderCell: (data) => <Typography>{data.startTime}</Typography>
  },
  {
    key: 'endTime',
    headerLabel: 'End Time',
    type: 'string',
    renderCell: (data) => <Typography>{data.endTime}</Typography>
  },
  {
    key: 'maxAppoiintments',
    headerLabel: 'Max Appointments',
    type: 'string',
    renderCell: (data) => <Typography>{data.totalMaxAppointment}</Typography>
  },
  {
    key: 'action',
    headerLabel: '',
    type: 'string',
    renderCell: (data) => (
      <Stack direction='row' spacing={2}>
        {user?.role === 'ADMIN' && (
          <Tooltip title='Assign TimeSlot to doctor'>
            <UserAdd
              variant='Bold'
              color='blue'
              size={28}
              className='cursor-pointer'
              onClick={(event) => {
                event.stopPropagation();
                onClickAssign?.(data);
              }}
            />
          </Tooltip>
        )}
        {user?.role === 'DOCTOR' && isDoctorOwned && (
          <Tooltip title='Register this TimeSlot'>
            <PenAdd
              variant='Bold'
              color='blue'
              size={28}
              className='cursor-pointer'
              onClick={(event) => {
                event.stopPropagation();
                onClickAssign?.(data);
              }}
            />
          </Tooltip>
        )}
        <Tooltip title='Delete TimeSlot'>
          <Trash
            variant='Bold'
            color='red'
            size={28}
            className='cursor-pointer'
            onClick={(event) => {
              event.stopPropagation();
              onClickRemove(data);
            }}
          />
        </Tooltip>
      </Stack>
    )
  }
];

export default getTimeSlotManagementTableConfig;
