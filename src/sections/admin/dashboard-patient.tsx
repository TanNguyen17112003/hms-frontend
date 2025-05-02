import { Box, Chip, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import getPatientManangementTableConfig from './patient-management/patient-management-table-config';
import { useDialog, useDrawer, useSelection } from '@hooks';
import { CustomTable } from '@components';
import { Stack } from '@mui/system';
import { PatientDetail } from 'src/types/user';
import DeleteUserDialog from 'src/sections/delete-user-dialog';
import { PatientItemResponse } from 'src/api/medical-record';
import Pagination from 'src/components/ui/Pagination';

interface DashboardPatientProps {
  patients: PatientItemResponse[];
  pagination?: {
    page: number;
    setPage: (page: number) => void;
  };
  count?: number;
}
const DashboardPatient: React.FC<DashboardPatientProps> = ({ patients, pagination, count }) => {
  const deleteDialog = useDialog<PatientDetail>();
  const editDrawer = useDrawer<PatientDetail>();

  const results = patients.map((patient, index) => ({ ...patient.patient, index: index + 1 }));
  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      pagination?.setPage(page);
    },
    [pagination]
  );

  const DashboardPatientConfig = useMemo(() => {
    return getPatientManangementTableConfig({
      onClickRemove: (data) => deleteDialog.handleOpen(data),
      onClickEdit: (data) => editDrawer.handleOpen(data)
    });
  }, [getPatientManangementTableConfig]);

  return (
    <Box
      className='px-6 mt-8 py-4 border-2 rounded-xl bg-white'
      boxShadow={'0px 1px 2px 0px rgba(16, 24, 40, 0.06)'}
    >
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Stack direction='row' spacing={2} alignItems='center'>
          <Typography variant='h6'>Patient List</Typography>
          <Chip
            label={`${count} patients`}
            sx={{ backgroundColor: 'rgba(229, 231, 251, 1)', color: 'rgba(7, 11, 92, 1)' }}
          />
        </Stack>
      </Stack>
      <CustomTable
        className='mt-5'
        rows={results}
        configs={DashboardPatientConfig}
        cellClassName='bg-white'
      />
      <Pagination
        page={pagination?.page as number}
        count={count as number}
        onChange={handlePageChange}
        rowsPerPage={10}
      />
      <DeleteUserDialog
        open={deleteDialog.open}
        onClose={deleteDialog.handleClose}
        user={deleteDialog.data as PatientDetail}
        onConfirm={() => new Promise<void>((resolve) => setTimeout(resolve, 1000))}
      />
    </Box>
  );
};

export default DashboardPatient;
