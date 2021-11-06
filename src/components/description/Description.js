import React from 'react';
import styles from './Description.module.css';

function Description({title, text, className}) {
    return (
        <div className={className}>
            <h2 className={styles["title"]}>{title}</h2>
            <p className={styles["description"]}>{text}</p>
        </div>
    );
}

export default Description;