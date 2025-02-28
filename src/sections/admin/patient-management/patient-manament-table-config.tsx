import { Avatar, Badge, Box, Chip, Stack, Tooltip, Typography } from '@mui/material';
import { Trash, Edit, CloseCircle, Edit2 } from 'iconsax-react';

import { CustomTableConfig } from 'src/components/custom-table';
import { PatientData } from 'src/pages/admin/patient-management';
import { formatDate, formatTagName } from 'src/utils/format-time-currency';

const getPatientManangementTableConfig = ({
  onClickRemove,
  onClickEdit
}: {
  onClickRemove: (data: PatientData) => void;
  onClickEdit: (data: PatientData) => void;
}): CustomTableConfig<PatientData['id'], PatientData>[] => [
  {
    key: 'name',
    headerLabel: 'Patient Name',
    type: 'string',
    renderCell: (data) => (
      <Stack direction='row' alignItems={'center'} spacing={1}>
        <Avatar src={data.avatar} />
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
    key: 'id',
    headerLabel: 'Patient ID',
    type: 'string',
    renderCell: (data) => <Typography variant='body1'>{data.id}</Typography>
  },
  {
    key: 'date',
    headerLabel: 'Date',
    type: 'date',
    renderCell: (data) => <Typography variant='body1'>{formatDate(data.date)}</Typography>
  },
  {
    key: 'age',
    headerLabel: 'Age',
    type: 'number',
    renderCell: (data) => <Typography variant='body1'>{data.age}</Typography>
  },
  {
    key: 'sex',
    headerLabel: 'Sex',
    type: 'string',
    renderCell: (data) => <Typography variant='body1'>{data.sex}</Typography>
  },
  {
    key: 'diseases',
    headerLabel: 'Diseases',
    type: 'string',
    renderCell: (data) => <Typography variant='body1'>{data.diseases}</Typography>
  },

  {
    key: 'status',
    headerLabel: 'Status',
    type: 'string',
    renderCell: (data) => {
      return data.status === 'Complicated' ? (
        <Chip label='Complicated' color='success' size='small' />
      ) : (
        <Chip label='In-Treatment' color='warning' size='small' />
      );
    }
  },
  {
    key: 'doctorName',
    headerLabel: 'Doctor Name',
    type: 'string',
    renderCell: (data) => <Typography variant='body1'>{data.doctorName}</Typography>
  },
  {
    key: 'action',
    headerLabel: '',
    type: 'string',
    renderCell: (data) => (
      <Stack direction='row' spacing={2}>
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
      </Stack>
    )
  }
];

export default getPatientManangementTableConfig;
