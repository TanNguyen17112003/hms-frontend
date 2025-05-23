import { Grid, Typography } from '@mui/material';
import { type FC, PropsWithChildren } from 'react';

interface AppointmentFormFieldProps {
  title: string;
  lg: number;
  xs: number;
}

export const AppointmentFormField: FC<AppointmentFormFieldProps & PropsWithChildren> = ({
  title,
  children,
  xs,
  lg
}) => {
  return (
    <Grid item xs={xs} lg={lg}>
      <Typography
        sx={{
          fontSize: '0.75rem',
          lineHeight: '20px',
          fontWeight: 500,
          textTransform: 'uppercase',
          marginBottom: '8px'
        }}
      >
        {title}
      </Typography>
      {children}
    </Grid>
  );
};
