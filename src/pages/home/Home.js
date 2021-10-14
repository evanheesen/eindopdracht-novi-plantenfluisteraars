import styles from "./Home.module.css";
import logo from "../../assets/logo-plantenfluisteraars-white.png"
import React from "react";
import Button from "../../components/button/Button";
import NavButton from "../../components/navBar/navButton/NavButton";
import {useHistory} from "react-router-dom";

function Home() {

    const history = useHistory();

    return (
      <div className={styles["home-container"]}>
<header>
    <img className={styles["header__img"]} src={logo} alt="logo-plantenfluisteraars"/>
    <div>
        <NavButton
            onClick={() => history.push("/concept")}
            name="Concept"
        />
        <NavButton
            onClick={() => history.push("/prijzen")}
            name="Prijzen"
        />
        <NavButton
            onClick={() => history.push("/over-ons")}
            name="Over ons"
        />
        <NavButton
            onClick={() => history.push("/aanvragen")}
            name="Aanvragen"
        />
    </div>
</header>
          <h1>Een groene geveltuin in een paar klikken</h1>
          <h2>Wij verzorgen de aanleg en het onderhoud van jouw geveltuin!</h2>
          <Button
          type="button"
          onClick={() => history.push("/concept")}
          className="button button--red"
          name="Ik wil meer weten!"
          />
      </div>
    );
}

export default Home;