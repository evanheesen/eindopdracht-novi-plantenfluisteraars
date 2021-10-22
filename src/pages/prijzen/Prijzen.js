// import styles from './Prijzen.css';
import React from "react";
import aanlegGeveltuin from "../../assets/aanleg-geveltuin.webp";
import ColoredContainer from "../../components/coloredContainer/ColoredContainer";
import ImageContainer from "../../components/imageContainer/ImageContainer";
import OverviewContainer from "../../components/overviewContainer/OverviewContainer";

function Prijzen() {

    return (
        <>
            <div className="section--center">
                <ColoredContainer
                    classNameItem="section-item section-item--split"
                    classNameBlock="block block--left block--green"
                    title="Prijzen"
                    text="We maken onderscheid in de aanleg van een geveltuin enerzijds en het onderhoud van een bestaande geveltuin anderzijds. Het afnemen van een onderhoudsplan is verplicht. Er kan bij het onderhoud worden gekozen tussen een vast onderhoudsplan of een coachingsplan."
                    buttonClassNameBottom="button button--bottom button--bottom-split"
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
                classNameBlock="block block--center block--green"
                buttonClassNameTop="button button--top button--top-centered"
                buttonTitleTop="Prijs aanleg"
                title="Prijs aanleg beplanting geveltuin"
                text="Voor de aanleg van de beplanting kan je kiezen uit drie verschillende pakketten:"
                classNameColumns="overview-container overview-container--white"
            >
                <OverviewContainer
                    subTitle="Pakket 1"
                    description="Lage wintergroene beplanting"
                    priceAmount="25"
                    unit="/ 30cm breedte"
                />
                <OverviewContainer
                    subTitle="Pakket 2"
                    description="Lage kleurrijke beplanting"
                    priceAmount="30"
                    unit="/ 30cm breedte"
                />
                <OverviewContainer
                    subTitle="Pakket 3"
                    description="Kleurrijke klimbeplanting"
                    priceAmount="35"
                    unit="/ 30cm breedte"
                />
            </ColoredContainer>

            <ColoredContainer
                classNameItem="section-item section-item--center"
                classNameBlock="block block--center block--green"
                buttonClassNameTop="button button--top button--top-centered"
                buttonTitleTop="+ Prijs onderhoud"
                title="Pakketten voor onderhoud geveltuin"
                text="Voor het onderhoud van je geveltuin kan je kiezen uit twee verschillende pakketten:"
                buttonClassNameBottom="button button--bottom button--bottom-centered"
                buttonTitleBottom="Vraag een geveltuin aan"
                buttonLinkBottom="/aanvragen"
                classNameColumns="overview-container overview-container--white"
            >
                <OverviewContainer
                subTitle="Coachingsplan"
                description="Periodieke coaching waarbij je Plantenfluisteraar je helpt om zelf je geveltuin in optimale conditie te houden."
                priceAmount="5"
                unit="/ maand"
                bullit1="5 fysieke coachingssessies per jaar"
                bullit2="Minimale duur 1 jaar"
                />
                <OverviewContainer
                    classNameColumns="test-column"
                    subTitle="Vast plan"
                    description="Vast periodiek onderhoudsplan waarbij je Plantenfluisteraar al het onderhoudswerk uit handen neemt."
                    priceAmount="29"
                    unit="/ maand"
                    bullit1="Minimaal 12x onderhoud per jaar"
                    bullit2="Minimale duur 1 jaar"
                />
            </ColoredContainer>
        </>
    );
}

export default Prijzen;