import React from 'react';
import './FlexItem.css';

function FlexItem({className, children}) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}

export default FlexItem;