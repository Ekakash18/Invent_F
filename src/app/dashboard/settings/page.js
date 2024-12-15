/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import Container from '@/components/Generic/Container';
import Icon from '@/components/Generic/Icon';
import useAPI from '@/hooks/useAPI';
import useAuthStore from '@/store/AuthStore';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';

const page = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataUpdated, setDataUpdated] = useState(false);
  const role = useAuthStore((state) => state.role);
  const token = useAuthStore((state) => state.token);
  const id = jwtDecode(token);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await useAPI.post('/employees/me', {
          email: id.email,
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    setDataUpdated(false);
  }, [dataUpdated]);

  console.log(data);
  return (
    <Container>
      <div className='px-6 pt-4 pb-2 border-b flex flex-row justify-between items-center'>
        <h1 className='font-medium text-2xl' data-toggle='tooltip' data-placement='top' data-text='Product details and all can be seen here'>Settings</h1>
      </div>
      <div className='w-1/3 m-auto'>
        {
          data && (
            <div class='flex flex-col gap-8 justify-center items-center py-4 text-gray-600'>
              <div className='rounded-full border-4 border-gray-600 p-1 mb-8'>
                <Icon name='user-circle' className='w-16 h-16 text-gray-600' />
              </div>
              <div className='flex flex-row justify-between w-full'>
                <p className='text-xl font-medium'>Name</p>
                <p className='text-xl font-medium'>{data.name}</p>
              </div>
              <div className='flex flex-row justify-between w-full'>
                <p className='text-xl font-medium'>Email</p>
                <p className='text-xl font-medium'>{data.email}</p>
              </div>
              <div className='flex flex-row justify-between w-full'>
                <p className='text-xl font-medium'>Role</p>
                <p className='text-xl font-medium'>{data.role}</p>
              </div>
              <div className='flex flex-row justify-between w-full'>
                <p className='text-xl font-medium'>Status</p>
                <p className='text-xl font-medium'>{data.status}</p>
              </div>
              <div className='flex flex-row justify-between w-full'>
                <p className='text-xl font-medium'>Joined On</p>
                <p className='text-xl font-medium'>{data.createdOn}</p>
              </div>
            </div>
          )
        }
      </div>
    </Container>
  );
};

export default page;