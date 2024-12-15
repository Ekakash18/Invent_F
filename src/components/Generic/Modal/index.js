import React, { useRef } from 'react';
import Icon from '../Icon';
import useClickOutside from '@/hooks/useClickOutside';
import { useToggleElement } from '@/hooks/useToggleElement';

const Modal = ({  children, ...props  }) => {
    const { isOpen, close } = useToggleElement();
    const modalRef = useRef(null);
    useClickOutside(modalRef, () => close(props.id));
    const closeIconPosition = props.position === 'right' ? 'left-4' : 'right-4';
    const size = props.size === 'sm' ? 'w-1/4 h-1/4' : 'w-4/5 h-4/5';
    return (
        isOpen(props.id) && (
            <div className={'fixed z-50 flex justify-center items-center h-screen w-screen top-0 left-0 bg-slate-300/75 shadow-lg'} id='modal'>
                <div ref={modalRef} className={`shadow-md ${size} rounded-lg bg-white relative p-4`}>
                    <div id='title' className='flex justify-between'>
                        <div>{props.title}</div>
                        <button onClick={() => close(props.id)} className={`hover:bg-secondary-200 text-secondary-700 hover:text-secondary-900 p-2 rounded-lg top-4 ${closeIconPosition}`}>
                            <Icon name='x-mark' className='w-4 h-4'/> 
                        </button>
                    </div>
                    <div id='body'>
                        {children}
                    </div>
                    <div id='footer'>

                    </div>
                </div>
            </div>
        )
    );
};

export default Modal;