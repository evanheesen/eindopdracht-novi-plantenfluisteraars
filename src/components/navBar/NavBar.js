import styles from './NavBar.module.css';
import React from 'react';
import logo from '../../assets/logo-plantenfluisteraars-white.png'
import {useHistory, Link} from "react-router-dom";
import NavButton from "./navButton/NavButton";

function NavBar() {

    const history = useHistory();

    return (
        <nav className={styles["nav-bar"]}>
            <Link to="/">
                <img className={styles["logo-container"]} src={logo} alt="logo-plantenfluisteraars"/>
            </Link>

            <menu>
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
                <NavButton
                    link="/login"
                    name="Login"
                />
                <NavButton
                    link="/registreren"
                    name="Registreren"
                />
            </menu>
        </nav>
    );
}

export default NavBar;