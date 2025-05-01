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
import { FamilyHistoryRequest } from 'src/api/medical-record';

interface FamilyHistoryDialogProps extends DialogProps {
  onConfirm: (values: FamilyHistoryRequest) => Promise<void>;
}

function FamilyHistoryDialog({ onConfirm, ...DialogProps }: FamilyHistoryDialogProps) {
  const formik = useFormik<FamilyHistoryRequest>({
    initialValues: {
      relative: '',
      condition: '',
      notes: ''
    },
    onSubmit: async (values) => {
      await handleSubmitOrderHelper.call(values);
    }
  });

  const handleSubmitOrder = useCallback(
    async (values: FamilyHistoryRequest) => {
      await onConfirm(values);
    },
    [onConfirm]
  );

  const handleSubmitOrderHelper = useFunction(handleSubmitOrder, {
    successMessage: 'Family history added successfully!'
  });

  return (
    <Dialog fullWidth maxWidth='md' {...DialogProps}>
      <DialogTitle>
        <Typography variant='h6'>Add Family History</Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <AddPatientTextField
            type='text'
            title='Relative'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.relative}
            name='relative'
            placeholder="Enter relative's name"
          />
          <AddPatientTextField
            type='text'
            title='Condition'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.condition}
            name='condition'
            placeholder='Enter condition'
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

export default FamilyHistoryDialog;
