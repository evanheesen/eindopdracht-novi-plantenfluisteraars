import styles from './Concept.module.css';
import React from "react";
import plantCorner from "../../assets/plant-corner.png";
import aanlegGeveltuin from "../../assets/aanleg-geveltuin.webp";
import ColoredContainer from "../../components/coloredContainer/ColoredContainer";
import ImageContainer from "../../components/imageContainer/ImageContainer";

function Concept() {

    return (
        <div className="section--container">
            <ColoredContainer
            className="block block--red"
            title="Het concept"
            text="Onze ambitie is om Amsterdam een beetje groener en socialer te maken. Daarom matchen wij bewoners die op zoek zijn naar wat meer groen aan huis met onze Plantenfluisteraars. Deze gepassioneerde groene guru's zorgen voor de aanleg van jouw geveltuin."
            />
            <ImageContainer
            source={plantCorner}
            alt="tree"
            classNameImg="image__top"
            />
            <ImageContainer
            source={aanlegGeveltuin}
            alt="voorbeelden-geveltuinen"
            classNameImg="image--left"
            />
            <ColoredContainer
            className="block block--green"
            title="Hoe werkt het?"
            text="1. Vul het formulier in"
            buttonClassNameBottom="button button--bottom button--dark"
            buttonTitleBottom="Vraag een geveltuin aan"
            buttonLinkBottom="/aanvragen"
            />
        </div>
    );
}

export default Concept;