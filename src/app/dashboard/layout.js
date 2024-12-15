/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import SideBar from '@/components/Dashboard/SideBar';
import TopNavigation from '@/components/Dashboard/TopNavigation';
import useAuthStore from '@/store/AuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const layout = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;
  return (
    <div className='flex w-full h-screen bg-primary-50 text-black'>
      <SideBar />
      <div className='relative w-full h-screen bg-primary-50'>
        <TopNavigation />
        <div className='p-6'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;