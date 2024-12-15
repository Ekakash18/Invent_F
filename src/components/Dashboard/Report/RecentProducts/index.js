import Card from '@/components/Generic/Card';
import useAPI from '@/hooks/useAPI';
import React, { useEffect, useState } from 'react';

const RecentProducts = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await useAPI.get('/products');
                const products = response.data;

                const sortedProducts = products.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));

                const last10Products = sortedProducts.slice(0, 10);

                if(last10Products.length > 0) {
                    setData(last10Products);
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
            width='xl'
        >
            <h1 className='text-lg font-medium text-secondary-700'>Recent Products</h1>
            {
                data !== null
                    ? (
                        <div className='overflow-x-auto'>
                            <table className='min-w-full bg-white text-sm'>
                                <thead>
                                    <tr>
                                        <th className='py-2 px-4 border-b text-center'>ID</th>
                                        <th className='py-2 px-4 border-b text-center'>Product Name</th>
                                        <th className='py-2 px-4 border-b text-center'>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data && data.map((product,index) => (
                                            <tr key={product.id} className='hover:bg-gray-100'>
                                                <td className='py-3 px-4 border-b text-center'>{index + 1}</td>
                                                <td className='py-3 px-4 border-b text-center'>{product.name}</td>
                                                <td className='py-3 px-4 border-b text-center'>{product.stock}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
                    : (
                        <div className='flex flex-col gap-4 items-center justify-center h-full'>
                            <h1 className='font-semibold text-secondary-500 text-2xl'>No Recent Products</h1>
                        </div>
                    )
            }
        </Card>
    );
};

export default RecentProducts;