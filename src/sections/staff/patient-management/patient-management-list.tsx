import { Box, Chip, Typography } from '@mui/material';
import { useCallback, useMemo } from 'react';
import usePagination from 'src/hooks/use-pagination';
import getPatientManangementTableConfig from './patient-management-table-config';
import { useDialog, useDrawer, useSelection } from '@hooks';
import { CustomTable } from '@components';
import { Stack } from '@mui/system';
import { PatientDetail } from 'src/types/user';
import { useRouter } from 'next/router';

interface PatientManagementListProps {
  patients: PatientDetail[];
  searchInput: string;
}
const PatientManagementList: React.FC<PatientManagementListProps> = ({ patients, searchInput }) => {
  const select = useSelection<PatientDetail>(patients);
  const router = useRouter();
  const editDrawer = useDrawer<PatientDetail>();
  const pagination = usePagination({
    count: patients.length
  });
  const filteredUsers = patients.filter((user) => {
    return user.name.toLowerCase().includes(searchInput.toLowerCase());
  });
  const results = filteredUsers.map((patient, index) => ({ ...patient, index: index + 1 }));

  const PatientManagementListConfig = useMemo(() => {
    return getPatientManangementTableConfig({
      onClickEdit: (data) => editDrawer.handleOpen(data)
    });
  }, [getPatientManangementTableConfig]);

  const handleGoPatient = useCallback((patient: PatientDetail) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, patientId: patient.id }
    });
  }, []);

  return (
    <Box
      className='px-6 mt-8 py-4 border-2 rounded-xl bg-white'
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
        onClickRow={(data) => handleGoPatient(data as PatientDetail)}
      />
    </Box>
  );
};

export default PatientManagementList;
