import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import AppointmentProvider from 'src/contexts/appointment/appointment-context';
const Page: PageType = () => {
  return <></>;
};
Page.getLayout = (page) => (
  <DashboardLayout>
    <AppointmentProvider>{page}</AppointmentProvider>
  </DashboardLayout>
);

export default Page;
