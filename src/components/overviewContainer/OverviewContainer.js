import "./OverviewContainer.css";
import React from "react";
import PriceBlock from "./priceBlock/PriceBlock";

function OverviewContainer({
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
                <h3>{subTitle}</h3>
                <p>{description}</p>

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