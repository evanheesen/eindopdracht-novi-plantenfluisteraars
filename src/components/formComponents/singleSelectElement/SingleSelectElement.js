import React from 'react';
import styles from './SingleSelectElement.module.css';

function SingleSelectElement({ errors, register, name, label, validationRules, children }) {
    return (
        <>
            <label htmlFor={`${name}-field`} className="form__label">
                {label}
            </label>

            <select
                {...register(name, validationRules)}
                className="form__label"
            >
                {children}
            </select>

            {errors[name] && <p>{errors[name].message}</p>}
        </>
    );
}

export default SingleSelectElement;