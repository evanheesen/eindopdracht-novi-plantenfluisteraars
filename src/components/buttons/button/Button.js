import React from 'react';
import './Button.css'

function Button({ register, id, disabled, link, onClick, onChange, name, className, type, value, children }) {

    return (
        <>
        <button
            type={type}
            id={id}
            onChange={onChange}
            onClick={onClick}
            className={className}
            disabled={disabled}
            value={value}
        >
            {name}
            {children}
        </button>
        </>
    );
}

export default Button;