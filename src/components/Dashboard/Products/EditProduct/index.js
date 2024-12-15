import Drawer from '@/components/Generic/Drawer';
import Title from '@/components/Generic/Title';
import React, { useEffect, useState } from 'react';
import useAPI from '@/hooks/useAPI';
import { toast } from 'react-toastify';

const EditProduct = ({ onUpdate, ...props }) => {
    const [productData, setProductData] = useState({
        name: '',
        category: '',
        brand: '',
        price: '',
        tax: '',
        description: '',
        hsn: '',
        status: ''
    });

    useEffect(() => {
            setProductData({
                name: props.product.name || '',
                category: props.product.category || '',
                brand: props.product.brand || '',
                price: props.product.price || '',
                tax: props.product.tax || '',
                description: props.product.description || '',
                hsn: props.product.hsn || '',
                status: props.product.status || ''
            });
    }, [props.product]);

    const handleUpdate = async () => {
        try {
            const response = await useAPI.put(`/products/${props.product._id}`, productData);

            if (response.status === 200) {
                toast.success('Product updated successfully!');
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
            title={<Title text='Edit Product' />}
            className='p-4'
        >
            <div className='mb-4'>
                <label htmlFor='title' className='block mb-2 text-sm font-medium text-gray-900'>Product Name</label>
                <input
                    type='text'
                    id='product-name'
                    className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                    placeholder=''
                    value={productData.name}
                    onChange={(e) => setProductData(prev => ({
                        ...prev,
                        name: e.target.value
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
                    placeholder='Sports, Equipments'
                    value={productData.category}
                    onChange={(e) => setProductData(prev => ({
                        ...prev,
                        category: e.target.value
                    }))}
                    required
                    autoComplete='off'
                />
            </div>
            <div className='mb-4'>
                <label htmlFor='brand' className='block mb-2 text-sm font-medium text-gray-900'>Brand Name</label>
                <input
                    type='text'
                    id='brand'
                    className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                    placeholder='Lenovo'
                    value={productData.brand}
                    onChange={(e) => setProductData(prev => ({
                        ...prev,
                        brand: e.target.value
                    }))}
                    required
                    autoComplete='off'
                />
            </div>
            <div className='mb-4'>
                <label htmlFor='price' className='block mb-2 text-sm font-medium text-gray-900'>Price</label>
                <input
                    type='number'
                    id='price'
                    className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                    placeholder='500'
                    value={productData.price}
                    onChange={(e) => setProductData(prev => ({
                        ...prev,
                        price: e.target.value
                    }))}
                    required
                    autoComplete='off'
                />
            </div>
            <div className='mb-4'>
                <label htmlFor='tax' className='block mb-2 text-sm font-medium text-gray-900'>Tax</label>
                <input
                    type='number'
                    id='tax'
                    className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                    placeholder='5'
                    value={productData.tax}
                    onChange={(e) => setProductData(prev => ({
                        ...prev,
                        tax: e.target.value
                    }))}
                    required
                    autoComplete='off'
                />
            </div>
            <div className='mb-4'>
                <label htmlFor='description' className='block mb-2 text-sm font-medium text-gray-900'>Product Description</label>
                <textarea
                    id='description'
                    className='bg-secondary-50 border border-secondary-300 resize-y text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                    placeholder='Smooth grip, integreted desgin, cool colour scheme'
                    value={productData.description}
                    onChange={(e) => setProductData(prev => ({
                        ...prev,
                        description: e.target.value
                    }))}
                    required
                    autoComplete='off'
                    rows='8'
                />
            </div>
            <div className='mb-4'>
                <label htmlFor='hsn' className='block mb-2 text-sm font-medium text-gray-900'>HSN Code</label>
                <input
                    type='text'
                    id='hsn'
                    className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                    placeholder='#44ABDC'
                    value={productData.hsn}
                    onChange={(e) => setProductData(prev => ({
                        ...prev,
                        hsn: e.target.value
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
                    value={productData.status}
                    onChange={(e) => setProductData(prev => ({
                        ...prev,
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
                    Edit Product
                </button>
            </div>
        </Drawer>
    );
};

export default EditProduct;