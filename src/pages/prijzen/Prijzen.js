import styles from './Prijzen.module.css';
import React from "react";
import aanlegGeveltuin from "../../assets/aanleg-geveltuin.webp";
import plant from "../../assets/plant-transparent.png";
import ColoredContainer from "../../components/coloredContainer/ColoredContainer";
import ImageContainer from "../../components/imageContainer/ImageContainer";
import OverviewContainer from "../../components/overviewContainer/OverviewContainer";
import {useHistory} from "react-router-dom";
import Description from "../../components/description/Description";

function Prijzen() {

    const history = useHistory();

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
                    linkButton="/aanvragen"
                    buttonTypeBottom="button"
                />
                <ImageContainer
                    source={aanlegGeveltuin}
                    alt="aanleg-geveltuin"
                    classNameImg="image image--right"
                />
            </div>

            {/* apart component voor container maken!! */}
            <div className={styles["flex-container"]}>
                <div className={styles["flex-item"]}>
                    <Description
                        title="Prijs aanleg beplanting geveltuin"
                        text="Voor de aanleg van de beplanting kan je kiezen
                    uit drie verschillende pakketten:"
                    />
                </div>
                <div className={styles["flex-item"]}>
                    <div className={styles["flex-item__overview"]}>
                    <OverviewContainer
                        image={plant}
                        imageAlt="plant-groen"
                        subTitle="PAKKET 1"
                        description="Lage wintergroene beplanting"
                        priceAmount="25"
                        unit="/ 30cm breedte"
                        bullit1="Laag onderhoud"
                        bullit2="Hele jaar door groen"
                    />
                    <OverviewContainer
                        image={plant}
                        imageAlt="plant-groen"
                        subTitle="Pakket 2"
                        description="Lage kleurrijke beplanting"
                        priceAmount="30"
                        unit="/ 30cm breedte"
                        bullit1="Onderhoudsintensiever"
                        bullit2="Zeer kleurrijk in de lente en zomer"
                    />
                    <OverviewContainer
                        image={plant}
                        imageAlt="plant-groen"
                        subTitle="Pakket 3"
                        description="Kleurrijke klimbeplanting"
                        priceAmount="35"
                        unit="/ 30cm breedte"
                        bullit1="Onderhoudsintensiever"
                        bullit2="Zeer fraaie uitstraling"
                    />
                    </div>
                </div>
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
                    bullit1="Laag onderhoud"
                    bullit2="Hele jaar door groen"
                />
                <OverviewContainer
                    subTitle="Pakket 2"
                    description="Lage kleurrijke beplanting"
                    priceAmount="30"
                    unit="/ 30cm breedte"
                    bullit1="Onderhoudsintensiever"
                    bullit2="Zeer kleurrijk in de lente en zomer"
                />
                <OverviewContainer
                    subTitle="Pakket 3"
                    description="Kleurrijke klimbeplanting"
                    priceAmount="35"
                    unit="/ 30cm breedte"
                    bullit1="Onderhoudsintensiever"
                    bullit2="Zeer fraaie uitstraling"
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
                linkButton="/aanvragen"
                buttonTypeBottom="button"
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