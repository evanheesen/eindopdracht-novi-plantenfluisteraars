import styles from './Prijzen.css';
import React from "react";
import aanlegGeveltuin from "../../assets/aanleg-geveltuin.webp";
import ColoredContainer from "../../components/coloredContainer/ColoredContainer";
import ImageContainer from "../../components/imageContainer/ImageContainer";

function Prijzen() {

    return (
        <>
            <div className="section--center">
                <ColoredContainer
                    classNameItem="section-item section-item--split"
                    className="block block--left block--green"
                    title="Prijzen"
                    text="We maken onderscheid in de aanleg van een geveltuin enerzijds en het onderhoud van een bestaande geveltuin anderzijds. Het afnemen van een onderhoudsplan is verplicht. Er kan bij het onderhoud worden gekozen tussen een vast onderhoudsplan of een coachingsplan."
                    buttonClassNameBottom="button button--bottom button--dark"
                    buttonTitleBottom="Vraag een geveltuin aan"
                    buttonLinkBottom="/aanvragen"

                />
                <ImageContainer
                    source={aanlegGeveltuin}
                    alt="aanleg-geveltuin"
                    classNameImg="image image--right"
                />
            </div>

            <ColoredContainer
                classNameItem="section-item section-item--center"
                className="block block--center block--green"
                buttonClassNameTop="button button--top button--red"
                buttonTitleTop="Aanleg"
                title="Prijs aanleg geveltuin"
                text="Prijs pakketten"
                buttonClassNameBottom="button button--bottom button--green"
                buttonTitleBottom="Meer informatie pakketten"
                buttonLinkBottom="/pakketten"
            />
        </>
    );
}

export default Prijzen;