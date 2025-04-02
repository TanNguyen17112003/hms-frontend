import React, { useCallback, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { CircleUserRound, UserPlus, MessageSquareDot, MessageSquareWarning, UserRoundCheck } from 'lucide-react';
import logo from 'public/logo-black.png';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Drawer,
  useTheme,
  Divider,
  Stack,
  Button,
  Avatar
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { paths } from 'src/paths';
import { useAuth } from '@hooks';
import CloseIcon from '@mui/icons-material/Close';
import { MobileNavSection } from 'src/layouts/dashboard/mobile-layout/mobile-nav-section';
import { useSections } from 'src/layouts';
import { useResponsive } from 'src/utils/use-responsive';
import { FaEllipsis } from 'react-icons/fa6';
import { UserTick } from 'iconsax-react';

export const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const sections = useSections();
  const router = useRouter();
  const { isMobile, isTablet, isDesktop } = useResponsive();
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
    >
      {user ? (
        <Stack component='nav' spacing={2} sx={{ px: 2 }} alignItems={'flex-start'}>
          {sections?.map((section, index) => (
            <MobileNavSection
              key={index}
              items={section.items.map((item) => ({
                ...item,
                path: typeof item.path === 'object' ? undefined : item.path
              }))}
              pathname={router.pathname}
              subheader={section.subheader}
              onClose={() => toggleDrawer(false)}
              isLast={index === sections.length - 1}
            />
          ))}
        </Stack>
      ) : (
        <>
          <Divider />
          <Stack
            direction={'row'}
            className='px-4 py-3 cursor-pointer hover:bg-blue-600 hover:text-white gap-2'
            onClick={() => {
              router.push(paths.auth.staff.index);
            }}
          >
            <UserRoundCheck size={24} className='hover:bg-white' />
            <Typography fontWeight={'bold'}>Login with staff</Typography>
          </Stack>
          <Stack
            direction={'row'}
            className='px-4 py-3 cursor-pointer hover:bg-blue-600 hover:text-white gap-2'
            onClick={() => {
              router.push(paths.auth.login);
            }}
          >
            <CircleUserRound size={24} className='hover:bg-white' />
            <Typography fontWeight={'bold'}>Login</Typography>
          </Stack>
          <Stack
            direction={'row'}
            className='px-4 py-3 cursor-pointer hover:bg-blue-600 hover:text-white gap-2'
            onClick={() => {
              router.push(paths.auth.register.index);
            }}
          >
            <UserPlus size={24} className='hover:text-white' />
            <Typography fontWeight={'bold'}>Register</Typography>
          </Stack>
        </>
      )}
    </Box>
  );

  return (
    router.pathname !== paths.auth.login &&
    router.pathname !== paths.auth.register.index && router.pathname !== paths.auth.staff.index && (
      <AppBar position='sticky' sx={{ backgroundColor: '#02053D', color: 'white', paddingY: 0.5 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', paddingY: 1 }}>
          {user ? (
            <>
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                width={'100%'}
                gap={4}
              >
                {!isDesktop && (
                  <Box
                    className='p-1 border rounded-lg border-[#3B44B2] cursor-pointer'
                    onClick={toggleDrawer(true)}
                  >
                    <MenuIcon className='text-white' />
                  </Box>
                )}
                {!isMobile && (
                  <Typography variant={isTablet ? 'h6' : 'h5'}>
                    Hospital Management System
                  </Typography>
                )}
                <Stack direction={'row'} gap={2} alignItems={'center'}>
                  <Box className='p-1 border rounded-lg border-[#3B44B2] cursor-pointer'>
                    <MessageSquareWarning />
                  </Box>
                  <Box className='p-1 border rounded-lg border-[#3B44B2] cursor-pointer'>
                    <MessageSquareDot />
                  </Box>
                  {!isMobile && <Divider orientation='vertical' flexItem />}
                  <Stack direction={'row'} gap={1} alignItems={'center'}>
                    <Avatar src={user?.photoUrl} sx={{ width: 26, height: 26 }} />
                    {!isMobile && (
                      <Box display={'flex'} flexDirection={'column'} gap={0.2}>
                        <Typography variant={'body1'}>{user?.name || 'Chovy'}</Typography>
                        <Typography variant={'body2'} fontWeight={100}>
                          {user?.email || 'duytan17112003@gmail.com'}
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                  <Box className='p-1 border rounded-lg border-[#3B44B2] cursor-pointer'>
                    <FaEllipsis />
                  </Box>
                </Stack>
              </Box>
              <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }}>
                  <Stack
                    alignItems='center'
                    direction='row'
                    spacing={2}
                    sx={{ p: 2, justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <IconButton onClick={toggleDrawer(false)} color='inherit'>
                      <CloseIcon color='inherit' />
                    </IconButton>
                    <Stack direction={'row'} alignContent={'center'} alignItems={'center'} gap={1}>
                      <Image src={logo} alt='logo' width={20} height={20} />
                      <Typography>HealthPro</Typography>
                    </Stack>
                  </Stack>
                  {drawerList}
                </Box>
              </Drawer>
            </>
          ) : (
            <>
              {isMobile ? (
                <>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    width={'100%'}
                    gap={4}
                  >
                    <IconButton
                      edge='end'
                      color='inherit'
                      aria-label='menu'
                      onClick={toggleDrawer(true)}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Stack
                      direction={'row'}
                      gap={1}
                      className='flex items-center gap-2 text-white cursor-pointer'
                      onClick={() => router.push(paths.index)}
                    >
                      <Image src={logo} alt='logo' width={32} height={32} />
                      <Typography color='white' fontWeight={'bold'} variant='h5'>
                        HealthPro
                      </Typography>
                    </Stack>
                  </Box>
                  <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
                    <Box sx={{ width: 250 }}>
                      <Stack
                        alignItems='center'
                        direction='row'
                        spacing={2}
                        sx={{ p: 2, justifyContent: 'space-between', alignItems: 'center' }}
                      >
                        <IconButton onClick={toggleDrawer(false)} color='inherit'>
                          <CloseIcon color='inherit' />
                        </IconButton>
                        <Stack
                          direction={'row'}
                          alignContent={'center'}
                          alignItems={'center'}
                          gap={1}
                        >
                          <Image src={logo} alt='logo' width={20} height={20} />
                          <Typography>HealthPro</Typography>
                        </Stack>
                      </Stack>
                      {drawerList}
                    </Box>
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
                      onClick={() => router.push(paths.auth.staff.index)}
                      variant='outlined'
                      className='flex items-center gap-2 text-white'
                    >
                      <UserRoundCheck size={24} color='white' fontVariant={"bold"}/>
                      <Typography color='white' fontWeight={'bold'}>
                        Login with staff account
                      </Typography>
                    </Button>
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
            </>
          )}
        </Toolbar>
      </AppBar>
    )
  );
};
