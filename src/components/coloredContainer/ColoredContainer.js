import './ColoredContainer.css';
// import '../../App.css';
import React from 'react';
import Button from "../button/Button";

function ColoredContainer({ classNameItem, className, title, text, buttonClassNameTop, buttonTitleTop, buttonClassNameBottom, buttonTitleBottom, buttonLinkBottom}) {

    return (
        <div className={classNameItem}>
        <section className={className}>
            {buttonTitleTop &&
            <Button
                className={buttonClassNameTop}
                name={buttonTitleTop}
                type="button"
            />}

            <h2 className="text-justified">{title}</h2>
            <p className="text-justified">{text}</p>

            {buttonTitleBottom &&
            <Button
                className={buttonClassNameBottom}
                link={buttonLinkBottom}
                name={buttonTitleBottom}
                type="button"
            />}
        </section>
        </div>
    );
}

export default ColoredContainer;