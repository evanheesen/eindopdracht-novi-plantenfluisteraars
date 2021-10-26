import styles from './NavBar.module.css';
import React, {useContext} from 'react';
import logo from '../../assets/logo-plantenfluisteraars-white.png';
import {useHistory, Link} from "react-router-dom";
import NavButton from "./navButton/NavButton";
import {AuthContext} from "../../context/AuthContext";

function NavBar() {

    const history = useHistory();
    const {isAuth, logOut, user} = useContext(AuthContext);

    return (
        <nav className={styles["nav-bar"]}>
            <Link to="/">
                <img className={styles["logo-container"]} src={logo} alt="logo-plantenfluisteraars"/>
            </Link>

            <menu>
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
                <NavButton
                    link="/login"
                    name="Login"
                />
                <NavButton
                    link="/registreren"
                    name="Registreren"
                />
                <NavButton
                    name="Log uit"

                />
            </menu>
        </nav>
    );
}

export default NavBar;