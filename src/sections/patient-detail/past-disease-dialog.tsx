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
import { PastDiseaseRequest } from 'src/api/medical-record';

interface PastDiseaseDialogProps extends DialogProps {
  onConfirm: (values: PastDiseaseRequest) => Promise<void>;
}

function PastDiseaseDialog({ onConfirm, ...DialogProps }: PastDiseaseDialogProps) {
  const formik = useFormik<PastDiseaseRequest>({
    initialValues: {
      name: '',
      notes: ''
    },
    onSubmit: async (values) => {
      await handleSubmitPastDiseaseHelper.call(values);
    }
  });
  const handleSubmitPastDisease = useCallback(async (values: PastDiseaseRequest) => {
    await onConfirm(values);
  }, []);

  const handleSubmitPastDiseaseHelper = useFunction(handleSubmitPastDisease, {
    successMessage: 'Add past disease successfully!'
  });

  return (
    <Dialog fullWidth maxWidth='md' {...DialogProps}>
      <DialogTitle>
        <Typography variant='h6'>Add Past Disease</Typography>
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
export default PastDiseaseDialog;
