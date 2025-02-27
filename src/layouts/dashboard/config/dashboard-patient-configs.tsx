import { paths } from 'src/paths';
import {
  LogoutCurve,
  Category2,
  Box1,
  User,
  UserTick,
  NotificationStatus,
  Setting2
} from 'iconsax-react';
import { PiMotorcycle } from 'react-icons/pi';
export const getDashboardPatientConfigs = () => {
  return [
    {
      subheader: 'Quản lý',
      items: [
        {
          title: 'Thống kê',
          path: paths.auth.login,
          icon: <Category2 className='h-6 w-6' />
        },
        {
          title: 'Quản lý đơn hàng',
          path: paths.auth.login,
          icon: <Box1 className='h-6 w-6' />
        },
        {
          title: 'Quản lý chuyến đi',
          path: paths.auth.login,
          icon: <PiMotorcycle className='h-6 w-6' />
        },
        {
          title: 'Quản lý nhân viên',
          path: paths.auth.login,
          icon: <UserTick className='h-6 w-6' />
        },
        {
          title: 'Quản lý sinh viên',
          path: paths.auth.login,
          icon: <User className='h-6 w-6' />
        },
        {
          title: 'Quản lý Khiếu nại',
          path: paths.auth.login,
          icon: <NotificationStatus className='h-6 w-6' />
        }
      ]
    },
    {
      subheader: 'Tài khoản',
      items: [
        {
          title: 'Cài đặt',
          path: paths.auth.login,
          icon: <Setting2 className='h-6 w-6' />
        },
        {
          title: 'Đăng xuất',
          path: paths.auth.logout,
          icon: <LogoutCurve size='20px' variant='Bold' />
        }
      ]
    }
  ];
};
