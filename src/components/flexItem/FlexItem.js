import React from 'react';
import './FlexItem.css';
import Button from "../buttons/button/Button";

function FlexItem({className, children, buttonClassName, onClickButton, buttonTitle, linkButton}) {
    return (
        <div className={className}>
            {children}

            {buttonTitle &&
            <Button
                className={buttonClassName}
                onClick={onClickButton}
                name={buttonTitle}
                type="button"
                link={linkButton}
            />}
        </div>
    );
}

export default FlexItem;