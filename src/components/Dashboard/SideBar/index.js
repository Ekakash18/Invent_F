'use client';
import Link from 'next/link';
import React from 'react';
import tabs from '../../../utils/json/navTabs.json';
import useTabStore from '@/store/TabStore';
import Icon from '@/components/Generic/Icon';
import { BRAND_NAME } from '@/utils/constants';
import LogoutButton from '../Generic/LogoutButton';
const SideBar = () => {
  const { setSelectedTabName, setSelectedTabIndex, selectedTabIndex } = useTabStore((state) => ({
    setSelectedTabName: state.setSelectedTabName,
    setSelectedTabIndex: state.setSelectedTabIndex,
    selectedTabIndex: state.selectedTabIndex
  }));
  return (
    <div className='flex w-[280px]'>
      <div className='h-screen w-full bg-white flex flex-col justify-between'>
        <div className=''>
          <div className='brand flex justify-center items-end gap-1 py-4 border-b'>
            <Link href='/' className='font-extrabold text-xl text-secondary-400'>
              {BRAND_NAME}
            </Link>
            <div className='w-1.5 h-1.5 bg-primary-600 mb-2' />
          </div>
          <div className='navlist flex flex-col justify-start'>
            {
              tabs && tabs.filter(tab => tab.position === 'left').map((tab) => (
                <Link key={tab.id}
                  onClick={() => [setSelectedTabName(tab.name), setSelectedTabIndex(tab.id)]}
                  className={`w-full flex flex-row gap-2 py-4 px-8 mb-4 text-start 
                    ${selectedTabIndex === tab.id ? 'bg-primary-50 text-secondary-800 font-semibold' : 'text-secondary-600 font-normal'}`}
                  href={'/dashboard/' + tab.destination}
                >
                  <Icon name={tab.icon} className='w-6 h-6' />
                  <span>{tab.name}</span>
                </Link>
              ))
            }
          </div>
        </div>
        <div className='flex'>
          <LogoutButton className='w-full flex flex-row gap-2 py-4 px-8 mb-4 text-start text-secondary-600 font-normal'>
            <Icon name='power' className='w-6 h-6' />
            <span>Logout</span>
          </LogoutButton>
        </div>
      </div>
    </div>
  );
};

export default SideBar;