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
import { MedicalHistoryRequest } from 'src/api/medical-record';

interface MedicationDialogProps extends DialogProps {
  onConfirm: (values: MedicalHistoryRequest) => Promise<void>;
}

function MedicationDialog({ onConfirm, ...DialogProps }: MedicationDialogProps) {
  const formik = useFormik<MedicalHistoryRequest>({
    initialValues: {
      name: '',
      dosage: '',
      frequency: '',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      notes: ''
    },
    onSubmit: async (values) => {
      await handleSubmitOrderHelper.call(values);
    }
  });
  const handleSubmitOrder = useCallback(async (values: MedicalHistoryRequest) => {
    await onConfirm(values);
  }, []);

  const handleSubmitOrderHelper = useFunction(handleSubmitOrder, {
    successMessage: 'Add patient successfully!'
  });

  return (
    <Dialog fullWidth maxWidth='md' {...DialogProps}>
      <DialogTitle>
        <Typography variant='h6'>Add Medication</Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <AddPatientTextField
            type='text'
            title='name'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.name}
            name='name'
            placeholder='Enter name'
          />
          <AddPatientTextField
            type='text'
            title='dosage'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.dosage}
            name='dosage'
            placeholder='Enter dosage'
          />
          <AddPatientTextField
            type='text'
            title='Frequency'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.frequency}
            name='frequency'
            placeholder='Enter frequency'
          />
          <AddPatientTextField
            type='text'
            title='Notes'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.notes}
            name='notes'
            placeholder='Enter notes'
          />
          <AddPatientTextField
            type='dateTime'
            title='Start Date'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.startDate}
            name='startDate'
            placeholder='Enter start date'
          />
          <AddPatientTextField
            type='dateTime'
            title='End Date'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.endDate}
            name='endDate'
            placeholder='Enter end date'
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
export default MedicationDialog;
