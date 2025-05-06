import { paths } from 'src/paths';
import { BarChart2, CalendarPlus2, User, Settings, LogOut } from 'lucide-react';
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
          title: 'My Account',
          path: paths.account.index,
          icon: <User className='h-6 w-6' />
        }
      ]
    },
    {
      subheader: '2',
      items: [
        // {
        //   title: 'Settings',
        //   path: paths.auth.login,
        //   icon: <Settings className='h-6 w-6' />
        // },
        {
          title: 'Log Out',
          path: paths.auth.logout,
          icon: <LogOut className='h-6 w-6' />
        }
      ]
    }
  ];
};
