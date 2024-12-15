/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import useAuthStore from '@/store/AuthStore';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import useAPI from '@/hooks/useAPI';

function page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const setAuthData = useAuthStore((state) => state.setAuthData);
    
    const handleLogin = async () => {
        try {
          const response = await useAPI.post('/auth/login/', {
            email,
            password,
          });
      
          if (response.status === 201) {
            const { token } = response.data;
            const decodedToken = jwtDecode(token);
            const role = decodedToken.role || 'employee';
                  setAuthData(token, role);
      
            toast.success('Login successful! redirecting');
            router.push('/dashboard');
          } else {
            toast.error(response.data.error || 'Login failed');
          }
        } catch (error) {
          if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
          } else {
            toast.error('An error occurred. Please try again later.');
          }
          console.error('Login error:', error);
        }
      };
    return (
        <div className='w-1/4 bg-white min-h-[680px] rounded-xl shadow-md px-12 py-8 text-secondary-800 flex flex-col justify-evenly gap-6'>
            <div>
                <h1 className='text-4xl font-extrabold text-center mb-4'>Welcome</h1>
                <h2 className='text-2xl font-medium text-slate-400 text-center'>User Login</h2>
            </div>
            <div className='w-full'>
                <input
                    type='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email address'
                    className='border border-slate-400 px-6 py-3 rounded-full w-full mb-8' />
                <input
                    type='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password'
                    className='border border-slate-400 px-6 py-3 rounded-full w-full mb-8' />
                <div className='flex justify-between items-center'>
                    <button
                        onClick={handleLogin}
                        className='bg-primary-500 hover:bg-primary-600 text-white font-medium hover:font-semibold px-4 py-2 rounded-full border-2 border-primary-700 w-28'
                    >
                        Login
                    </button>
                </div>
            </div>
            <div className='text-center'>
                <Link href='signup'>Didn&apos;t have an account? <span className='font-semibold'>Sign up</span></Link>
            </div>
        </div>
    );
}

export default page;