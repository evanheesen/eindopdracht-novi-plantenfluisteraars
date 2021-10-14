import React from 'react';
import './Button.css'

function Button({onClick, name, className, type}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={className}
        >
            {name}
        </button>
    );
}

export default Button;