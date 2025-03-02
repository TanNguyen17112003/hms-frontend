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
  date: string;
  diseases: string;
  governmentId: string;
  hospitalId: string;
  sex: 'Male' | 'Female';
}

function AddPatientDialog({ ...DialogProps }: DialogProps) {
  const formik = useFormik<AddPatientFormProps>({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      date: '',
      diseases: '',
      governmentId: '',
      hospitalId: '',
      sex: 'Female'
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
        <Typography variant='h6'>Add New Patients</Typography>
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
            title='Mobile Number'
            lg={4}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.phone}
            name='phone'
            placeholder='Enter mobile number'
          />
          <AddPatientTextField
            type='dateTime'
            title='Date of Birth'
            lg={4}
            xs={6}
            onChange={formik.handleChange}
            value={formik.values.date}
            name='date'
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
          <AddPatientTextField
            type='text'
            title='Government ID'
            lg={4}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.governmentId}
            name='governmentId'
            placeholder='Enter government id'
          />

          <AddPatientTextField
            type='text'
            title='Hospital ID'
            lg={4}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.hospitalId}
            name='hospitalId'
            placeholder='Enter hospital id'
          />
          <AddPatientTextField
            type='autoComplete'
            title='Diseases'
            lg={12}
            xs={12}
            options={COMMON_DISEASES}
            onChange={formik.handleChange}
            value={formik.values.diseases}
            name='diseases'
            placeholder='Enter diseases'
            isMultiple={true}
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
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default AddPatientDialog;
