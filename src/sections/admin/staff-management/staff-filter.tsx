import React from 'react';
import { Stack, Button, TextField, InputAdornment, Box, ButtonGroup } from '@mui/material';
import { PlusIcon, SearchIcon } from 'lucide-react';
import AdvancedFilter from 'src/components/advanced-filter/advanced-filter';

function StaffFilter() {
  return (
    <Stack my={2} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
      <Box display='flex' alignItems='center' gap={1}>
        <TextField
          variant='outlined'
          placeholder='Enter the doctor name'
          sx={{ borderRadius: 5, px: 2 }}
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
          Add Appointment
        </Button>
        <Button
          variant='contained'
          startIcon={<PlusIcon size={20} />}
          sx={{ backgroundColor: '#0E1680', ':hover': { backgroundColor: 'orange' } }}
        >
          Add Doctor
        </Button>
      </Box>
    </Stack>
  );
}

export default StaffFilter;
