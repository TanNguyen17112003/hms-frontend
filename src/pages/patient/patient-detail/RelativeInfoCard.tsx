import React from 'react';
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
  TableBody
} from '@mui/material';
// import { normalize } from 'path';
import { Pencil, Users } from 'lucide-react';

interface RelativeInfoCardProps {
  relativeInfo: any;
}

const RelativeInfoCard: React.FC<RelativeInfoCardProps> = (props) => {
  const { relativeInfo } = props;

  const createData = (fullName: string, relationship: string, phone: string) => {
    return { fullName, relationship, phone };
  };

  const rows = relativeInfo.map((item: any) =>
    createData(item.fullName, item.relationship, item.phone)
  );

  return (
    <Card className='w-full lg:p-5 '>
      <CardContent className='p-4' style={{ justifyContent: 'normal', padding: 0, margin: 0 }}>
        <Box>
          <Box className='w-full flex justify-between mb-4 text-[#0E1680]'>
            <Box className='flex gap-3 items-center'>
              <Users />
              <div className='font-semibold text-lg'>Relative Info</div>
            </Box>
            <button className='rounded-full bg-[#0E1680] text-white p-2 hover:opacity-90'>
              <Pencil className='size-5' />
            </button>
          </Box>
          <Divider style={{ marginBottom: 10 }} color='gray' />
          <Box className='flex flex-col gap-3'>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label='relative table'>
                <TableHead>
                  <TableRow>
                    <TableCell className='!bg-[#0E1680] !text-white !border-white'>
                      Relative name
                    </TableCell>
                    <TableCell className='!bg-[#0E1680] !text-white !border-white' align='right'>
                      Relationship
                    </TableCell>
                    <TableCell className='!bg-[#0E1680] !text-white !border-white' align='right'>
                      Phone number
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row: any) => (
                    <TableRow key={row.fullName}>
                      <TableCell component='th' scope='row'>
                        {row.fullName}
                      </TableCell>
                      <TableCell align='right'>{row.relationship}</TableCell>
                      <TableCell align='right'>{row.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RelativeInfoCard;
