import Drawer from '@/components/Generic/Drawer';
import Title from '@/components/Generic/Title';
import React, { useEffect, useState } from 'react';
import * as dayjs from 'dayjs';
import { toast } from 'react-toastify';
import useAPI from '@/hooks/useAPI';

const EditEmployee = ({ onUpdate, ...props }) => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        gender: '',
        role: '',
        status: '',
        joined: ''
    });
    useEffect(() => {
        setEmployee({
            name: props.employee.name || '',
            email: props.employee.email || '',
            gender: props.employee.gender || '',
            role: props.employee.role || '',
            status: props.employee.status || '',
            joined: props.employee.createdOn || ''
        });
    }, [props.employee]);

    const handleUpdate = async () => {
        try {
            const response = await useAPI.put('/employees', {
                email: employee.email,
                name: employee.name,
                password: employee.password,
                gender: employee.gender,
                role: employee.role,
                status: employee.status
            });

            if (response.status === 201) {
                toast.success('Employee updated successfully!');
                onUpdate(true);
            } else {
                toast.error(response.data.error || 'Update failed');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error('An error occurred. Please try again later.');
            }
            console.error('Update error:', error);
        }
    };

    return (
        <Drawer
            position='right'
            id={props.id}
            title={<Title text='Edit Employee' />}
            className='p-4'
        >
            <div className='mb-4'>
                <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900'>Employee Name</label>
                <input
                    type='text'
                    id='employee-name'
                    className='bg-secondary-50 border capitalize border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                    placeholder='Branden Miller'
                    value={employee.name}
                    onChange={(e) => setEmployee(prevEmployee => ({
                        ...prevEmployee,
                        name: e.target.value
                    }))}
                    required
                    autoComplete='off'
                />
            </div>
            <div className='mb-4'>
                <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900'>Employee Email</label>
                <input
                    type='email'
                    id='employee-email'
                    className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                    placeholder='name@domain.com'
                    value={employee.email}
                    onChange={(e) => setEmployee(prevEmployee => ({
                        ...prevEmployee,
                        email: e.target.value
                    }))}
                    required
                    autoComplete='off'
                />
            </div>
            <div className='mb-4'>
                <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900'>Password (optional)</label>
                <input
                    type='password'
                    id='password'
                    className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                    placeholder='New password'
                    value={employee.password || ''}
                    onChange={(e) => setEmployee(prevEmployee => ({
                        ...prevEmployee,
                        password: e.target.value
                    }))}
                    autoComplete='off'
                />
            </div>
            <div className='mb-4'>
                <label htmlFor='gender' className='block mb-2 text-sm font-medium text-gray-900'>Gender</label>
                <select
                    id='gender'
                    className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                    value={employee.gender}
                    onChange={(e) => setEmployee(prevEmployee => ({
                        ...prevEmployee,
                        gender: e.target.value
                    }))}
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
                    onChange={(e) => setEmployee(prevEmployee => ({
                        ...prevEmployee,
                        role: e.target.value
                    }))}
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
                    onChange={(e) => setEmployee(prevEmployee => ({
                        ...prevEmployee,
                        status: e.target.value
                    }))}
                    required
                >
                    <option value='active'>Active</option>
                    <option value='inactive'>Inactive</option>
                </select>
            </div>
            <div className='mb-4'>
                <label htmlFor='joined' className='block mb-2 text-sm font-medium text-gray-900'>Joining Date</label>
                <input
                    type='text'
                    id='joined'
                    className='border border-secondary-300 text-secondary-700 bg-secondary-200/55 cursor-not-allowed text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                    placeholder=''
                    value={dayjs(employee.joined).format('DD-MM-YYYY')}
                    required
                    autoComplete='off'
                    disabled
                />
            </div>
            <div>
                <button
                    type='submit'
                    className='inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800'
                    onClick={handleUpdate}
                >
                    Edit Employee
                </button>
            </div>
        </Drawer>
    );
};

export default EditEmployee;