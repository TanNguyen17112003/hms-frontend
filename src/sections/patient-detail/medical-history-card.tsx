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
  Typography,
  TablePagination
} from '@mui/material';
import {
  Activity,
  ClipboardPlus,
  Dna,
  Pill,
  Plus,
  ShieldPlus,
  Syringe,
  Trash,
  Users,
  Save,
  Pencil
} from 'lucide-react';
import { useDialog } from '@hooks';
import PastDiseaseDialog from './past-disease-dialog';
import SurgicalHistoryDialog from './surgical-history-dialog';
import MedicationHistoryDialog from './medication-dialog';
import AllergyDialog from './allergy-dialog';
import VaccinationDialog from './vaccination-dialog';
import FamilyHistoryDialog from './family-history-dialog';
import { PastDisease } from 'src/types/past-disease';
import { SurgicalHistory } from 'src/types/surgical-history';
import { MedicalHistory } from 'src/types/medical-history';
import { Allergy } from 'src/types/allergy';
import { Vaccination } from 'src/types/vaccination';
import { FamilyHistory } from 'src/types/family-history';
import {
  AllergyRequest,
  FamilyHistoryRequest,
  MedicalHistoryRequest,
  PastDiseaseRequest,
  SurgicalHistoryRequest,
  VaccinationRequest
} from 'src/api/medical-record';
import useAppSnackbar from 'src/hooks/use-app-snackbar';

interface MedicalHistoryCardProps {
  isPatient?: boolean;
  medicalInfo: {
    pastDiseases: PastDisease[];
    surgicalHistories: SurgicalHistory[];
    medications: MedicalHistory[];
    allergies: Allergy[];
    vaccinations: Vaccination[];
    familyHistories: FamilyHistory[];
    createPastDisease?: (values: PastDiseaseRequest) => Promise<void>;
    updatePastDisease?: (id: string, values: PastDiseaseRequest) => Promise<void>;
    deletePastDisease?: (id: string) => Promise<void>;
    createSurgicalHistory?: (values: SurgicalHistoryRequest) => Promise<void>;
    updateSurgicalHistory?: (id: string, values: SurgicalHistoryRequest) => Promise<void>;
    deleteSurgicalHistory?: (id: string) => Promise<void>;
    createMedicationHistory?: (values: MedicalHistoryRequest) => Promise<void>;
    updateMedicationHistory?: (id: string, values: MedicalHistoryRequest) => Promise<void>;
    deleteMedicationHistory?: (id: string) => Promise<void>;
    createAllergy?: (values: AllergyRequest) => Promise<void>;
    updateAllergy?: (id: string, values: AllergyRequest) => Promise<void>;
    deleteAllergy?: (id: string) => Promise<void>;
    createVaccination?: (values: VaccinationRequest) => Promise<void>;
    updateVaccination?: (id: string, values: VaccinationRequest) => Promise<void>;
    deleteVaccination?: (id: string) => Promise<void>;
    createFamilyHistory?: (values: FamilyHistoryRequest) => Promise<void>;
    updateFamilyHistory?: (id: string, values: FamilyHistoryRequest) => Promise<void>;
    deleteFamilyHistory?: (id: string) => Promise<void>;
  };
  pagination: {
    medications: {
      page: number;
      rowsPerPage: number;
      setPage: (page: number) => void;
      setRowsPerPage: (rowsPerPage: number) => void;
    };
    surgicalHistories: {
      page: number;
      rowsPerPage: number;
      setPage: (page: number) => void;
      setRowsPerPage: (rowsPerPage: number) => void;
    };
    vaccinations: {
      page: number;
      rowsPerPage: number;
      setPage: (page: number) => void;
      setRowsPerPage: (rowsPerPage: number) => void;
    };
    familyHistories: {
      page: number;
      rowsPerPage: number;
      setPage: (page: number) => void;
      setRowsPerPage: (rowsPerPage: number) => void;
    };
    allergies: {
      page: number;
      rowsPerPage: number;
      setPage: (page: number) => void;
      setRowsPerPage: (rowsPerPage: number) => void;
    };
    pastDiseases: {
      page: number;
      rowsPerPage: number;
      setPage: (page: number) => void;
      setRowsPerPage: (rowsPerPage: number) => void;
    };
  };
  count: {
    medications: number;
    surgicalHistories: number;
    vaccinations: number;
    familyHistories: number;
    allergies: number;
    pastDiseases: number;
  };
}

const MedicalHistoryCard = ({
  isPatient,
  medicalInfo,
  pagination,
  count
}: MedicalHistoryCardProps) => {
  const pastDiseaseDialog = useDialog();
  const surgicalHistoryDialog = useDialog();
  const medicationHistoryDialog = useDialog();
  const allergyDialog = useDialog();
  const vaccinationDialog = useDialog();
  const familyHistoryDialog = useDialog();

  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editedRow, setEditedRow] = useState<any>({});

  // Pagination states for each table
  const { showSnackbarSuccess } = useAppSnackbar();

  const handleEdit = (row: any) => {
    setEditingRowId(row.id);
    setEditedRow(row);
  };

  const handleSave = async (updateFunction: (id: string, values: any) => Promise<void>) => {
    if (editingRowId) {
      await updateFunction(editingRowId, editedRow);
      showSnackbarSuccess('Changes saved successfully!');
      setEditingRowId(null);
    }
  };

  const handleDelete = async (id: string, deleteFunction: (id: string) => Promise<void>) => {
    await deleteFunction(id);
    showSnackbarSuccess('Deleted successfully!');
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedRow((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const renderEditableTable = (
    count: number,
    data: any[],
    columns: string[],
    keys: string[],
    updateFunction: (id: string, values: any) => Promise<void>,
    deleteFunction: (id: string) => Promise<void>,
    nonEditableKeys: string[] = [],
    page: number,
    rowsPerPage: number,
    onPageChange: (event: unknown, newPage: number) => void,
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  ) => (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} className='!bg-[#0E1680] !text-white !border-white !text-sm'>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any) => (
              <TableRow key={row.id}>
                {keys.map((key, keyIndex) => (
                  <TableCell key={keyIndex} className='!text-sm'>
                    {editingRowId === row.id && !nonEditableKeys.includes(key) ? (
                      <TextField
                        value={editedRow[key] || ''}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        fullWidth
                        type={key === 'startDate' || key === 'endDate' ? 'date' : 'text'}
                      />
                    ) : (
                      row[key]
                    )}
                  </TableCell>
                ))}
                <TableCell className='!text-sm' align='right'>
                  {editingRowId === row.id ? (
                    <Button
                      variant='contained'
                      color='primary'
                      size='small'
                      startIcon={<Save />}
                      onClick={() => handleSave(updateFunction)}
                    >
                      Save
                    </Button>
                  ) : (
                    <div className='flex gap-3'>
                      <Button
                        variant='text'
                        color='primary'
                        size='small'
                        startIcon={<Pencil />}
                        onClick={() => handleEdit(row)}
                      />
                      <Button
                        variant='text'
                        color='error'
                        size='small'
                        startIcon={<Trash />}
                        onClick={() => handleDelete(row.id, deleteFunction)}
                      />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        labelRowsPerPage='Rows per page:'
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
        }
      />
    </>
  );

  return (
    <Card className='w-full lg:p-5'>
      <CardContent className='p-4' style={{ justifyContent: 'normal', padding: 0, margin: 0 }}>
        <Box>
          <Box className='w-full flex justify-between mb-4 text-[#0E1680]'>
            <Box className='flex gap-3 items-center'>
              <ClipboardPlus />
              <div className='font-semibold text-lg'>Medical History</div>
            </Box>
          </Box>
          <Divider style={{ marginBottom: 10 }} color='gray' />
          <div className='grid grid-cols-2 gap-5'>
            {/* Medications */}
            <Card className='w-full lg:p-5'>
              <CardContent className='p-4'>
                <Box>
                  <div className='flex items-center justify-between mb-4'>
                    <Box className='w-full flex gap-3 justify-start items-center text-[#0E1680]'>
                      <Pill className='w-5 h-5' />
                      <div className='font-semibold'>Medications</div>
                    </Box>
                    {!isPatient && (
                      <Button
                        variant='outlined'
                        size='small'
                        startIcon={<Plus />}
                        onClick={medicationHistoryDialog.handleOpen}
                      >
                        Add
                      </Button>
                    )}
                  </div>
                  {medicalInfo.medications?.length > 0 ? (
                    renderEditableTable(
                      count.medications,
                      medicalInfo.medications,
                      [
                        'Medication Name',
                        'Dosage',
                        'Frequency',
                        'Start Date',
                        'End Date',
                        'Actions'
                      ],
                      ['name', 'dosage', 'frequency', 'startDate', 'endDate'],
                      medicalInfo.updateMedicationHistory as any,
                      medicalInfo.deleteMedicationHistory as any,
                      [],
                      pagination.medications.page,
                      pagination.medications.rowsPerPage,
                      (event, newPage) => pagination.medications.setPage(newPage),
                      (event) => {
                        pagination.medications.setRowsPerPage(parseInt(event.target.value, 10));
                        pagination.medications.setPage(0);
                      }
                    )
                  ) : (
                    <Typography fontWeight='bold' color='red' textAlign='center' width='100%'>
                      No medications found
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>

            {/* Vaccinations */}
            <Card className='w-full lg:p-5'>
              <CardContent className='p-4'>
                <Box>
                  <div className='flex items-center justify-between mb-4'>
                    <Box className='w-full flex gap-3 justify-start items-center text-[#0E1680]'>
                      <Syringe className='w-5 h-5' />
                      <div className='font-semibold'>Vaccinations</div>
                    </Box>
                    {!isPatient && (
                      <Button
                        variant='outlined'
                        size='small'
                        startIcon={<Plus />}
                        onClick={vaccinationDialog.handleOpen}
                      >
                        Add
                      </Button>
                    )}
                  </div>
                  {medicalInfo.vaccinations?.length > 0 ? (
                    renderEditableTable(
                      count.vaccinations,
                      medicalInfo.vaccinations,
                      ['Vaccine Name', 'Date', 'Notes', 'Actions'],
                      ['name', 'date', 'notes'],
                      medicalInfo.updateVaccination as any,
                      medicalInfo.deleteVaccination as any,
                      [],
                      pagination.vaccinations.page,
                      pagination.vaccinations.rowsPerPage,
                      (event, newPage) => pagination.vaccinations.setPage(newPage),
                      (event) => {
                        pagination.vaccinations.setRowsPerPage(parseInt(event.target.value, 10));
                        pagination.vaccinations.setPage(0);
                      }
                    )
                  ) : (
                    <Typography fontWeight='bold' color='red' textAlign='center' width='100%'>
                      No vaccinations found
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>

            {/* Past Diseases */}
            <Card className='w-full lg:p-5'>
              <CardContent className='p-4'>
                <Box>
                  <div className='flex items-center justify-between mb-4'>
                    <Box className='w-full flex gap-3 justify-start items-center text-[#0E1680]'>
                      <Dna className='w-5 h-5' />
                      <div className='font-semibold'>Past Diseases</div>
                    </Box>
                    {!isPatient && (
                      <Button
                        variant='outlined'
                        size='small'
                        startIcon={<Plus />}
                        onClick={pastDiseaseDialog.handleOpen}
                      >
                        Add
                      </Button>
                    )}
                  </div>
                  {medicalInfo.pastDiseases?.length > 0 ? (
                    renderEditableTable(
                      count.pastDiseases,
                      medicalInfo.pastDiseases,
                      ['Disease Name', 'Notes', 'Actions'],
                      ['name', 'notes'],
                      medicalInfo.updatePastDisease as any,
                      medicalInfo.deletePastDisease as any,
                      [],
                      pagination.pastDiseases.page,
                      pagination.pastDiseases.rowsPerPage,
                      (event, newPage) => pagination.pastDiseases.setPage(newPage),
                      (event) => {
                        pagination.pastDiseases.setRowsPerPage(parseInt(event.target.value, 10));
                        pagination.pastDiseases.setPage(0);
                      }
                    )
                  ) : (
                    <Typography fontWeight='bold' color='red' textAlign='center' width='100%'>
                      No past diseases found
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>

            {/* Surgical History */}
            <Card className='w-full lg:p-5'>
              <CardContent className='p-4'>
                <Box>
                  <div className='flex items-center justify-between mb-4'>
                    <Box className='w-full flex gap-3 justify-start items-center text-[#0E1680]'>
                      <Activity className='w-5 h-5' />
                      <div className='font-semibold'>Surgical History</div>
                    </Box>
                    {!isPatient && (
                      <Button
                        variant='outlined'
                        size='small'
                        startIcon={<Plus />}
                        onClick={surgicalHistoryDialog.handleOpen}
                      >
                        Add
                      </Button>
                    )}
                  </div>
                  {medicalInfo.surgicalHistories?.length > 0 ? (
                    renderEditableTable(
                      count.surgicalHistories,
                      medicalInfo.surgicalHistories,
                      ['Surgery Name', 'Year', 'Notes', 'Actions'],
                      ['name', 'year', 'notes'],
                      medicalInfo.updateSurgicalHistory as any,
                      medicalInfo.deleteSurgicalHistory as any,
                      [],
                      pagination.surgicalHistories.page,
                      pagination.surgicalHistories.rowsPerPage,
                      (event, newPage) => pagination.surgicalHistories.setPage(newPage),
                      (event) => {
                        pagination.surgicalHistories.setRowsPerPage(
                          parseInt(event.target.value, 10)
                        );
                        pagination.surgicalHistories.setPage(0);
                      }
                    )
                  ) : (
                    <Typography fontWeight='bold' color='red' textAlign='center' width='100%'>
                      No surgical histories found
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>

            {/* Allergies */}
            <Card className='w-full lg:p-5'>
              <CardContent className='p-4'>
                <Box>
                  <div className='flex items-center justify-between mb-4'>
                    <Box className='w-full flex gap-3 justify-start items-center text-[#0E1680]'>
                      <ShieldPlus className='w-5 h-5' />
                      <div className='font-semibold'>Allergies</div>
                    </Box>
                    {!isPatient && (
                      <Button
                        variant='outlined'
                        size='small'
                        startIcon={<Plus />}
                        onClick={allergyDialog.handleOpen}
                      >
                        Add
                      </Button>
                    )}
                  </div>
                  {medicalInfo.allergies?.length > 0 ? (
                    renderEditableTable(
                      count.allergies,
                      medicalInfo.allergies,
                      ['Allergen', 'Severity', 'Notes', 'Actions'],
                      ['allergen', 'severity', 'notes'],
                      medicalInfo.updateAllergy as any,
                      medicalInfo.deleteAllergy as any,
                      [],
                      pagination.allergies.page,
                      pagination.allergies.rowsPerPage,
                      (event, newPage) => pagination.allergies.setPage(newPage),
                      (event) => {
                        pagination.allergies.setRowsPerPage(parseInt(event.target.value, 10));
                        pagination.allergies.setPage(0);
                      }
                    )
                  ) : (
                    <Typography fontWeight='bold' color='red' textAlign='center' width='100%'>
                      No allergies found
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>

            {/* Family History */}
            <Card className='w-full lg:p-5'>
              <CardContent className='p-4'>
                <Box>
                  <div className='flex items-center justify-between mb-4'>
                    <Box className='w-full flex gap-3 justify-start items-center text-[#0E1680]'>
                      <Users className='w-5 h-5' />
                      <div className='font-semibold'>Family History</div>
                    </Box>
                    {!isPatient && (
                      <Button
                        variant='outlined'
                        size='small'
                        startIcon={<Plus />}
                        onClick={familyHistoryDialog.handleOpen}
                      >
                        Add
                      </Button>
                    )}
                  </div>
                  {medicalInfo.familyHistories?.length > 0 ? (
                    renderEditableTable(
                      count.familyHistories,
                      medicalInfo.familyHistories,
                      ['Relative', 'Condition', 'Notes', 'Actions'],
                      ['relative', 'condition', 'notes'],
                      medicalInfo.updateFamilyHistory as any,
                      medicalInfo.deleteFamilyHistory as any,
                      [],
                      pagination.familyHistories.page,
                      pagination.familyHistories.rowsPerPage,
                      (event, newPage) => pagination.familyHistories.setPage(newPage),
                      (event) => {
                        pagination.familyHistories.setRowsPerPage(parseInt(event.target.value, 10));
                      }
                    )
                  ) : (
                    <Typography fontWeight='bold' color='red' textAlign='center' width='100%'>
                      No family histories found
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </div>
        </Box>
      </CardContent>
      <PastDiseaseDialog
        open={pastDiseaseDialog.open}
        onClose={pastDiseaseDialog.handleClose}
        onConfirm={medicalInfo.createPastDisease || (() => Promise.resolve())}
      />
      <SurgicalHistoryDialog
        open={surgicalHistoryDialog.open}
        onClose={surgicalHistoryDialog.handleClose}
        onConfirm={medicalInfo.createSurgicalHistory || (() => Promise.resolve())}
      />
      <MedicationHistoryDialog
        open={medicationHistoryDialog.open}
        onClose={medicationHistoryDialog.handleClose}
        onConfirm={medicalInfo.createMedicationHistory || (() => Promise.resolve())}
      />
      <AllergyDialog
        open={allergyDialog.open}
        onClose={allergyDialog.handleClose}
        onConfirm={medicalInfo.createAllergy || (() => Promise.resolve())}
      />
      <VaccinationDialog
        open={vaccinationDialog.open}
        onClose={vaccinationDialog.handleClose}
        onConfirm={medicalInfo.createVaccination || (() => Promise.resolve())}
      />
      <FamilyHistoryDialog
        open={familyHistoryDialog.open}
        onClose={familyHistoryDialog.handleClose}
        onConfirm={medicalInfo.createFamilyHistory || (() => Promise.resolve())}
      />
    </Card>
  );
};

export default MedicalHistoryCard;
