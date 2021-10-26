import styles from "./NavButton.module.css";
import React from "react";
import {useHistory} from "react-router-dom";

function NavButton({name, link, image, alt}) {

    const history = useHistory();

    return (
        <>

            {!image &&
            <button
                className={styles["nav-button"]}
                type="button"
                onClick={() => history.push(`${link}`)}
            >
                {name}
            </button>}

            {image &&
            <button
                className={styles["nav-button"]}
                type="button"
                onClick={link}
            >
                <img src={image} alt={name} className={styles["nav-icon"]}/>
            </button>}

        </>

    );
}

export default NavButton;