import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import { MobileNav } from './mobile-nav';
import { Section } from '../config/config';
import logo from 'public/logo.png';
import { paths } from 'src/paths';

interface MobileTopNavProps {
  sections: Section[];
}

const MobileTopNav: React.FC<MobileTopNavProps> = ({ sections }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position='fixed' sx={{ backgroundColor: '#02053D', color: 'white' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton edge='end' color='inherit' aria-label='menu' onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
            onClick={() => router.push(paths.index)}
          >
            <Image src={logo} alt='logo' width={24} height={24} />
            <Typography fontWeight={'bold'} color='white' fontSize={20}>
              HealthPro
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* This is to offset the AppBar height */}
      <MobileNav open={drawerOpen} onClose={handleDrawerClose} sections={sections} />
    </>
  );
};

export default MobileTopNav;
