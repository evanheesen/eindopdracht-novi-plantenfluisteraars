import React from 'react';
import styles from './NavIcon.module.css';

import {Link} from "react-router-dom";

function NavIcon({ name, link, icon, id, sublabel1, sublink1, sublabel2, sublink2 }) {

    // --> When the user clicks on the button, toggle between hiding and showing the dropdown content

    // function dropdownMenu() {
    //     document.getElementById("dropdownIcon").classList.toggle("show");
    // }


    // --> Close the dropdown if the user clicks outside of it

    // window.onclick = function(e) {
    //     if (!e.target.matches('.dropbtn')) {
    //         const dropdowns = document.getElementsByClassName("dropdown-content");
    //         // const i = "";
    //         for (i = 0; i < dropdowns.length; i++) {
    //             const openDropdown = dropdowns[i];
    //             if (openDropdown.classList.contains('show')) {
    //                 openDropdown.classList.remove('show');
    //             }
    //         }
    //     }
    // }

    return (
        <>
        {/*<div className="dropdown">*/}

            <button
                className={styles["nav-button"]}
                type="button"
                onClick={link}
                id={id}
            >
                <img src={icon} alt={name} className={styles["nav-icon"]}/>
            </button>
            {/*<div className={styles["dropdown-content"]} id="dropdownIcon">*/}
            {/*    <Link to={sublink1} className={styles["nav-button"]}>{sublabel1}</Link>*/}
            {/*    <Link to={sublink2} className={styles["nav-button"]}>{sublabel2}</Link>*/}
            {/*</div>*/}

        {/*</div>*/}
        </>
    );
}

export default NavIcon;