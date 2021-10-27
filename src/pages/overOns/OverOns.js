import React from 'react';
import ColoredContainer from "../../components/coloredContainer/ColoredContainer";
import plantenFluisteraar from "../../assets/plantenfluisteraar.png";
import plantHand from "../../assets/plant-zaden.png";
import ImageContainer from "../../components/imageContainer/ImageContainer";
import {useHistory} from "react-router-dom";

function OverOns() {

    const history = useHistory();

    return (
        <div className="section--split">
            <ColoredContainer
                classNameItem="section-item section-item--split"
                classNameBlock="block block--left block--red"
                title="Over ons"
                text="Onze ambitie is om Amsterdam een beetje groener en socialer te maken. Daarom matchen wij bewoners die op zoek zijn naar wat meer groen aan huis met onze Plantenfluisteraars. Deze gepassioneerde groene guru's zorgen voor de aanleg en het onderhoud van jouw geveltuin."
            />
            <ImageContainer
                source={plantenFluisteraar}
                alt="plantenfluisteraar"
                classNameImg="image image--bottom"
            />
            <ImageContainer
                source={plantHand}
                alt="plant-groeien"
                classNameImg="image image--left"
            />
            <ColoredContainer
                classNameItem="section-item section-item--split"
                classNameBlock="block block--right block--green"
                title="Wat maakt ons speciaal?"
                text="Wij zijn een sociaal bedrijf. Enkel inheemse plantsoorten voor betere biodiversiteit. ETC"
                buttonClassNameBottom="button button--bottom button--bottom-split"
                buttonTitleBottom="Vraag een geveltuin aan"
                linkButton="/aanvragen"
                buttonTypeBottom="button"
            />
        </div>
    );
}

export default OverOns;