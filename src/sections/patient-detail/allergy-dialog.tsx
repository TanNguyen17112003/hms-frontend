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
import { AllergyRequest } from 'src/api/medical-record';

interface AllergyDialogProps extends DialogProps {
  onConfirm: (values: AllergyRequest) => Promise<void>;
}

function AllergyDialog({ onConfirm, ...DialogProps }: AllergyDialogProps) {
  const formik = useFormik<AllergyRequest>({
    initialValues: {
      allergen: '',
      severity: '',
      notes: ''
    },
    onSubmit: async (values) => {
      await handleSubmitOrderHelper.call(values);
    }
  });

  const handleSubmitOrder = useCallback(
    async (values: AllergyRequest) => {
      await onConfirm(values);
    },
    [onConfirm]
  );

  const handleSubmitOrderHelper = useFunction(handleSubmitOrder, {
    successMessage: 'Allergy added successfully!'
  });

  return (
    <Dialog fullWidth maxWidth='md' {...DialogProps}>
      <DialogTitle>
        <Typography variant='h6'>Add Allergy</Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <AddPatientTextField
            type='text'
            title='Allergen'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.allergen}
            name='allergen'
            placeholder='Enter allergen'
          />
          <AddPatientTextField
            type='text'
            title='Severity'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.severity}
            name='severity'
            placeholder='Enter severity'
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

export default AllergyDialog;
