import React from 'react';
import './NummeredList.css';

function NummeredList({children}) {
    return (
        <p>
            <ol>
                {children}
            </ol>
        </p>
    );
}

export default NummeredList;