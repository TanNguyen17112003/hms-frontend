import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { UserDetail } from 'src/types/user'
import { formatStandardDate, formatTime } from 'src/utils/format-time-currency'

function AccountBasicInfo({user}: {user: UserDetail}) {
  return (
    <Stack
      spacing={2}
    >
        <Grid container spacing={1.5} alignItems={'center'} justifyContent={"center"}>
    <Grid item xs={12} md={6}>
      <Stack spacing={1}>
        <Typography variant='body2'>Full name</Typography>
        <TextField
          variant='outlined'
          fullWidth
          value={user?.name}
        />
      </Stack>
    </Grid>
    <Grid item xs={12} md={6}>
      <Stack spacing={1}>
        <Typography variant='body2'>Phone number</Typography>
        <TextField variant='outlined' fullWidth value={user?.phone} />
      </Stack>
    </Grid>
 
    <Grid item xs={12} md={6}>
      <Stack spacing={1}>
        <Typography variant='body2'>Occupation</Typography>
        <TextField variant='outlined' fullWidth value={user?.occupation} />
      </Stack>
    </Grid>
    <Grid item xs={12} md={6}>
      <Stack spacing={1}>
        <Typography variant='body2'>Marital status</Typography>
        <TextField variant='outlined' fullWidth value={user?.maritalStatus} />
      </Stack>
    </Grid>
    <Grid item xs={12}>
      <Stack spacing={1}>
        <Typography variant='body2'>Address</Typography>
        <TextField variant='outlined' fullWidth value={user?.address} />
      </Stack>
    </Grid>
    <Grid item xs={12} md={6}>
      <Stack spacing={1}>
        <Typography variant='body2'>Date of birth</Typography>
        <TextField
          variant='outlined'
          fullWidth
          value={formatStandardDate(user?.dob)}
          disabled
        />
      </Stack>
    </Grid>
    <Grid item xs={12} md={6}>
      <Stack spacing={1}>
        <Typography variant='body2'>Sex</Typography>
        <TextField
          variant='outlined'
          fullWidth
          value={user?.gender}
          disabled
        />
      </Stack>
    </Grid>
    <Grid item xs={12}>
      <Stack spacing={1}>
        <Typography variant='body2'>Nationality</Typography>
        <TextField variant='outlined' fullWidth value={user?.nationality} disabled />
      </Stack>
    </Grid>

    <Grid item xs={12} md={6}>
      <Stack spacing={1}>
        <Typography variant='body2'>Join date</Typography>
        <TextField variant='outlined' fullWidth value={formatStandardDate(user?.createdAt as string)} disabled/>
      </Stack>
    </Grid>
    <Grid item xs={12} md={6}>
      <Stack spacing={1}>
        <Typography variant='body2'>SSN</Typography>
        <TextField
          variant='outlined'
          fullWidth
          value={user?.SSN}
          disabled
        />
      </Stack>
    </Grid>
  </Grid>
  <Button
  sx={{
    width: 'fit-content'
  }}
  variant='contained'
>
  Save Changes
</Button>
    </Stack>
  )
}

export default AccountBasicInfo