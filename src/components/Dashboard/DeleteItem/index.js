import Modal from '@/components/Generic/Modal';
import useAPI from '@/hooks/useAPI';
import { useToggleElement } from '@/hooks/useToggleElement';
import React from 'react';
import { toast } from 'react-toastify';

const DeleteItem = ({ id, data, path, onUpdate }) => {
    const { toggle: toggleDeleteModal } = useToggleElement(); 
    const handleDelete = async (id) => {
        try {
          const response = await useAPI.delete(`/${path}/${id}`);
      
          if (response.status === 201) {
            toast.success('Successfully deleted!');
            onUpdate(true);
            toggleDeleteModal(id+'modal');
          } else {
            toast.error(response.data.error || 'Delete failed');
          }
        } catch (error) {
          if (error.response && error.response.data && error.response.data.error) {
            toast.error(error.response.data.error);
          } else {
            toast.error('An error occurred. Please try again later.');
          }
          console.error('Delete error:', error);
        }
      };
  return (
    <Modal 
        id={id}
        size='sm'
    >
        <div className='flex flex-col justify-center items-center gap-2'>
            <h1 className='text-xl font-bold'>Are you sure you want to delete?</h1>
            <h2 className='text-lg font-semibold text-secondary-500'>{data.name}</h2>
            <div className='flex gap-4 my-4'>
                <button className='rounded w-32 py-2 border border-transparent bg-red-500 text-white hover:bg-red-600' onClick={() => handleDelete(data._id)}>Yes</button>
                <button className='rounded w-32 py-2 border border-secondary-900' onClick={() => toggleDeleteModal(id)}>Cancel</button>
            </div>
        </div>
    </Modal>
  );
};

export default DeleteItem;