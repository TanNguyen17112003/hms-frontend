import React, { useCallback, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { Circle, CircleUserRound, UserPlus } from 'lucide-react';
import logo from 'public/logo.png';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  InputAdornment,
  TextField,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
  Divider,
  Stack,
  Button
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { paths } from 'src/paths';
import { useAuth } from '@hooks';

export const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuth();

  const handleLinkClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement | HTMLLIElement>, link: string) => {
      event.preventDefault();
      const targetElement = document.querySelector(link);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      setDrawerOpen(false);
    },
    []
  );

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    ></Box>
  );

  return (
    router.pathname !== paths.auth.login &&
    router.pathname !== paths.auth.register.index && (
      <AppBar position='sticky' sx={{ backgroundColor: '#02053D', color: 'white', paddingY: 0.5 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', paddingY: 1 }}>
          {isMobile ? (
            <>
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                width={'100%'}
                gap={4}
              >
                <Stack direction={'row'} gap={2} className='flex items-center gap-2 text-white'>
                  <Image src={logo} alt='logo' width={32} height={32} />
                  <Typography color='white' fontWeight={'bold'} variant='h5'>
                    HealthPro
                  </Typography>
                </Stack>
                <IconButton
                  edge='end'
                  color='inherit'
                  aria-label='menu'
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
                {/* {drawerList} */}
                {user ? (
                  <></>
                ) : (
                  <Box sx={{ width: 250 }}>
                    <Stack
                      direction={'row'}
                      className='px-4 py-3 cursor-pointer hover:bg-blue-600 hover:text-white gap-1'
                      onClick={() => {
                        router.push(paths.auth.login);
                      }}
                    >
                      <CircleUserRound size={24} className='hover:bg-white' />
                      <Typography fontWeight={'bold'}>Đăng nhập</Typography>
                    </Stack>
                    <Stack
                      direction={'row'}
                      className='px-4 py-3 cursor-pointer hover:bg-blue-600 hover:text-white gap-1'
                      onClick={() => {
                        router.push(paths.auth.register.index);
                      }}
                    >
                      <UserPlus size={24} className='hover:text-white' />
                      <Typography fontWeight={'bold'}>Đăng ký</Typography>
                    </Stack>
                  </Box>
                )}
              </Drawer>
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 4,
                width: '100%'
              }}
            >
              <Stack
                direction={'row'}
                gap={2}
                className='flex items-center gap-2 text-white cursor-pointer'
                onClick={() => router.push(paths.index)}
              >
                <Image src={logo} alt='logo' width={40} height={40} />
                <Typography color='white' fontWeight={'bold'} variant='h4'>
                  HealthPro
                </Typography>
              </Stack>
              <Stack direction={'row'} gap={2}>
                <Button
                  onClick={() => router.push(paths.auth.login)}
                  variant='outlined'
                  className='flex items-center gap-2 text-white'
                >
                  <CircleUserRound size={24} color='white' fontVariant={'bold'} />
                  <Typography color='white' fontWeight={'bold'}>
                    Login
                  </Typography>
                </Button>
                <Button
                  onClick={() => router.push(paths.auth.register.index)}
                  variant='outlined'
                  className='flex items-center gap-2 text-white'
                >
                  <UserPlus size={24} color='white' fontVariant={'bold'} />
                  <Typography color='white' fontWeight={'bold'}>
                    Register
                  </Typography>
                </Button>
              </Stack>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    )
    // <>Show</>
  );
};
