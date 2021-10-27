import React from 'react';
import './Button.css'
import {Link} from "react-router-dom";

function Button({ register, disabled, link, onClick, name, className, type, value }) {

    return (
        <>
            <Link to={link}>
        <button
            type={type}
            onClick={onClick}
            className={className}
            disabled={disabled}
            value={value}
        >
            {name}
        </button>
            </Link>
        </>
    );
}

export default Button;