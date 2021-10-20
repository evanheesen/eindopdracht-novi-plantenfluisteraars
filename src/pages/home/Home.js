import styles from "./Home.module.css";
import logo from "../../assets/logo-plantenfluisteraars-white.png"
import React from "react";
import Button from "../../components/button/Button";
import NavButton from "../../components/navBar/navButton/NavButton";

function Home() {

    return (
      <div className={styles["home-container"]}>
<header>
    <img className={styles["header__img"]} src={logo} alt="logo-plantenfluisteraars"/>
    <div>
        <NavButton
            link="/concept"
            name="Concept"
        />
        <NavButton
            link="/prijzen"
            name="Prijzen"
        />
        <NavButton
            link="/over-ons"
            name="Over ons"
        />
        <NavButton
            link="/aanvragen"
            name="Aanvragen"
        />
    </div>
</header>
          <h1>Een groene geveltuin in een paar klikken</h1>
          <h2>Wij verzorgen de aanleg en het onderhoud van jouw geveltuin!</h2>
          <Button
          type="button"
          link="/concept"
          className="button button--red"
          name="Ik wil meer weten!"
          />
      </div>
    );
}

export default Home;