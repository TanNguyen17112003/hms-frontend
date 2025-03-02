import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import AppointmentProvider from 'src/contexts/appointment/appointment-context';
import UserProvider from 'src/contexts/user/user-context';
const Page: PageType = () => {
  return <></>;
};
Page.getLayout = (page) => (
  <DashboardLayout>
    <AppointmentProvider>
      <UserProvider>{page}</UserProvider>
    </AppointmentProvider>
  </DashboardLayout>
);

export default Page;
