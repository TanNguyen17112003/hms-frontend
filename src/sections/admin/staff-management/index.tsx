import React, { useState } from 'react';
import StaffFilter from './staff-filter';
import { Avatar, Box, Button, Stack, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { doctors } from 'src/utils/generate-mock';
import { StaffDetail } from 'src/types/user';
import { Stethoscope, Clock, Calendar, FileText, ChevronRight } from 'lucide-react';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { useResponsive } from 'src/utils/use-responsive';
import Pagination from 'src/components/ui/Pagination';
import { useRouter } from 'next/router';

interface DoctorCardProps {
  doctor: StaffDetail;
  onClick?: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onClick }) => {
  const { isMobile } = useResponsive();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      paddingX={2}
      paddingY={3}
      borderRadius={2}
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      border={'1px solid #E0E0E0'}
      onClick={onClick}
      className='cursor-pointer hover:bg-gray-200'
    >
      <Stack direction={'row'} spacing={2} alignItems={isMobile ? '' : 'center'}>
        <Avatar src={doctor.photoUrl} variant='square' sx={{ width: 64, height: 64 }} />
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'flex-start'}
          gap={1}
        >
          <Typography variant='h5'>{doctor.name}</Typography>
          <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
            <InfoItem icon={<Stethoscope size={16} />} text={doctor.speciality} />
            <InfoItem icon={<Clock size={16} />} text='9.30am - 01:00am BST' />
            <InfoItem icon={<Calendar size={16} />} text='Jun 24, 2021' />
          </Stack>
          <Stack direction={'row'} spacing={1}>
            <FileText size={16} />
            <Typography variant='body2' fontWeight={'light'}>
              {doctor.qualification}
            </Typography>
          </Stack>
        </Box>
      </Stack>
      {isMobile ? (
        <>
          <IconButton onClick={handleMenuOpen}>
            <FaEllipsisVertical />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>
              <Button
                variant='contained'
                sx={{ backgroundColor: '#0E1680', ':hover': { backgroundColor: 'orange' } }}
                endIcon={<ChevronRight size={16} />}
              >
                View Appointments
              </Button>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Button variant='outlined' sx={{ color: '#0E1680' }}>
                View Doctor Details
              </Button>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Stack spacing={1}>
          <Button
            variant='contained'
            sx={{ backgroundColor: '#0E1680', ':hover': { backgroundColor: 'orange' } }}
            endIcon={<ChevronRight size={16} />}
          >
            View Appointments
          </Button>
          <Button variant='outlined' sx={{ color: '#0E1680' }}>
            View Doctor Details
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

interface InfoItemProps {
  icon: React.ReactNode;
  text: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, text }) => (
  <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={0.5}>
    {icon}
    <Typography variant='body2' fontWeight={'light'}>
      {text}
    </Typography>
  </Box>
);

export const StaffManagement: React.FC = () => {
  const [page, setPage] = useState(0);
  const router = useRouter();
  const rowsPerPage = 5; // Number of doctors per page

  const handlePageChange = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const paginatedDoctors = doctors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box className='px-6 py-4'>
      <StaffFilter />
      <Box display={'flex'} flexDirection={'column'} gap={2}>
        {paginatedDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onClick={() =>
              router.push({
                pathname: router.pathname,
                query: { ...router.query, staffId: doctor.id }
              })
            }
          />
        ))}
      </Box>
      <Box className='pt-5'>
        <Pagination
          page={page}
          count={doctors.length}
          rowsPerPage={rowsPerPage}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};
