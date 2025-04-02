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
    staff: {
      index: '/auth/staff'
    }
  },
  landing: {
    index: '/landing'
  },
  dashboard: {
    index: '/dashboard'
  },
  appointment: {
    index: '/appointment'
  },
  staff: {
    index: '/staff'
  },
  patient: {
    index: '/patient'
  },
  account: '/account',
  401: '/401',
  404: '/404',
  500: '/500'
};
