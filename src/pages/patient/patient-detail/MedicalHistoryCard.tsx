import React from 'react';
import { Card, CardContent, Box, Divider, Chip, Button } from '@mui/material';
// import { normalize } from 'path';
import {
  Activity,
  ClipboardPlus,
  Dna,
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
                    <Box className='w-full flex gap-3 justify-start text-[#0E1680]'>
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
                    <Box className='w-full flex gap-3 justify-start text-[#0E1680]'>
                      <Activity className='w-5 h-5' />
                      <div className='font-semibold'>Surgical History</div>
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
                    <Box className='w-full flex gap-3 justify-start text-[#0E1680]'>
                      <Pill className='w-5 h-5' />
                      <div className='font-semibold'>Medications</div>
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
                    <Box className='w-full flex gap-3 justify-start text-[#0E1680]'>
                      <ShieldPlus className='w-5 h-5' />
                      <div className='font-semibold'>Allergies</div>
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
                    <Box className='w-full flex gap-3 justify-start text-[#0E1680]'>
                      <Syringe className='w-5 h-5' />
                      <div className='font-semibold'>Vaccination</div>
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
                    <Box className='w-full flex gap-3 justify-start text-[#0E1680]'>
                      <Users className='w-5 h-5' />
                      <div className='font-semibold'>Family History</div>
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
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MedicalHistoryCard;
