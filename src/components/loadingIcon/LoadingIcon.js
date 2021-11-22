import React from 'react';

function LoadingIcon(props) {
    return (
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
    );
}

export default LoadingIcon;