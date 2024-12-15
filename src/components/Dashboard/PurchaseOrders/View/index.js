import Container from '@/components/Generic/Container';
import Dropdown from '@/components/Generic/Dropdown';
import Icon from '@/components/Generic/Icon';
import useAPI from '@/hooks/useAPI';
import { useToggleElement } from '@/hooks/useToggleElement';
import useAuthStore from '@/store/AuthStore';
import React, { useEffect, useState } from 'react';
import DeleteItem from '../../DeleteItem';

const IndexViewPurchaseOrder = ({ setPurchaseOrder, setPOData }) => {
    const {
        toggle: toggleDeletePO,
        close: closeDropdown,
    } = useToggleElement();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterPayment, setFilterPayment] = useState('');
    const [openModalId, setOpenModalId] = useState(null);
    const [editData, setEditData] = useState(null);
    const [dataUpdated, setDataUpdated] = useState(false);
    const role = useAuthStore((state) => state.role);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await useAPI.get('/purchase-order');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        setDataUpdated(false);
    }, [dataUpdated]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const filteredData = data?.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterPayment ? item.name === filterPayment : true)
    );
    const getKeyForSort = (data) => {
        if (data && data.length > 0) {
            return Object.keys(data[0]);
        }
        return [];
    };
    const sortByKey = getKeyForSort(data);
    const sortedData = filteredData?.sort((a, b) => {
        let comparison = 0;
        const aValue = a[sortOption];
        const bValue = b[sortOption];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            comparison = aValue.localeCompare(bValue);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
            comparison = aValue - bValue;
        }

        return sortOrder === 'asc' ? comparison : -comparison;
    });
    const handleSort = (option) => {
        setSortOption(option);
        setSortOrder((prevOrder) => prevOrder === 'asc' ? 'desc' : 'asc');
    };

    const toggleEditPOHandler = (id, po) => {
        const cleanId = id.replace('drawer', 'dropdown');
        setPurchaseOrder('Edit');
        setEditData(po);
        setPOData(po);
        closeDropdown(cleanId);
    };

    const toggleDownloadPOHandler = (id, po) => {
        const cleanId = id.replace('drawer', 'dropdown');
        setPurchaseOrder('Download');
        setEditData(po);
        setPOData(po);
        closeDropdown(cleanId);
    };

    const toggleDeleteHandler = (id, po) => {
        const cleanId = id.replace('modal', 'dropdown');

        setOpenModalId(id);
        setEditData(po);
        closeDropdown(cleanId);
        toggleDeletePO(id);
    };
    return (
        <>
            <Container>
                <div className='px-6 pt-4 pb-2 border-b flex flex-row justify-between items-center'>
                    <h1 className='font-semibold text-2xl' data-toggle='tooltip' data-placement='top' data-text='Product details and all can be seen here'>Purchase Order</h1>
                </div>
                <section className='rounded-b-lg'>
                    <div className='mx-auto w-full'>
                        <div className='bg-white relative rounded-b-lg rounded-t-0'>
                            <div className='flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4'>
                                <div className='w-full md:w-1/2'>
                                    <div className='flex items-center'>
                                        <label htmlFor='simple-search' className='sr-only'>Search</label>
                                        <div className='relative w-full'>
                                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                                <svg aria-hidden='true' className='w-5 h-5 text-secondary-500' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                                                    <path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd' />
                                                </svg>
                                            </div>
                                            <input type='text' id='simple-search'
                                                className='bg-secondary-50 border border-secondary-300 text-secondary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 '
                                                placeholder='Search'
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                required=''
                                                autoComplete='off'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0'>
                                    <button type='button' onClick={() => setPurchaseOrder('Create')} className='flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2'>
                                        <Icon name='plus' className='w-4 h-4' />
                                        Create Purchase Order
                                    </button>
                                    <div className='flex items-center space-x-3 w-full md:w-auto'>
                                        <Dropdown
                                            id='sort-product'
                                            icon={<Icon name='arrows-up-down' className='w-4 h-4' />}
                                            buttonName='Sort'
                                        >
                                            <ul className='py-1 text-sm text-secondary-700'>
                                                {
                                                    sortByKey.filter((keyName) => keyName !== '_id' && keyName !== '__v' && keyName !== 'address' && keyName !== 'phoneNo' && keyName !== 'quotationNo' && keyName !== 'updatedOn' && keyName !== 'products' && keyName !== 'extraDetails')
                                                        .map((keyName, index) => (
                                                            <li key={index}>
                                                                <button className={`py-2 px-4 hover:bg-secondary-100 w-full text-start capitalize flex justify-between ${sortOption === keyName && 'bg-secondary-100'}`}
                                                                    onClick={() => handleSort(keyName)}
                                                                >
                                                                    <span>{keyName}</span>
                                                                    <span>{sortOption === keyName && (sortOrder === 'asc' ? '▲' : '▼')}</span>
                                                                </button>
                                                            </li>
                                                        ))
                                                }
                                            </ul>
                                        </Dropdown>
                                        {/* <Dropdown
                                            id='filter-employees'
                                            icon={<Icon name='funnel' className='w-4 h-4' />}
                                            buttonName='Filter'
                                            position='right'
                                        >
                                            <ul className='py-1 text-sm text-secondary-700'>
                                                {
                                                    [...new Set(data?.map(item => item.paymentMode))].map(paymentMode => (
                                                        <li key={paymentMode}>
                                                            <button
                                                                className={`py-2 px-4 hover:bg-secondary-100 w-full text-start capitalize flex justify-between ${sortOption === paymentMode && 'bg-secondary-100'}`}
                                                                onClick={() => setFilterStatus(paymentMode)}
                                                            >
                                                                <span>{paymentMode}</span>
                                                            </button>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </Dropdown> */}
                                    </div>
                                </div>
                            </div>
                            <div className='overflow-hidden overflow-y-auto min-h-[640px] max-h-min'>
                                <table className='w-full text-sm text-left text-gray-500'>
                                    <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                                        <tr>
                                            <th scope='col' className='px-4 py-3'>Customer name</th>
                                            <th scope='col' className='px-4 py-3'>Address</th>
                                            <th scope='col' className='px-4 py-3'>PO no.</th>
                                            <th scope='col' className='px-4 py-3'>Amount</th>
                                            <th scope='col' className='px-4 py-3'>Payment</th>
                                            <th scope='col' className='px-4 py-3'>Date</th>
                                            <th scope='col' className='px-4 py-3'>
                                                <span className='sr-only'>Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            sortedData.map((po, index) => {
                                                const dropdownId = po._id + 'dropdown';
                                                const drawerId = po._id + 'drawer';
                                                const modalId = po._id + 'modal';

                                                return (
                                                    <tr className='border-b' key={index}>
                                                        <th scope='row' className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap capitalize'>{po.name}</th>
                                                        <td className='px-4 py-3 capitalize'>{po.address}</td>
                                                        <td className='px-4 py-3'>{po.poNo}</td>
                                                        <td className='px-4 py-3'>{po.extraDetails.totalAmount}</td>
                                                        <td className='px-4 py-3'>{po.paymentMode}</td>
                                                        <td className='px-4 py-3'>{po.createdOn}</td>
                                                        <td className='px-4 py-3 flex items-center justify-end'>
                                                            <Dropdown
                                                                icon={<Icon name='ellipsis-horizontal' className='w-4 h-4' />}
                                                                buttonBorder={false}
                                                                position='right'
                                                                className='p-2'
                                                                id={dropdownId}
                                                            >
                                                                <ul>
                                                                    <li>
                                                                        <button
                                                                            className='w-full hover:bg-secondary-50 text-start p-2 rounded'
                                                                            onClick={() => toggleDownloadPOHandler(drawerId, po)}
                                                                        >
                                                                            Download
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button
                                                                            className='w-full hover:bg-secondary-50 text-start p-2 rounded'
                                                                            onClick={() => toggleEditPOHandler(drawerId, po)}
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                    </li>
{
role === 'manager' && (
<li>
<button
className='w-full hover:bg-red-50 text-start p-2 rounded'
onClick={() => toggleDeleteHandler(modalId, po)}
>
Delete
</button>
</li>
)
}
                                                                </ul>
                                                            </Dropdown>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <nav className='flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4' aria-label='Table navigation'>
                            </nav>
                        </div>
                    </div>
                </section>
            </Container>
            {
                openModalId ? (
                    <DeleteItem
                        path='purchase-order'
                        key={openModalId}
                        id={openModalId}
                        data={editData}
                        onUpdate={setDataUpdated}
                    />
                ) : null
            }
        </>
    );
};

export default IndexViewPurchaseOrder;