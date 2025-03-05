import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { Page as PageType } from 'src/types/page';
import { useAuth } from '@hooks';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';

const Page: PageType = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace('/landing');
      console.log(user);
    } else {
      router.replace('/dashboard');
    }
  }, [router, user]);

  return <></>;
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
