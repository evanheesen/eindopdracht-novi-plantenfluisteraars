import React from 'react';
import './PageContainer.css';

function PageContainer({children, className}) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}

export default PageContainer;