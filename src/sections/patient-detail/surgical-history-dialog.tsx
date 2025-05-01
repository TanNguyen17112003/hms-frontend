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
import { SurgicalHistoryRequest } from 'src/api/medical-record';

interface SurgicalHistoryDialogProps extends DialogProps {
  onConfirm: (values: SurgicalHistoryRequest) => Promise<void>;
}

function SurgicalHistoryDialog({ onConfirm, ...DialogProps }: SurgicalHistoryDialogProps) {
  const formik = useFormik<SurgicalHistoryRequest>({
    initialValues: {
      name: '',
      notes: '',
      year: new Date().getFullYear()
    },
    onSubmit: async (values) => {
      await handleSubmitOrderHelper.call(values);
    }
  });
  const handleSubmitOrder = useCallback(async (values: SurgicalHistoryRequest) => {
    await onConfirm(values);
  }, []);

  const handleSubmitOrderHelper = useFunction(handleSubmitOrder, {
    successMessage: 'Add surgical history successfully!'
  });

  return (
    <Dialog fullWidth maxWidth='md' {...DialogProps}>
      <DialogTitle>
        <Typography variant='h6'>Add Surgical History</Typography>
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
            title='notes'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.notes}
            name='notes'
            placeholder='Enter notes'
          />
          <AddPatientTextField
            type='number'
            title='Year'
            lg={12}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.year}
            name='year'
            placeholder='Enter year'
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
export default SurgicalHistoryDialog;
