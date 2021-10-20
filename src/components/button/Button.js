import React from 'react';
import './Button.css'
import {useHistory} from "react-router-dom";

function Button({link, name, className, type}) {

    const history = useHistory();

    return (
        <button
            type={type}
            onClick={() => history.push(`${link}`)}
            className={className}
        >
            {name}
        </button>
    );
}

export default Button;