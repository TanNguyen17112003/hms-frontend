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
import { VaccinationRequest } from 'src/api/medical-record';

interface VaccinationDialogProps extends DialogProps {
  onConfirm: (values: VaccinationRequest) => Promise<void>;
}

function VaccinationDialog({ onConfirm, ...DialogProps }: VaccinationDialogProps) {
  const formik = useFormik<VaccinationRequest>({
    initialValues: {
      name: '',
      date: new Date().toISOString(),
      notes: ''
    },
    onSubmit: async (values) => {
      await handleSubmitOrderHelper.call(values);
    }
  });

  const handleSubmitOrder = useCallback(
    async (values: VaccinationRequest) => {
      await onConfirm(values);
    },
    [onConfirm]
  );

  const handleSubmitOrderHelper = useFunction(handleSubmitOrder, {
    successMessage: 'Vaccination added successfully!'
  });

  return (
    <Dialog fullWidth maxWidth='md' {...DialogProps}>
      <DialogTitle>
        <Typography variant='h6'>Add Vaccination</Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <AddPatientTextField
            type='text'
            title='Name'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.name}
            name='name'
            placeholder='Enter vaccination name'
          />
          <AddPatientTextField
            type='dateTime'
            title='Date'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.date}
            name='date'
            placeholder='Enter vaccination date'
          />
          <AddPatientTextField
            type='text'
            title='Notes'
            lg={12}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.notes}
            name='notes'
            placeholder='Enter notes'
          />
        </Grid>
      </DialogContent>
      <DialogActions className='flex justify-center'>
        <Button
          variant='contained'
          color='inherit'
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

export default VaccinationDialog;
