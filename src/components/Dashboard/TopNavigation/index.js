'use client';
import Icon from '@/components/Generic/Icon';
import React, { useEffect, useState } from 'react';
import tabs from '../../../utils/json/navTabs.json';
import useTabStore from '@/store/TabStore';
import Drawer from '@/components/Generic/Drawer';
import { useToggleElement } from '@/hooks/useToggleElement';
import useAuthStore from '@/store/AuthStore';
import useAPI from '@/hooks/useAPI';

const TopNavigation = () => {
  const { setSelectedTabName, setSelectedTabIndex, selectedTabIndex } = useTabStore((state) => ({
    setSelectedTabName: state.setSelectedTabName,
    setSelectedTabIndex: state.setSelectedTabIndex,
    selectedTabIndex: state.selectedTabIndex
  }));
  const role = useAuthStore((state) => state.role);
  const { toggle: toggleNavDrawer } = useToggleElement();

  const handleTabClick = (tab) => {
    setSelectedTabName(tab.name);
    setSelectedTabIndex(tab.id);
    if (tab.name === 'Notification') {
      toggleNavDrawer('nav-drawer');
    };
  };

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await useAPI.get('/products');
        const products = response.data;
        const filteredProducts = products.filter(product => product.stock < 10);

        const sortedProducts = filteredProducts.sort((a, b) => a.stock - b.stock);

        const last25Products = sortedProducts.slice(0, 25);

        if (last25Products.length > 0) {
          setData(last25Products);
        }
        else {
          setData(null);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className='w-full py-1.5 bg-white px-6'>
        <div className='flex justify-end items-center h-full gap-x-4'>
          <div>
            Welcome {role === 'manager' ? 'Manager' : 'User'}
          </div>
        </div>
      </div>
      <Drawer position='right' id='nav-drawer'
        className='flex w-full h-full'
      >
        {
          data !== null
            ? (
              <div className='overflow-x-auto'>
                <table className='min-w-full bg-white text-sm'>
                  <thead>
                    <tr>
                      <th className='py-2 px-4 border-b'>ID</th>
                      <th className='py-2 px-4 border-b'>Product Name</th>
                      <th className='py-2 px-4 border-b'>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data && data.map((product, index) => (
                        <tr key={product.id} className='hover:bg-gray-100'>
                          <td className='py-2 px-4 border-b'>{index + 1}</td>
                          <td className='py-2 px-4 border-b'>{product.name}</td>
                          <td className='py-2 px-4 border-b'>{product.stock}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            )
            : (
              <div className='flex flex-col gap-4 items-center justify-center h-full w-full'>
                <Icon name='bell-slash' className='w-10 h-10 text-secondary-500' />
                <h1 className='font-semibold text-secondary-500 text-2xl'>No Notification</h1>
              </div>
            )
        }
      </Drawer>
    </>
  );
};

export default TopNavigation;