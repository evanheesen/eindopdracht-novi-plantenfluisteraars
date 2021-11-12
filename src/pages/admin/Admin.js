import React, {useContext, useEffect, useState} from 'react';
import jwtDecode from "jwt-decode";
import {AuthContext} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";
import FlexContainer from "../../components/flexContainer/FlexContainer";
import ColoredContainer from "../../components/coloredContainer/ColoredContainer";
import InfoSection from "../../components/profiel/infoSection/InfoSection";
import Button from "../../components/buttons/button/Button";
import Description from "../../components/description/Description";
import axios from "axios";
import GardenItemAdmin from "../../components/profiel/gardenItem/gardenItemAdmin/GardenItemAdmin";

function Admin() {

    const history = useHistory();
    const {user} = useContext(AuthContext);
    const {getUserData} = useContext(AuthContext);
    const token = localStorage.getItem('token');

    const [overview, setOverview] = useState("closed");
    const [gardens, setGardens] = useState({});
    const [urlString, setUrlString] = useState("");
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    // let url

    function showOverview(url) {
        setOverview(url);
        console.log(overview);

        // setUrlString(overview === "alles" ? "test" : (overview === "actief" ? "/active" : "/open"))
        // console.log(urlString);
    }

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

        if (overview != "closed") {
            async function getGardens(token) {
                toggleError(false);
                toggleLoading(true);

                console.log("overview type: " + overview);
                console.log("urlString: " + urlString);

                try {
                    const result = await axios.get(`http://localhost:8081/gardens/${overview}`,
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

            if(overview){
            getGardens(token);
            }
        }
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
                        title="Dashboard admin"
                    >
                        <InfoSection>
                            <strong>Gebruikersnaam:</strong> {user.info.username}
                            <p><strong>Email:</strong> {user.info.email}</p>
                        </InfoSection>
                    </ColoredContainer>

                    <ColoredContainer
                        classNameItem="FlexItem FlexItem__split"
                        classNameBlock="block block--profile block--red"
                        title="Aanpassen"
                    >
                        <InfoSection>
                            <strong>Gebruikersnaam:</strong> {user.info.username}
                            <p><strong>Email:</strong> {user.info.email}</p>
                        </InfoSection>
                    </ColoredContainer>

                    <FlexContainer className="FlexContainer FlexContainer__button-row">
                        <Button
                            type="button"
                            className="button button--red"
                            name="Toon alle geveltuintjes"
                            onClick={() => showOverview("")}
                        />
                        <Button
                            type="button"
                            className="button button--red"
                            name="Toon open aanvragen"
                            onClick={() => showOverview("open")}
                        />
                        <Button
                            type="button"
                            className="button button--red"
                            name="Toon actieve aanvragen"
                            onClick={() => showOverview("active")}
                        />
                    </FlexContainer>

                    {overview != "closed" &&
                    <ColoredContainer
                        classNameItem="FlexItem FlexItem__center"
                        classNameBlock="block block--center block--white"
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
                                return <GardenItemAdmin key={garden.id} id={garden.id}/>
                            })}
                        </InfoSection>
                    </ColoredContainer>
                    }

                </FlexContainer>
            </>}

            {error && <span>Er is iets misgegaan bij het laden van het dashboard. Probeer het opnieuw.</span>}
            {loading && <span>Loading...</span>}

        </>
    );
}

export default Admin;