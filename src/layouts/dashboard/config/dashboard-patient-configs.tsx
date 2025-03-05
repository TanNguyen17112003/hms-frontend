import { paths } from 'src/paths';
import { PiMotorcycle } from 'react-icons/pi';
import {
  BarChart2,
  CalendarPlus2,
  File,
  FileBarChart,
  FileBarChart2,
  FlaskConical,
  Home,
  Users,
  User,
  Settings,
  LogOut,
  Bed,
  Briefcase
} from 'lucide-react';
export const getDashboardPatientConfigs = () => {
  return [
    {
      subheader: '1',
      items: [
        {
          title: 'Dashboard',
          path: paths.dashboard.index,
          icon: <BarChart2 className='h-6 w-6' />
        },
        {
          title: 'My Appointments',
          path: paths.appointment.index,
          icon: <CalendarPlus2 className='h-6 w-6' />
        },
        {
          title: 'Doctor List',
          path: paths.staff.index,
          icon: <Users className='h-6 w-6' />
        },
        {
          title: 'My Account',
          paht: paths.account,
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
