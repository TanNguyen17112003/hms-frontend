import { useEffect } from 'react';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Page as PageType } from 'src/types/page';
import { useRouter } from 'next/router';
import { paths } from 'src/paths';

const Page: PageType = () => {
  const { signOut } = useAuth();
  useEffect(() => {
    const logout = async () => {
      await signOut();
    };
    logout();
  }, [signOut]);
  return <></>;
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
