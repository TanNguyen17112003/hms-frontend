export const paths = {
  index: '/',
  auth: {
    login: '/auth',
    register: {
      index: '/auth/register',
      'complete-signup': '/auth/register/complete-signup'
    },
    'forgot-password': '/auth/forgot-password',
    'reset-password': '/auth/reset-password',
    logout: '/auth/logout',
    landing: {
      index: '/landing'
    },
    dashboard: {
      index: '/dashboard'
    },
    appointment: {
      index: '/appointment',
      'appointment-detail': '/appointment/appointment-detail'
    },
    staff: {
      index: '/staff',
      'staff-detail': '/staff/staff-detail'
    },
    patient: {
      index: '/patient',
      'patient-detail': '/patient/patient-detail'
    },
    admin: {
      index: '/admin',
      'patient-management': '/admin/patient-management'
    }
  },
  account: '/account',
  401: '/401',
  404: '/404',
  500: '/500'
};
