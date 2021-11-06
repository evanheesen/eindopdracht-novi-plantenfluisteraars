import React from 'react';
import './FlexContainer.css';

function FlexContainer({className, children}) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}

export default FlexContainer;