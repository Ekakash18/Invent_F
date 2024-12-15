'use client';
import Drawer from '@/components/Generic/Drawer';
import Title from '@/components/Generic/Title';
import React, { useState } from 'react';
import * as dayjs from 'dayjs';
import { toast } from 'react-toastify';
import useAPI from '@/hooks/useAPI';

const AddEmployee = ({ onUpdate, ...props }) => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        password: '',
        gender: '',
        role: '',
        status: 'active',
    });
    const handleChange = (e) => {
        const { id, value } = e.target;
        setEmployee(prevEmployee => ({
            ...prevEmployee,
            [id]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await useAPI.post('/employees', {
                name: employee.name,
                email: employee.email,
                password: employee.password,
                gender: employee.gender,
                role: employee.role,
                status: employee.status,
            });

            if (response.status === 201) {
                toast.success('Employee added successfully!');
                onUpdate(true);
            } else {
                toast.error(response.data.error || 'Addition failed');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error('An error occurred. Please try again later.');
            }
            console.error('Addition error:', error);
        }
    };
    return (
        <Drawer
            position='right'
            title={<Title text='Add Employee' />}
            className='p-4'
            id={props.id}
        >
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900'>Employee Name</label>
                    <input
                        type='text'
                        id='name'
                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        placeholder='Branden Miller'
                        value={employee.name}
                        onChange={handleChange}
                        required
                        autoComplete='off'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900'>Employee Email</label>
                    <input
                        type='email'
                        id='email'
                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        placeholder='name@domain.com'
                        value={employee.email}
                        onChange={handleChange}
                        required
                        autoComplete='off'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900'>Employee Password</label>
                    <input
                        type='password'
                        id='password'
                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        placeholder='Enter a password'
                        value={employee.password}
                        onChange={handleChange}
                        required
                        autoComplete='off'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='gender' className='block mb-2 text-sm font-medium text-gray-900'>Gender</label>
                    <select
                        id='gender'
                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        value={employee.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value=''>Select Gender</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                </div>
                <div className='mb-4'>
                    <label htmlFor='role' className='block mb-2 text-sm font-medium text-gray-900'>Role</label>
                    <select
                        id='role'
                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        value={employee.role}
                        onChange={handleChange}
                        required
                    >
                        <option value=''>Select Role</option>
                        <option value='manager'>Manager</option>
                        <option value='employee'>Employee</option>
                    </select>
                </div>
                <div className='mb-4'>
                    <label htmlFor='status' className='block mb-2 text-sm font-medium text-gray-900'>Status</label>
                    <select
                        id='status'
                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        value={employee.status}
                        onChange={handleChange}
                        required
                    >
                        <option value='active'>Active</option>
                        <option value='inactive'>Inactive</option>
                    </select>
                </div>
                <div>
                    <button
                        type='submit'
                        className='inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800'
                    >
                        Add Employee
                    </button>
                </div>
            </form>
        </Drawer>
    );
};

export default AddEmployee;