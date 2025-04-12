import React, { useEffect, useState } from 'react';
import {
  Stack,
  Button,
  TextField,
  InputAdornment,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Autocomplete
} from '@mui/material';
import { FilterIcon, PlusIcon, SearchIcon } from 'lucide-react';
import AdvancedFilter from 'src/components/advanced-filter/advanced-filter';
import { useResponsive } from 'src/utils/use-responsive';
import { useDialog } from '@hooks';
import AdvancedFilterDialog from 'src/components/advanced-filter/advanced-filter-dialog';
import { defaultStaffFilters, departments, roles, sexes, statuses } from 'src/constants/staff';
import StaffDialog from './staff-dialog';

function StaffFilter({ filters, setFilters, search, setSearch, refetch }: any) {
  const { isTablet, isMobile } = useResponsive();
  const advancedFilterDialog = useDialog();
  const addDialog = useDialog();
  const [filterStates, setFilterStates] = useState<any>(filters);
  useEffect(() => console.log(filterStates), [filterStates]);

  return isMobile ? (
    <Stack direction={'column'} spacing={2} marginBottom={2}>
      <StaffDialog type='add' dialog={addDialog} refetch={refetch} />
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
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value);
        }}
      />
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <Box display='flex' alignItems='center' gap={2}>
          <Button
            variant='outlined'
            onClick={advancedFilterDialog.handleOpen}
            endIcon={<FilterIcon size={16} />}
          >
            Filter
          </Button>
          <Dialog
            open={advancedFilterDialog.open}
            onClose={advancedFilterDialog.handleClose}
            maxWidth='sm'
            fullWidth
          >
            <DialogTitle>Filter</DialogTitle>
            <DialogContent>
              <div className='w-full grid grid-cols-2 gap-3'>
                <FormControl variant='filled' size='small' className='w-full !mt-2'>
                  <InputLabel id='status-select-label'>Status</InputLabel>
                  <Select
                    labelId='status-select-label'
                    value={filterStates.status ? filterStates.status : 'ALL'}
                    onChange={(event: any) =>
                      setFilterStates({
                        ...filterStates,
                        status: event.target.value !== 'ALL' ? event.target.value : ''
                      })
                    }
                    label='Status'
                  >
                    <MenuItem value='ALL'>ALL</MenuItem>
                    {statuses.map((item: string) => (
                      <MenuItem value={item} key={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl variant='filled' size='small' className='w-full !mt-2'>
                  <InputLabel id='role-select-label'>Role</InputLabel>
                  <Select
                    labelId='role-select-label'
                    value={filterStates.role ? filterStates.role : 'ALL'}
                    onChange={(event: any) =>
                      setFilterStates({
                        ...filterStates,
                        role: event.target.value !== 'ALL' ? event.target.value : ''
                      })
                    }
                    label='role'
                  >
                    <MenuItem value='ALL'>ALL</MenuItem>
                    {roles.map((item: string) => (
                      <MenuItem value={item} key={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl variant='filled' size='small' className='w-full !mt-2'>
                  <InputLabel id='sex-select-label'>Sex</InputLabel>
                  <Select
                    labelId='sex-select-label'
                    value={filterStates.sex ? filterStates.sex : 'ALL'}
                    onChange={(event: any) =>
                      setFilterStates({
                        ...filterStates,
                        sex: event.target.value !== 'ALL' ? event.target.value : ''
                      })
                    }
                    label='Sex'
                  >
                    <MenuItem value='ALL'>ALL</MenuItem>
                    {sexes.map((item: string) => (
                      <MenuItem value={item} key={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl variant='filled' size='small' className='w-full !mt-2'>
                  <Autocomplete
                    options={departments}
                    renderInput={(params) => <TextField {...params} label='Department' />}
                    value={filterStates.department}
                    onChange={(_, newValue) =>
                      setFilterStates({
                        ...filterStates,
                        department: newValue ?? ''
                      })
                    }
                  />
                </FormControl>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setFilters(defaultStaffFilters);
                  setFilterStates(defaultStaffFilters);
                  advancedFilterDialog.handleClose();
                }}
                color='secondary'
              >
                Remove filter
              </Button>
              <Button
                onClick={() => {
                  setFilters(filterStates);
                  advancedFilterDialog.handleClose();
                }}
                color='primary'
              >
                Apply
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
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
          onClick={addDialog.handleOpen}
        >
          <Typography variant={isMobile ? 'subtitle2' : isTablet ? 'subtitle1' : 'body1'}>
            Add Doctor
          </Typography>
        </Button>
      </Box>
    </Stack>
  ) : (
    <Stack my={2} direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={1}>
      <StaffDialog type='add' dialog={addDialog} refetch={refetch} />
      <Box display='flex' alignItems='center' gap={2}>
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
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
          }}
        />
        <Button
          variant='outlined'
          onClick={advancedFilterDialog.handleOpen}
          endIcon={<FilterIcon size={16} />}
        >
          Filter
        </Button>
        <Dialog
          open={advancedFilterDialog.open}
          onClose={advancedFilterDialog.handleClose}
          maxWidth='sm'
          fullWidth
        >
          <DialogTitle>Filter</DialogTitle>
          <DialogContent>
            <div className='w-full grid grid-cols-2 gap-3'>
              <FormControl variant='filled' size='small' className='w-full !mt-2'>
                <InputLabel id='status-select-label'>Status</InputLabel>
                <Select
                  labelId='status-select-label'
                  value={filterStates.status ? filterStates.status : 'ALL'}
                  onChange={(event: any) =>
                    setFilterStates({
                      ...filterStates,
                      status: event.target.value !== 'ALL' ? event.target.value : ''
                    })
                  }
                  label='Status'
                >
                  <MenuItem value='ALL'>ALL</MenuItem>
                  {statuses.map((item: string) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant='filled' size='small' className='w-full !mt-2'>
                <InputLabel id='role-select-label'>Role</InputLabel>
                <Select
                  labelId='role-select-label'
                  value={filterStates.role ? filterStates.role : 'ALL'}
                  onChange={(event: any) =>
                    setFilterStates({
                      ...filterStates,
                      role: event.target.value !== 'ALL' ? event.target.value : ''
                    })
                  }
                  label='role'
                >
                  <MenuItem value='ALL'>ALL</MenuItem>
                  {roles.map((item: string) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant='filled' size='small' className='w-full !mt-2'>
                <InputLabel id='sex-select-label'>Sex</InputLabel>
                <Select
                  labelId='sex-select-label'
                  value={filterStates.sex ? filterStates.sex : 'ALL'}
                  onChange={(event: any) =>
                    setFilterStates({
                      ...filterStates,
                      sex: event.target.value !== 'ALL' ? event.target.value : ''
                    })
                  }
                  label='Sex'
                >
                  <MenuItem value='ALL'>ALL</MenuItem>
                  {sexes.map((item: string) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant='filled' size='small' className='w-full !mt-2'>
                <Autocomplete
                  options={departments}
                  renderInput={(params) => <TextField {...params} label='Department' />}
                  value={filterStates.department}
                  onChange={(_, newValue) =>
                    setFilterStates({
                      ...filterStates,
                      department: newValue ?? ''
                    })
                  }
                />
              </FormControl>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setFilters(defaultStaffFilters);
                setFilterStates(defaultStaffFilters);
                advancedFilterDialog.handleClose();
              }}
              color='secondary'
            >
              Remove filter
            </Button>
            <Button
              onClick={() => {
                setFilters(filterStates);
                advancedFilterDialog.handleClose();
              }}
              color='primary'
            >
              Apply
            </Button>
          </DialogActions>
        </Dialog>
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
          onClick={addDialog.handleOpen}
        >
          <Typography variant={isMobile ? 'subtitle2' : isTablet ? 'subtitle1' : 'body1'}>
            Add Staff
          </Typography>
        </Button>
      </Box>
    </Stack>
  );
}

export default StaffFilter;
