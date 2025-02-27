import React from 'react';
import { Box, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { Page } from 'src/types/page';


const LandingPage: Page = () => {
  return (
    <Box className='landing'>
        <Typography>Chovy</Typography>
    </Box>
  );
};

LandingPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default LandingPage;
