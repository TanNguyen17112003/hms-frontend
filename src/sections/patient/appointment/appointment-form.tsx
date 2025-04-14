import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Grid, MenuItem, Stack, Typography } from '@mui/material';
import { FormikProps } from 'formik';
import { AppointmentFormTextField } from './appointment-form-text-field';
import { FileDropzone, File } from '@components';
import { AppointmentFormProps } from 'src/types/appointment';
import { useAppointmentContext } from 'src/contexts/appointment/appointment-context';
import { AppointmentApi } from 'src/api/appointment';
import { TimeSlotApi } from 'src/api/timeSlot';
import { useAuth } from '@hooks';
import { extractDate, getWeekAndDay } from 'src/utils/format-time-currency';
import { LoadingProcess } from '@components';
import useAppSnackbar from 'src/hooks/use-app-snackbar';

interface AppointmentFormAttributes {
  formik: FormikProps<AppointmentFormProps>;
  title?: string;
  status: boolean;
}

interface TimeDetails {
  week: number;
  date: string;
}

interface TimeSlotLabel {
  value: string;
  label: string;
}

export const AppointmentForm: React.FC<AppointmentFormAttributes> = ({ formik, title, status }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [returnUrls, setReturnUrls] = useState<string[]>([]);
  const [timeDetail, setTimeDetail] = useState<TimeDetails | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlotLabel[]>([]);
  const { showSnackbarSuccess } = useAppSnackbar();
  const { user } = useAuth();

  const handleDrop = (acceptedFiles: File[]) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const handleRemove = (fileToRemove: File) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.path !== fileToRemove.path));
  };

  const handleCreateAppointment = useCallback(async () => {
    try {
      if (uploadedFiles.length === 0) {
        console.error('No files to upload.');
        return;
      }

      const responseUrls = await AppointmentApi.uploadMultipleFiles({
        files: uploadedFiles
      });

      if (responseUrls) {
        const response = await AppointmentApi.createAppointment({
          date: extractDate(formik.values.date as string),
          type: formik.values.type,
          notes: responseUrls.urls,
          timeSlotId: formik.values.timeSlotId,
          patientAccountId: user?.id as string,
          reason: formik.values.reason as string
        });
        if (response) {
          showSnackbarSuccess('Appointment created successfully!');
          formik.resetForm();
          setUploadedFiles([]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [uploadedFiles, formik.values, user?.id, showSnackbarSuccess]);

  const handleRemoveAll = () => {
    setUploadedFiles([]);
  };

  const handleUploadFiles = useCallback(async () => {
    try {
      const response = await AppointmentApi.uploadMultipleFiles({
        files: uploadedFiles
      });
      formik.setFieldValue('notes', response);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  }, [uploadedFiles]);

  useEffect(() => {
    const fetchTimeDetails = async () => {
      if (!formik.values.date) return;

      const calculatedTimeDetail = getWeekAndDay(formik.values.date as string);

      try {
        const returnedTimeSlots = await TimeSlotApi.getTimeSlots(
          calculatedTimeDetail.week,
          calculatedTimeDetail.date
        );

        const timeSlotsData = returnedTimeSlots.availableTimeSlots.map((option) => ({
          value: option.id,
          label: `${option.startTime} - ${option.endTime}`
        }));

        setTimeSlots(timeSlotsData);
      } catch (error) {
        console.error('Error fetching time slots:', error);
      }
    };

    fetchTimeDetails();
  }, [formik.values.date]);

  return (
    <Stack spacing={2}>
      {title && (
        <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      )}
      <Box>
        <Grid container spacing={2}>
          <AppointmentFormTextField
            type='date'
            title={'Date'}
            lg={6}
            xs={12}
            name={'date'}
            placeholder='Select date'
            onChange={formik.handleChange}
            value={formik.values.date as string}
          />
          <AppointmentFormTextField
            type='text'
            title={'Timeslot'}
            lg={6}
            select
            xs={12}
            onChange={formik.handleChange}
            placeholder='Select timeslot'
            value={formik.values.timeSlotId as unknown as string}
            name={'timeSlotId'}
          >
            {timeSlots.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </AppointmentFormTextField>
          <AppointmentFormTextField
            type='text'
            title={'Type'}
            lg={12}
            select
            xs={12}
            onChange={formik.handleChange}
            placeholder='Select type'
            value={formik.values.type as string}
            name={'type'}
          >
            {['FIRST_VISIT', 'FOLLOW_UP'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </AppointmentFormTextField>
          <AppointmentFormTextField
            type='text'
            title={'Reason'}
            xs={12}
            lg={12}
            onChange={formik.handleChange}
            placeholder='Enter reason'
            value={formik.values.reason as string}
            name={'reason'}
            isMultiple
          />
          <Grid item xs={12}>
            <Stack spacing={1}>
              <Typography variant='body2'>UPLOAD FILE FOR NOTE</Typography>
              <FileDropzone
                title='Click to upload or drag and drop'
                accept={{ '*/*': [] }}
                caption={'SVG, PNG, JPG or GIF (max. 800x400px)'}
                files={uploadedFiles}
                onDrop={handleDrop}
                onRemove={handleRemove}
                onRemoveAll={handleRemoveAll}
                type='multiple'
              />
            </Stack>
          </Grid>
        </Grid>
        <Button
          variant='contained'
          size='large'
          sx={{ mt: 2 }}
          fullWidth
          onClick={handleCreateAppointment}
        >
          Test upload
        </Button>
      </Box>
    </Stack>
  );
};
