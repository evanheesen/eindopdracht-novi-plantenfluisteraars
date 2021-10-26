import React from 'react';
import './MultiSelectElement.css';

function MultiSelectElement({ errors, register, classNameItem, name, label, className, validationRules, selectType, value}) {
    return (
        <div className={classNameItem}>
            <label htmlFor={`${name}-field`} className="label--checkbox">
                <input
                    type={selectType}
                    id={`${name}-field`}
                    value={value}
                    className={className}
                    {...register(name, validationRules)}
                />
                {label}
            </label>

            {errors[name] && <p>{errors[name].message}</p>}
        </div>
    );
}

export default MultiSelectElement;