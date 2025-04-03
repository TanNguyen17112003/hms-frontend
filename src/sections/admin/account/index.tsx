import React from 'react';
import AccountBasicInfo from './account-basic-info';
import AccountPassword from './account-password';
import AccountPicture from './account-picture';
import { Stack } from '@mui/material';
import { useAuth } from '@hooks';
import { UserDetail } from 'src/types/user';

function AdminAccount() {
  const { user } = useAuth();
  return (
    <Stack
      spacing={2}
    >
      <AccountPicture photoUrl={user?.photoUrl as string}/>
      <AccountBasicInfo user={user as UserDetail}/>
      <AccountPassword />
    </Stack>
  )
}

export default AdminAccount;