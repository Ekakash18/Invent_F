/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import useAuthStore from '@/store/AuthStore';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const layout = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);
  if (isAuthenticated) return null;
  return (
    <div className='w-full h-screen bg-primary-50 flex justify-center items-center'>
        {children}
    </div>
  );
};

export default layout;