import styles from "./Home.module.css";
import React from "react";
import Button from "../../components/buttons/button/Button";
import FlexContainer from "../../components/flexContainer/FlexContainer";
import Description from "../../components/description/Description";
import FlexItem from "../../components/flexItem/FlexItem";

function Home() {

    return (
        <>
            <FlexContainer className="FlexContainer FlexContainer__image-container">

                <FlexItem className="flexItem__home-item">
                    <h1>Een groene geveltuin in een paar klikken</h1>
                    <h2>Wij verzorgen de aanleg en het onderhoud van jouw geveltuin!</h2>
                    <Button
                        type="button"
                        link="/concept"
                        className="button button--red"
                        name="Ik wil meer weten!"
                    />
                </FlexItem>

            </FlexContainer>
        </>
    );
}

export default Home;