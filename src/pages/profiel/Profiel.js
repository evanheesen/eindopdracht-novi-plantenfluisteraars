import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import ColoredContainer from "../../components/coloredContainer/ColoredContainer";
import styles from './Profiel.module.css';
import profileAnonymous from '../../assets/profile-picture-anonymous.png';
import ImageContainer from "../../components/imageContainer/ImageContainer";
import Button from "../../components/button/Button";
import Description from "../../components/description/Description";
import jwtDecode from "jwt-decode";
import InfoSection from "../../components/profiel/infoSection/InfoSection";
import FlexContainer from "../../components/flexContainer/FlexContainer";
import FileUpload from "../../components/profiel/fileUpload/FileUpload";

function Profiel() {

    const history = useHistory();
    const {user} = useContext(AuthContext);
    const {getUserData} = useContext(AuthContext);
    const userType = user.type;
    // const image = {};
    //
    // {
    //     if (user.info.employee.dbfile === null) {
    //         profileAnonymous
    //     } else {
    //         {user.info.employee.dbfile[0].fileDownloadUri}
    //     }
    // }

    // vragen hoe deze te combineren tot 1 variable
    const data = "user.info." + userType

    // const [userData, setUserData] = useState({});
    // const [error, toggleError] = useState(false);
    // const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwtDecode(token);
            getUserData(token, decodedToken);
        } else {
            console.log("De gebruiker is niet geauthoriseerd")
            history.push("/login")
        }

    }, []);

    return (
        <>
            <FlexContainer className="FlexContainer FlexContainer__image-container FlexContainer__image-container--profile">

            {Object.keys(user).length > 0 &&
            <>
                <ColoredContainer
                    classNameItem="FlexItem FlexItem__split-top"
                    classNameBlock="block block--left block--red"
                    title="Profiel"
                >

                    <InfoSection>
                    <strong>Gebruikersnaam:</strong> {user.info.username}
                    <p><i>Wachtwoord wijzigen</i></p>
                    </InfoSection>
                    {user.type &&
                    <>
                        {/* Componenten met flex van maken! */}
                        <InfoSection>
                            <strong>Voornaam:</strong> {user.info.employee.firstName}
                            <p><strong>Achternaam:</strong> {user.info.employee.lastName}</p>
                            <p><strong>Email:</strong> {user.info.employee.email}</p>
                            <p><strong>Telefoonnummer:</strong> {user.info.employee.phone}</p>
                        </InfoSection>
                        <InfoSection>
                            <strong>Adres:</strong> {`${user.info.employee.street} ${user.info.employee.houseNumber}`}
                            <p><strong>Postcode:</strong> {user.info.employee.postalCode}</p>
                            <p><strong>Woonplaats:</strong> {user.info.employee.city}</p>
                        </InfoSection>
                    </>}

                </ColoredContainer>

                <ImageContainer
                    className="FlexItem FlexItem__profile"
                    source={profileAnonymous}
                    alt="plantenfluisteraar"
                    classNameImg={styles["image-profile"]}
                >
                    <FileUpload/>
                {/*  Aanpassen CSS in app.css: naar component verplaatsen */}
                </ImageContainer>

                <Button
                    type="button"
                    className="button button--dark"
                    name="Toon jouw geveltuintjes"
                    /* onClick= wijzigen state naar lijst aanvragen in profiel */
                />
                <Button
                    type="button"
                    id="buttonRequests"
                    className="button button--dark"
                    name="Toon open aanvragen"
                    /* onClick= wijzigen state naar lijst aanvragen met open status */
                />

                {/* Eigen tuintje(s): if statement gerelateerd aan state aanvragen */}
                <ColoredContainer
                    classNameItem="FlexItem FlexItem--center"
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
            </FlexContainer>
        </>
    );
}

export default Profiel;