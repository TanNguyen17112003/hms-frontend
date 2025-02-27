import { paths } from 'src/paths';
import { PiMotorcycle } from 'react-icons/pi';
import { BarChart2, CalendarPlus2, File, FileBarChart, FileBarChart2, FlaskConical, Home, Users, User, Settings, LogOut, Bed } from 'lucide-react';
export const getDashboardAdminConfigs = () => {
  return [
    {
      subheader: '1',
      items: [
        {
          title: 'Dashboard',
          path: paths.auth.login,
          icon: <BarChart2 className='h-6 w-6' />
        },
        {
          title: 'Appointment',
          path: paths.auth.login,
          icon: <CalendarPlus2 className='h-6 w-6' />
        },
        {
          title: 'Staff Management',
          path: paths.auth.login,
          icon: <Users className='h-6 w-6' />
        },
        {
          title: 'Patient Management',
          path: paths.auth.login,
          icon: <Bed className='h-6 w-6' />
        },
        {
          title: 'My Account',
          path: paths.auth.login,
          icon: <User className='h-6 w-6' />
        }
      ]
    },
    {
      subheader: '2',
      items: [
        {
          title: 'Settings',
          path: paths.auth.login,
          icon: <Settings className='h-6 w-6' />
        },
        {
          title: 'Log Out',
          path: paths.auth.logout,
          icon: <LogOut className='h-6 w-6' />
        }
      ]
    }
  ];
};
