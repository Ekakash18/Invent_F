import Container from '@/components/Generic/Container';
import Icon from '@/components/Generic/Icon';
import React, { useState, useEffect } from 'react';
import * as dayjs from 'dayjs';
import useAPI from '@/hooks/useAPI';
import { toast } from 'react-toastify';


const CreatePurchaseOrder = ({ setPurchaseOrder }) => {
    const [products, setProducts] = useState([]);
    const [rows, setRows] = useState(Array(6).fill({}));
    const [extraNotes, setExtraNotes] = useState('');
    const [shippingCharges, setShippingCharges] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await useAPI.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error);
            }
        };
        fetchData();
    }, []);

    const handleProductChange = (index, productId) => {
        const product = products.find(p => p._id === productId);
        const newRows = [...rows];
        newRows[index] = {
            ...newRows[index],
            productId,
            name: product.name,
            hsn: product.hsn,
            unitPrice: product.price,
            tax: product.tax,
        };
        setRows(newRows);
    };

    const handleRowChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index] = { ...newRows[index], [field]: value };
        setRows(newRows);
    };
    const calculateSubtotal = () => {
        return rows.reduce((total, row) => {
            if (row.quantity && row.unitPrice) {
                const amount = (row.quantity * row.unitPrice) * (1 + (row.tax / 100));
                return total + amount;
            }
            return total;
        }, 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const discountAmount = (discount / 100) * subtotal;
        const total = subtotal - discountAmount + parseFloat(shippingCharges || 0);
        return total.toFixed(2);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
    
        try {
            const rowsWithProductIds = rows
            .filter(row => row.productId)
            .map(row => ({
                product: row.productId,
                name: row.name,
                hsn: row.hsn,
                unitPrice: row.unitPrice,
                tax: row.tax,
                qty: row.quantity,
                amount: (row.quantity * row.unitPrice) * (1 + row.tax / 100),
            }));
            console.log(rowsWithProductIds);
            const response = await useAPI.post('/purchase-order', {
                name: event.target.name.value,
                address: event.target.address.value,
                companyName: event.target.companyName.value,
                phoneNo: event.target.phoneNo.value,
                paymentMode: event.target.paymentMode.value,
                quotationNo: event.target.quotationNo.value,
                poNo: event.target.poNo.value,
                products: rowsWithProductIds,
                extraDetails: {
                    notes: event.target.extraNotes.value,
                    shippingCost: parseFloat(event.target.shippingCharges.value),
                    discount: parseFloat(event.target.discount.value),
                    subTotal: calculateSubtotal(),
                    totalAmount: calculateTotal(),
                },
            });
    
            if (response.status === 201) {
                toast.success('Purchase order created successfully!');
                setPurchaseOrder('View');
            } else {
                toast.error('Failed to create purchase order. Please try again.');
            }
        } catch (error) {
            console.error('Error creating purchase order:', error);
            toast.error('Failed to create purchase order. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <Container>
            <div className='px-6 pt-4 pb-2 border-b flex flex-row gap-3'>
                <button className='rounded-full border w-8 h-8 flex justify-center items-center hover:bg-secondary-50' onClick={() => setPurchaseOrder('View')}>
                    <Icon name='arrow-long-left' className='w-4 h-4' />
                </button>
                <h1 className='font-semibold text-2xl' data-toggle='tooltip' data-placement='top' data-text='Product details and all can be seen here'>Create Purchase Order</h1>
            </div>
            <div className='overflow-hidden overflow-y-auto max-h-[780px] pb-20'>
                <section className='rounded-b-lg px-6 pt-4'>
                    <form onSubmit={handleSubmit}>
                        <div className='mx-auto w-full'>
                            <div className='grid grid-flow-col grid-cols-12 gap-6'>
                                <div className='mb-4 col-span-3'>
                                    <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900'>Name</label>
                                    <input type='text' id='name'
                                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                        placeholder='ABC'
                                        required=''
                                        autoComplete='off'
                                    />
                                </div>
                                <div className='mb-4 col-span-7'>
                                    <label htmlFor='address' className='block mb-2 text-sm font-medium text-gray-900'>Address</label>
                                    <input type='text' id='address'
                                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                        placeholder='ABC, ABC'
                                        required=''
                                        autoComplete='off'
                                    />
                                </div>
                                <div className='mb-4 col-span-2'>
                                    <label htmlFor='date' className='block mb-2 text-sm font-medium text-gray-900'>Date</label>
                                    <input type='text' id='date'
                                        className='border border-secondary-300 text-secondary-700 bg-secondary-200/55 cursor-not-allowed text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                        value={dayjs().format('DD/MM/YYYY')}
                                        required=''
                                        autoComplete='off'
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='grid grid-flow-col grid-cols-12 gap-6'>
                                <div className='mb-4 col-span-3'>
                                    <label htmlFor='companyName' className='block mb-2 text-sm font-medium text-gray-900'>Company Name</label>
                                    <input type='text' id='companyName'
                                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                        placeholder='ABC co.'
                                        required=''
                                        autoComplete='off'
                                    />
                                </div>
                                <div className='mb-4 col-span-3'>
                                    <label htmlFor='phoneNo' className='block mb-2 text-sm font-medium text-gray-900'>Phone no.</label>
                                    <input type='number' id='phoneNo'
                                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                        placeholder='98756426412'
                                        required=''
                                        autoComplete='off'
                                    />
                                </div>
                                <div className='mb-4 col-span-2'>
                                    <label htmlFor='paymentMode' className='block mb-2 text-sm font-medium text-gray-900'>Payment Mode</label>
                                    <select
                                        id='paymentMode'
                                        name='paymentMode'
                                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                        required
                                    >
                                        <option value='' disabled>Select payment mode</option>
                                        <option value='Cash'>Cash</option>
                                        <option value='Credit'>Credit</option>
                                        <option value='Bank Transfer'>Bank Transfer</option>
                                        <option value='Other'>Other</option>
                                    </select>
                                </div>
                                <div className='mb-4 col-span-2'>
                                    <label htmlFor='quotationNo' className='block mb-2 text-sm font-medium text-gray-900'>Quotation no.</label>
                                    <input type='text' id='quotationNo'
                                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                        placeholder='QUO12345'
                                        required=''
                                        autoComplete='off'
                                    />
                                </div>
                                <div className='mb-4 col-span-2'>
                                    <label htmlFor='poNo' className='block mb-2 text-sm font-medium text-gray-900'>Po no.</label>
                                    <input type='text' id='poNo'
                                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                        placeholder='POO1234'
                                        required=''
                                        autoComplete='off'
                                    />
                                </div>
                            </div>

                            {rows.map((row, index) => (
                                <div key={index} className='grid grid-flow-col grid-cols-12 border-r border-l border-gray-200'>
                                    <div className='mb-4 col-span-1 px-4 h-full flex items-center justify-start'>
                                        {index + 1}
                                    </div>
                                    <div className='mb-4 col-span-3 px-2 h-full flex items-center justify-start'>
                                        <select
                                            className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                            value={row.productId || ''}
                                            onChange={(e) => handleProductChange(index, e.target.value)}
                                        >
                                            <option value=''>Select Product</option>
                                            {products.map((product) => (
                                                <option key={product._id} value={product._id}>
                                                    {product.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='mb-4 col-span-2 px-2 h-full flex items-center justify-start'>
                                        <input
                                            type='text'
                                            className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                            placeholder='HSN'
                                            value={row.hsn || ''}
                                            disabled
                                        />
                                    </div>
                                    <div className='mb-4 col-span-2 px-2 h-full flex items-center justify-start'>
                                        <input
                                            type='text'
                                            className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                            placeholder='Unit Price'
                                            value={row.unitPrice || ''}
                                            disabled
                                        />
                                    </div>
                                    <div className='mb-4 col-span-2 px-2 h-full flex items-center justify-start'>
                                        <input
                                            type='text'
                                            className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                            placeholder='Tax'
                                            value={row.tax || ''}
                                            disabled
                                        />
                                    </div>
                                    <div className='mb-4 col-span-2 px-2 h-full flex items-center justify-start'>
                                        <input
                                            type='number'
                                            className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                            placeholder='Quantity'
                                            value={row.quantity || ''}
                                            onChange={(e) => handleRowChange(index, 'quantity', e.target.value)}
                                        />
                                    </div>
                                    <div className='mb-4 col-span-2 px-2 h-full flex items-center justify-start'>
                                        <input
                                            type='text'
                                            className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                            placeholder='Amount'
                                            value={
                                                row.quantity && row.unitPrice
                                                    ? ((row.quantity * row.unitPrice) * (1 + (row.tax / 100))).toFixed(2)
                                                    : ''
                                            }
                                            disabled
                                        />
                                    </div>
                                </div>
                            ))}

                            <div className='grid grid-flow-col grid-cols-12 gap-6 mt-6'>
                                <div className='col-span-6'>
                                    <label htmlFor='extraNotes' className='block mb-2 text-sm font-medium text-gray-900'>Extra Notes</label>
                                    <textarea
                                        id='extraNotes'
                                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                        placeholder='Add any additional information here...'
                                        value={extraNotes}
                                        onChange={(e) => setExtraNotes(e.target.value)}
                                    />
                                </div>
                                <div className='col-span-6'>
                                    <div className='grid grid-flow-col grid-cols-2 gap-6'>
                                        <div>
                                            <label htmlFor='subtotal' className='block mb-2 text-sm font-medium text-gray-900'>Subtotal</label>
                                            <input
                                                type='text'
                                                id='subtotal'
                                                className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                                value={calculateSubtotal().toFixed(2)}
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='shippingCharges' className='block mb-2 text-sm font-medium text-gray-900'>Shipping Charges</label>
                                            <input
                                                type='number'
                                                id='shippingCharges'
                                                className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                                value={shippingCharges}
                                                onChange={(e) => setShippingCharges(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='discount' className='block mb-2 text-sm font-medium text-gray-900'>Discount (%)</label>
                                            <input
                                                type='number'
                                                id='discount'
                                                className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                                value={discount}
                                                onChange={(e) => setDiscount(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='total' className='block mb-2 text-sm font-medium text-gray-900'>Total</label>
                                            <input
                                                type='text'
                                                id='total'
                                                className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                                value={calculateTotal()}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex justify-end'>
                                <button
                                    type='submit'
                                    disabled={loading}
                                    className='inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800'
                                >
                                    {loading ? 'Submitting...' : 'Create PO'}
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </Container>
    );
};

export default CreatePurchaseOrder;
