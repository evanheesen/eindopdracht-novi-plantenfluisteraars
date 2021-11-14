import React from 'react';
import ColoredContainer from "../../components/coloredContainer/ColoredContainer";
import plantenFluisteraar from "../../assets/plantenfluisteraar.png";
import plantHand from "../../assets/plant-zaden.png";
import ImageContainer from "../../components/imageContainer/ImageContainer";
import PageContainer from "../../components/pageContainer/PageContainer";
import FlexContainer from "../../components/flexContainer/FlexContainer";

function OverOns() {

    return (
        <>
            <PageContainer className="PageContainer">
                <FlexContainer className="FlexContainer FlexContainer__white-split">
                    <ColoredContainer
                        classNameItem="FlexItem FlexItem__split"
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
                        buttonClassNameBottom="button button--bottom button--bottom-split"
                        buttonTitleBottom="Vraag een geveltuin aan"
                        linkButton="/aanvragen"
                        buttonTypeBottom="button"
                    >
                        <p className="text-justified">
                            Wij willen graag mensen verbinden. Aan de ene kant bewoners van Amsterdam die graag wat meer
                            groen rondom huis willen hebben en aan de andere kant mensen die graag willen tuinieren,
                            maar daar niet de buitenruimte voor hebben.
                            Verder vinden we biodiversiteit erg belangrijk. Daarom werken we enkel met inheemse plantsoorten van de kwekerij.
                        </p>
                    </ColoredContainer>
                </FlexContainer>
            </PageContainer>
        </>
    );
}

export default OverOns;