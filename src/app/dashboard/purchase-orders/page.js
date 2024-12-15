/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import CreatePurchaseOrder from '@/components/Dashboard/PurchaseOrders/Create';
import DownloadPurchaseOrder from '@/components/Dashboard/PurchaseOrders/Download';
import EditPurchaseOrder from '@/components/Dashboard/PurchaseOrders/Edit';
import IndexViewPurchaseOrder from '@/components/Dashboard/PurchaseOrders/View';
import React, { useState } from 'react';

const page = () => {
    const [purchaseOrder, setPurchaseOrder] = useState('View');
    const [poData, setPOData] = useState(null);
    return (
        <>
            {
                purchaseOrder === 'View'
                    ? (
                        <IndexViewPurchaseOrder
                            setPurchaseOrder={setPurchaseOrder}
                            setPOData={setPOData}
                        />
                    )
                    : purchaseOrder === 'Download'
                        ? (
                            <DownloadPurchaseOrder
                                setPurchaseOrder={setPurchaseOrder}
                                poData={poData}
                                setPOData={setPOData}
                            />
                        )
                        : purchaseOrder === 'Edit'
                            ? (
                                <EditPurchaseOrder
                                    setPurchaseOrder={setPurchaseOrder}
                                    poData={poData}
                                    setPoData={setPOData}
                                />
                            )
                            : (
                                <CreatePurchaseOrder
                                    setPurchaseOrder={setPurchaseOrder}
                                />
                            )
            }
        </>
    );
};

export default page;