import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import ColoredContainer from "../../components/coloredContainer/ColoredContainer";
import styles from './Profiel.module.css';
import profileAnonymous from '../../assets/profile-picture-anonymous.png';
import ImageContainer from "../../components/imageContainer/ImageContainer";
import Button from "../../components/buttons/button/Button";
import Description from "../../components/description/Description";
import jwtDecode from "jwt-decode";
import InfoSection from "../../components/profiel/infoSection/InfoSection";
import FlexContainer from "../../components/flexContainer/FlexContainer";
import FileUpload from "../../components/profiel/fileUpload/FileUpload";
import FlexItem from "../../components/flexItem/FlexItem";
import GardenItemCustomer from "../../components/profiel/gardenItem/gardenItemCustomer/GardenItemCustomer";
import GardenItemEmployee from "../../components/profiel/gardenItem/gardenItemEmployee/GardenItemEmployee";

function Profiel() {

    const history = useHistory();
    const {user} = useContext(AuthContext);
    const {getUserData} = useContext(AuthContext);
    const userType = user.type;
    const oppositePerson = userType === "customer" ? "Plantenfluisteraar" : "Bewoner";
    const data = user.info[userType]
    let urlOwnGardens = userType ===  "employee" ? "employees/" + data.id : "customers/" + data.id;

    // Show own gardens
    function showOwn() {
        setOverview("eigen");
        setUrlString(urlOwnGardens);
    }

    // Show open requests
    function showOpen() {
       setOverview("open");
       setUrlString("status/open");
   }

    // ######## Afbeelding nog kunnen laden ########
    // let image = {};

    // if (user.info.employee.dbfile === null) {
    //         image = {profileAnonymous}
    //     } else {
    //         {user.info.employee.dbfile[0].fileDownloadUri}
    //     }


    // const [gardens, setGardens] = useState({});
    const [overview, setOverview] = useState("");
    const [gardens, setGardens] = useState({});
    const [urlString, setUrlString] = useState("");
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const token = localStorage.getItem('token');


    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            getUserData(token, decodedToken);
        } else {
            console.log("De gebruiker is niet geauthoriseerd")
            history.push("/login")
        }

    }, []);

    useEffect(() => {

        async function getGardens(token) {
            toggleError(false);
            toggleLoading(true);

            console.log("urlOwnGarden: " + urlOwnGardens);
            console.log("urlString: " + urlString);

            try {
                const result = await axios.get(`http://localhost:8081/gardens/${urlString}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });

                console.log("Garden overview data:")
                console.log(result.data);
                setGardens(result.data);

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
                            <p>{userType}</p>
                        </InfoSection>
                        {userType &&
                        <>
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


                    <FlexContainer className="FlexContainer FlexContainer__button-row">
                        <Button
                            type="button"
                            className="button button--red"
                            name="Toon jouw geveltuintjes"
                            onClick={showOwn}
                        />
                        {userType === "employee" &&
                        <Button
                            type="button"
                            className="button button--red"
                            name="Toon open aanvragen"
                            onClick={showOpen}
                        />}
                    </FlexContainer>

                    {overview === "eigen" && userType === "customer" &&
                    <ColoredContainer
                        classNameItem="FlexItem FlexItem--center"
                        classNameBlock="block block--center block--white"
                    >
                        <Description
                            title="Jouw geveltuin"
                            className="description__centered"
                            classNameTitle="description__title--red"
                        />
                        <GardenItemCustomer id={gardens[0].id} oppositePerson={oppositePerson}/>
                    </ColoredContainer>}

                    {/* ###### Deze twee nog samenvoegen?? */}

                    {overview === "eigen" && userType === "employee" &&
                    <ColoredContainer
                        classNameItem="FlexItem FlexItem--center"
                        classNameBlock="block block--center block--white"
                    >
                        <Description
                            title="Jouw geveltuinen"
                            className="description__centered"
                            classNameTitle="description__title--red"
                        />
                        <InfoSection className="gardens-overview">
                        {gardens.map((garden) => {
                            return <GardenItemEmployee key={garden.id} id={garden.id} oppositePerson={oppositePerson}/>
                        })}
                        </InfoSection>
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
                        <InfoSection className="gardens-overview">
                            {gardens.map((garden) => {
                                return <GardenItemEmployee key={garden.id} id={garden.id} oppositePerson={oppositePerson}/>
                            })}
                        </InfoSection>
                    </ColoredContainer>}
                </FlexContainer>
            </>}

            {error && <span>Er is iets misgegaan bij het laden van het profiel. Probeer het opnieuw.</span>}
            {loading && <span>Loading...</span>}

        </>
    );
}

export default Profiel;