import styles from './PriceBlock.module.css';
import React from 'react';

function PriceBlock({ priceAmount, unit }) {
    return (
        <div className={styles["price-block"]}>
            <var className={styles["var--currency"]}>€</var>
            <span className={styles["span--amount"]}>{priceAmount}</span>
            <span className={styles["span--unit"]}>{unit}</span>
        </div>
    );
}

export default PriceBlock;