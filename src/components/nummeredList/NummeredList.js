import React from 'react';
import './NummeredList.css';

function NummeredList({children}) {
    return (
        <>
            <ol>
                {children}
            </ol>
        </>
    );
}

export default NummeredList;