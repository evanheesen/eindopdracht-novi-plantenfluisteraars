import React from 'react';
import ColoredContainer from "../../components/coloredContainer/ColoredContainer";
import aanlegGeveltuin from "../../assets/aanleg-geveltuin.webp";
import ImageContainer from "../../components/imageContainer/ImageContainer";

function Aanvragen() {
    return (
        <>
        <div className="section--split">
            <ColoredContainer
                classNameItem="section-item section-item--split"
                classNameBlock="block block--left block--green"
                title="Aanvragen aanleg geveltuin"
                text="tekst aanvragen geveltuin"
                buttonClassNameBottom="button button--bottom button--bottom-split"
                buttonTitleBottom="Ga naar het aanvraagformulier"
                buttonLinkBottom="/#aanvraagformulier"
            />
            <ImageContainer
                source={aanlegGeveltuin}
                alt="aanleg-geveltuin"
                classNameImg="image image--right"
            />
            <ColoredContainer
                classNameItem="section-item section-item--split"
                classNameBlock="block block--right block--red"
                title="Planning"
                text="bullits planning"
            />
        </div>
        </>
    );
}

export default Aanvragen;