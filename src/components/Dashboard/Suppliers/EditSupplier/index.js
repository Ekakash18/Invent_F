import Drawer from '@/components/Generic/Drawer';
import Title from '@/components/Generic/Title';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAPI from '@/hooks/useAPI';

const EditSupplier = ({ onUpdate, ...props }) => {
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
        setSupplier({
            name: props.supplier.name || '',
            email: props.supplier.email || '',
            address: props.supplier.address || '',
            phoneNo: props.supplier.phoneNo || '',
            companyName: props.supplier.companyName || '',
            category: props.supplier.category?.join(', ') || '',
            status: props.supplier.status || 'active',
        });
    }, [props.supplier]);

    const handleUpdate = async () => {
        try {
            const response = await useAPI.put('/suppliers', {
                ...supplier,
                category: supplier.category.split(',').map(cat => cat.trim())
            });

            if (response.status === 201) {
                toast.success('Supplier updated successfully!');
                onUpdate(true);
            } else {
                toast.error(response.data.error || 'Update failed');
            }
        } catch (error) {
            if (error.response?.data?.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <Drawer
            position='right'
            title={<Title text='Edit Supplier' />}
            className='p-4'
            id={props.id}
        >
            <div className='mb-4'>
                <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900'>Supplier Name</label>
                <input
                    type='text'
                    id='name'
                    className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                    placeholder='Supplier Name'
                    value={supplier.name}
                    onChange={(e) => setSupplier(prevSupplier => ({
                        ...prevSupplier,
                        name: e.target.value
                    }))}
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
                    placeholder='name@domain.com'
                    value={supplier.email}
                    onChange={(e) => setSupplier(prevSupplier => ({
                        ...prevSupplier,
                        email: e.target.value
                    }))}
                    required
                    autoComplete='off'
                />
            </div>
            <div className='mb-4'>
                <label htmlFor='address' className='block mb-2 text-sm font-medium text-gray-900'>Supplier Address</label>
                <input
                    type='text'
                    id='address'
                    className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                    placeholder='Address'
                    value={supplier.address}
                    onChange={(e) => setSupplier(prevSupplier => ({
                        ...prevSupplier,
                        address: e.target.value
                    }))}
                    required
                    autoComplete='off'
                />
            </div>
            <div className='mb-4'>
                <label htmlFor='phoneNo' className='block mb-2 text-sm font-medium text-gray-900'>Supplier Phone Number</label>
                <input
                    type='text'
                    id='phoneNo'
                    className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                    placeholder='Phone Number'
                    value={supplier.phoneNo}
                    onChange={(e) => setSupplier(prevSupplier => ({
                        ...prevSupplier,
                        phoneNo: e.target.value
                    }))}
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
                    placeholder='Company Name'
                    value={supplier.companyName}
                    onChange={(e) => setSupplier(prevSupplier => ({
                        ...prevSupplier,
                        companyName: e.target.value
                    }))}
                    required
                    autoComplete='off'
                />
            </div>
            <div className='mb-4'>
                <label htmlFor='category' className='block mb-2 text-sm font-medium text-gray-900'>Category</label>
                <input
                    type='text'
                    id='category'
                    className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                    placeholder='Categories (e.g., tab, phone)'
                    value={supplier.category}
                    onChange={(e) => setSupplier(prevSupplier => ({
                        ...prevSupplier,
                        category: e.target.value
                    }))}
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
                    onChange={(e) => setSupplier(prevSupplier => ({
                        ...prevSupplier,
                        status: e.target.value
                    }))}
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
                    onClick={handleUpdate}
                >
                    Edit Supplier
                </button>
            </div>
        </Drawer>
    );
};

export default EditSupplier;
