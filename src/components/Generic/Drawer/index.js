import React, { useRef } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import Icon from '../Icon';
import { useToggleElement } from '@/hooks/useToggleElement';

const Drawer = ({  children, ...props  }) => {
    const { isOpen, close } = useToggleElement();
    const drawerRef = useRef(null);
    const propsPosition = props.position === 'right' ? 'justify-end' : 'justify-start';

    useClickOutside(drawerRef, () => {
        close(props.id);
    });

    return (
        isOpen(props.id) && (
            <div className={`fixed z-50 top-0 left-0 h-screen w-screen flex ${propsPosition}`} id={props.id}>
                <div ref={drawerRef} className={'shadow-md h-full w-[380px] bg-white relative'}>
                    <div className={`flex ${props.title && 'bg-primary-50 border-b justify-between'} ${props.position === 'right' ? 'justify-start' : 'justify-end'}`}>
                        <>
                            {props.title && props.title}
                            <button
                                onClick={() => {
                                    console.log(`Closing drawer with button click for id: ${props.id}`);
                                    close(props.id);
                                }}
                                className={'text-secondary-600 hover:text-secondary-900 p-4 rounded-lg'}
                            >
                                <Icon name='x-mark' className='w-4 h-4' />
                            </button>
                        </>
                    </div>
                    <div className={`${props.className}`}>
                        {children}
                    </div>
                </div>
            </div>
        )
    );
};

export default Drawer;
