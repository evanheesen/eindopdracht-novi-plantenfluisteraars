import './NavBar.css';
import React, {useContext, useRef, useState} from 'react';
import logo from '../../assets/logo-plantenfluisteraars-white.png';
import userIcon from '../../assets/user-icon.png';
import logoutIcon from '../../assets/logout-icon.png';
import menu from '../../assets/hamburger-menu.png';
import {Link, useHistory} from "react-router-dom";
import NavButton from "./navButton/NavButton";
import NavIcon from "./navIcon/NavIcon";
import {AuthContext} from "../../context/AuthContext";

function NavBar() {

    const {isAuth, logOut, user} = useContext(AuthContext);
    const history = useHistory();

    return (
        <nav className="nav-bar">

            <Link to="/">
                <img className="logo-container" src={logo} alt="logo-plantenfluisteraars"/>
            </Link>

            <menu className="nav-menu" id="topnav">
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
                            link={() => history.push(user.info.authorities.length < 2 ? "/profile" : "/admin")}
                            name="Profiel"
                            icon={userIcon}
                        />

                        <NavIcon
                            link={logOut}
                            name="Log-uit"
                            icon={logoutIcon}
                        />
                    </>
                    : ""}



            </menu>

        </nav>
    );
}

export default NavBar;