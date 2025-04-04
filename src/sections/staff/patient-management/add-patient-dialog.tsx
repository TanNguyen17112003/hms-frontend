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
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import { AddPatientTextField } from './add-patient-text-field';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import useFunction from 'src/hooks/use-function';
import { useCallback } from 'react';

export const COMMON_DISEASES = [
  { value: 'Hypertension', label: 'Hypertension' },
  { value: 'Diabetes', label: 'Diabetes' },
  { value: 'Asthma', label: 'Asthma' },
  { value: 'Heart Disease', label: 'Heart Disease' },
  { value: 'Cancer', label: 'Cancer' }
];
interface AddPatientFormProps {
  name: string;
  email: string;
  phone: string;
  dob: string;
  ssn: string;
  nationality: string;
  occupation: string;
  address: string;
  sex: 'Male' | 'Female';
  maritalStatus: 'Single' | 'Married' | 'Widowed';
}

function AddPatientDialog({ ...DialogProps }: DialogProps) {
  const formik = useFormik<AddPatientFormProps>({
    initialValues: {
      name: '',
      email: '',
      ssn: '',
      phone: '',
      dob: '',
      sex: 'Female',
      nationality: '',
      occupation: '',
      address: '',
      maritalStatus: 'Single'
    },
    onSubmit: async (values) => {
      await handleSubmitOrderHelper.call(values);
    }
  });
  const handleSubmitOrder = useCallback(async (values: AddPatientFormProps) => {
    console.log(values);
  }, []);

  const handleSubmitOrderHelper = useFunction(handleSubmitOrder, {
    successMessage: 'Add patient successfully!'
  });

  return (
    <Dialog fullWidth maxWidth='md' {...DialogProps}>
      <DialogTitle>
        <Typography variant='h6'>Add New Patient</Typography>
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
            value={formik.values.name}
            name='name'
            placeholder='Enter full name'
          />
          <AddPatientTextField
            type='text'
            title='Email ID'
            lg={4}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.email}
            name='email'
            placeholder='Enter email id'
          />
          <AddPatientTextField
            type='text'
            title='SSN'
            lg={4}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.ssn}
            name='ssn'
            placeholder='Enter mobile number'
          />
          <AddPatientTextField
            type='dateTime'
            title='Date of Birth'
            lg={4}
            xs={6}
            onChange={formik.handleChange}
            value={formik.values.dob}
            name='date'
            placeholder='Enter date of birth'
          />
          <AddPatientTextField
            type='text'
            title='Nationality'
            lg={4}
            xs={6}
            onChange={formik.handleChange}
            value={formik.values.nationality}
            name='date'
            placeholder='Enter patient nationality'
          />
           <AddPatientTextField
            type='text'
            title='Phone Number'
            lg={4}
            xs={6}
            onChange={formik.handleChange}
            value={formik.values.nationality}
            name='date'
            placeholder='Enter patient phone number'
          />
            <AddPatientTextField
            type='text'
            title='Occupation'
            lg={4}
            xs={6}
            onChange={formik.handleChange}
            value={formik.values.nationality}
            name='date'
            placeholder='Enter patient occupation'
          />
          <Grid item xs={12} lg={6}>
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
                  defaultValue={'Female'}
                  value={formik.values.sex}
                  onChange={(e) => formik.setFieldValue('sex', e.target.value)}
                  row={true}
                >
                  <FormControlLabel value='Male' control={<Radio />} label='Male' />
                  <FormControlLabel value='Female' control={<Radio />} label='Female' />
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
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
                Marital Status
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby='demo-controlled-radio-buttons-group'
                  name='controlled-radio-buttons-group'
                  defaultValue={'Female'}
                  value={formik.values.maritalStatus}
                  onChange={(e) => formik.setFieldValue('maritalStatus', e.target.value)}
                  row={true}
                >
                  <FormControlLabel value='Single' control={<Radio />} label='Single' />
                  <FormControlLabel value='Married' control={<Radio />} label='Single' />
                  <FormControlLabel value='Widowed' control={<Radio />} label='Widowed' />
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
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
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default AddPatientDialog;
