import { Avatar, Badge, Box, Chip, Stack, Tooltip, Typography } from '@mui/material';
import { Trash, Edit, CloseCircle, Edit2 } from 'iconsax-react';

import { CustomTableConfig } from 'src/components/custom-table';
import { formatTagName } from 'src/utils/format-time-currency';
import { PatientDetail } from 'src/types/user';
import { formatStandardDate } from 'src/utils/format-time-currency';

const getPatientManangementTableConfig = ({
  onClickEdit
}: {
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
    renderCell: (data) => <Typography variant='body1'>{formatStandardDate(data.dob)}</Typography>
  },
  {
    key: 'nationality',
    headerLabel: 'Nationality',
    type: 'string',
    renderCell: (data) => <Typography>{data.nationality}</Typography>
  },
  {
    key: 'occupation',
    headerLabel: 'Occupation',
    type: 'string',
    renderCell: (data) => <Typography variant='body1'>{data.occupation}</Typography>
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
];

export default getPatientManangementTableConfig;
