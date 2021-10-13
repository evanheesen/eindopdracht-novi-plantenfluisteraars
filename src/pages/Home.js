import styles from "./Home.module.css";
import stylesButton from "../components/button/Button.module.css";
import React from "react";
import Button from "../components/button/Button";
import {useHistory} from "react-router-dom";

function Home() {

    const history = useHistory();

    return (
      <div className={styles["home-container"]}>
<header>
    <h1>Een groene geveltuin in een paar klikken</h1>
    <h2>Wij verzorgen de aanleg en het onderhoud van jouw geveltuin!</h2>
</header>
          <Button
          type="button"
          onClick={() => history.push("/concept")}
          className={stylesButton["button btn--red"]}
          name="Ik wil meer weten!"
          />
      </div>
    );
}

export default Home;