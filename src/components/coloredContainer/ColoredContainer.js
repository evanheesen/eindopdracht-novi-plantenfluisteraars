import styles from './ColoredContainer.module.css';
import React from 'react';
import Button from "../button/Button";

function ColoredContainer({ className, title, text, buttonClassName, buttonTitle, buttonOnClick}) {
    return (
        <section className={className}>
            <Button
                className={buttonClassName}
                name={buttonTitle}
                onClick={buttonOnClick}
                type="button"
            />
            <h2>{title}</h2>
            <p>{text}</p>
            <Button
                className={buttonClassName}
                name={buttonTitle}
                onClick={buttonOnClick}
                type="button"
            />
        </section>
    );
}

export default ColoredContainer;