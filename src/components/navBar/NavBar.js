import styles from './NavBar.module.css';
import React, {useContext} from 'react';
import logo from '../../assets/logo-plantenfluisteraars-white.png';
import userIcon from '../../assets/user-icon.png';
import logoutIcon from '../../assets/logout-icon.png';
import {Link} from "react-router-dom";
import NavButton from "./navButton/NavButton";
import {AuthContext} from "../../context/AuthContext";

function NavBar() {

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

                {!isAuth ?
                        <NavButton
                            link="/login"
                            name="Login"
                            image={userIcon}
                        />
                    : ""}

                {isAuth ?
                    <>
                        <span className="first-name">
                            {user.firstName}
                        </span>

                    <NavButton
                        link={logOut}
                        name="Log-uit"
                        image={logoutIcon}
                    />
                    </>
                    : ""}
            </menu>
        </nav>
    );
}

export default NavBar;