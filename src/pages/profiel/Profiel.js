import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import ColoredContainer from "../../components/coloredContainer/ColoredContainer";
import styles from './Profiel.module.css';
import profileAnonymous from '../../assets/profile-picture-anonymous.png';
import ImageContainer from "../../components/imageContainer/ImageContainer";
import Button from "../../components/button/Button";
import Description from "../../components/description/Description";

function Profiel() {

    const {user} = useContext(AuthContext);
    console.log("user data uit context:")
    console.log(user);

    const [userData, setUserData] = useState({});
    const [error, toggleError] = useState(false);
    // const [loading, toggleLoading] = useState(false);

    useEffect(() => {

        async function fetchData() {
            // toggleError(false);
            // toggleLoading(true);
            const token = localStorage.getItem('token')
            const userId = user.username;

            try {
                const result = await axios.get(`http://localhost:8081/users/${userId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log(result.data);
                setUserData(result.data);
            } catch (e) {
                console.error(e);
                // toggleError(true);
            }
            // toggleLoading(false);
        }

        fetchData();

    }, []);

    return (
        <div className={styles["profile-container"]}>

            {/*{Object.keys(userData).length > 0 &&*/}
            <>
                <ColoredContainer
                    classNameItem="section-item section-item--split"
                    classNameBlock="block block--left block--red"
                    title="Profiel"
                >
                    {/*<p><strong>Voornaam:</strong> {user.firstName}</p>*/}
                    {/*<p><strong>Achternaam:</strong> {user.lastName}</p>*/}
                    {/*<p><strong>Username:</strong> {userData[0].username}</p>*/}
                    <p><strong>Username:</strong> [username]</p>
                    {/*<p><strong>Achternaam:</strong> {userData[0].lastName}</p>*/}
                    {/*<p><strong>Email:</strong> {userData[0].email}</p>*/}
                </ColoredContainer>
                <ImageContainer
                    source={profileAnonymous}
                    alt="plantenfluisteraar"
                    classNameImg={styles["image-profile"]}
                />

                <Button
                    type="button"
                    className="button button--dark"
                    name="Toon jouw geveltuintjes"
                    /* onClick= wijzigen state naar lijst aanvragen in profiel */
                />
                <Button
                    type="button"
                    className="button button--dark"
                    name="Toon open aanvragen"
                    /* onClick= wijzigen state naar lijst aanvragen met open status */
                />

                {/* Eigen tuintje(s): if statement gerelateerd aan state aanvragen */}
                <ColoredContainer
                    classNameItem="section-item section-item--split"
                    classNameBlock="block block--center block--white"
                    title="Jouw geveltuintjes"
                >
                    {/* Component van maken met map functie over array aanvragen */}
                    <p><strong>Datum aanvraag:</strong> [datum]</p>
                    <p><strong>Naam bewoner:</strong> [naamBewoner]</p>
                    <p><strong>Adres:</strong> [adres]</p>
                    <p><strong>Status:</strong> [status]</p>
                </ColoredContainer>
                {/* Open aanvragen: if statement gerelateerd aan state aanvragen */}
                <ColoredContainer
                    classNameItem="FlexItem FlexItem__center"
                    classNameBlock="block block--center block--white"
                    title="Open aanvragen"
                >
                    <Description
                        title="Open aanvragen"
                        text="Hier kun je alle open aanvragen zien."
                        className="description__centered"
                        classNameTitle="description__title--red"
                        classNameText="description__text--dark"
                    />
                    {/* Component van maken met map functie over array aanvragen */}
                    <p><strong>Datum aanvraag:</strong> [datum]</p>
                    <p><strong>Naam bewoner:</strong> [naamBewoner]</p>
                    <p><strong>Adres:</strong> [adres]</p>
                    <p><strong>Status:</strong> [status]</p>
                </ColoredContainer>


            </>
            }
        </div>
    );
}

export default Profiel;