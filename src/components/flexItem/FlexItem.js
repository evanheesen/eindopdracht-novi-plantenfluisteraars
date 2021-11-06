import React from 'react';

function FlexItem({className, children}) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}

export default FlexItem;