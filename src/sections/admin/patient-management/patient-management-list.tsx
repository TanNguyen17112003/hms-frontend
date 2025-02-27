import { Box } from '@mui/material';
import { useMemo } from 'react';
import usePagination from 'src/hooks/use-pagination';
import { PatientData } from 'src/pages/admin/patient-management';
import getPatientManangementTableConfig from './patient-manament-table-config';
import { useDialog } from '@hooks';
import { CustomTable } from '@components';

interface PatientManagementListProps {
  patients: PatientData[];
  searchInput: string;
}
const PatientManagementList: React.FC<PatientManagementListProps> = ({ patients, searchInput }) => {
  const deleteDialog = useDialog<PatientData>();
  const editDialog = useDialog<PatientData>();
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
      onClickEdit: (data) => editDialog.handleOpen(data)
    });
  }, [getPatientManangementTableConfig]);

  return (
    <Box className='px-6 py-5'>
      <CustomTable
        className='mt-5'
        rows={results}
        configs={PatientManagementListConfig}
        pagination={pagination}
      />
    </Box>
  );
};

export default PatientManagementList;
