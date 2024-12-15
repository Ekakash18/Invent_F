import Drawer from '@/components/Generic/Drawer';
import Title from '@/components/Generic/Title';
import React, { useState } from 'react';
import useAPI from '@/hooks/useAPI';
import { toast } from 'react-toastify';

const AddProduct = ({ onUpdate, ...props }) => {
    const [product, setProduct] = useState({
        name: '',
        category: '',
        brand: '',
        price: '',
        tax: '',
        description: '',
        hsn: '',
        status: 'active'
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await useAPI.post('/products', product);

            if (response.status === 201) {
                toast.success('Product added successfully!');
                onUpdate(true);
            } else {
                toast.error(response.data.error || 'Add product failed');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error('An error occurred. Please try again later.');
            }
            console.error('Add product error:', error);
        }
    };

    return (
        <Drawer
            position='right'
            id={props.id}
            title={<Title text='Add Product' />}
            className='p-4'
        >
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900'>Product Name</label>
                    <input
                        type='text'
                        id='name'
                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        placeholder='Cricket Set'
                        value={product.name}
                        onChange={handleChange}
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
                        value={product.category}
                        onChange={handleChange}
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
                        placeholder='Nike'
                        value={product.brand}
                        onChange={handleChange}
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
                        placeholder='$1000'
                        value={product.price}
                        onChange={handleChange}
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
                        placeholder='10%'
                        value={product.tax}
                        onChange={handleChange}
                        required
                        autoComplete='off'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='description' className='block mb-2 text-sm font-medium text-gray-900'>Product Description</label>
                    <textarea
                        id='description'
                        className='bg-secondary-50 border border-secondary-300 resize-y text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        placeholder='Smooth grip, with some cool desgin'
                        value={product.description}
                        onChange={handleChange}
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
                        value={product.hsn}
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
                        value={product.status}
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
                        Add Product
                    </button>
                </div>
            </form>
        </Drawer>
    );
};

export default AddProduct;
