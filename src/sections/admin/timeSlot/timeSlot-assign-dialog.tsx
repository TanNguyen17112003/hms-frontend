import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';
import useFunction from 'src/hooks/use-function';
import { TimeSlot } from 'src/types/appointment';
import { StaffManagementApi } from 'src/api/staff-management';
import AutocompleteTextFieldMultiple from 'src/components/autocomplete-textfield-multiple';
import { useFormik } from 'formik';
import { CreateDoctorTimeSlotRequest, TimeSlotApi } from 'src/api/timeSlot';
import { useAuth } from '@hooks';
import { LoadingProcess } from '@components';

function TimeSlotAssignDialog({
  timeSlot,
  onConfirm,
  ...dialogProps
}: DialogProps & {
  timeSlot: TimeSlot;
  onConfirm?: () => Promise<void>;
}) {
  const { user } = useAuth();

  const handleAssign = useCallback(
    async (values: Pick<CreateDoctorTimeSlotRequest, 'doctorIds' | 'maxAppointments'>) => {
      try {
        await TimeSlotApi.createDoctorTimeSlot({
          ...values,
          timeSlotIds: [timeSlot?.id],
          doctorIds: values.doctorIds,
          maxAppointments: values.maxAppointments,
          assignedBy: user?.id || ''
        });
      } catch (error) {
        throw error;
      }
    },
    [timeSlot, user]
  );

  const handleAssignHelper = useFunction(handleAssign, {
    successMessage: 'Time slot assigned successfully!'
  });

  const formik = useFormik<Pick<CreateDoctorTimeSlotRequest, 'doctorIds' | 'maxAppointments'>>({
    initialValues: {
      maxAppointments: 1,
      doctorIds: []
    },
    onSubmit: (values) => {
      console.log('values', values);
      handleAssignHelper.call(values);
    }
  });
  const getStaffsApi = useFunction(StaffManagementApi.getStaffs);
  const staffs = useMemo(() => {
    return getStaffsApi.data?.content || [];
  }, [getStaffsApi.data]);

  const staffOptions = useMemo(() => {
    return staffs.map((staff) => {
      return {
        label: staff.fullName,
        value: staff.id
      };
    });
  }, [staffs]);

  useEffect(() => {
    getStaffsApi.call({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog fullWidth maxWidth='sm' {...dialogProps}>
      <DialogTitle>
        <Typography variant='h6'>Assign time slot to doctors</Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AutocompleteTextFieldMultiple
              options={staffOptions}
              value={formik.values.doctorIds.map((id) => ({
                value: id,
                label: id
              }))}
              onChange={(value) => {
                formik.setFieldValue(
                  'doctorIds',
                  value.map((item: any) => item.value)
                );
              }}
              TextFieldProps={{
                variant: 'outlined',
                placeholder: 'Select doctors'
              }}
              freeSolo
              isMultiple
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder='Enter max appointments per time slot for doctor'
              value={formik.values.maxAppointments}
              onChange={(e) => formik.setFieldValue('maxAppointments', e.target.value)}
              type='number'
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className='flex justify-center'>
        <Button
          variant='contained'
          color='inherit'
          onClick={(e) => {
            dialogProps.onClose?.(e, 'escapeKeyDown');
          }}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={(e) => {
            dialogProps.onClose?.(e, 'escapeKeyDown');
            formik.handleSubmit();
          }}
        >
          Confirm
        </Button>
      </DialogActions>
      {getStaffsApi.loading && <LoadingProcess />}
    </Dialog>
  );
}

export default TimeSlotAssignDialog;
