import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Divider,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  TablePagination,
  Typography
} from '@mui/material';
import { Pencil, Trash, Save, Plus, Stethoscope } from 'lucide-react';
import { MedicalRecord } from 'src/types/medical-record';
import { MedicalRecordRequest } from 'src/api/medical-record';
import MedicalRecordDialog from './medical-record-dialog';
import { useDialog } from '@hooks';
import useAppSnackbar from 'src/hooks/use-app-snackbar';

interface MedicalRecordCardProps {
  isPatient: boolean;
  medicalInfo: MedicalRecord[];
  createMedicalRecord?: (values: MedicalRecordRequest) => Promise<void>;
  updateMedicalRecord?: (id: string, values: MedicalRecordRequest) => Promise<void>;
  deleteMedicalRecord?: (id: string) => Promise<void>;
  pagination?: {
    page: number;
    rowsPerPage: number;
    setPage: (page: number) => void;
    setRowsPerPage: (rowsPerPage: number) => void;
  };
  count?: number;
}

const MedicalRecordCard: React.FC<MedicalRecordCardProps> = ({
  isPatient,
  medicalInfo,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
  pagination,
  count
}) => {
  const medicalRecordDialog = useDialog();
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editedRow, setEditedRow] = useState<Partial<MedicalRecord>>({});
  const { showSnackbarSuccess } = useAppSnackbar();
  const handleEdit = (record: MedicalRecord) => {
    setEditingRowId(record.id);
    setEditedRow(record);
  };

  const handleSave = async () => {
    if (editingRowId) {
      if (updateMedicalRecord) {
        await updateMedicalRecord(editingRowId, editedRow as MedicalRecordRequest);
      }
      showSnackbarSuccess('Medical record updated successfully!');
      setEditingRowId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (deleteMedicalRecord) {
      await deleteMedicalRecord(id);
    }
    showSnackbarSuccess('Medical record deleted successfully!');
  };

  const handleInputChange = (field: keyof MedicalRecord, value: string) => {
    setEditedRow((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    pagination?.setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    pagination?.setRowsPerPage(parseInt(event.target.value, 10));
    pagination?.setPage(0);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <Card className='w-full lg:p-5'>
      <CardContent className='p-4' style={{ justifyContent: 'normal', padding: 0, margin: 0 }}>
        <Box>
          <Box className='w-full flex justify-between mb-4 text-[#0E1680]'>
            <Box className='flex gap-3 items-center'>
              <Stethoscope />
              <div className='font-semibold text-lg'>Medical Records</div>
            </Box>
            {!isPatient && (
              <Button
                variant='outlined'
                size='small'
                startIcon={<Plus />}
                onClick={medicalRecordDialog.handleOpen}
              >
                Add
              </Button>
            )}
          </Box>
          <Divider style={{ marginBottom: 10 }} color='gray' />
          {(!medicalInfo || medicalInfo.length === 0) && (
            <div className='flex flex-col items-center justify-center h-full w-full'>
              <Typography fontWeight='bold' fontSize={20} color='red'>
                No medical records found
              </Typography>
            </div>
          )}
          {medicalInfo && medicalInfo.length > 0 && (
            <>
              <TableContainer>
                <Table aria-label='medical records table'>
                  <TableHead>
                    <TableRow>
                      <TableCell className='!bg-[#0E1680] !text-white !border-white'>
                        Date
                      </TableCell>
                      <TableCell className='!bg-[#0E1680] !text-white !border-white' align='left'>
                        Doctor
                      </TableCell>
                      <TableCell className='!bg-[#0E1680] !text-white !border-white' align='left'>
                        Symptoms
                      </TableCell>
                      <TableCell className='!bg-[#0E1680] !text-white !border-white' align='left'>
                        Diagnoses
                      </TableCell>
                      <TableCell className='!bg-[#0E1680] !text-white !border-white' align='left'>
                        Treatments
                      </TableCell>
                      <TableCell className='!bg-[#0E1680] !text-white !border-white' align='left'>
                        Notes
                      </TableCell>
                      <TableCell className='!bg-[#0E1680] !text-white !border-white' align='left'>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {medicalInfo.map((record) => (
                      <TableRow key={record.id}>
                        {editingRowId === record.id ? (
                          <>
                            {/* Non-editable field for createdAt */}
                            <TableCell>{formatDate(record.createdAt)}</TableCell>
                            <TableCell>
                              <TextField
                                value={editedRow.doctorName || ''}
                                onChange={(e) => handleInputChange('doctorName', e.target.value)}
                                fullWidth
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                value={editedRow.symptoms || ''}
                                onChange={(e) => handleInputChange('symptoms', e.target.value)}
                                fullWidth
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                value={editedRow.diagnoses || ''}
                                onChange={(e) => handleInputChange('diagnoses', e.target.value)}
                                fullWidth
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                value={editedRow.treatments || ''}
                                onChange={(e) => handleInputChange('treatments', e.target.value)}
                                fullWidth
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                value={editedRow.notes || ''}
                                onChange={(e) => handleInputChange('notes', e.target.value)}
                                fullWidth
                              />
                            </TableCell>
                            <TableCell align='left'>
                              <Button
                                variant='contained'
                                color='primary'
                                size='small'
                                startIcon={<Save />}
                                onClick={handleSave}
                              >
                                Save
                              </Button>
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell>{formatDate(record.createdAt)}</TableCell>
                            <TableCell align='left'>{record.doctorName}</TableCell>
                            <TableCell align='left'>{record.symptoms}</TableCell>
                            <TableCell align='left'>{record.diagnoses}</TableCell>
                            <TableCell align='left'>{record.treatments}</TableCell>
                            <TableCell align='left'>{record.notes}</TableCell>
                            <TableCell align='left'>
                              <div className='flex gap-3'>
                                <Button
                                  variant='text'
                                  color='primary'
                                  size='small'
                                  startIcon={<Pencil />}
                                  onClick={() => handleEdit(record)}
                                ></Button>
                                <Button
                                  variant='text'
                                  color='error'
                                  size='small'
                                  startIcon={<Trash />}
                                  onClick={() => handleDelete(record.id)}
                                ></Button>
                              </div>
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component='div'
                count={count as number}
                rowsPerPage={pagination?.rowsPerPage as number}
                page={pagination?.page as number}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage='Rows per page:'
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
                }
                getItemAriaLabel={(type) => {
                  if (type === 'first') return 'Go to first page';
                  if (type === 'last') return 'Go to last page';
                  if (type === 'next') return 'Go to next page';
                  if (type === 'previous') return 'Go to previous page';
                  return '';
                }}
              />
            </>
          )}
        </Box>
      </CardContent>
      <MedicalRecordDialog
        open={medicalRecordDialog.open}
        onClose={medicalRecordDialog.handleClose}
        onConfirm={createMedicalRecord || (() => Promise.resolve())}
      />
    </Card>
  );
};

export default MedicalRecordCard;
