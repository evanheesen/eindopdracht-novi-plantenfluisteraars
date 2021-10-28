import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import ColoredContainer from "../../components/coloredContainer/ColoredContainer";
import styles from './Profiel.module.css';
import profileAnonymous from '../../assets/profile-picture-anonymous.png';
import ImageContainer from "../../components/imageContainer/ImageContainer";

function Profiel() {

    const {user} = useContext(AuthContext);

    return (
        <div className={styles["profile-container"]}>
            <ColoredContainer
            classNameItem="section-item section-item--split"
            classNameBlock="block block--left block--red"
            title="Profiel"
            >
                <p><strong>Voornaam:</strong> {user.firstName}</p>
                <p><strong>Achternaam:</strong> {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </ColoredContainer>

            <ImageContainer
                source={profileAnonymous}
                alt="plantenfluisteraar"
                classNameImg={styles["image-profile"]}
            />

        </div>
    );
}

export default Profiel;