import { Badge, Stack, Typography } from '@mui/material';
import { Trash, Edit } from 'iconsax-react';

import { CustomTableConfig } from 'src/components/custom-table';
import { PatientData } from 'src/pages/admin/patient-management';
import { formatDate } from 'src/utils/format-time-currency';
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
    renderCell: (data) => <Typography variant='body1'>{data.name}</Typography>
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
    renderCell: (data) => (
      <Badge
        badgeContent={data.status}
        variant='standard'
        color={data.status === 'Complicated' ? 'success' : 'warning'}
      />
    )
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
      <Stack direction='row' spacing={1}>
        <Trash
          variant='Outline'
          className='h-5 w-5 cursor-pointer'
          onClick={() => onClickRemove(data)}
        />
      </Stack>
    )
  },
  {
    key: 'edit',
    headerLabel: '',
    type: 'string',
    renderCell: (data) => (
      <Stack direction='row' spacing={1}>
        <Edit
          variant='Outline'
          className='h-5 w-5 cursor-pointer'
          onClick={() => onClickEdit(data)}
        />
      </Stack>
    )
  }
];

export default getPatientManangementTableConfig;
