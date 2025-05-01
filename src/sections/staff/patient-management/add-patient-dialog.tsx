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
import { MedicalRecordsApi } from 'src/api/medical-record';

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
  dateOfBirth: string;
  nationality: string;
  occupation: string;
  address: string;
  sex: 'MALE' | 'FEMALE';
  maritalStatus: 'SINGLE' | 'MARRIED' | 'WIDOWED';
  height: number;
  weight: number;
  bloodType: string;
  bloodPressure: string;
}

interface AddPatientDialogProps extends DialogProps {
  type?: 'add' | 'edit';
}

function AddPatientDialog({ type = 'add', ...DialogProps }: AddPatientDialogProps) {
  const getPatientsApi = useFunction(MedicalRecordsApi.getPatients);
  const formik = useFormik<AddPatientFormProps>({
    initialValues: {
      name: '',
      ssn: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      sex: 'FEMALE',
      nationality: '',
      occupation: '',
      address: '',
      maritalStatus: 'SINGLE',
      height: 0,
      weight: 0,
      bloodType: '',
      bloodPressure: ''
    },
    onSubmit: async (values) => {
      await handleSubmitPatientHelper.call(values);
    }
  });
  const handleSubmitPatient = useCallback(async (values: AddPatientFormProps) => {
    try {
      const newPatient = await MedicalRecordsApi.createPatient({
        patientInfo: {
          fullName: values.name,
          ssn: values.ssn,
          dateOfBirth: values.dateOfBirth,
          sex: values.sex,
          nationality: values.nationality,
          phoneNumber: values.phone,
          address: values.address,
          occupation: values.occupation,
          maritalStatus: values.maritalStatus
        },
        medicalInfo: {
          height: values.height,
          weight: values.weight,
          bloodType: values.bloodType,
          bloodPressure: values.bloodPressure
        }
      });
    } catch (error) {
      throw error;
    }
  }, []);

  const handleSubmitPatientHelper = useFunction(handleSubmitPatient, {
    successMessage: 'Add patient successfully!'
  });

  return (
    <Dialog fullWidth maxWidth='md' {...DialogProps}>
      <DialogTitle>
        <Typography variant='h6'>Add New Patient</Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      </DialogTitle>
      <DialogContent>
        <Typography fontWeight={'bold'} className='py-2'>
          Basic Information Of Patient
        </Typography>
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
            type='text'
            title='Phone number'
            lg={4}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.phone}
            name='phone'
            placeholder='Enter phone number'
          />
          <AddPatientTextField
            type='dateTime'
            title='Date of Birth'
            lg={4}
            xs={6}
            onChange={formik.handleChange}
            value={formik.values.dateOfBirth}
            name='dateOfBirth'
            placeholder='Enter date of birth'
          />
          <AddPatientTextField
            type='text'
            title='Nationality'
            lg={4}
            xs={6}
            onChange={formik.handleChange}
            value={formik.values.nationality}
            name='nationality'
            placeholder='Enter patient nationality'
          />
          <AddPatientTextField
            type='text'
            title='Address'
            lg={4}
            xs={6}
            onChange={formik.handleChange}
            value={formik.values.address}
            name='address'
            placeholder='Enter patient address'
          />
          <AddPatientTextField
            type='text'
            title='Occupation'
            lg={4}
            xs={6}
            onChange={formik.handleChange}
            value={formik.values.occupation}
            name='occupation'
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
                  defaultValue={'FEMALE'}
                  value={formik.values.maritalStatus}
                  onChange={(e) => formik.setFieldValue('maritalStatus', e.target.value)}
                  row={true}
                >
                  <FormControlLabel value='SINGLE' control={<Radio />} label='SINGLE' />
                  <FormControlLabel value='MARRIED' control={<Radio />} label='SINGLE' />
                  <FormControlLabel value='WIDOWED' control={<Radio />} label='WIDOWED' />
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <Typography fontWeight={'bold'} className='py-2'>
          Medical Information Of Patient
        </Typography>
        <Grid container spacing={2}>
          <AddPatientTextField
            type='number'
            title='Height'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.height}
            name='height'
            placeholder='Enter height'
          />
          <AddPatientTextField
            type='number'
            title='Weight'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.weight}
            name='weight'
            placeholder='Enter weight'
          />
          <AddPatientTextField
            type='text'
            title='Blood Type'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.bloodType}
            name='bloodType'
            placeholder='Enter blood type'
          />
          <AddPatientTextField
            type='text'
            title='Blood Pressure'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.bloodPressure}
            name='bloodPressure'
            placeholder='Enter blood pressure'
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
