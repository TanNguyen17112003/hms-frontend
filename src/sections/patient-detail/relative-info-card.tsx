import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TablePagination
} from '@mui/material';
import { Plus, Users, Trash } from 'lucide-react';
import { PatientRelative } from 'src/types/patient-relative';
import RelativeInfoDialog from './relative-info-dialog';
import { useDialog } from '@hooks';
import { PatientRelativeRequest } from 'src/api/medical-record';

interface RelativeInfoCardProps {
  relativeInfo: PatientRelative[];
  createPatientRelative: (values: PatientRelativeRequest) => Promise<void>;
  deletePatientRelative: (id: string) => Promise<void>;
  pagination: {
    page: number;
    rowsPerPage: number;
    setPage: (page: number) => void;
    setRowsPerPage: (rowsPerPage: number) => void;
  };
  count: number;
}

const RelativeInfoCard: React.FC<RelativeInfoCardProps> = (props) => {
  const { relativeInfo, deletePatientRelative } = props;

  const patientRelativeDialog = useDialog();

  const createData = (id: string, fullName: string, relationship: string, phone: string) => {
    return { id, fullName, relationship, phone };
  };

  const rows = relativeInfo?.map((item: any) =>
    createData(item.id, item.fullName, item.relationship, item.phoneNumber)
  );

  const handleDelete = async (id: string) => {
    try {
      event?.stopPropagation();
      await deletePatientRelative(id);
    } catch (error) {
      console.error('Failed to delete relative:', error);
    }
  };

  return (
    <Card className='w-full lg:p-5'>
      <CardContent className='p-4' style={{ justifyContent: 'normal', padding: 0, margin: 0 }}>
        <Box>
          <Box className='w-full flex justify-between mb-4 text-[#0E1680]'>
            <Box className='flex gap-3 items-center'>
              <Users />
              <div className='font-semibold text-lg'>Relative Info</div>
            </Box>
            <button className='rounded-full bg-[#0E1680] text-white p-2 hover:opacity-90'>
              <Plus className='size-5' onClick={patientRelativeDialog.handleOpen} />
            </button>
          </Box>
          <Divider style={{ marginBottom: 10 }} color='gray' />
          <Box className='flex flex-col gap-3'>
            {rows?.length === 0 && (
              <TableRow className='flex gap-3 w-full items-center justify-center'>
                <Typography
                  fontWeight='bold'
                  fontSize={20}
                  textAlign='center'
                  color='red'
                  width='100%'
                >
                  No relatives found
                </Typography>
              </TableRow>
            )}
            {rows?.length > 0 && (
              <>
                <TableContainer>
                  <Table aria-label='relative table'>
                    <TableHead>
                      <TableRow>
                        <TableCell className='!bg-[#0E1680] !text-white !border-white !text-sm'>
                          Relative Name
                        </TableCell>
                        <TableCell
                          className='!bg-[#0E1680] !text-white !border-white !text-sm'
                          align='right'
                        >
                          Relationship
                        </TableCell>
                        <TableCell
                          className='!bg-[#0E1680] !text-white !border-white !text-sm'
                          align='right'
                        >
                          Phone Number
                        </TableCell>
                        <TableCell
                          className='!bg-[#0E1680] !text-white !border-white !text-sm'
                          align='right'
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row: any) => (
                        <TableRow key={row.id}>
                          <TableCell className='!text-sm' component='th' scope='row'>
                            {row.fullName}
                          </TableCell>
                          <TableCell className='!text-sm' align='right'>
                            {row.relationship}
                          </TableCell>
                          <TableCell className='!text-sm' align='right'>
                            {row.phone}
                          </TableCell>
                          <TableCell className='!text-sm' align='right'>
                            <button onClick={() => handleDelete(row.id)}>
                              <Trash className='size-4 text-red-500' />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component='div'
                  count={props.count}
                  rowsPerPage={props.pagination.rowsPerPage}
                  page={props.pagination.page}
                  onPageChange={(event, page) => props.pagination.setPage(page)}
                  onRowsPerPageChange={(event) =>
                    props.pagination.setRowsPerPage(parseInt(event.target.value, 10))
                  }
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
        </Box>
      </CardContent>
      <RelativeInfoDialog
        open={patientRelativeDialog.open}
        onClose={patientRelativeDialog.handleClose}
        onConfirm={props.createPatientRelative}
      />
    </Card>
  );
};

export default RelativeInfoCard;
