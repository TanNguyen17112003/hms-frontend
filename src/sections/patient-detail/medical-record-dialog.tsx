import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  Grid,
  MenuItem,
  Select,
  Typography
} from '@mui/material';
import { AddPatientTextField } from '../staff/patient-management/add-patient-text-field';
import { useFormik } from 'formik';
import useFunction from 'src/hooks/use-function';
import { useCallback, useEffect, useMemo } from 'react';
import { MedicalRecordRequest } from 'src/api/medical-record';
import { StaffManagementApi } from 'src/api/staff-management';

interface MedicalRecordDialogProps extends DialogProps {
  onConfirm: (values: MedicalRecordRequest) => Promise<void>;
}

function MedicalRecordDialog({ onConfirm, ...DialogProps }: MedicalRecordDialogProps) {
  const formik = useFormik<MedicalRecordRequest>({
    initialValues: {
      symptoms: '',
      diagnoses: '',
      treatments: '',
      notes: '',
      doctorId: ''
    },
    onSubmit: async (values) => {
      await handleSubmitOrderHelper.call(values);
    }
  });

  const getStaffsApi = useFunction(StaffManagementApi.getStaffs);

  const staffs = useMemo(() => {
    return getStaffsApi.data?.content || [];
  }, [getStaffsApi.data]);

  const handleSubmitOrder = useCallback(
    async (values: MedicalRecordRequest) => {
      await onConfirm(values);
    },
    [onConfirm]
  );

  const handleSubmitOrderHelper = useFunction(handleSubmitOrder, {
    successMessage: 'Medical record added successfully!'
  });

  useEffect(() => {
    getStaffsApi.call({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog fullWidth maxWidth='md' {...DialogProps}>
      <DialogTitle>
        <Typography variant='h6'>Add Medical Record</Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <AddPatientTextField
            type='text'
            title='Symptoms'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.symptoms}
            name='symptoms'
            placeholder='Enter symptoms'
          />
          <AddPatientTextField
            type='text'
            title='Diagnoses'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.diagnoses}
            name='diagnoses'
            placeholder='Enter diagnoses'
          />
          <AddPatientTextField
            type='text'
            title='Treatments'
            lg={6}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.treatments}
            name='treatments'
            placeholder='Enter treatments'
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
          {/* <AddPatientTextField
            type="text"
            title="Doctor ID"
            lg={12}
            xs={12}
            onChange={formik.handleChange}
            value={formik.values.doctorId}
            name="doctorId"
            placeholder="Enter doctor ID"
          /> */}
          <Grid item xs={12} lg={12}>
            <Select
              native
              fullWidth
              value={formik.values.doctorId}
              onChange={formik.handleChange}
              name='doctorId'
              inputProps={{
                id: 'doctorId'
              }}
            >
              {staffs.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {`${staff.fullName}`}
                </option>
              ))}
            </Select>
          </Grid>
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

export default MedicalRecordDialog;
