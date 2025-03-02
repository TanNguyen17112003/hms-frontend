import { Avatar, Badge, Box, Chip, Stack, Tooltip, Typography } from '@mui/material';
import { Trash, Edit, CloseCircle, Edit2 } from 'iconsax-react';

import { CustomTableConfig } from 'src/components/custom-table';
import { formatDate, formatTagName } from 'src/utils/format-time-currency';
import { PatientDetail } from 'src/types/user';

const getPatientManangementTableConfig = ({
  onClickRemove,
  onClickEdit
}: {
  onClickRemove: (data: PatientDetail) => void;
  onClickEdit: (data: PatientDetail) => void;
}): CustomTableConfig<PatientDetail['id'], PatientDetail>[] => [
  {
    key: 'name',
    headerLabel: 'Patient Name',
    type: 'string',
    renderCell: (data) => (
      <Stack direction='row' alignItems={'center'} spacing={1}>
        <Avatar src={data.photoUrl} />
        <Box>
          <Typography variant='body1'>{data.name}</Typography>
          <Typography variant='body2' color='textSecondary'>
            {formatTagName(data.name)}
          </Typography>
        </Box>
      </Stack>
    )
  },
  {
    key: 'email',
    headerLabel: 'Email',
    type: 'string',
    renderCell: (data) => <Typography variant='body1'>{data.email}</Typography>
  },
  {
    key: 'SSN',
    headerLabel: 'SSN',
    type: 'string',
    renderCell: (data) => <Typography variant='body1'>#{data.SSN}</Typography>
  },
  {
    key: 'date',
    headerLabel: 'Date of Birth',
    type: 'string',
    renderCell: (data) => <Typography variant='body1'>{data.dob}</Typography>
  },
  {
    key: 'gender',
    headerLabel: 'Gender',
    type: 'string',
    renderCell: (data) => (
      <Chip label={data.gender} color={data.gender === 'MALE' ? 'primary' : 'secondary'} />
    )
  },
  {
    key: 'phone',
    headerLabel: 'Phone',
    type: 'string',
    renderCell: (data) => <Typography variant='body1'>{data.phone}</Typography>
  },
  {
    key: 'address',
    headerLabel: 'Address',
    type: 'string',
    renderCell: (data) => <Typography variant='body1'>{data.address}</Typography>
  },
  {
    key: 'action',
    headerLabel: '',
    type: 'string',
    renderCell: (data) => (
      <Stack direction='row' spacing={2}>
        <Tooltip title='Delete Patient'>
          <Trash
            variant='Outline'
            size={24}
            className='cursor-pointer'
            onClick={(event) => {
              event.stopPropagation();
              onClickRemove(data);
            }}
          />
        </Tooltip>
        <Tooltip title='Edit Patient'>
          <Edit2
            variant='Outline'
            size={24}
            className='cursor-pointer'
            onClick={(event) => {
              event.stopPropagation();
              onClickEdit(data);
            }}
          />
        </Tooltip>
      </Stack>
    )
  }
];

export default getPatientManangementTableConfig;
