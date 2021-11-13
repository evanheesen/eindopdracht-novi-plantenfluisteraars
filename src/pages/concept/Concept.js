import styles from './Concept.module.css';
import React from "react";
import geveltuintje1 from "../../assets/geveltuintje.jpg";
import geveltuintje2 from "../../assets/geveltuintje2.jpg";
import geveltuintje3 from "../../assets/geveltuintje3.jpg";
import geveltuintje4 from "../../assets/geveltuintje4.jpg";
import ColoredContainer from "../../components/coloredContainer/ColoredContainer";
import ImageContainer from "../../components/imageContainer/ImageContainer";
import {Link, useHistory} from "react-router-dom";
import FlexContainer from "../../components/flexContainer/FlexContainer";
import PageContainer from "../../components/pageContainer/PageContainer";
import FlexItem from "../../components/flexItem/FlexItem";
import aanlegGeveltuin from "../../assets/aanleg-geveltuin.webp";
import Button from "../../components/buttons/button/Button";

function Concept() {

    const history = useHistory();

    return (
        <>
            <PageContainer className="PageContainer">
                <FlexContainer className="FlexContainer FlexContainer__white-split">
                    <ColoredContainer
                        classNameItem="FlexItem__split"
                        classNameBlock="block block--red"
                        title="Het concept"
                    >
                        <p className="text-justified">
                            Onze ambitie is om Amsterdam een beetje groener en socialer te maken. Daarom matchen wij
                            bewoners die op zoek zijn naar wat meer groen aan huis met onze Plantenfluisteraars. Deze
                            gepassioneerde groene guru's zorgen voor de aanleg van jouw geveltuin.
                            Zo heb je altijd een goed verzorgde geveltuin die met liefde wordt onderhouden.
                        </p>
                    </ColoredContainer>
                    <ImageContainer
                        classNameImg="image image--right"
                        source={geveltuintje1}
                        source2={geveltuintje2}
                        source3={geveltuintje3}
                        source4={geveltuintje4}
                        alt="geveltuintje-voorbeeld"
                        alt2="geveltuintje-bloem"
                        alt3="geveltuintje-bedrijf"
                        alt4="geveltuintje-bloemen"
                    />
                </FlexContainer>
            </PageContainer>

            <PageContainer className="PageContainer PageContainer--image PageContainer--split">
                <FlexContainer className="FlexContainer FlexContainer__white-centered">
                    <ColoredContainer
                        classNameItem="FlexItem__center"
                        classNameBlock="block block--right block--green"
                        title="Hoe werkt het?"
                        buttonClassNameBottom="button button--bottom button--bottom-split"
                        buttonTitleBottom="Vraag een geveltuin aan"
                        linkButton="/aanvragen"
                        buttonTypeBottom="button"
                    >
                        <p>
                            <ol>
                                <li>Vul het aanvraagformulier op de aanvraagpagina in.</li>
                                <li>Wij checken of je voldoet aan de vereisten en verzorgen vervolgens de aanvraag bij
                                    de gemeente.
                                </li>
                                <li>Bij akkoord sturen we de aanvraag door naar de gemeente, die vervolgens het perkje
                                    plaatst.
                                </li>
                                <li>Na plaatsing komt jouw Plantenfluisteraar langs om de geveltuin te beplanten.</li>
                                <li>Door middel van coaching of vast onderhoud ondersteunen we je om jouw geveltuin in
                                    optimale conditie te houden.
                                </li>
                            </ol>
                        </p>
                    </ColoredContainer>
                </FlexContainer>

            </PageContainer>
        </>
    );
}

export default Concept;