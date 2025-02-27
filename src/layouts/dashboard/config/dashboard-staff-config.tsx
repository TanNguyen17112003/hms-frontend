import { paths } from 'src/paths';
import { PiMotorcycle } from 'react-icons/pi';
import { BarChart2, CalendarPlus2, File, FileBarChart, FileBarChart2, FlaskConical, Home, Users, User, Settings, LogOut, Bed, Briefcase } from 'lucide-react';
export const getDashboardStaffConfigs = () => {
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
          title: 'My Appointments',
          path: paths.auth.login,
          icon: <CalendarPlus2 className='h-6 w-6' />
        },
        {
          title: 'Patient Management',
          path: paths.auth.login,
          icon: <Bed className='h-6 w-6' />
        },
        {
          title: 'My Portfolio',
          path: paths.auth.login,
          icon: <Briefcase className='h-6 w-6' />
        },
        {
          title: 'My Account',
          paht: paths.auth.login,
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
