import styles from './Prijzen.module.css';
import React from "react";
import aanlegGeveltuin from "../../assets/aanleg-geveltuin.webp";
import wintergroen from "../../assets/wintergroen.png";
import kleurrijkLaag from "../../assets/kleurrijk laag.png";
import kleurrijkHoog from "../../assets/kleurrijk hoog.png";
import ColoredContainer from "../../components/coloredContainer/ColoredContainer";
import ImageContainer from "../../components/imageContainer/ImageContainer";
import OverviewItem from "../../components/overviewContainer/overviewItem/OverviewItem";
import {useHistory} from "react-router-dom";
import Description from "../../components/description/Description";
import FlexContainer from "../../components/flexContainer/FlexContainer";
import FlexItem from "../../components/flexItem/FlexItem";
import PageContainer from "../../components/pageContainer/PageContainer";
import Button from "../../components/buttons/button/Button";

function Prijzen() {

    const history = useHistory();

    return (
        <>
            <PageContainer className="PageContainer">
                <FlexContainer className="FlexContainer FlexContainer__white-split">
                    <ColoredContainer
                        classNameItem="FlexItem FlexItem__split-top"
                        classNameBlock="block block--left block--green bottom-button"
                        title="Prijzen"
                        buttonClassNameBottom="button button--bottom button--bottom-split"
                        buttonTitleBottom="Vraag een geveltuin aan"
                        onClickButton={() => history.push("/aanvragen")}
                        buttonTypeBottom="button"
                    >
                        <p className="text-justified">
                            We maken onderscheid in de aanleg van een geveltuin enerzijds en het onderhoud van een
                            bestaande
                            geveltuin anderzijds. Het afnemen van een onderhoudsplan is verplicht. Er kan bij het
                            onderhoud
                            worden gekozen tussen een vast onderhoudsplan of een coachingsplan."
                        </p>
                    </ColoredContainer>
                    <ImageContainer
                        source={aanlegGeveltuin}
                        alt="aanleg-geveltuin"
                        classNameImg="image image--right"
                    />
                </FlexContainer>
            </PageContainer>

            <PageContainer className="PageContainer PageContainer--image PageContainer--split">
                <FlexContainer className="FlexContainer FlexContainer__white-centered">
                    <FlexItem className="FlexItem FlexItem__center">

                        <Description
                            className="description__centered"
                            classNameTitle="description__title--white"
                            classNameText="description--text--white"
                            title="Prijs aanleg beplanting geveltuin"
                            text="Voor de aanleg van de beplanting kan je kiezen
                    uit drie verschillende pakketten:"
                        />

                    </FlexItem>

                    <FlexItem className="FlexItem__center">
                        <FlexItem className="FlexItem__overview">
                            <OverviewItem
                                image={wintergroen}
                                imageAlt="plant-groen"
                                subTitle="Pakket 1"
                                description="Lage wintergroene beplanting"
                                priceAmount="25"
                                unit="/ 30cm breedte"
                                bullit1="Laag onderhoud"
                                bullit2="Hele jaar door groen"
                            />
                            <OverviewItem
                                image={kleurrijkLaag}
                                imageAlt="plant-groen"
                                subTitle="Pakket 2"
                                description="Lage kleurrijke beplanting"
                                priceAmount="30"
                                unit="/ 30cm breedte"
                                bullit1="Onderhoudsintensiever"
                                bullit2="Zeer kleurrijk in de lente en zomer"
                            />
                            <OverviewItem
                                image={kleurrijkHoog}
                                imageAlt="plant-groen"
                                subTitle="Pakket 3"
                                description="Kleurrijke klimbeplanting"
                                priceAmount="35"
                                unit="/ 30cm breedte"
                                bullit1="Onderhoudsintensiever"
                                bullit2="Zeer fraaie uitstraling"
                            />
                        </FlexItem>
                        <Button
                            onClick={() => history.push("/aanvragen")}
                            type="button"
                            className="button button--bottom-overview"
                            name="Vraag een geveltuin aan"
                        />
                    </FlexItem>
                </FlexContainer>
            </PageContainer>

        </>
    );
}

export default Prijzen;