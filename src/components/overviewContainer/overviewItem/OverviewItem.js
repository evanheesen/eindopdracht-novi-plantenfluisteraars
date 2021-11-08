import "./OverviewItem.css";
import React from "react";
import PriceBlock from "../priceBlock/PriceBlock";
import FlexItem from "../../flexItem/FlexItem";
import Button from "../../button/Button";

function OverviewItem({
                               image,
                               imageAlt,
                               subTitle,
                               description,
                               priceAmount,
                               unit,
                               bullit1,
                               bullit2,
                               buttonClassName,
                               onClickButton,
                               buttonTitle,
                               linkButton
                           }) {

    return (
        <>
            <FlexItem className="OverviewItem">
                <img src={image} alt={imageAlt} className="OverviewItem__img"/>
                <h2 className="OverviewItem__subtitle">{subTitle}</h2>
                <p className="overview-item__description">{description}</p>

                {/* PriceBlock component */}
                <PriceBlock
                    priceAmount={priceAmount}
                    unit={unit}
                />

                {bullit1 &&
                <ul className="overview-list">
                    <li>{bullit1}</li>
                    {bullit2 &&
                    <li>{bullit2}</li>
                    }
                </ul>
                }

                {buttonTitle &&
                <Button
                    className={buttonClassName}
                    onClick={onClickButton}
                    name={buttonTitle}
                    type="button"
                    link={linkButton}
                />}

            </FlexItem>
        </>
    );
}

export default OverviewItem;