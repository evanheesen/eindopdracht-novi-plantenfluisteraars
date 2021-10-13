import styles from './NavButton.module.css'
import React from 'react';

function NavButton({onClick, name}) {
    return (
        <button
            className={styles["nav-button"]}
        type="button"
        onClick={onClick}
        >
            {name}
        </button>
    );
}

export default NavButton;