import React, { useEffect, useMemo } from 'react';
import AccountBasicInfo from './account-basic-info';
import AccountPassword from './account-password';
import { Box, CircularProgress, Grid, Paper, Stack } from '@mui/material';
import AccountAvailableTime from './account-available-time';
import AccountBioInfo from './account-bio-info';
import { UsersApi } from 'src/api/user';
import { StaffDetail } from 'src/types/user';
import useFunction from 'src/hooks/use-function';

function StaffAccount() {
  const getStaffProfile = useFunction(UsersApi.getStaffProfile);
  const staff = useMemo(() => getStaffProfile.data as StaffDetail, [getStaffProfile.data]);

  useEffect(() => {
    getStaffProfile.call({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (getStaffProfile.loading || !staff) {
    // Show a loading spinner while fetching data
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          zIndex: 9999
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      <AccountBasicInfo staff={staff} />
      <Grid container spacing={1} alignItems='stretch' justifyContent='center'>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <AccountAvailableTime />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <AccountBioInfo staff={staff} />
          </Paper>
        </Grid>
      </Grid>
      <AccountPassword />
    </Stack>
  );
}

export default StaffAccount;
