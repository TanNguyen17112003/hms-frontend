import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { Page as PageType } from 'src/types/page';

const Page: PageType = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/landing');
  }, [router]);

  return <></>;
};

export default Page;