import React from 'react';
import { Box, Typography, IconButton, Avatar, Divider } from '@mui/material';
import {
  ChatBubbleOutline,
  Notifications,
  KeyboardArrowDown,
  MoreHoriz,
  AnnouncementOutlined
} from '@mui/icons-material'; // Using Material UI icons
import AvatarCompanyIcon from 'src/components/icons/_Avatar_company_icon';
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';
interface AppBarSectionProps {
  clinicName?: string;
  clinicLocation?: string;
  userName?: string;
  userEmail?: string;
}

const AppBarSection: React.FC<AppBarSectionProps> = ({
  clinicName = 'Northern Central Clinic',
  clinicLocation = 'Idaho, United States',
  userName = 'Abu Fahim',
  userEmail = 'hello@fahim.com'
}) => {
  return (
    <Box className='sticky z-50 top-0 left-0 flex items-center justify-between pt-4 pr-6 pb-4 pl-6 bg-[#02053D] text-white w-full h-[84px]'>
      <Box className='flex items-center gap-2 p-2 bg-white bg-opacity-10 rounded-lg cursor-pointer'>
        <AvatarCompanyIcon />
        <Box className='flex flex-col items-start justify-center ml-2'>
          <Typography variant='subtitle1' className='font-bold'>
            {clinicName}
          </Typography>
          <Typography variant='caption' className='opacity-80'>
            {clinicLocation}
          </Typography>
        </Box>
        <KeyboardArrowDown />
      </Box>

      <Box className='flex items-center gap-4'>
        <Box className='w-10 h-10 gap-16 rounded-lg p-2 bg-[#21234E] border border-[#3B44B2]'>
          <AnnouncementOutlined />
        </Box>
        <Box className='w-10 h-10 gap-16 rounded-lg p-2 bg-[#21234E] border border-[#3B44B2]'>
          <MarkChatUnreadOutlinedIcon />
        </Box>
        <Divider
          orientation='vertical'
          flexItem
          sx={{ height: 24, mx: 2 }}
          className='text-white'
        />
        <Box className='flex items-center gap-2 flex-row'>
          <Avatar className='w-9 h-9' />
          <Box className='flex flex-col items-end'>
            <Typography variant='subtitle2' className='font-medium'>
              {userName}
            </Typography>
            <Typography variant='caption' className='opacity-80'>
              {userEmail}
            </Typography>
          </Box>
        </Box>
        <Box className='w-10 h-10 gap-16 rounded-lg p-2 bg-[#21234E] border border-[#3B44B2]'>
          <MoreHoriz />
        </Box>
      </Box>
    </Box>
  );
};

export default AppBarSection;
