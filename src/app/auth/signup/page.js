/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useAPI from '@/hooks/useAPI';

const page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('employee');
    const router = useRouter();

    const handleSignup = async () => {
        if (password !== confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }
        try {
          const response = await useAPI.post('auth/signup', {
            email,
            password,
            role,
          });
      
          if (response.status === 201) {
            toast.success('Signup successful! Redirecting to login...');
            setTimeout(() => {
              router.push('/auth/login');
            }, 2000);
          } else {
            console.log(response);
            toast.error(response.data.error || 'Please enter all the fields');
          }
        } catch (error) {
          if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error('An error occurred. Please try again later.');
          }
          console.error('Signup error:', error);
        }
      };      

    return (
        <div className='w-1/4 bg-white min-h-[680px] rounded-xl shadow-md px-12 py-8 text-slate-700 flex flex-col justify-evenly gap-6'>
            <div>
                <h1 className='text-4xl font-semibold text-center mb-4'>Create an account</h1>
                <h2 className='text-2xl font-medium text-slate-400 text-center'>Signup</h2>
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
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='border border-slate-400 px-6 py-3 rounded-full w-full mb-8' />
                <input
                    type='password'
                    required
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='border border-slate-400 px-6 py-3 rounded-full w-full mb-8' />
                <div className='flex justify-between mb-8'>
                    <div className='flex items-center gap-3'>
                        <span className='font-semibold'>Employee</span>
                        <input
                            type='radio' 
                            className='cursor-pointer'
                            checked={role === 'employee'}
                            onChange={() => setRole('employee')}
                            name='user-type' />
                    </div>
                    <div className='flex items-center gap-3'>
                        <span className='font-semibold'>Manager</span>
                        <input 
                            type='radio'
                            className='cursor-pointer' 
                            checked={role === 'manager'}
                            onChange={() => setRole('manager')}
                            name='user-type' />
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <button onClick={handleSignup} className='bg-primary-500 hover:bg-primary-600 text-white font-medium hover:font-semibold px-4 py-2 rounded-full border-2 border-primary-700 w-28'>Signup</button>
                </div>
            </div>
            <div className='text-center'>
                <Link href='login'>Already have an account? <span className='font-semibold'>Sign in</span></Link>
            </div>
        </div>
    );
};

export default page;