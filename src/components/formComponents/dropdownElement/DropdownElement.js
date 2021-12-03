import React from 'react';
import './DropdownElement.css';

function DropdownElement({ errors, register, validationRules, classNameItem, classNameSelect, label, nameSelect, idSelect, onClickSelect, defaultValue, currentItem, arrayList, children }) {

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
                defaultValue={defaultValue}
                {...register(nameSelect, validationRules)}
            >
                {children}

                {/*{currentItem &&*/}
                {/*<option value={currentItem.id} disabled selected hidden>{currentItem.firstName} {currentItem.lastName}</option>}*/}

                {/*{currentItem === null &&*/}
                {/*<option disabled selected hidden>Maak een keuze</option>}*/}
                {/*{arrayItems.map((arrayItem) => {*/}
                {/*    return <option value={arrayItem.id} key={arrayItem.id}>{arrayItem.firstName} {arrayItem.lastName}</option>*/}
                {/*})}*/}

            </select>
            {errors[nameSelect] && <p className="input-error-message">{errors[nameSelect].message}</p>}
        </div>
    );
}

export default DropdownElement;