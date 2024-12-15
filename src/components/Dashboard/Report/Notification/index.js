import Card from '@/components/Generic/Card';
import Icon from '@/components/Generic/Icon';
import useAPI from '@/hooks/useAPI';
import React, { useEffect, useState } from 'react';

const Notification = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await useAPI.get('/products');
                const products = response.data;
                const filteredProducts = products.filter(product => product.stock < 50);

                const sortedProducts = filteredProducts.sort((a, b) => a.stock - b.stock);

                const last10Products = sortedProducts.slice(0, 10);

                if(last10Products.length > 0) {
                    setData(last10Products);
                }
                else {
                    setData(null);
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
};

export default Notification;