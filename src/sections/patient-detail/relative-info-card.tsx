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
import { Pencil, Plus, Users, Trash } from 'lucide-react';

interface RelativeInfoCardProps {
  relativeInfo: any;
}

const RelativeInfoCard: React.FC<RelativeInfoCardProps> = (props) => {
  const { relativeInfo } = props;

  const createData = (fullName: string, relationship: string, phone: string, action: any) => {
    return { fullName, relationship, phone };
  };

  const rows = relativeInfo.map((item: any) =>
    createData(item.fullName, item.relationship, item.phone, item)
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
              <Plus className='size-5' />
            </button>
          </Box>
          <Divider style={{ marginBottom: 10 }} color='gray' />
          <Box className='flex flex-col gap-3'>
            <TableContainer>
              <Table aria-label='relative table'>
                <TableHead>
                  <TableRow>
                    <TableCell className='!bg-[#0E1680] !text-white !border-white !text-sm'>
                      Relative name
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
                      Phone number
                    </TableCell>
                    <TableCell className='!bg-[#0E1680] !text-white !border-white' align='right'>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row: any) => (
                    <TableRow key={row.fullName}>
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
                        <button>
                          <Trash className='size-4 text-red-500' />
                        </button>
                      </TableCell>
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
