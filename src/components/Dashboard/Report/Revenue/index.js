'use client';
import Card from '@/components/Generic/Card';
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import useAPI from '@/hooks/useAPI';

const Revenue = () => {
    const [revenue, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Revenue',
            data: [65, 59, 80, 81, 56, 55, 40, 70, 60, 75, 85, 90],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)',
                'rgb(255, 206, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)',
                'rgb(54, 162, 235)'
            ],
            borderWidth: 1
        }]
    };
    
    const options = {
        layout: {
            padding: {
                top: 0,
                bottom: 0,
                right: 0,
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await useAPI.get('/purchase-order');
                const revenue = response.data;
                const totalAmount = revenue.reduce((sum, rev) => sum + rev.extraDetails.totalAmount, 0);
    
                console.log('Total Amount:', totalAmount);
                setData(totalAmount);
            } catch (error) {
                console.error('Error fetching product data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);
    return (
        <Card
            width='md'
            height='h-[560px]'
        >
            <h1 className='text-2xl font-medium text-secondary-700'>Revenue</h1>
            <h2 className='text-4xl font-bold text-green-600 my-4'>${revenue}</h2>
        </Card>
    );
};

export default Revenue;