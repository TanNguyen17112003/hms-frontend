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
  Timer
} from 'lucide-react';
export const getDashboardAdminConfigs = () => {
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
          title: 'Appointment management',
          path: paths.appointment.index,
          icon: <CalendarPlus2 className='h-6 w-6' />
        },
        {
          title: 'Timeslot management',
          path: paths.timeSlot.index,
          icon: <Timer className='h-6 w-6' />
        },
        {
          title: 'Staff Management',
          path: paths.staff.index,
          icon: <Users className='h-6 w-6' />
        },
        {
          title: 'Patient Management',
          path: paths.patient.index,
          icon: <Bed className='h-6 w-6' />
        },
        {
          title: 'My Account',
          path: paths.auth,
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
