import Container from '@/components/Generic/Container';
import Icon from '@/components/Generic/Icon';
import React from 'react';
import * as dayjs from 'dayjs';

const CreatePurchaseOrderOld = ({ setPurchaseOrder }) => {
    const rows = [];
    for (let i = 1; i <= 6; i++) {
        rows.push(
            <div key={i} className='grid grid-flow-col grid-cols-12 border-r border-l border-gray-200'>
                <div className='mb-4 col-span-1 px-4 h-full flex items-center justify-start'>
                    {i}
                </div>
                <div className='mb-4 col-span-3 px-2 h-full flex items-center justify-start'>
                    <input
                        type='text'
                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        placeholder='Sports, Equipments'
                        required
                        autoComplete='off'
                    />
                </div>
                <div className='mb-4 col-span-2 px-2 h-full flex items-center justify-start'>
                    <input
                        type='text'
                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        placeholder='#0048CD'
                        required
                        autoComplete='off'
                    />
                </div>
                <div className='mb-4 col-span-2 px-2 h-full flex items-center justify-start'>
                    <input
                        type='text'
                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        placeholder='$158'
                        required
                        autoComplete='off'
                    />
                </div>
                <div className='mb-4 col-span-2 px-2 h-full flex items-center justify-start'>
                    <input
                        type='text'
                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        placeholder='20%'
                        required
                        autoComplete='off'
                    />
                </div>
                <div className='mb-4 col-span-2 px-4 h-full flex items-center justify-start'>
                    <input
                        type='text'
                        className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                        placeholder='$1589'
                        required
                        autoComplete='off'
                    />
                </div>
            </div>
        );
    }
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
                    <div className='mx-auto w-full'>
                        <div className='grid grid-flow-col grid-cols-12 gap-6'>
                            <div className='mb-4 col-span-3'>
                                <label htmlFor='title' className='block mb-2 text-sm font-medium text-gray-900'>Name</label>
                                <input type='text' id='title'
                                    className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                    value=''
                                    placeholder='ABC'
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    required=''
                                    autoComplete='off'
                                />
                            </div>
                            <div className='mb-4 col-span-7'>
                                <label htmlFor='title' className='block mb-2 text-sm font-medium text-gray-900'>Address</label>
                                <input type='text' id='title'
                                    className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                    placeholder='ABC, ABC'
                                    value=''
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    required=''
                                    autoComplete='off'
                                />
                            </div>
                            <div className='mb-4 col-span-2'>
                                <label for='status' className='block mb-2 text-sm font-medium text-gray-900'>Date</label>
                                <input type='text' id='Status'
                                    className='border border-secondary-300 text-secondary-700 bg-secondary-200/55 cursor-not-allowed text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                    placeholder=''
                                    value={dayjs().format('DD/MM/YYYY')}
                                    required=''
                                    autoComplete='off'
                                    disabled
                                />
                            </div>
                        </div>
                        <div className='grid grid-flow-col grid-cols-12 gap-6'>
                            <div className='mb-4 col-span-3'>
                                <label htmlFor='title' className='block mb-2 text-sm font-medium text-gray-900'>Company Name</label>
                                <input type='text' id='title'
                                    className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                    placeholder='ABC co.'
                                    value=''
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    required=''
                                    autoComplete='off'
                                />
                            </div>
                            <div className='mb-4 col-span-3'>
                                <label htmlFor='title' className='block mb-2 text-sm font-medium text-gray-900'>Phone no.</label>
                                <input type='number' id='title'
                                    className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                    placeholder='98756426412'
                                    value=''
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    required=''
                                    autoComplete='off'
                                />
                            </div>
                            <div className='mb-4 col-span-2'>
                                <label htmlFor='title' className='block mb-2 text-sm font-medium text-gray-900'>Payment</label>
                                <input type='text' id='title'
                                    className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                    placeholder='$75000'
                                    value=''
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    required=''
                                    autoComplete='off'
                                />
                            </div>
                            <div className='mb-4 col-span-2'>
                                <label htmlFor='title' className='block mb-2 text-sm font-medium text-gray-900'>Quotation no.</label>
                                <input type='text' id='title'
                                    className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                    placeholder='14789633'
                                    value=''
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    required=''
                                    autoComplete='off'
                                />
                            </div>
                            <div className='mb-4 col-span-2'>
                                <label htmlFor='title' className='block mb-2 text-sm font-medium text-gray-900'>PO No.</label>
                                <input type='text' id='title'
                                    className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                    placeholder='00045'
                                    value=''
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    required=''
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                        <div className='grid grid-flow-col grid-cols-12 bg-primary-100 rounded-t-lg border-b border-gray-200'>
                            <div className='mb-4 col-span-1 px-4 h-full flex items-center justify-start'>
                                Sl
                            </div>
                            <div className='mb-4 col-span-3 px-2 h-full flex items-center justify-start'>
                                Product name
                            </div>
                            <div className='mb-4 col-span-2 px-2 h-full flex items-center justify-start'>
                                HSN
                            </div>
                            <div className='mb-4 col-span-2 px-2 h-full flex items-center justify-start'>
                                Price
                            </div>
                            <div className='mb-4 col-span-2 px-2 h-full flex items-center justify-start'>
                                Tax
                            </div>
                            <div className='mb-4 col-span-2 px-4 h-full flex items-center justify-start'>
                                Amount
                            </div>
                        </div>
                        {rows}
                        <div className='grid grid-flow-col grid-cols-12 gap-6 bg-primary-100'>
                            <div className='mb-4 col-span-8 px-4 h-full flex items-center justify-start'>
                                Sub Total
                            </div>
                            <div className='mb-4 col-span-2 px-4 h-full flex items-center justify-end'>
                                <span className='font-bold text-gray-700'>$270</span>
                            </div>
                            <div className='mb-4 col-span-2 px-4 h-full flex items-center justify-end'>
                                <span className='font-bold text-gray-700'>$45782</span>
                            </div>
                        </div>
                        <div className='grid grid-flow-col grid-cols-12 border rounded-b-lg'>
                            <div className='mb-4 col-span-6 px-4 h-full flex items-center justify-start'>
                                <textarea
                                    className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                    rows='8'
                                    placeholder='Take a notes here'
                                >
                                </textarea>
                            </div>
                            <div className='my-4 col-span-6 px-4 h-full'>
                                <div className='col-span-12 flex items-center justify-end'>
                                    <div className='flex justify-center items-center gap-4'>
                                        <h1>Shipping</h1>
                                        <div>
                                            <input type='text' id='title'
                                                className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                                placeholder='$148'
                                                value=''
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                required=''
                                                autoComplete='off'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-12 flex items-center justify-end'>
                                    <div className='flex justify-center items-center gap-4'>
                                        <h1>Discount</h1>
                                        <div>
                                            <input type='text' id='title'
                                                className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                                placeholder='$58'
                                                value=''
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                required=''
                                                autoComplete='off'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-12 flex items-center justify-end'>
                                    <div className='flex justify-center items-center gap-4'>
                                        <h1>Total</h1>
                                        <div>
                                            <input type='text' id='title'
                                                className='bg-secondary-50 border border-secondary-300 cursor-not-allowed text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 my-2'
                                                placeholder='$5978'
                                                value=''
                                                disabled
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                required=''
                                                autoComplete='off'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end items-end mt-4'>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-6 py-3 '>Create Purchase Order</button>
                        </div>
                    </div>
                </section>
            </div>

        </Container>
    );
};

export default CreatePurchaseOrderOld;