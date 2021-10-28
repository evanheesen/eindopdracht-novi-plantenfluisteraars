import styles from './NavBar.module.css';
import React, {useContext} from 'react';
import logo from '../../assets/logo-plantenfluisteraars-white.png';
import userIcon from '../../assets/user-icon.png';
import logoutIcon from '../../assets/logout-icon.png';
import {Link, useHistory} from "react-router-dom";
import NavButton from "./navButton/NavButton";
import NavIcon from "./navIcon/NavIcon";
import {AuthContext} from "../../context/AuthContext";

function NavBar() {

    const {isAuth, logOut, user} = useContext(AuthContext);
    const history = useHistory();


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
                    <NavIcon
                        link={() => history.push("/login")}
                        name="Login"
                        icon={userIcon}
                    />
                    : ""}

                {isAuth ?
                    <>
                        <NavIcon
                            link={logOut}
                            name="Log-uit"
                            icon={logoutIcon}
                        />

                        {/* hier voornaam weergeven user: */}

                        {/*/!*<span className={styles["nav-button"]}>*!/*/}
                        {/*/!*    {user.firstName}*!/*/}
                        {/*/!*</span>*!/*/}

                    </>
                    : ""}
            </menu>
        </nav>
    );
}

export default NavBar;