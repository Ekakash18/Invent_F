import Card from '@/components/Generic/Card';
import useAPI from '@/hooks/useAPI';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TopCustomers = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await useAPI.get('/purchase-order');
                const po = response.data;
                const sortedPo = po.sort((a, b) => new Date(b.extraDetails.totalAmount) - new Date(a.extraDetails.totalAmount));
                const last10Po = sortedPo.slice(0, 10);

                if(last10Po.length > 0) {
                    setData(last10Po);
                }
                else {
                    setData(null);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <Card
            width='sm'
            height='sm'
        >
            <h1 className='text-lg font-medium text-secondary-700'>Top Customers</h1>
            <div className='overflow-x-auto'>
                <table className='min-w-full bg-white text-secondary-600 text-sm'>
                    <thead>
                        <tr>
                            <th className='py-2 px-4 border-b text-center'>Sl</th>
                            <th className='py-2 px-4 border-b text-center'>Customer Name</th>
                            <th className='py-2 px-4 border-b text-center'>Paid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.map((customer, index) => (
                                <tr key={customer.poNo} className='hover:bg-gray-100'>
                                    <td className='py-2 px-4 border-b text-center'>{index + 1}</td>
                                    <td className='py-2 px-4 border-b text-center'>{customer.name}</td>
                                    <td className='py-2 px-4 border-b text-center'>${customer.extraDetails.totalAmount}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default TopCustomers;