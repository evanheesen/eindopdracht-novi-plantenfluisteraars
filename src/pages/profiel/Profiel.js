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
import FlexItem from "../../components/flexItem/FlexItem";

function Profiel() {

    const history = useHistory();
    const {user} = useContext(AuthContext);
    const {getUserData} = useContext(AuthContext);
    const userType = user.type;
    const data = user.info[userType]
    // let image = {};

    // if (user.info.employee.dbfile === null) {
    //         image = {profileAnonymous}
    //     } else {
    //         {user.info.employee.dbfile[0].fileDownloadUri}
    //     }


    // const [gardens, setGardens] = useState({});
    const [overview, setOverview] = useState("");
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        // const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            getUserData(token, decodedToken);
        } else {
            console.log("De gebruiker is niet geauthoriseerd")
            history.push("/login")
        }

    }, []);

    // ###### Dit werkt niet: krijg 403 error

    useEffect(() => {

        async function getGardens(token) {
            toggleError(false);
            toggleLoading(true);

            try {
                // if(token) {
                const result = await axios.get(`http://localhost:8081/bewoners`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                console.log(result.data);
                // setGardens(result.data);
                // } else{
                //     console.log("no token")
                // }
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
            toggleLoading(false);
        }

        getGardens(token);
    }, [overview])

    return (
        <>
            {Object.keys(user).length > 0 &&
            <>
                <FlexContainer
                    className="FlexContainer FlexContainer__image-container FlexContainer__image-container--profile">


                    <ColoredContainer
                        classNameItem="FlexItem FlexItem__split"
                        classNameBlock="block block--profile block--green"
                        title="Profiel"
                    >

                        <InfoSection>
                            <strong>Gebruikersnaam:</strong> {user.info.username}
                            <p><strong>Email:</strong> {user.info.email}</p>
                            <p><i>Wachtwoord wijzigen</i></p>
                            <p>{userType}</p>
                        </InfoSection>
                        {userType &&
                        <>
                            {/* Componenten met flex van maken! */}
                            <InfoSection>
                                <strong>Voornaam:</strong> {data.firstName}
                                <p><strong>Achternaam:</strong> {data.lastName}</p>
                                <p><strong>Telefoonnummer:</strong> {data.phone}</p>
                            </InfoSection>
                            {userType === "employee" &&
                            <InfoSection>
                                <strong>Adres:</strong> {`${data.street} ${data.houseNumber}`}
                                <p><strong>Postcode:</strong> {data.postalCode}</p>
                                <p><strong>Woonplaats:</strong> {data.city}</p>
                            </InfoSection>}
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


                    {/* #### deze onclick op de componenten werken niet */}
                    <FlexContainer className="FlexContainer FlexContainer__button-row">
                        <Button
                            type="button"
                            className="button button--red"
                            name="Toon jouw geveltuintjes"
                            onClick={() => setOverview("eigen")}
                        />
                        {userType === "employee" &&
                        <Button
                            type="button"
                            className="button button--red"
                            name="Toon open aanvragen"
                            onClick={() => setOverview("open")}
                        />}
                    </FlexContainer>

                    {overview === "eigen" &&
                    <ColoredContainer
                        classNameItem="FlexItem FlexItem--center"
                        classNameBlock="block block--center block--white"
                    >
                        <Description
                            title="Jouw aanvragen"
                            className="description__centered"
                            classNameTitle="description__title--red"
                        />
                        {/* Component van maken met map functie over array aanvragen */}
                        <p><strong>Datum aanvraag:</strong> [datum]</p>
                        <p><strong>Naam bewoner:</strong> [naamBewoner]</p>
                        <p><strong>Adres:</strong> [adres]</p>
                        <p><strong>Status:</strong> [status]</p>
                    </ColoredContainer>}

                    {overview === "open" &&
                    <ColoredContainer
                        classNameItem="FlexItem FlexItem__center"
                        classNameBlock="block block--center block--white"
                        // title="Open aanvragen"
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
                    </ColoredContainer>}
                </FlexContainer>
            </>}

            {error && <span>Er is iets misgegaan bij het laden van het profiel. Probeer het opnieuw.</span>}
            {loading && <span>Loading...</span>}

        </>
    );
}

export default Profiel;