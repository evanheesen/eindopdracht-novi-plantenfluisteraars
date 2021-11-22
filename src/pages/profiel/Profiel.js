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
import PageContainer from "../../components/pageContainer/PageContainer";

function Profiel() {

    const history = useHistory();
    const {getUserData} = useContext(AuthContext);

    const {user} = useContext(AuthContext);
    const userType = user.type;
    const oppositePerson = userType === "customer" ? "Plantenfluisteraar" : "Bewoner";
    const data = user.info[userType]
    const userId = data.id;
    let urlOwnGardens = userType ===  "employee" ? "employees/" + userId : "customers/" + userId;
    const [overview, setOverview] = useState("");
    const [gardens, setGardens] = useState([]);
    const [urlString, setUrlString] = useState("");
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const token = localStorage.getItem('token');
    const source = axios.CancelToken.source();

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
                            cancelToken: source.token,
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });

                console.log("Garden overview data:")
                console.log(result.data);
                setGardens(result.data);

                // Werkt nog niet!!! //
                // if(userType === "employee" && data.dbFile.id) {
                //     getFile()
                // }

                return function cleanup() {
                    source.cancel();
                }

            } catch (e) {
                console.error(e);
                toggleError(true);
            }
            toggleLoading(false);
        }

        if(overview) {
        getGardens(token);
        }

    }, [overview])

    // **** Ophalen bestand werkt nog niet!!
    // async function getFile() {
    //     const employeeId = data.id;
    //     const fileId = data.dbFile.id;
    //
    //     toggleError(false);
    //     toggleLoading(true);
    //
    //     try {
    //         const result = await axios.get(`http://localhost:8081/files/${employeeId}/${fileId}`,
    //             {
    //                 headers: {
    //                     cancelToken: source.token,
    //                     "Content-Type": "application/json",
    //                     Authorization: `Bearer ${token}`,
    //                 }
    //             });
    //
    //         console.log("Result data file: ")
    //         console.log(result);
    //
    //         return function cleanup() {
    //             source.cancel();
    //         }
    //
    //     } catch (e) {
    //         console.error(e);
    //         toggleError(true);
    //     }
    //     toggleLoading(false);
    // }

    return (
        <>
            <PageContainer className="PageContainer PageContainer--image FlexContainer__image-container--profile">
            {Object.keys(user).length > 0 &&
            <>
                <FlexContainer
                    className= {userType === "employee" ? "FlexContainer FlexContainer__white-split FlexContainer__admin" : "FlexContainer FlexContainer__admin"}>


                    <ColoredContainer
                        classNameItem= {userType === "employee" ? "FlexItem FlexItem__profile" : "FlexItem FlexItem__profile"}
                        classNameBlock="block block--profile block--green"
                        title= {userType === "employee" ? "Profiel Plantenfluisteraar" : "Profiel bewoner"}
                    >

                        {userType &&
                        <>
                            <InfoSection>
                                <strong>Voornaam:</strong> {data.firstName}
                                <p><strong>Achternaam:</strong> {data.lastName}</p>
                                <p><strong>Telefoonnummer:</strong> {data.phone}</p>
                            </InfoSection>
                            {userType === "employee" &&
                            <InfoSection className="InfoSection__user-details">
                                <strong>Adres:</strong> {`${data.street} ${data.houseNumber}`}
                                <p><strong>Postcode:</strong> {data.postalCode}</p>
                                <p><strong>Woonplaats:</strong> {data.city}</p>
                            </InfoSection>}
                        </>}
                        <InfoSection className="InfoSection__user-details">
                            <strong>Gebruikersnaam:</strong> {user.info.username}
                            <p><strong>Email:</strong> {user.info.email}</p>
                        </InfoSection>

                        <FlexContainer className="FlexContainer FlexContainer__button-admin">
                            <Button
                                type="button"
                                className="button button--red button--admin"
                                name="Toon jouw geveltuintjes"
                                onClick={showOwn}
                            />
                            {userType === "employee" &&
                            <Button
                                type="button"
                                className="button button--red button--admin"
                                name="Toon open aanvragen"
                                onClick={showOpen}
                            />}
                        </FlexContainer>

                    </ColoredContainer>

                    {userType === "employee" &&
                    <ImageContainer
                        className="FlexItem FlexItem__profile"
                        source={profileAnonymous}
                        alt="plantenfluisteraar"
                        classNameImg={styles["image-profile"]}
                    />}

                    {overview === "eigen" && userType === "customer" &&
                    <ColoredContainer
                        classNameItem="FlexItem FlexItem--center FlexItem__side"
                        classNameBlock="block block--center block--white"
                    >
                        <Description
                            title="Jouw geveltuin"
                            className="description__centered"
                            classNameTitle="description__title--red"
                        />
                        {gardens.map((garden) => {
                            return <GardenItemCustomer key={garden.id} id={garden.id} oppositePerson={oppositePerson}/>
                        })}
                        {/*<GardenItemCustomer id={gardens[0].id} oppositePerson={oppositePerson}/>*/}
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
                            className="description__centered"
                            classNameTitle="description__title--red"
                        />
                        <InfoSection className="gardens-overview">
                            {gardens.map((garden) => {
                                return <GardenItemEmployee key={garden.id} id={garden.id} oppositePerson={oppositePerson}/>
                            })}
                        </InfoSection>
                    </ColoredContainer>}
                </FlexContainer>
                {/*{error && <span>Er is iets misgegaan bij het laden van het profiel. Probeer het opnieuw.</span>}*/}
                {/*{loading && <span>Loading...</span>}*/}
            </>}

            </PageContainer>
        </>
    );
}

export default Profiel;