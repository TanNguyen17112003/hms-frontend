import React from 'react';
import { Stack, Button, TextField, InputAdornment, Box, Typography } from '@mui/material';
import { PlusIcon, SearchIcon } from 'lucide-react';
import AdvancedFilter from 'src/components/advanced-filter/advanced-filter';
import { useResponsive } from 'src/utils/use-responsive';

function StaffFilter() {
  const { isTablet, isMobile } = useResponsive();
  return isMobile ? (
    <Stack direction={'column'} spacing={2} marginBottom={2}>
      <TextField
        variant='outlined'
        placeholder='Enter the doctor name'
        sx={{ borderRadius: 5 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <AdvancedFilter filters={[]} />
        <Button
          variant='contained'
          startIcon={<PlusIcon size={20} />}
          sx={{ backgroundColor: '#0E1680', ':hover': { backgroundColor: 'orange' } }}
        >
          <Typography variant={isMobile ? 'subtitle2' : isTablet ? 'subtitle1' : 'body1'}>
            Add Appointment
          </Typography>
        </Button>
        <Button
          variant='contained'
          startIcon={<PlusIcon size={20} />}
          sx={{ backgroundColor: '#0E1680', ':hover': { backgroundColor: 'orange' } }}
        >
          <Typography variant={isMobile ? 'subtitle2' : isTablet ? 'subtitle1' : 'body1'}>
            Add Doctor
          </Typography>
        </Button>
      </Box>
    </Stack>
  ) : (
    <Stack my={2} direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={1}>
      <Box display='flex' alignItems='center' gap={0.5}>
        <TextField
          variant='outlined'
          placeholder='Enter the doctor name'
          sx={{ borderRadius: 5 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <AdvancedFilter filters={[]} />
      </Box>
      <Box display='flex' alignItems='center' gap={1}>
        <Button
          variant='contained'
          startIcon={<PlusIcon size={20} />}
          sx={{ backgroundColor: '#0E1680', ':hover': { backgroundColor: 'orange' } }}
        >
          <Typography variant={isMobile ? 'subtitle2' : isTablet ? 'subtitle1' : 'body1'}>
            Add Appointment
          </Typography>
        </Button>
        <Button
          variant='contained'
          startIcon={<PlusIcon size={20} />}
          sx={{ backgroundColor: '#0E1680', ':hover': { backgroundColor: 'orange' } }}
        >
          <Typography variant={isMobile ? 'subtitle2' : isTablet ? 'subtitle1' : 'body1'}>
            Add Doctor
          </Typography>
        </Button>
      </Box>
    </Stack>
  );
}

export default StaffFilter;
