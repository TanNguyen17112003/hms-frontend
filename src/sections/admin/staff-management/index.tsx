import React, { useEffect, useState } from 'react';
import StaffFilter from './staff-filter';
import { Avatar, Box, Button, Stack, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { doctors } from 'src/utils/generate-mock';
import { StaffDetail } from 'src/types/user';
import { Stethoscope, Clock, Calendar, FileText, ChevronRight, User } from 'lucide-react';
import { FaEllipsisVertical, FaMars, FaVenus } from 'react-icons/fa6';
import { useResponsive } from 'src/utils/use-responsive';
import Pagination from 'src/components/ui/Pagination';
import { useRouter } from 'next/router';
import { useStaffContext } from 'src/contexts/staff/staff-context';
import { Staff } from 'src/types/staff';
import { Hospital } from 'iconsax-react';
import { useDebounce } from 'src/hooks/use-debounce';
import { defaultStaffFilters } from 'src/constants/staff';

interface DoctorCardProps {
  doctor: Staff;
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
        <Avatar src='' variant='square' sx={{ width: 64, height: 64 }} />
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'flex-start'}
          gap={1}
        >
          <div className='flex items-center gap-5'>
            <Typography variant='h5'>{doctor.fullName}</Typography>
            <div
              className={`w-3 h-3 rounded-full ${doctor.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'}`}
            ></div>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <Stack direction={'row'} spacing={1}>
              <User size={16} />
              <Typography variant='body2' fontWeight={'light'}>
                {doctor.role}
              </Typography>
              {doctor?.sex === 'MALE' ? (
                <FaMars size={16} className='text-blue-500' />
              ) : (
                <FaVenus size={16} className='text-pink-500' />
              )}
            </Stack>
            {doctor.role !== 'ADMIN' && (
              <>
                {/* <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
                <InfoItem
                  icon={<Stethoscope size={16} />}
                  text={doctor.specializations?.join(', ')}
                />
                <InfoItem icon={<Clock size={16} />} text='9.30am - 01:00am BST' />
            <InfoItem icon={<Calendar size={16} />} text='Jun 24, 2021' /> 
              </Stack> */}
                <Stack direction={'row'} spacing={1}>
                  <Hospital size={16} />
                  <Typography variant='body2' fontWeight={'light'}>
                    {doctor.department}
                  </Typography>
                </Stack>
                <Stack direction={'row'} spacing={1}>
                  <Stethoscope size={16} />
                  <Typography variant='body2' fontWeight={'light'}>
                    {doctor?.specializations?.join(', ')}
                  </Typography>
                </Stack>
                <Stack direction={'row'} spacing={1}>
                  <FileText size={16} />
                  <Typography variant='body2' fontWeight={'light'}>
                    {doctor.qualification}
                  </Typography>
                </Stack>
              </>
            )}
          </div>
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
                View Details
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
            View Details
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
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  const rowsPerPage = 10;
  const { getListStaffsApi } = useStaffContext();
  const [filters, setFilters] = useState<any>(defaultStaffFilters);
  const [search, setSearch] = useState<string>('');
  const debouncedSearchInput = useDebounce(search, 500);

  useEffect(() => {
    getListStaffsApi.call({
      page: page,
      size: rowsPerPage,
      ...(debouncedSearchInput ? { search: debouncedSearchInput } : {}),
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.sex ? { sex: filters.sex } : {}),
      ...(filters.role ? { role: filters.role } : {}),
      ...(filters.department ? { department: filters.department } : {})
    });
  }, [page, filters, debouncedSearchInput]);

  const handlePageChange = (event: any, newPage: number) => {
    setPage(newPage + 1);
  };

  return (
    <Box className='px-6 py-4'>
      <StaffFilter
        filters={filters}
        setFilters={setFilters}
        search={search}
        setSearch={setSearch}
      />
      <Box display={'flex'} flexDirection={'column'} gap={2}>
        {getListStaffsApi?.data?.content?.map((doctor: any) => (
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
          page={page - 1}
          count={getListStaffsApi?.data?.totalElements ? getListStaffsApi?.data?.totalElements : 0}
          rowsPerPage={rowsPerPage}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};
