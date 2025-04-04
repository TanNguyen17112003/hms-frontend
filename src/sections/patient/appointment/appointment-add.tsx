import React from 'react';
import { AppointmentForm } from './appointment-form';
import { Box } from '@mui/material';
import { useFormik, FormikProps } from 'formik';
import { AppointmentFormProps, initialAppointmentFormValues } from 'src/types/appointment';


interface NeededProps {
  formik: FormikProps<AppointmentFormProps>;
  isLoading?: boolean;
}

const AppointmentAdd:React.FC<NeededProps> = ({formik, isLoading}) => {
  return (
    <Box>
      <AppointmentForm formik={formik} status/>
    </Box>
  )
}

export default AppointmentAdd