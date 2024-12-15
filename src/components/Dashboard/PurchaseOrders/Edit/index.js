import Container from '@/components/Generic/Container';
import Icon from '@/components/Generic/Icon';
import React, { useState, useEffect } from 'react';
import * as dayjs from 'dayjs';
import useAPI from '@/hooks/useAPI';
import { toast } from 'react-toastify';

const EditPurchaseOrder = ({ setPurchaseOrder, setPoData, poData }) => {
    const [products, setProducts] = useState([]);
    const [rows, setRows] = useState(poData.products || Array(6).fill({}));
    const [extraNotes, setExtraNotes] = useState(poData.extraDetails?.notes || '');
    const [shippingCharges, setShippingCharges] = useState(poData.extraDetails?.shippingCost || 0);
    const [discount, setDiscount] = useState(poData.extraDetails?.discount || 0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await useAPI.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching product data:', error);
                setError(error);
            }
        };
        fetchData();
    }, []);
    

    const handleProductChange = (index, productId) => {
        const product = products.find(p => p._id === productId);
        const newRows = [...rows];
        const unitPrice = product.price;
        const taxRate = product.tax;
        const qty = newRows[index].qty || 1;
        const taxAmount = (unitPrice * qty * taxRate) / 100;
        const amount = unitPrice * qty + taxAmount;
    
        newRows[index] = {
            ...newRows[index],
            productId,
            name: product.name,
            hsn: product.hsn,
            unitPrice,
            tax: taxRate,
            amount,
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
            if (row.qty && row.unitPrice) {
                const amount = (row.qty * row.unitPrice) * (1 + (row.tax / 100));
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
                .filter(row => row.product)
                .map(row => ({
                    product: row.product,
                    name: row.name,
                    hsn: row.hsn,
                    unitPrice: row.unitPrice,
                    tax: row.tax,
                    qty: row.qty,
                    amount: (row.qty * row.unitPrice) * (1 + row.tax / 100),
                }));

            const response = await useAPI.put(`/purchase-order/${poData._id}`, {
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

            if (response.status === 200) {
                toast.success('Purchase order updated successfully!');
                setPurchaseOrder('View');
            } else {
                toast.error('Failed to update purchase order. Please try again.');
            }
        } catch (error) {
            console.error('Error updating purchase order:', error);
            toast.error('Failed to update purchase order. Please try again.');
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
                <h1 className='font-semibold text-2xl'>Edit Purchase Order</h1>
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
                                        defaultValue={poData.name}
                                    />
                                </div>
                                <div className='mb-4 col-span-7'>
                                    <label htmlFor='address' className='block mb-2 text-sm font-medium text-gray-900'>Address</label>
                                    <input type='text' id='address'
                                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                        placeholder='ABC, ABC'
                                        required=''
                                        autoComplete='off'
                                        defaultValue={poData.address}
                                    />
                                </div>
                                <div className='mb-4 col-span-2'>
                                    <label htmlFor='date' className='block mb-2 text-sm font-medium text-gray-900'>Date</label>
                                    <input type='text' id='date'
                                        className='border border-secondary-300 text-secondary-700 bg-secondary-200/55 cursor-not-allowed text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                        value={dayjs(poData.createdOn).format('DD/MM/YYYY')}
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
                                        defaultValue={poData.companyName}
                                    />
                                </div>
                                <div className='mb-4 col-span-3'>
                                    <label htmlFor='phoneNo' className='block mb-2 text-sm font-medium text-gray-900'>Phone no.</label>
                                    <input type='number' id='phoneNo'
                                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                        placeholder='98756426412'
                                        required=''
                                        autoComplete='off'
                                        defaultValue={poData.phoneNo}
                                    />
                                </div>
                                <div className='mb-4 col-span-2'>
                                    <label htmlFor='paymentMode' className='block mb-2 text-sm font-medium text-gray-900'>Payment Mode</label>
                                    <select
                                        id='paymentMode'
                                        name='paymentMode'
                                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                        required
                                        defaultValue={poData.paymentMode}
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
                                        placeholder='Quotation number'
                                        required=''
                                        autoComplete='off'
                                        defaultValue={poData.quotationNo}
                                    />
                                </div>
                                <div className='mb-4 col-span-2'>
                                    <label htmlFor='poNo' className='block mb-2 text-sm font-medium text-gray-900'>PO no.</label>
                                    <input type='text' id='poNo'
                                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                        placeholder='PO number'
                                        required=''
                                        autoComplete='off'
                                        defaultValue={poData.poNo}
                                    />
                                </div>
                            </div>
                            <div className='grid grid-flow-col grid-cols-12 gap-6'>
                                <div className='col-span-6'>
                                    <label className='block mb-2 text-sm font-medium text-gray-900'>Products</label>
                                    {rows.map((row, index) => { 
                                        console.log(row._id, products.map(p => p._id));
                                        return(
                                        <div key={index} className='flex items-center mb-4'>
                                            <select
                                                id={`product-${index}`}
                                                className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-1/2 p-2 mr-4'
                                                value={row.product || ''}
                                                onChange={(e) => handleProductChange(index, e.target.value)}
                                            >
                                                <option value=''>Select a product</option>
                                                {products.map(product => (
                                                    <option key={product._id} value={product._id}>
                                                        {product.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                type='text'
                                                placeholder='HSN'
                                                className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-1/4 p-2 mr-4'
                                                value={row.hsn || ''}
                                                onChange={(e) => handleRowChange(index, 'quantity', e.target.value)}
                                            />
                                            <input
                                                type='number'
                                                placeholder='Unit Price'
                                                className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-1/4 p-2'
                                                value={row.unitPrice || ''}
                                                onChange={(e) => handleRowChange(index, 'unitPrice', e.target.value)}
                                            />
                                            <input
                                                type='number'
                                                placeholder='Tax'
                                                className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-1/4 p-2 mr-4'
                                                value={row.tax || ''}
                                                onChange={(e) => handleRowChange(index, 'quantity', e.target.value)}
                                            />
                                            <input
                                                type='number'
                                                placeholder='Quantity'
                                                className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-1/4 p-2 mr-4'
                                                value={row.qty || ''}
                                                onChange={(e) => handleRowChange(index, 'qty', e.target.value)}
                                            />
                                            <input
                                                type='number'
                                                placeholder='Amount'
                                                className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-1/4 p-2 mr-4'
                                                value={
                                                    row.qty && row.unitPrice
                                                        ? ((row.qty * row.unitPrice) * (1 + (row.tax / 100))).toFixed(2)
                                                        : ''
                                                }
                                                onChange={(e) => handleRowChange(index, 'amount', e.target.value)}
                                            />
                                        </div>
                                    );
                                    })}
                                </div>
                                <div className='col-span-6'>
                                    <label className='block mb-2 text-sm font-medium text-gray-900'>Subtotal</label>
                                    <div className='p-2 bg-secondary-50 border border-secondary-300 text-secondary-900 rounded-lg'>
                                        {calculateSubtotal()}
                                    </div>
                                    <label className='block mb-2 text-sm font-medium text-gray-900 mt-4'>Discount (%)</label>
                                    <input
                                        type='number'
                                        id='discount'
                                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2'
                                        placeholder='0'
                                        value={discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                    />
                                    <label className='block mb-2 text-sm font-medium text-gray-900 mt-4'>Shipping Charges</label>
                                    <input
                                        type='number'
                                        id='shippingCharges'
                                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2'
                                        placeholder='0'
                                        value={shippingCharges}
                                        onChange={(e) => setShippingCharges(e.target.value)}
                                    />
                                    <label className='block mb-2 text-sm font-medium text-gray-900 mt-4'>Total</label>
                                    <div className='p-2 bg-secondary-50 border border-secondary-300 text-secondary-900 rounded-lg'>
                                        {calculateTotal()}
                                    </div>
                                </div>
                            </div>
                            <div className='mt-6'>
                                <label htmlFor='extraNotes' className='block mb-2 text-sm font-medium text-gray-900'>Extra Notes</label>
                                <textarea
                                    id='extraNotes'
                                    rows='4'
                                    className='block p-2.5 w-full text-sm text-secondary-900 bg-secondary-50 rounded-lg border border-secondary-300 focus:ring-primary-500 focus:border-primary-500'
                                    placeholder='Write your notes here...'
                                    value={extraNotes}
                                    onChange={(e) => setExtraNotes(e.target.value)}
                                ></textarea>
                            </div>
                            <div className='flex justify-end mt-6'>
                                <button
                                    type='submit'
                                    className='px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50'
                                    disabled={loading}
                                >
                                    {loading ? 'Updating...' : 'Update Purchase Order'}
                                </button>
                            </div>
                            {error && (
                                <div className='mt-4 text-red-500'>
                                    {error.message || 'An error occurred while updating the purchase order.'}
                                </div>
                            )}
                        </div>
                    </form>
                </section>
            </div>
        </Container>
    );
};

export default EditPurchaseOrder;
