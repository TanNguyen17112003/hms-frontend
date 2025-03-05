import React from 'react';
import { Card, CardContent, Box, Divider } from '@mui/material';
// import { normalize } from 'path';
import { ClipboardPlus, Pencil } from 'lucide-react';

interface MedicalHistoryCardProps {
  medicalInfo: any;
}

const MedicalHistoryCard: React.FC<MedicalHistoryCardProps> = (props) => {
  const { medicalInfo } = props;

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
        </Box>
      </CardContent>
    </Card>
  );
};

export default MedicalHistoryCard;
