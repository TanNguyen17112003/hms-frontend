import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import { AddPatientTextField } from '../staff/patient-management/add-patient-text-field';
import { useFormik } from 'formik';
import useFunction from 'src/hooks/use-function';
import { useCallback } from 'react';
import { MedicalInformationRequest } from 'src/api/medical-record';

interface EditMedicalInfoModalProps extends DialogProps {
  onConfirm: (values: MedicalInformationRequest) => Promise<void>;
}

function EditMedicalInfoModal({ onConfirm, ...DialogProps }: EditMedicalInfoModalProps) {
  const formik = useFormik<MedicalInformationRequest>({
    initialValues: {
      height: 0,
      weight: 0,
      bloodPressure: '',
      bloodType: ''
    },
    onSubmit: async (values) => {
      await handleSubmitOrderHelper.call(values);
    }
  });
  const handleSubmitOrder = useCallback(async (values: MedicalInformationRequest) => {
    await onConfirm(values);
  }, []);

  const handleSubmitOrderHelper = useFunction(handleSubmitOrder, {
    successMessage: 'Add patient successfully!'
  });

  return (
    <Dialog fullWidth maxWidth='md' {...DialogProps}>
      <DialogTitle>
        <Typography variant='h6'>Edit Patient Medical Info</Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <AddPatientTextField
            type='number'
            title='height'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.height}
            name='height'
            placeholder='Enter height'
          />
          <AddPatientTextField
            type='number'
            title='weight'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.weight}
            name='weight'
            placeholder='Enter weight'
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
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default EditMedicalInfoModal;
