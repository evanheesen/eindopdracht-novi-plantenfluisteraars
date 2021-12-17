import React from 'react';
import './InputElement.css';

function InputElement({ errors, errorUsername, register, classNameItem, name, label, inputType, placeholder, value, className ,validationRules, onChange }) {
    return (
        <div className={classNameItem}>
            <label htmlFor={`${name}-field`}>
                {label}
            </label>

            {/*Ternary operator om een textarea of een normaal input-veld weer te geven*/}
            {inputType === "textarea"
                ? <textarea
                    id={`${name}-field`}
                    cols="30"
                    rows="10"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    {...register(name, validationRules)}>
                </textarea>
                : (<>
                    <input
                        type={inputType}
                        id={`${name}-field`}
                        className={className}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        {...register(name, validationRules)}
                    />
                    {errors[name] && <p className="input-error-message">{errors[name].message}</p>}
                    {errorUsername && <p className="input-error-message">Deze username bestaat al</p>}
                </>)}
        </div>
    );
}

export default InputElement;