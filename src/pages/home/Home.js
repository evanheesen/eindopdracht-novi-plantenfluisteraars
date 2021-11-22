import styles from "./Home.module.css";
import React from "react";
import Button from "../../components/buttons/button/Button";
import FlexContainer from "../../components/flexContainer/FlexContainer";
import FlexItem from "../../components/flexItem/FlexItem";
import PageContainer from "../../components/pageContainer/PageContainer";
import {useHistory} from "react-router-dom";

function Home() {

    const history = useHistory();

    return (
        <>
            <PageContainer className="PageContainer PageContainer--image">
                <FlexContainer className="FlexContainer FlexContainer__home">

                    <FlexItem className="FlexItem__home-item">
                        <h1>Een groene geveltuin in een paar klikken</h1>
                        <h2 className={styles.subtitle}>Wij verzorgen de aanleg en het onderhoud van jouw geveltuin!</h2>
                        <Button
                            type="button"
                            link="/concept"
                            className="button button--red"
                            name="Ik wil meer weten!"
                            onClick={() => history.push("/concept")}
                        />
                    </FlexItem>

                </FlexContainer>
            </PageContainer>
        </>
    );
}

export default Home;