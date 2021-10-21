import 'PricesContainer.css';
import React from 'react';
import Button from "../button/Button";

function PricesContainer({ classNameFlexItem, classNameBlock, buttonTitleTop, buttonClassNameTop, title, text, classNameColumns, subTitle, description, price, unit, bullit1, bullit2, buttonClassNameBottom, buttonLinkBottom, buttonTitleBottom}) {

    return (
        <div className={classNameFlexItem}>
            <section className={classNameBlock}>
                {buttonTitleTop &&
                <Button
                    className={buttonClassNameTop}
                    name={buttonTitleTop}
                    type="button"
                />}

                <h2 className="text-justified">{title}</h2>
                <p className="text-justified">{text}</p>

                <div className={classNameColumns}>
                    <h3>{subTitle}</h3>
                    <p className="text-description">{description}</p>
                {/*  component price block  */}
                    {bullit1 &&
                    <ul>
                        <li>{bullit1}</li>
                        {bullit2 &&
                        <li>{bullit2}</li>
                        }
                    </ul>
                    }
                </div>

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

export default PricesContainer;