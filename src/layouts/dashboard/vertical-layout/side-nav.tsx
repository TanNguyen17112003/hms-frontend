import { FC, useEffect, useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from 'src/hooks/use-auth';
import { usePathname } from 'src/hooks/use-pathname';
import { Section } from '../config/config';
import { SideNavSection } from './side-nav-section';
import { NavColor } from 'src/types/settings';
import { Box, Stack, Typography, Button, Avatar, Tooltip, Badge } from '@mui/material';
import { paths } from 'src/paths';
import { Add } from 'iconsax-react';
import { Bell } from 'lucide-react';
import useFunction from 'src/hooks/use-function';
import { useRouter } from 'next/router';

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
        className='fixed inset-0 z-50 h-screen text-white bg-[#34A853] overflow-hidden border-r border-solid border-background-other-Boxider shadow-lg'
        style={{ width: 480 }}
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
                <Box className='flex justify-between items-center relative'>
                  <Stack>
                    <Typography>TSA</Typography>
                    <Typography className='text-[14px] opacity-60'>
                      Hệ thống quản lý đơn hàng
                    </Typography>
                  </Stack>
                </Box>
                {sections.map((section, index) => (
                  <SideNavSection
                    items={section.items}
                    key={index}
                    pathname={pathname}
                    subheader={section.subheader}
                  />
                ))}
              </Box>
              <Box className='flex gap-2 items-center'>
            
              </Box>
            </nav>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
