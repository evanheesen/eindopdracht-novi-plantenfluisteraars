import React from 'react';
import './Description.css';

function Description({title, text, className, colorTitle, colorText}) {
    return (
        <div className={className}>
            <h2 className={`"description__title--red"`}>{title}</h2>
            <p className={`"description__text--${colorText}"`}>{text}</p>
        </div>
    );
}

export default Description;