'use client';
import Drawer from '@/components/Generic/Drawer';
import Title from '@/components/Generic/Title';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useAPI from '@/hooks/useAPI';

const AddSupplier = ({ onUpdate, ...props }) => {
    const [supplier, setSupplier] = useState({
        name: '',
        email: '',
        address: '',
        phoneNo: '',
        companyName: '',
        category: '',
        status: 'active',
    });

    useEffect(() => {
        // Reset form when the component mounts or props change
        setSupplier({
            name: '',
            email: '',
            address: '',
            phoneNo: '',
            companyName: '',
            category: '',
            status: 'active',
        });
    }, [props.id]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setSupplier(prevSupplier => ({
            ...prevSupplier,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await useAPI.post('/suppliers', {
                ...supplier,
                category: supplier.category.split(',').map(item => item.trim()), // Convert to array
            });

            if (response.status === 201) {
                toast.success('Supplier added successfully!');
                setSupplier({ // Reset form fields
                    name: '',
                    email: '',
                    address: '',
                    phoneNo: '',
                    companyName: '',
                    category: '',
                    status: 'active',
                });
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
            title={<Title text='Add Supplier' />}
            className='p-4'
            id={props.id}
        >
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900'>Supplier Name</label>
                    <input
                        type='text'
                        id='name'
                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        placeholder='ABC'
                        value={supplier.name}
                        onChange={handleChange}
                        required
                        autoComplete='off'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900'>Supplier Email</label>
                    <input
                        type='email'
                        id='email'
                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        placeholder='abc@domain.com'
                        value={supplier.email}
                        onChange={handleChange}
                        required
                        autoComplete='off'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='address' className='block mb-2 text-sm font-medium text-gray-900'>Address</label>
                    <input
                        type='text'
                        id='address'
                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        placeholder='ABC, ABC'
                        value={supplier.address}
                        onChange={handleChange}
                        required
                        autoComplete='off'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='phoneNo' className='block mb-2 text-sm font-medium text-gray-900'>Phone Number</label>
                    <input
                        type='tel'
                        id='phoneNo'
                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        placeholder='+123456789'
                        value={supplier.phoneNo}
                        onChange={handleChange}
                        required
                        autoComplete='off'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='companyName' className='block mb-2 text-sm font-medium text-gray-900'>Company Name</label>
                    <input
                        type='text'
                        id='companyName'
                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        placeholder='ABC co.'
                        value={supplier.companyName}
                        onChange={handleChange}
                        required
                        autoComplete='off'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='category' className='block mb-2 text-sm font-medium text-gray-900'>Category (comma-separated)</label>
                    <input
                        type='text'
                        id='category'
                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        placeholder='Sports, Equipments'
                        value={supplier.category}
                        onChange={handleChange}
                        required
                        autoComplete='off'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='status' className='block mb-2 text-sm font-medium text-gray-900'>Status</label>
                    <select
                        id='status'
                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        value={supplier.status}
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
                        Add Supplier
                    </button>
                </div>
            </form>
        </Drawer>
    );
};

export default AddSupplier;
