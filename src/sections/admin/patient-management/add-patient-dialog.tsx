import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography
} from '@mui/material';
import { AddPatientTextField } from './add-patient-text-field';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import useFunction from 'src/hooks/use-function';
import { useCallback } from 'react';
import { PatientFormField } from './add-patient-form-field';
import { UpdatePatientRequest } from 'src/api/medical-record';

interface AddPatientDialogProps extends DialogProps {
  type?: 'add' | 'edit';
  onConfirm: (values: UpdatePatientRequest) => Promise<void>;
}

function AddPatientDialog({ type = 'add', onConfirm, ...DialogProps }: AddPatientDialogProps) {
  const formik = useFormik<UpdatePatientRequest>({
    initialValues: {
      fullName: '',
      ssn: '',
      phoneNumber: '',
      dateOfBirth: '',
      address: '',
      nationality: '',
      occupation: '',
      sex: 'MALE',
      maritalStatus: ''
    },
    onSubmit: async (values) => {
      await handleSubmitPatientHelper.call(values);
    }
  });
  const handleSubmitPatient = useCallback(async (values: UpdatePatientRequest) => {
    await onConfirm(values);
  }, []);

  const handleSubmitPatientHelper = useFunction(handleSubmitPatient, {
    successMessage: 'Add patient successfully!'
  });

  return (
    <Dialog fullWidth maxWidth='md' {...DialogProps}>
      <DialogTitle>
        <Typography variant='h6'>
          {type === 'add' ? 'Add New Patient' : 'Edit Patient General Info'}
        </Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <AddPatientTextField
            type='text'
            title='Full Name'
            lg={12}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.fullName as string}
            name='fullName'
            placeholder='Enter full name'
          />
          <AddPatientTextField
            type='text'
            title='SSN'
            lg={4}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.ssn as string}
            name='ssn'
            placeholder='Enter SSN'
          />
          <AddPatientTextField
            type='dateTime'
            title='Date of Birth'
            lg={4}
            xs={6}
            onChange={formik.handleChange}
            value={formik.values.dateOfBirth as string}
            name='dateOfBirth'
            placeholder='Enter date of birth'
          />
          <Grid item xs={6} lg={4}>
            <Box className='bg-[#E5EBF1B2] rounded-lg h-full px-4 py-1'>
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  lineHeight: '20px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}
              >
                Sex
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby='demo-controlled-radio-buttons-group'
                  name='controlled-radio-buttons-group'
                  defaultValue={formik.values.sex}
                  value={formik.values.sex}
                  onChange={(e) => formik.setFieldValue('sex', e.target.value)}
                  row={true}
                >
                  <FormControlLabel value='MALE' control={<Radio />} label='MALE' />
                  <FormControlLabel value='FEMALE' control={<Radio />} label='FEMALE' />
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
          <AddPatientTextField
            type='text'
            title='Phone Number'
            lg={4}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.phoneNumber as string}
            name='phoneNumber'
            placeholder='Enter phone number'
          />
          <AddPatientTextField
            type='text'
            title='Address'
            lg={4}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.address as string}
            name='address'
            placeholder='Enter address'
          />
          <AddPatientTextField
            type='text'
            title='Occupation'
            lg={4}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.occupation as string}
            name='occupation'
            placeholder='Enter occupation'
          />
          <PatientFormField title='Marital Status' lg={4} xs={12}>
            <Select
              labelId='select-marital-status'
              value={formik.values.maritalStatus as string}
              onChange={(e) => formik.setFieldValue('maritalStatus', e.target.value)}
              variant='outlined'
              fullWidth
            >
              <MenuItem value='SINGLE'>SINGLE</MenuItem>
              <MenuItem value='MARRIED'>MARRIED</MenuItem>
              <MenuItem value='DIVORCED'>DIVORCED</MenuItem>
              <MenuItem value='WIDOWED'>WIDOWED</MenuItem>
            </Select>
          </PatientFormField>
          <AddPatientTextField
            type='text'
            title='Nationality'
            lg={4}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.nationality as string}
            name='nationality'
            placeholder='Enter nationality'
          />
        </Grid>
      </DialogContent>
      <DialogActions className='flex justify-center'>
        <Button
          variant='contained'
          color={'inherit'}
          onClick={(e) => {
            DialogProps.onClose?.(e, 'escapeKeyDown');
          }}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={(e) => {
            DialogProps.onClose?.(e, 'escapeKeyDown');
            formik.handleSubmit();
          }}
        >
          {type === 'add' ? 'Add' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default AddPatientDialog;
