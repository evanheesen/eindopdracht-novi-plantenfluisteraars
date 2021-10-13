import styles from "./NavBar.module.css"
import React from 'react';
import logo from '../../assets/logo-plantenfluisteraars.png'
import {useHistory, Link} from "react-router-dom";
import NavButton from "./navButton/NavButton";

function NavBar({link, name}) {

    const history = useHistory();

    return (
        <nav>
            <Link to="/">
            <img className={styles["logo-container"]} src={logo} alt="logo-plantenfluisteraars"/>
            </Link>

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
        </nav>
    );
}

export default NavBar;