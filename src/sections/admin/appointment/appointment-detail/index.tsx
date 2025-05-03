import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Grid, Stack } from '@mui/material';
import { useResponsive } from 'src/utils/use-responsive';
import AppointmentDetailHeader from './appointment-detail-header';
import AppointmentDetailPatient from './appointment-detail-patient';
import AppointmentDetailInfo from './appointment-detail-info';
import AppointmentDetailDoctor from './appointment-detail-doctor';
import { Ban, Plus } from 'lucide-react';
import { AppointmentDetailConfig } from '../appointment-management-table-config';
import { AppointmentApi } from 'src/api/appointment';
import useFunction from 'src/hooks/use-function';
import { MedicalRecordsApi } from 'src/api/medical-record';
import { StaffDetail, UserDetail } from 'src/types/user';
import ApproveAppointmentDialog from '../appointment-approve-dialog';
import DeclineAppointmentDialog from '../appointment-decline-dialog';
import AppointmentAssignDialog from '../appointment-assign-dialog';
import { useDialog } from '@hooks';
import { useAppointmentContext } from 'src/contexts/appointment/appointment-context';
import { Appointment, AppointmentDetail as Detail } from 'src/types/appointment';
import { LoadingProcess } from '@components';

function AppointmentDetail() {
  const router = useRouter();
  const { rejectAppointment } = useAppointmentContext();
  const getAppointmentApi = useFunction(AppointmentApi.getAppointment);
  const getPatientBySSNApi = useFunction(MedicalRecordsApi.getPatientBySSN);
  const rejectDialog = useDialog<AppointmentDetailConfig>();
  const approveDialog = useDialog<Detail>();
  const assignDialog = useDialog<AppointmentDetailConfig>();

  const rejectAppointmentHelper = useFunction(rejectAppointment);

  const filteredAppointment = useMemo(() => {
    return getAppointmentApi.data || null;
  }, [getAppointmentApi.data]);

  const doctor = useMemo(() => {
    return getAppointmentApi.data?.doctor || null;
  }, [filteredAppointment]);

  const patient = useMemo(() => {
    return getPatientBySSNApi.data || null;
  }, [getPatientBySSNApi.data]);

  const { isMobile, isTablet, isDesktop } = useResponsive();

  useEffect(() => {
    getAppointmentApi.call(router.query.appointmentId as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.appointmentId]);

  useEffect(() => {
    if (filteredAppointment) {
      getPatientBySSNApi.call(filteredAppointment.patientSsn);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredAppointment]);
  return (
    <Stack direction={'column'} spacing={2}>
      <Box
        display={'flex'}
        flexDirection={isMobile ? 'column' : 'row'}
        alignItems={!isMobile ? 'center' : ''}
        justifyContent={!isMobile ? 'space-between' : ''}
        gap={2}
      >
        <AppointmentDetailHeader patientName={filteredAppointment?.doctor?.fullName as string} />
        {filteredAppointment?.status === 'PENDING' && (
          <Stack direction={'row'} spacing={1.5} alignItems={'center'}>
            <Button
              variant='outlined'
              startIcon={<Ban size={16} />}
              color='inherit'
              onClick={() => rejectDialog.handleOpen(filteredAppointment)}
            >
              Decline
            </Button>
            <Button
              sx={{
                backgroundColor: 'hsl(var(--background-button))',
                ':hover': { backgroundColor: 'orange' }
              }}
              variant='contained'
              startIcon={<Plus size={16} />}
              onClick={() => approveDialog.handleOpen(filteredAppointment)}
            >
              Approve
            </Button>
          </Stack>
        )}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <AppointmentDetailPatient patient={patient as UserDetail} />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppointmentDetailDoctor doctor={doctor as StaffDetail} />
        </Grid>
        <Grid item xs={12}>
          <AppointmentDetailInfo appointment={filteredAppointment as AppointmentDetailConfig} />
        </Grid>
      </Grid>
      <ApproveAppointmentDialog
        open={approveDialog.open}
        onClose={approveDialog.handleClose}
        appointment={filteredAppointment as Appointment}
        onConfirm={() => assignDialog.handleOpen(approveDialog?.data as AppointmentDetailConfig)}
      />
      <DeclineAppointmentDialog
        open={rejectDialog.open}
        onClose={rejectDialog.handleClose}
        appointment={rejectDialog.data as AppointmentDetailConfig}
        onConfirm={async () => {
          await rejectAppointmentHelper.call(rejectDialog?.data?.id as string);
        }}
      />
      <AppointmentAssignDialog
        open={assignDialog.open}
        onClose={assignDialog.handleClose}
        appointment={assignDialog.data as AppointmentDetailConfig}
      />
      {(getAppointmentApi.loading ||
        getPatientBySSNApi.loading ||
        rejectAppointmentHelper.loading) && <LoadingProcess />}
    </Stack>
  );
}

export default AppointmentDetail;
