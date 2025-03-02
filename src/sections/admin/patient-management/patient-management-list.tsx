import { Box, Chip, Typography } from '@mui/material';
import { useMemo } from 'react';
import usePagination from 'src/hooks/use-pagination';
import { PatientData } from 'src/pages/admin/patient-management';
import getPatientManangementTableConfig from './patient-manament-table-config';
import { useDialog, useDrawer, useSelection } from '@hooks';
import { CustomTable } from '@components';
import { Stack } from '@mui/system';
import DeleteUserDialog from 'src/sections/delete-user-dialog';
import PatientEditDrawer from './patient-edit-drawer';

interface PatientManagementListProps {
  patients: PatientData[];
  searchInput: string;
}
const PatientManagementList: React.FC<PatientManagementListProps> = ({ patients, searchInput }) => {
  const select = useSelection<PatientData>(patients);
  const deleteDialog = useDialog<PatientData>();
  const editDrawer = useDrawer<PatientData>();
  const pagination = usePagination({
    count: patients.length
  });
  const filteredUsers = patients.filter((user) => {
    return user.name.toLowerCase().includes(searchInput.toLowerCase());
  });
  const results = filteredUsers.map((patient, index) => ({ ...patient, index: index + 1 }));

  const PatientManagementListConfig = useMemo(() => {
    return getPatientManangementTableConfig({
      onClickRemove: (data) => deleteDialog.handleOpen(data),
      onClickEdit: (data) => editDrawer.handleOpen(data)
    });
  }, [getPatientManangementTableConfig]);

  return (
    <Box
      className='px-6 mt-8 py-5 border-2 rounded-xl bg-white'
      boxShadow={'0px 1px 2px 0px rgba(16, 24, 40, 0.06)'}
    >
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Stack direction='row' spacing={2} alignItems='center'>
          <Typography variant='h6'>Patient List</Typography>
          <Chip
            label={`${results.length} patients`}
            sx={{ backgroundColor: 'rgba(229, 231, 251, 1)', color: 'rgba(7, 11, 92, 1)' }}
          />
        </Stack>
      </Stack>
      <CustomTable
        className='mt-5'
        rows={results}
        configs={PatientManagementListConfig}
        pagination={pagination}
        cellClassName='bg-white'
        select={select}
      />
      <PatientEditDrawer
        open={editDrawer.open}
        onClose={editDrawer.handleClose}
        patient={editDrawer.data as PatientData}
        onSubmit={(data) => new Promise<void>((resolve) => setTimeout(resolve, 1000))}
      />
      <DeleteUserDialog
        open={deleteDialog.open}
        onClose={deleteDialog.handleClose}
        user={deleteDialog.data as PatientData}
        onConfirm={() => new Promise<void>((resolve) => setTimeout(resolve, 1000))}
      />
    </Box>
  );
};

export default PatientManagementList;
