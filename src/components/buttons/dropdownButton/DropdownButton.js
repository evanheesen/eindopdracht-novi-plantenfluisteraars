import React from 'react';
import Button from "../submitButton/Button";
import './DropdownButton.css';

function DropdownButton({classNameButton, classNameSelect, nameSelect, idSelect, onChange, children}) {
    return (
        <div>
            <Button
                type="button"
                className={classNameButton}
            >
                <select className={`${classNameSelect}`} name={nameSelect} id={idSelect} onChange={onChange}>
                    {children}
                </select>
            </Button>
        </div>
    );
}

export default DropdownButton;