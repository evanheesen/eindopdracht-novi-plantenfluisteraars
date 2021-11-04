import styles from "./Home.module.css";
import React from "react";
import Button from "../../components/button/Button";
import {useHistory} from "react-router-dom";

function Home() {

    const history = useHistory();

    return (
        <div className={styles["home-container"]}>
            <div className={styles["home-item"]}>
                <h1>Een groene geveltuin in een paar klikken</h1>
                <h2>Wij verzorgen de aanleg en het onderhoud van jouw geveltuin!</h2>
                <Button
                    type="button"
                    link="/concept"
                    className="button button--red"
                    name="Ik wil meer weten!"
                />
            </div>
        </div>
    );
}

export default Home;