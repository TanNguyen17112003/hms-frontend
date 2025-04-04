import React, { useState } from 'react';
import {
  Box,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { FormikProps } from 'formik';
import { AppointmentFormTextField } from './appointment-form-text-field';
import { FileDropzone, File } from '@components';
import { AppointmentFormProps } from 'src/types/appointment';

interface AppointmentFormAttributes {
  formik: FormikProps<AppointmentFormProps>;
  title?: string;
  status: boolean;
}

export const AppointmentForm: React.FC<AppointmentFormAttributes> = ({ formik, title, status }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const handleRemove = (fileToRemove: File) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.path !== fileToRemove.path)
    );
  };

  const handleRemoveAll = () => {
    setUploadedFiles([]);
  };

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
            type='dateTime'
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
            value={formik.values.timeSlot as unknown as string}
            name={'timeSlot'}
          />
          <AppointmentFormTextField
            type='text'
            title={'Reason'}
            xs={12}
            lg={12}
            onChange={formik.handleChange}
            placeholder='Enter reason'
            value={formik.values.reason as string}
            name={'reason'}
            isMultiLine
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
                type='single'
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};