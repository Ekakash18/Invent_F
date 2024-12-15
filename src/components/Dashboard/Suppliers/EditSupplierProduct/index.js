'use client';
import Drawer from '@/components/Generic/Drawer';
import Title from '@/components/Generic/Title';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useAPI from '@/hooks/useAPI';

const EditSupplierProduct = ({ onUpdate, ...props }) => {
    const [formData, setFormData] = useState({
        product: '',
        supplier: '',
        price: '',
        quantity: '',
    });

    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const fetchProductsAndSuppliers = async () => {
            console.log(props.id);
            try {
                const productsResponse = await useAPI.get('/products');
                const suppliersResponse = await useAPI.get('/suppliers');

                setProducts(productsResponse.data);
                setSuppliers(suppliersResponse.data);
                if (props.id) {
                    const entryResponse = await useAPI.get(`/suppliers-product/${props.id}`);
                    const { product, supplier, price, quantity } = entryResponse.data;
                    console.log(entryResponse.data);
                    setFormData({
                        product: product._id,
                        supplier: supplier._id,
                        price: price,
                        quantity: quantity,
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProductsAndSuppliers();
    }, [props.id]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await useAPI.put(`/suppliers-product/${props.id}`, {
                product: formData.product,
                supplier: formData.supplier,
                price: formData.price,
                quantity: formData.quantity,
            });

            if (response.status === 200) {
                toast.success('Product sold entry updated successfully!');
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
            title={<Title text='Edit Product Sold by Supplier' />}
            className='p-4'
            id={props.id}
        >
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor='product' className='block mb-2 text-sm font-medium text-gray-900'>Product</label>
                    <select
                        id='product'
                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        value={formData.product}
                        onChange={handleChange}
                        required
                    >
                        <option value=''>Select Product</option>
                        {products.map(product => (
                            <option key={product._id} value={product._id}>{product.name}</option>
                        ))}
                    </select>
                </div>
                <div className='mb-4'>
                    <label htmlFor='supplier' className='block mb-2 text-sm font-medium text-gray-900'>Supplier</label>
                    <select
                        id='supplier'
                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        value={formData.supplier}
                        onChange={handleChange}
                        required
                    >
                        <option value=''>Select Supplier</option>
                        {suppliers.map(supplier => (
                            <option key={supplier._id} value={supplier._id}>{supplier.name}</option>
                        ))}
                    </select>
                </div>
                <div className='mb-4'>
                    <label htmlFor='price' className='block mb-2 text-sm font-medium text-gray-900'>Price</label>
                    <input
                        type='number'
                        id='price'
                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        placeholder='0.00'
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='quantity' className='block mb-2 text-sm font-medium text-gray-900'>Quantity</label>
                    <input
                        type='number'
                        id='quantity'
                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        placeholder='0'
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button
                        type='submit'
                        className='inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800'
                    >
                        Update Product
                    </button>
                </div>
            </form>
        </Drawer>
    );
};

export default EditSupplierProduct;
