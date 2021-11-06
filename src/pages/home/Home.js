import styles from "./Home.module.css";
import React from "react";
import Button from "../../components/button/Button";
import FlexContainer from "../../components/flexContainer/FlexContainer";
import {useHistory} from "react-router-dom";
import Description from "../../components/description/Description";
import FlexItem from "../../components/flexItem/FlexItem";

function Home() {

    return (
        <>
            <FlexContainer
                className="FlexContainer FlexContainer__image-container"
            >
                <FlexItem
                    className="flexItem__home-item"
                >
                    <h1>Een groene geveltuin in een paar klikken</h1>
                    <h2>Wij verzorgen de aanleg en het onderhoud van jouw geveltuin!</h2>
                    <Button
                        type="button"
                        link="/concept"
                        className="button button--red"
                        name="Ik wil meer weten!"
                    />
                </FlexItem>

                <Description
                    className="white"
                    title="Test"
                    text="text test"
                />
            </FlexContainer>
        </>
    );
}

export default Home;