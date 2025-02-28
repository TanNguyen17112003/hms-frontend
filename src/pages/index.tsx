import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { Page as PageType } from 'src/types/page';
import { useAuth } from '@hooks';

const Page: PageType = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    router.replace('/staff');
  }, [router, user]);

  return <></>;
};

export default Page;
