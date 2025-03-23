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
  IconButton
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
  Users
} from 'lucide-react';

interface MedicalHistoryCardProps {
  medicalInfo: any;
}

const MedicalHistoryCard: React.FC<MedicalHistoryCardProps> = (props) => {
  const { medicalInfo } = props;

  const handleDelete = () => {
    console.log('delete');
  };

  const createData = (
    name: string,
    dosage: string,
    frequency: string,
    startDate: string,
    endDate: string
  ) => {
    return { name, dosage, frequency, startDate, endDate };
  };

  const rows = [
    {
      name: 'Metformin',
      dosage: '500 mg',
      frequency: '2 times/day',
      startDate: '1/1/2021',
      endDate: '2/2/2021'
    },
    {
      name: 'Amlodipine',
      dosage: '5 mg',
      frequency: '1 time/day',
      startDate: '1/1/2021',
      endDate: '2/2/2021'
    }
  ].map((item: any) =>
    createData(item.name, item.dosage, item.frequency, item.startDate, item.endDate)
  );

  return (
    <Card className='w-full lg:p-5 '>
      <CardContent className='p-4' style={{ justifyContent: 'normal', padding: 0, margin: 0 }}>
        <Box>
          <Box className='w-full flex justify-between mb-4 text-[#0E1680]'>
            <Box className='flex gap-3 items-center'>
              <ClipboardPlus />
              <div className='font-semibold text-lg'>Medical History</div>
            </Box>
            <button className='rounded-full bg-[#0E1680] text-white p-2 hover:opacity-90'>
              <Pencil className='size-5' />
            </button>
          </Box>
          <Divider style={{ marginBottom: 10 }} color='gray' />
          <div className='grid grid-cols-2 gap-5'>
            <Card className='w-full lg:p-5 '>
              <CardContent
                className='p-4'
                style={{ justifyContent: 'normal', padding: 0, margin: 0 }}
              >
                <Box>
                  <div className='flex items-center justify-between mb-4'>
                    <Box className='w-full flex gap-3 justify-start items-center text-[#0E1680]'>
                      <Dna className='w-5 h-5' />
                      <div className='font-semibold'>Past Medical History</div>
                    </Box>
                    <Button variant='outlined' size='small' startIcon={<Plus />}>
                      Add
                    </Button>
                  </div>
                  <Box className='flex gap-3'>
                    <Chip label='Anemia' onDelete={handleDelete} />
                    <Chip label='Asthma' onDelete={handleDelete} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card className='w-full lg:p-5 '>
              <CardContent
                className='p-4'
                style={{ justifyContent: 'normal', padding: 0, margin: 0 }}
              >
                <Box>
                  <div className='flex items-center justify-between mb-4'>
                    <Box className='w-full flex gap-3 justify-start items-center text-[#0E1680]'>
                      <Activity className='w-5 h-5' />
                      <div className='font-semibold'>Surgical History</div>
                      <Tooltip title='Name (year)'>
                        <Info className='hover: opacity-80 size-4' />
                      </Tooltip>
                    </Box>
                    <Button variant='outlined' size='small' startIcon={<Plus />}>
                      Add
                    </Button>
                  </div>
                  <Box className='flex gap-3'>
                    <Chip label='Breast Biopsy (2015)' onDelete={handleDelete} />
                    <Chip label='PTCA (2023)' onDelete={handleDelete} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card className='w-full lg:p-5 '>
              <CardContent
                className='p-4'
                style={{ justifyContent: 'normal', padding: 0, margin: 0 }}
              >
                <Box>
                  <div className='flex items-center justify-between mb-4'>
                    <Box className='w-full flex gap-3 justify-start items-center text-[#0E1680]'>
                      <Pill className='w-5 h-5' />
                      <div className='font-semibold'>Medications</div>
                    </Box>
                    <Button variant='outlined' size='small' startIcon={<Plus />}>
                      Add
                    </Button>
                  </div>
                  <Box className='flex gap-3'>
                    <TableContainer>
                      <Table aria-label='relative table'>
                        <TableHead>
                          <TableRow>
                            <TableCell className='!bg-[#0E1680] !text-white !border-white'>
                              Medicine or Supplement
                            </TableCell>
                            <TableCell
                              className='!bg-[#0E1680] !text-white !border-white'
                              align='right'
                            >
                              How much?
                            </TableCell>
                            <TableCell
                              className='!bg-[#0E1680] !text-white !border-white'
                              align='right'
                            >
                              How often?
                            </TableCell>
                            <TableCell
                              className='!bg-[#0E1680] !text-white !border-white'
                              align='right'
                            >
                              Start date
                            </TableCell>
                            <TableCell
                              className='!bg-[#0E1680] !text-white !border-white'
                              align='right'
                            >
                              End date
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row: any) => (
                            <TableRow key={row.name}>
                              <TableCell component='th' scope='row'>
                                {row.name}
                              </TableCell>
                              <TableCell align='right'>{row.dosage}</TableCell>
                              <TableCell align='right'>{row.frequency}</TableCell>
                              <TableCell align='right'>{row.startDate}</TableCell>
                              <TableCell align='right'>{row.endDate}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card className='w-full lg:p-5 '>
              <CardContent
                className='p-4'
                style={{ justifyContent: 'normal', padding: 0, margin: 0 }}
              >
                <Box>
                  <div className='flex items-center justify-between mb-4'>
                    <Box className='w-full flex gap-3 justify-start items-center text-[#0E1680]'>
                      <ShieldPlus className='w-5 h-5' />
                      <div className='font-semibold'>Allergies</div>
                      <Tooltip title='Allergen (Severity)'>
                        <Info className='hover: opacity-80 size-4' />
                      </Tooltip>
                    </Box>
                    <Button variant='outlined' size='small' startIcon={<Plus />}>
                      Add
                    </Button>
                  </div>
                  <Box className='flex gap-3'>
                    <Chip label='Penicillin (Low)' onDelete={handleDelete} />
                    <Chip label='Aspirin (High)' onDelete={handleDelete} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card className='w-full lg:p-5 '>
              <CardContent
                className='p-4'
                style={{ justifyContent: 'normal', padding: 0, margin: 0 }}
              >
                <Box>
                  <div className='flex items-center justify-between mb-4'>
                    <Box className='w-full flex gap-3 justify-start items-center text-[#0E1680]'>
                      <Syringe className='w-5 h-5' />
                      <div className='font-semibold'>Vaccination</div>
                      <Tooltip title='Name (date)'>
                        <Info className='hover: opacity-80 size-4' />
                      </Tooltip>
                    </Box>
                    <Button variant='outlined' size='small' startIcon={<Plus />}>
                      Add
                    </Button>
                  </div>
                  <Box className='flex gap-3'>
                    <Chip label='Adacel (1/2/2023)' onDelete={handleDelete} />
                    <Chip label='Gardasil (1/2/2024)' onDelete={handleDelete} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card className='w-full lg:p-5 '>
              <CardContent
                className='p-4'
                style={{ justifyContent: 'normal', padding: 0, margin: 0 }}
              >
                <Box>
                  <div className='flex items-center justify-between mb-4'>
                    <Box className='w-full flex gap-3 justify-start items-center text-[#0E1680]'>
                      <Users className='w-5 h-5' />
                      <div className='font-semibold'>Family History</div>
                      <Tooltip title='Disease name (Relationship)'>
                        <Info className='hover: opacity-80 size-4' />
                      </Tooltip>
                    </Box>
                    <Button variant='outlined' size='small' startIcon={<Plus />}>
                      Add
                    </Button>
                  </div>
                  <Box className='flex gap-3'>
                    <Chip label='Anemia (Father)' onDelete={handleDelete} />
                    <Chip label='Asthma (Mother)' onDelete={handleDelete} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MedicalHistoryCard;
