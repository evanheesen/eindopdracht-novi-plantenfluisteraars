import React from 'react';
import styles from './EditIcon.module.css';

function EditIcon({name, onClick, icon, id}) {
    return (
        <>
            <button
                className={styles["edit-button"]}
                type="button"
                onClick={onClick}
                id={id}
            >
                <img src={icon} alt={name} className={styles["edit-icon"]}/>
            </button>
        </>
    );
}

export default EditIcon;