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

export const COMMON_DISEASES = [
  { value: 'Hypertension', label: 'Hypertension' },
  { value: 'Diabetes', label: 'Diabetes' },
  { value: 'Asthma', label: 'Asthma' },
  { value: 'Heart Disease', label: 'Heart Disease' },
  { value: 'Cancer', label: 'Cancer' }
];
interface AddPatientFormProps {
  name: string;
  ssn: string;
  email: string;
  phone: string;
  date: string;
  diseases: string;
  address: string;
  nationality: string;
  occupation: string;
  sex: 'Male' | 'Female' | undefined;
  maritalStatus: 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'WIDOWED' | undefined;
}

interface AddPatientDialogProps extends DialogProps {
  type?: 'add' | 'edit';
}

function AddPatientDialog({ type = 'add', ...DialogProps }: AddPatientDialogProps) {
  const formik = useFormik<AddPatientFormProps>({
    initialValues: {
      name: '',
      ssn: '',
      email: '',
      phone: '',
      date: '',
      diseases: '',
      address: '',
      nationality: '',
      occupation: '',
      sex: undefined,
      maritalStatus: undefined
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
            value={formik.values.name}
            name='name'
            placeholder='Enter full name'
          />
          <AddPatientTextField
            type='text'
            title='SSN'
            lg={4}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.ssn}
            name='ssn'
            placeholder='Enter SSN'
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
                  defaultValue={formik.values.sex}
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
            title='Email'
            lg={4}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.email}
            name='email'
            placeholder='Enter email'
          />
          <AddPatientTextField
            type='text'
            title='Phone Number'
            lg={4}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.phone}
            name='phone'
            placeholder='Enter phone number'
          />
          <AddPatientTextField
            type='text'
            title='Address'
            lg={4}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.address}
            name='address'
            placeholder='Enter address'
          />
          <AddPatientTextField
            type='text'
            title='Occupation'
            lg={4}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.occupation}
            name='occupation'
            placeholder='Enter occupation'
          />
          <PatientFormField title='Marital Status' lg={4} xs={12}>
            <Select
              labelId='select-marital-status'
              value={formik.values.maritalStatus}
              onChange={formik.handleChange}
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
            value={formik.values.nationality}
            name='nationality'
            placeholder='Enter nationality'
          />
          {/* <AddPatientTextField
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
          /> */}
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
