import './ColoredContainer.css';
// import '../../App.css';
import React from 'react';
import Button from "../button/Button";

function ColoredContainer({ className, title, text, buttonClassNameTop, buttonTitleTop, buttonLinkTop, buttonClassNameBottom, buttonTitleBottom, buttonLinkBottom}) {

    return (
        <div className="section-item">
        <section className={className}>
            {buttonTitleTop &&
            <Button
                className={buttonClassNameTop}
                link={buttonLinkTop}
                name={buttonTitleTop}
                type="button"
            />}

            <h2>{title}</h2>
            <p>{text}</p>


        </section>
            {buttonTitleBottom &&
            <Button
                className={buttonClassNameBottom}
                link={buttonLinkBottom}
                name={buttonTitleBottom}
                type="button"
            />}
        </div>
    );
}

export default ColoredContainer;