import React from 'react';
import './Button.css'
import {useHistory} from "react-router-dom";

function Button({ disabled, link, name, className, type}) {

    const history = useHistory();

    return (
        <button
            type={type}
            onClick={() => history.push(`${link}`)}
            className={className}
            disabled={disabled}
        >
            {name}
        </button>
    );
}

export default Button;