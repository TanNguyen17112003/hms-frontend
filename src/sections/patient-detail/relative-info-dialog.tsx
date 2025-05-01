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
import { PatientRelativeRequest } from 'src/api/medical-record';

interface RelativeInfoDialogProps extends DialogProps {
  onConfirm: (values: PatientRelativeRequest) => Promise<void>;
}

function RelativeInfoDialog({ onConfirm, ...DialogProps }: RelativeInfoDialogProps) {
  const formik = useFormik<PatientRelativeRequest>({
    initialValues: {
      fullName: '',
      relationship: '',
      phoneNumber: ''
    },
    onSubmit: async (values) => {
      await handleSubmitOrderHelper.call(values);
    }
  });

  const handleSubmitOrder = useCallback(
    async (values: PatientRelativeRequest) => {
      await onConfirm(values);
    },
    [onConfirm]
  );

  const handleSubmitOrderHelper = useFunction(handleSubmitOrder, {
    successMessage: 'Relative information added successfully!'
  });

  return (
    <Dialog fullWidth maxWidth='md' {...DialogProps}>
      <DialogTitle>
        <Typography variant='h6'>Add Relative Information</Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <AddPatientTextField
            type='text'
            title='Full Name'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.fullName}
            name='fullName'
            placeholder="Enter relative's full name"
          />
          <AddPatientTextField
            type='text'
            title='Relationship'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.relationship}
            name='relationship'
            placeholder='Enter relationship'
          />
          <AddPatientTextField
            type='text'
            title='Phone Number'
            lg={12}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
            name='phoneNumber'
            placeholder='Enter phone number'
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

export default RelativeInfoDialog;
