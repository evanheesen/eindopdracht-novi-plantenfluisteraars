import React from 'react';
import styles from './NavIcon.module.css';

function NavIcon({ name, link, icon, id}) {

    return (
        <>
            <button
                className={styles["nav-button"]}
                type="button"
                onClick={link}
                id={id}
            >
                <img src={icon} alt={name} className={styles["nav-icon"]}/>
            </button>
        </>
    );
}

export default NavIcon;