import React from 'react';
import './FileUploadElement.css';

function FileUploadElement({ errors, register, classNameItem, name, label, className, validationRules, selectType, value, onChange, onClick}) {
    return (
        <div className={classNameItem}>
            <label htmlFor={`${name}-field`} className="label--singleSelect">
                {label}
                <input
                    type="file"
                    id={`${name}-field`}
                    value={value}
                    className={className}
                    onChange={onChange}
                    {...register(name, validationRules)}
                />
            </label>
            {errors[name] && <p>{errors[name].message}</p>}
        </div>
    );
}

export default FileUploadElement;