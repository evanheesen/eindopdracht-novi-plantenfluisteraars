import React from 'react';
import './Description.css';

function Description({title, text, className, classNameTitle, classNameText}) {
    // const cnTitle = {`"description__title--"${colorTitle}`}
    return (
        <div className={className}>
            <h2 className={classNameTitle}>{title}</h2>
            <p className={classNameText}>{text}</p>
        </div>
    );
}

export default Description;