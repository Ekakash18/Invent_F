import React, { useRef, useEffect } from 'react';
import { useToggleElement } from '@/hooks/useToggleElement';

const Dropdown = ({ children, icon, buttonName, buttonBorder, id, position, className }) => {
    const { isOpen, toggle, close } = useToggleElement();
    const dropdownRef = useRef(null);
    const propsPosition = position === 'right' ? 'right-0' : 'left-0';

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                close(id);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [dropdownRef, id, close]);
    return (
        <div className='relative'>
            <button
                className={`w-full md:w-auto flex items-center gap-2 justify-center py-2 px-4 text-sm font-medium text-gray-900 
                    focus:outline-none bg-white rounded-lg ${buttonBorder && 'border border-gray-200 hover:text-primary-700 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200'}`}
                type='button'
                id={id}
                onClick={() => toggle(id)}
            >
                {icon && icon}
                {buttonName}
            </button>
            {
                isOpen(id) && (
                    <div ref={dropdownRef} aria-details={id} id='actionsDropdown' className={`absolute top-12 ${propsPosition} show z-10 w-44 bg-white rounded-lg divide-y divide-gray-100 shadow ${className}`}>
                        {children}
                    </div>
                )
            }
        </div>
    );
};

export default Dropdown;
