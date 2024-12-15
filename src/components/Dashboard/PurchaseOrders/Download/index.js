import Container from '@/components/Generic/Container';
import Icon from '@/components/Generic/Icon';
import React, { useState, useEffect, useRef } from 'react';
import * as dayjs from 'dayjs';
import useAPI from '@/hooks/useAPI';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const DownloadPurchaseOrder = ({ setPurchaseOrder, setPoData, poData }) => {
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
    const contentRef = useRef(null);

    const handleDownloadPdf = async () => {
        const element = contentRef.current;
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 400, 250);
        pdf.save('document.pdf');
    };
    const heading = 'Purchase Order';
    return (
        <Container>
            <div className='px-6 pt-4 pb-2 border-b flex flex-row gap-3'>
                <button className='rounded-full border w-8 h-8 flex justify-center items-center hover:bg-secondary-50' onClick={() => setPurchaseOrder('View')}>
                    <Icon name='arrow-long-left' className='w-4 h-4' />
                </button>
                <h1 className='font-semibold text-2xl'>Download Purchase Order</h1>
            </div>
            <div className='overflow-hidden overflow-y-auto max-h-[780px] pb-20' ref={contentRef}>
                <section className='rounded-b-lg px-6 pt-4'>
                    <div className='mx-auto w-full'>
                    <div className='mb-8 mt-6 text-start text-2xl'> {heading} </div>
                        <div className='grid grid-flow-col grid-cols-12 gap-6'>
                            <div className='mb-4 col-span-full'>
                                <div>Customer Name: {poData.name}</div>
                                <div>Address: {poData.address}</div>
                                <div>Company: {poData.companyName}</div>
                                <div>Phone No: {poData.phoneNo}</div>
                                <div>Payment: {poData.paymentMode}</div>
                                <div>Date: {dayjs(poData.createdOn).format('DD/MM/YYYY')}</div>
                            </div>
                        </div>
                        <div className='grid grid-flow-col grid-cols-12 gap-6'>
                            <div className='col-span-6 min-h-[240px]'>
                                <label className='block mb-2 text-sm font-medium text-gray-900'>Products</label>
                                {rows.map((row, index) => {
                                    return (
                                        <div key={index} className='flex gap-4 items-center mb-4'>
                                            <div>
                                            <label className='block font-bold text-gray-900 '>Products:</label>{row.name}
                                            </div>
                                            <div>
                                            <label className='block font-bold text-gray-900 '>HSN code:</label>{row.hsn}
                                            </div>
                                            <div>
                                            <label className='block font-bold text-gray-900 '>Unit Price:</label>{row.unitPrice}
                                            </div>
                                            <div>
                                            <label className='block font-bold text-gray-900 '>Tax%:</label>{row.tax}
                                            </div>
                                            <div>
                                            <label className='block font-bold text-gray-900 '>Quantity:</label>{row.qty}
                                            </div>
                                            <div>
                                            <label className='block font-bold text-gray-900 '>Ammount:</label> ${row.amount}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className='w-1/2'>
                            <div className='p-2 text-secondary-900 rounded-lg'>
                                Subtotal:  ${calculateSubtotal()}
                            </div>
                            <div className='p-2 text-secondary-900 rounded-lg'>
                                Discount(%):  {discount}
                            </div>
                            <div className='p-2 text-secondary-900 rounded-lg'>
                                Shipping Charges:  ${shippingCharges}
                            </div>
                            <div className='p-2 text-secondary-900 rounded-lg'>
                                Total:  ${calculateTotal()}
                            </div>
                        </div>
                        <div className='w-1/2 my-4'>
                            <div className='block mb-2 text-sm font-medium text-gray-900'>Extra Notes:</div>
                            <div>{extraNotes}</div>
                        </div>
                        <div className='flex justify-end mt-6'>
                            <button
                                onClick={handleDownloadPdf}
                                className='px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50'
                                disabled={loading}
                            >
                                {loading ? 'Downloading...' : 'Download Purchase Order'}
                            </button>
                        </div>
                        {error && (
                            <div className='mt-4 text-red-500'>
                                {error.message || 'An error occurred while updating the purchase order.'}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </Container>
    );
};

export default DownloadPurchaseOrder;
