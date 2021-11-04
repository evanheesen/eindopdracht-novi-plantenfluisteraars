import React from 'react';
import styles from './Description.module.css';

function Description({title, text}) {
    return (
        <>
            <h2 className={styles["title"]}>{title}</h2>
            <p className={styles["description"]}>{text}</p>
        </>
    );
}

export default Description;