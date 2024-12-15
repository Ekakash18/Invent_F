/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import Notification from '@/components/Dashboard/Report/Notification';
import RecentProducts from '@/components/Dashboard/Report/RecentProducts';
import RecentPurchaseOrders from '@/components/Dashboard/Report/RecentPurchaseOrders';
import Revenue from '@/components/Dashboard/Report/Revenue';
import TopCustomers from '@/components/Dashboard/Report/TopCustomers';
import TopProducts from '@/components/Dashboard/Report/TopProducts';
import TopSuppliers from '@/components/Dashboard/Report/TopSuppliers';
import React from 'react';

const page = () => {
  
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row gap-4'>
        <Revenue />
        <RecentProducts />
        <Notification />
      </div>
      <div className='flex flex-row gap-4'>
        <TopProducts />
        <TopCustomers />
        <TopSuppliers />
        <RecentPurchaseOrders />
      </div>
    </div>
  );
};

export default page;