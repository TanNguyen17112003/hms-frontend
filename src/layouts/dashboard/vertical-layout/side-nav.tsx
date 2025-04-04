import { FC, useEffect, useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from 'src/hooks/use-auth';
import { usePathname } from 'src/hooks/use-pathname';
import { Section } from '../config/config';
import { SideNavSection } from './side-nav-section';
import { NavColor } from 'src/types/settings';
import { Box, Stack, Typography, Button, Avatar, Tooltip, Badge, Divider } from '@mui/material';
import useFunction from 'src/hooks/use-function';
import { useRouter } from 'next/router';
import logo from 'public/logo-text-black.png';
import Image from 'next/image';
import { Add } from 'iconsax-react';
import { paths } from 'src/paths';

interface SideNavProps {
  color?: NavColor;
  sections?: Section[];
}

export const SideNav: FC<SideNavProps> = (props) => {
  const { user } = useAuth();
  const router = useRouter();
  const { sections = [] } = props;
  const pathname = usePathname();

  return (
    <Box>
      <Box
        className='fixed z-50 min-h-screen text-[#070B5C]  bg-white overflow-hidden border-r border-solid border-background-other-Boxider shadow-lg rounded-lg'
        style={{ width: 250 }}
      >
        <Box
          className='flex flex-col w-full bg-gray-900  h-full'
          style={{
            backgroundColor: 'var(--nav-bg)',
            color: 'var(--nav-color)'
          }}
        >
          <Stack className='flex-1'>
            <nav className='flex flex-col justify-between space-y-5 px-5 py-3 h-full'>
              <Box className='flex flex-col space-y-5'>
                <Stack
                  direction={'row'}
                  spacing={2}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  width={'100%'}
                  paddingX={3}
                  paddingY={2}
                >
                  <Image src={logo.src} alt='logo' height={50} width={160} />
                </Stack>
                <Divider />
                {user?.role === "PATIENT" && (
                  <Button
                    variant='contained'
                    color='primary'
                    className='w-full'
                    startIcon={<Add />}
                    onClick={() => router.push(paths.appointment.add.index)}
                  >
                    Add appointment
                  </Button>
                )}
                {sections.map((section, index) => (
                  <SideNavSection
                    items={section.items as any[]}
                    key={index}
                    pathname={pathname}
                    subheader={section.subheader}
                    isLast={index === sections.length - 1}
                  />
                ))}
              </Box>
              <Box className='flex gap-2 items-center'></Box>
            </nav>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
