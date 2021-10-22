import styles from './Concept.module.css';
import React from "react";
import plantCorner from "../../assets/plant-corner.png"
import geveltuintje1 from "../../assets/geveltuintje.jpg";
import geveltuintje2 from "../../assets/geveltuintje2.jpg";
import geveltuintje3 from "../../assets/geveltuintje3.jpg";
import geveltuintje4 from "../../assets/geveltuintje4.jpg";
import ColoredContainer from "../../components/coloredContainer/ColoredContainer";
import ImageContainer from "../../components/imageContainer/ImageContainer";

function Concept() {

    return (
        <div className="section--split">
            <ColoredContainer
                classNameItem="section-item section-item--split"
                classNameBlock="block block--left block--red"
                title="Het concept"
                text="Onze ambitie is om Amsterdam een beetje groener en socialer te maken. Daarom matchen wij bewoners die op zoek zijn naar wat meer groen aan huis met onze Plantenfluisteraars. Deze gepassioneerde groene guru's zorgen voor de aanleg van jouw geveltuin."
            />
            <ImageContainer
                source={plantCorner}
                alt="tree"
                classNameImg="image image--top"
            />
            <ImageContainer
                classNameImg="image image--left"
                source={geveltuintje1}
                source2={geveltuintje2}
                source3={geveltuintje3}
                source4={geveltuintje4}
                alt="geveltuintje-voorbeeld"
                alt2="geveltuintje-bloem"
                alt3="geveltuintje-bedrijf"
                alt4="geveltuintje-bloemen"
            />
            <ColoredContainer
                classNameItem="section-item section-item--split"
                classNameBlock="block block--right block--green"
                title="Hoe werkt het?"
                text="1. Vul het formulier in"
                buttonClassNameBottom="button button--bottom button--bottom-split"
                buttonTitleBottom="Vraag een geveltuin aan"
                buttonLinkBottom="/aanvragen"
            />
        </div>
    );
}

export default Concept;