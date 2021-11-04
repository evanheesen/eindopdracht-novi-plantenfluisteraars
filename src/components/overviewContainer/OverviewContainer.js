import "./OverviewContainer.css";
import React from "react";
import PriceBlock from "./priceBlock/PriceBlock";

function OverviewContainer({
                               image,
                               imageAlt,
                               imageClassName,
                               subTitle,
                               description,
                               priceAmount,
                               unit,
                               bullit1,
                               bullit2,
                           }) {

    return (
        <>
            <div className="overview-item">
                <img src={image} alt={imageAlt} className="overview-item__img"/>
                <h3 className="overview-item__subtitle">{subTitle}</h3>
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
            </div>
        </>
    );
}

export default OverviewContainer;