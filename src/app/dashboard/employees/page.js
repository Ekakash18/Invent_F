/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import Container from '@/components/Generic/Container';
import Dropdown from '@/components/Generic/Dropdown';
import EmptyContainer from '@/components/Generic/EmptyContainer';
import Icon from '@/components/Generic/Icon';
import { useToggleElement } from '@/hooks/useToggleElement';
import React, { useEffect, useState } from 'react';
import AddEmployee from '@/components/Dashboard/Employees/AddEmployee';
import EditEmployee from '@/components/Dashboard/Employees/EditEmployee';
import DeleteItem from '@/components/Dashboard/DeleteItem';
import useAPI from '@/hooks/useAPI';
import useAuthStore from '@/store/AuthStore';

const page = () => {
    const {
        toggle: toggleEmployeeDrawer,
        toggle: toggleEditEmployee,
        toggle: toggleDeleteEmployee,
        close: closeDropdown,
    } = useToggleElement();
    const role = useAuthStore((state) => state.role);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterStatus, setFilterStatus] = useState('');
    const [openDrawerId, setOpenDrawerId] = useState(null);
    const [openModalId, setOpenModalId] = useState(null);
    const [editData, setEditData] = useState(null);
    const [dataUpdated, setDataUpdated] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await useAPI.get('/employees');
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
        (filterStatus === '' ? true : item.status === filterStatus)
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

    const toggleEditEmployeeHandler = (id, employee) => {
        const cleanId = id.replace('drawer', 'dropdown');

        setOpenDrawerId(id);
        setEditData(employee);
        closeDropdown(cleanId);
        toggleEditEmployee(id);
    };

    const toggleDeleteHandler = (id, employee) => {
        const cleanId = id.replace('modal', 'dropdown');

        setOpenModalId(id);
        setEditData(employee);
        closeDropdown(cleanId);
        toggleDeleteEmployee(id);
    };

    return (
        <>
            <Container>
                <div className='px-6 pt-4 pb-2 border-b flex flex-row justify-between items-center'>
                    <h1 className='font-semibold text-2xl' data-toggle='tooltip' data-placement='top' data-text='Employee details and all can be seen here'>Employees</h1>
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
                                    {
                                        role === 'manager' && (
                                            <button type='button' onClick={() => toggleEmployeeDrawer('add-employee-data')} className='flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2'>
                                                <Icon name='plus' className='w-4 h-4' />
                                                Add Employees
                                            </button>
                                        )
                                    }
                                    <div className='flex items-center space-x-3 w-full md:w-auto'>
                                        <Dropdown
                                            id='sort-employees'
                                            icon={<Icon name='arrows-up-down' className='w-4 h-4' />}
                                            buttonName='Sort'
                                        >
                                            <ul className='py-1 text-sm text-secondary-700'>
                                                {
                                                    sortByKey.filter((keyName) => keyName !== '_id' && keyName !== 'password' && keyName !== '__v' && keyName !== 'updatedOn' && keyName !== 'email')
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
                                                    [...new Set(data?.map(item => item.status))].map(status => (
                                                        <li key={status}>
                                                            <button
                                                                className={`py-2 px-4 hover:bg-secondary-100 w-full text-start capitalize flex justify-between ${sortOption === status && 'bg-secondary-100'}`}
                                                                onClick={() => setFilterStatus(status)}
                                                            >
                                                                <span>{status === true ? 'Active' : 'InActive'}</span>
                                                            </button>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </Dropdown> */}
                                    </div>
                                </div>
                            </div>
                            {
                                sortedData?.length ?
                                    <>
                                        <div className='overflow-hidden overflow-y-auto min-h-[680px] max-h-min'>
                                            <table className='w-full text-sm text-left text-gray-500'>
                                                <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                                                    <tr>
                                                        <th scope='col' className='px-4 py-3'>Name</th>
                                                        <th scope='col' className='px-4 py-3'>Gender</th>
                                                        <th scope='col' className='px-4 py-3'>Role</th>
                                                        <th scope='col' className='px-4 py-3'>status</th>
                                                        <th scope='col' className='px-4 py-3'>Joined On</th>
                                                        <th scope='col' className='px-4 py-3'>
                                                            <span className='sr-only'>Actions</span>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {sortedData.map((employee) => {
                                                        const dropdownId = employee._id + 'dropdown';
                                                        const drawerId = employee._id + 'drawer';
                                                        const modalId = employee._id + 'modal';

                                                        return (
                                                            <tr className='border-b' key={employee._id}>
                                                                <th scope='row' className='px-4 py-3 font-medium text-secondary-900 whitespace-nowrap capitalize'>{employee.name}</th>
                                                                <td className='px-4 py-3 capitalize'>{employee.gender}</td>
                                                                <td className='px-4 py-3 capitalize'>{employee.role}</td>
                                                                <td className='px-4 py-3 capitalize'>{employee.status === 'active' ? 'Active' : 'Inactive'}</td>
                                                                <td className='px-4 py-3 text-start'>{employee.createdOn}</td>

                                                                {role === 'manager' && (
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
                                                                                        onClick={() => toggleEditEmployeeHandler(drawerId, employee)}
                                                                                    >
                                                                                        Edit
                                                                                    </button>
                                                                                </li>
                                                                                <li>
                                                                                    <button
                                                                                        className='w-full hover:bg-red-50 text-start p-2 rounded'
                                                                                        onClick={() => toggleDeleteHandler(modalId, employee)}
                                                                                    >
                                                                                        Delete
                                                                                    </button>
                                                                                </li>
                                                                            </ul>
                                                                        </Dropdown>
                                                                    </td>
                                                                )}
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                        <nav className='flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4' aria-label='Table navigation' />
                                    </>
                                    : (
                                        <EmptyContainer />
                                    )}
                        </div>
                    </div>
                </section>
            </Container>
            <AddEmployee
                id={'add-employee-data'}
                onUpdate={setDataUpdated}
            />
            {
                openDrawerId && (
                    <EditEmployee
                        key={openDrawerId}
                        id={openDrawerId}
                        employee={editData}
                        onUpdate={setDataUpdated}
                    />
                )}
            {
                openModalId ? (
                    <DeleteItem
                        path='employees'
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

export default page;
