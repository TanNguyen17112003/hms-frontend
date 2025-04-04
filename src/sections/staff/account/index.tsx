import React from 'react';
import AccountBasicInfo from './account-basic-info';
import AccountPassword from './account-password';
import AccountPicture from './account-picture';
import { Grid, Paper, Stack } from '@mui/material';
import { useAuth } from '@hooks';
import { UserDetail } from 'src/types/user';
import AccountAvailableTime from './account-available-time';
import AccountBioInfo from './account-bio-info';

function StaffAccount() {
  const { user } = useAuth();
  return (
    <Stack
      spacing={2}
    >
      <AccountPicture photoUrl={user?.photoUrl as string} />
      <AccountBasicInfo user={user as UserDetail} />
      <Grid container spacing={1} alignItems={'stretch'} justifyContent={"center"}>
        <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
          <AccountAvailableTime />
        </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
          <AccountBioInfo />
          </Paper>
        </Grid>
      </Grid>
      <AccountPassword />
    </Stack>
  )
}

export default StaffAccount;