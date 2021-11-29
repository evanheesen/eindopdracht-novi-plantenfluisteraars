import React from 'react';
import './DropdownElement.css';

function DropdownElement({ errors, register, validationRules, classNameItem, classNameSelect, label, nameSelect, idSelect, onClickSelect, children }) {
    return (
        <div className={classNameItem}>
            <label htmlFor={`${nameSelect}-field`}>
                {label}
            </label>
            <select
                className={classNameSelect}
                name={nameSelect}
                id={idSelect}
                onClick={onClickSelect}
                {...register(nameSelect, validationRules)}
            >
                {children}
            </select>
            {errors[nameSelect] && <p className="input-error-message">{errors[nameSelect].message}</p>}
        </div>
    );
}

export default DropdownElement;