import React from 'react';

const Card = ({ children, ...props }) => {
    const width = props.width === 'xl' ? 'w-full' : props.width === 'md' ? 'w-2/4' : 'w-1/4';
    const height = props.height === 'xl' ? 'h-[860px]' :
        props.height === 'md' ? 'h-[440px]' :
            props.height === 'sm' ? 'min-h-[280px]' :
                props.height;
                return (
                    <div className={`bg-white rounded-xl ${height} p-4 shadow-md ${width}`} id='card'>
                        {children}
                    </div>
                );
};

export default Card;