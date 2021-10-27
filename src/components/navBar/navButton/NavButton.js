import styles from "./NavButton.module.css";
import React from "react";
import {useHistory} from "react-router-dom";

function NavButton({ name, link }) {

    const history = useHistory();

    return (
        <>

            <button
                className={styles["nav-button"]}
                type="button"
                onClick={() => history.push(`${link}`)}
            >
                {name}
            </button>

        </>

    );
}

export default NavButton;