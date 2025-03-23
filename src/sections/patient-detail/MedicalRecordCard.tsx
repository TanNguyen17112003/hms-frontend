import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Divider,
  Chip,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  IconButton,
  TablePagination
} from '@mui/material';
// import { normalize } from 'path';
import {
  Activity,
  ClipboardPlus,
  Dna,
  Info,
  Pencil,
  Pill,
  Plus,
  ShieldPlus,
  Syringe,
  Users,
  Stethoscope,
  Trash
} from 'lucide-react';

interface MedicalRecordCardProps {
  medicalInfo: any;
}

const MedicalRecordCard: React.FC<MedicalRecordCardProps> = (props) => {
  const { medicalInfo } = props;

  const handleDelete = () => {
    console.log('delete');
  };

  const createData = (
    date: string,
    symptoms: string,
    diagnoses: string,
    treatments: string,
    notes: string,
    actions: string
  ) => {
    return { date, symptoms, diagnoses, treatments, notes, actions };
  };

  const rows = [
    {
      date: '2/2/2021',
      symptoms: 'stomach ache',
      diagnoses: 'enteritis',
      treatments: 'take prescription medication',
      notes: '',
      actions: '1'
    },
    {
      date: '2/2/2021',
      symptoms: 'stomach ache',
      diagnoses: 'enteritis',
      treatments: 'take prescription medication',
      notes: '',
      actions: '1'
    },
    {
      date: '2/2/2021',
      symptoms: 'stomach ache',
      diagnoses: 'enteritis',
      treatments: 'take prescription medication',
      notes: '',
      actions: '1'
    },
    {
      date: '2/2/2021',
      symptoms: 'stomach ache',
      diagnoses: 'enteritis',
      treatments: 'take prescription medication',
      notes: '',
      actions: '1'
    },
    {
      date: '2/2/2021',
      symptoms: 'stomach ache',
      diagnoses: 'enteritis',
      treatments: 'take prescription medication',
      notes: '',
      actions: '1'
    }
  ].map((item: any) =>
    createData(item.date, item.symptoms, item.diagnoses, item.treatments, item.notes, item.actions)
  );

  return (
    <Card className='w-full lg:p-5 '>
      <CardContent className='p-4' style={{ justifyContent: 'normal', padding: 0, margin: 0 }}>
        <Box>
          <Box className='w-full flex justify-between mb-4 text-[#0E1680]'>
            <Box className='flex gap-3 items-center'>
              <Stethoscope />
              <div className='font-semibold text-lg'>Medical Records</div>
            </Box>
            <Button variant='outlined' size='small' startIcon={<Plus />}>
              Add
            </Button>
          </Box>
          <Divider style={{ marginBottom: 10 }} color='gray' />
          <TableContainer>
            <Table aria-label='relative table'>
              <TableHead>
                <TableRow>
                  <TableCell className='!bg-[#0E1680] !text-white !border-white'>Date</TableCell>
                  <TableCell className='!bg-[#0E1680] !text-white !border-white' align='right'>
                    Symptoms
                  </TableCell>
                  <TableCell className='!bg-[#0E1680] !text-white !border-white' align='right'>
                    Diagnoses
                  </TableCell>
                  <TableCell className='!bg-[#0E1680] !text-white !border-white' align='right'>
                    Treatments
                  </TableCell>
                  <TableCell className='!bg-[#0E1680] !text-white !border-white' align='right'>
                    Notes
                  </TableCell>
                  <TableCell className='!bg-[#0E1680] !text-white !border-white' align='right'>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: any) => (
                  <TableRow key={row.date}>
                    <TableCell component='th' scope='row'>
                      {row.date}
                    </TableCell>
                    <TableCell align='right'>{row.symptoms}</TableCell>
                    <TableCell align='right'>{row.diagnoses}</TableCell>
                    <TableCell align='right'>{row.treatments}</TableCell>
                    <TableCell align='right'>{row.notes}</TableCell>
                    <TableCell align='right'>
                      <div className='flex gap-3'>
                        <button>
                          <Pencil className='size-4' />
                        </button>
                        <button>
                          <Trash className='size-4 text-red-500' />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={rows.length}
            rowsPerPage={5}
            page={1}
            onPageChange={() => {}}
            onRowsPerPageChange={() => {}}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MedicalRecordCard;
