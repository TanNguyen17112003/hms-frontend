import { Box, Stack, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { UserDetail } from 'src/types/user'


function AccountMedicalInfo({ user }: { user: UserDetail }) {
  const medicalInfo = useMemo(() => {
    return [
      {
        title: 'Body Weight',
        value: '78 kg'
      },
      {
        title: 'Body Height',
        value: '1.75 m'
      },
      {
        title: 'BMI',
        value: '18.5 kg/m2'
      },
      {
        title: 'Blood Type',
        value: "A"
      },
      {
        title: 'Blood Pressure',
        value: '120 mmHg'
      }
    ]
  }, [])
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={2}
    >
      <Stack>
        <Typography variant='h5'>Medical Info</Typography>
        <Typography color='textSecondary' variant='body1'>This information is about your health. Hope you have a better life!</Typography>
      </Stack>
      <Stack
        direction={"row"}
        gap={2}
      >
        {medicalInfo.map((item, index) => (
          <Stack
            key={index}
            spacing={1}
            sx={{
              flex: 1,
              backgroundColor: '#F2F3FD',
              padding: 4,
              borderRadius: 2
            }}
          >
            <Typography variant='body2' fontWeight={"bold"}>{item.title}</Typography>
            <Typography variant='h5'>{item.value}</Typography>
          </Stack>
        ))}
      </Stack>
    </Box>

  )
}

export default AccountMedicalInfo