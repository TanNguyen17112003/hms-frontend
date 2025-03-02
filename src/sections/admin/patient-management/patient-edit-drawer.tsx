import { ArrowBack } from '@mui/icons-material';
import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import { useMemo } from 'react';
import useFunction from 'src/hooks/use-function';
import { PatientData } from 'src/pages/admin/patient-management';

function PatientEditDrawer({
  open,
  onClose,
  patient,
  onSubmit
}: {
  open: boolean;
  onClose: () => void;
  patient?: PatientData;
  onSubmit: (data: PatientData) => void;
}) {
  const handleSubmitFile = async (values: PatientData) => {
    onSubmit(values);
  };
  const handleSubmitFileHelper = useFunction(handleSubmitFile, {
    successMessage: 'Cập nhật thông tin tài liệu thành công!'
  });

  const formik = useFormik<PatientData>({
    initialValues: patient || {
      id: '',
      name: '',
      email: '',
      date: new Date(),
      age: 0,
      diseases: '',
      status: 'Complicated',
      role: 'PATIENT',
      sex: 'Male',
      phoneNumber: '',
      address: '',
      dob: '',
      governmentId: '',
      hospitalId: ''
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await handleSubmitFileHelper.call(values);
        onClose();
      } catch {
        throw new Error('Edit patient failed');
      }
    }
  });

  const sexOptions = useMemo(() => {
    return [
      {
        value: 'Male',
        label: 'Male'
      },
      {
        value: 'Female',
        label: 'Female'
      }
    ];
  }, []);

  return (
    <Drawer
      anchor='right'
      open={open}
      PaperProps={{
        sx: {
          width: 600
        }
      }}
      onClose={onClose}
    >
      <form onSubmit={formik.handleSubmit}>
        <Paper elevation={5} sx={{ p: 3, borderRadius: 0 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}
          >
            <Box>
              <Box sx={{ cursor: 'pointer' }} onClick={onClose}>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  <ArrowBack
                    fontSize='small'
                    sx={{
                      verticalAlign: 'middle'
                    }}
                  />{' '}
                  Go back
                </Typography>
              </Box>
              <Typography variant='h6'>Edit Patient Information</Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center'
              }}
            >
              <Button color='inherit' variant='contained' onClick={onClose}>
                Cancel
              </Button>
              <Button variant='contained' color='primary' type='submit'>
                Save
              </Button>
            </Box>
          </Box>
        </Paper>
        <Stack spacing={3} padding={3}>
          <TextField
            fullWidth
            label='Full Name'
            variant='outlined'
            name='fullName'
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            label='Email'
            variant='outlined'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <FormControl fullWidth>
            <InputLabel>Sex</InputLabel>
            <Select label='sex' name='sex' value={formik.values.sex} onChange={formik.handleChange}>
              {sexOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label='Phone Number'
            variant='outlined'
            name='phoneNumber'
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            type='number'
          />
          <TextField
            fullWidth
            label='Address'
            variant='outlined'
            name='address'
            value={formik.values.address}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            label='Date of Birth'
            variant='outlined'
            name='dob'
            value={formik.values.dob}
            onChange={formik.handleChange}
            type='date'
          />
          <TextField
            fullWidth
            label='Government ID'
            variant='outlined'
            name='governmentId'
            value={formik.values.governmentId}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            label='Hospital ID'
            variant='outlined'
            name='hospitalId'
            value={formik.values.hospitalId}
            onChange={formik.handleChange}
          />
        </Stack>
      </form>
    </Drawer>
  );
}

export default PatientEditDrawer;
