import { FC, useEffect, useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from 'src/hooks/use-auth';
import { usePathname } from 'src/hooks/use-pathname';
import { Section } from '../config/config';
import { TabletNavSection } from './tablet-nav-section';
import { NavColor } from 'src/types/settings';
import { Box, Stack, Typography, Button, Avatar, Tooltip, Badge } from '@mui/material';
import { paths } from 'src/paths';
import { Add } from 'iconsax-react';
import { Bell } from 'lucide-react';
import useFunction from 'src/hooks/use-function';
import { useRouter } from 'next/router';

interface TabletNavProps {
  color?: NavColor;
  sections?: Section[];
}

export const TabletNav: FC<TabletNavProps> = (props) => {
  const { user } = useAuth();
  const router = useRouter();
  const { sections = [] } = props;
  const pathname = usePathname();
  const [isNotificationListOpen, setIsNotificationListOpen] = useState(false);

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
            <nav className='flex flex-col justify-between space-y-5 px-2 py-3 h-full'>
              <Box className='flex flex-col space-y-5'>
                <Box className='flex justify-between items-center relative'>
                  <Stack>
                    <Typography>HealthPro</Typography>
                  </Stack>
                </Box>
                {sections.map((section, index) => (
                  <TabletNavSection
                    items={section.items}
                    key={index}
                    pathname={pathname}
                    subheader={section.subheader}
                  />
                ))}
              </Box>
            </nav>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
