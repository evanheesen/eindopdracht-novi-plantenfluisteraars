import React from 'react';
import styles from './SingleSelectElement.module.css';

function SingleSelectElement({ errors, register, classNameItem, name, value, label, className, validationRules }) {
    return (
        <div className={classNameItem}>
            <label htmlFor={`${name}-field`} className="form__label">

            </label>
            <input
                type="radio"
                className={className}
                value={value}
                id={`field-${value}`}
                {...register(name, validationRules)}
            />
                {label}
            {/*</input>*/}

            {errors[name] && <p>{errors[name].message}</p>}
        </div>
    );
}

export default SingleSelectElement;