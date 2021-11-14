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
import EmployeeItemAdmin from "../../components/profiel/gardenItem/employeeItemAdmin/EmployeeItemAdmin";
import PageContainer from "../../components/pageContainer/PageContainer";

function Admin() {

    const history = useHistory();
    const {user} = useContext(AuthContext);
    const {getUserData} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const source = axios.CancelToken.source();

    const [mainOverview, setMainOverview] = useState("");
    const [overviewEmployees, setOverviewEmployees] = useState("");
    const [overviewGardens, setOverviewGardens] = useState("");
    const [gardens, setGardens] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const titleStatus = overviewGardens === "all" ? "Alle" : (overviewGardens === "open" ? "Open" : "Actieve");
    const titleEmployees = overviewEmployees === "all" ? "Alle" : "Actieve";

    // function showOverview(url) {
    //     setOverview(url === "alles" ? "" : url);
    // }


    //  #### Mee bezig: endpoints + service inrichten in backend maken voor status /all, /open, /active


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
        const urlString = overviewGardens === "all" ? "" : "status/" + overviewGardens;
        console.log(urlString);

        async function getGardens(token) {
            toggleError(false);
            toggleLoading(true);

            try {
                const result = await axios.get(`http://localhost:8081/gardens/${urlString}`,
                    {
                        headers: {
                            cancelToken: source.token,
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });

                setGardens(result.data);
                console.log("result gardens: ")
                console.log(result.data);

                return function cleanup() {
                    source.cancel();
                }

            } catch (e) {
                console.error(e);
                toggleError(true);
            }
            toggleLoading(false);
        }

        if (overviewGardens) {
            getGardens(token);
        }

    }, [overviewGardens])

    useEffect(() => {
        const urlString = overviewEmployees === "all" ? "" : "status/" + overviewEmployees;
        console.log(urlString);

        async function getGardens(token) {
            toggleError(false);
            toggleLoading(true);

            try {
                const result = await axios.get(`http://localhost:8081/employees/${urlString}`,
                    {
                        headers: {
                            cancelToken: source.token,
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });

                setEmployees(result.data);
                console.log("result employees: ");
                console.log(result.data);

                return function cleanup() {
                    source.cancel();
                }

            } catch (e) {
                console.error(e);
                toggleError(true);
            }
            toggleLoading(false);
        }

        if (overviewEmployees) {
            getGardens(token);
        }

    }, [overviewEmployees])

    return (
        <>
            <PageContainer className="PageContainer PageContainer--image FlexContainer__image-container--profile">
                {Object.keys(user).length > 0 &&
                <>
                <FlexContainer className="FlexContainer FlexContainer__white-centered FlexContainer__admin">
                    <ColoredContainer
                        classNameItem="FlexItem FlexItem__side"
                        classNameBlock="block block--profile block--green"
                        title="Dashboard admin"
                    >
                        <InfoSection>
                            <strong>Gebruikersnaam:</strong> {user.info.username}
                            <p><strong>Email:</strong> {user.info.email}</p>
                        </InfoSection>
                        <FlexContainer className="FlexContainer FlexContainer__button-admin">
                            <button
                                type="button"
                                className="button button--dark button--admin"
                                onClick={() => setMainOverview("gardens")}
                            >
                                Geveltuintjes
                            </button>
                            <button
                                type="button"
                                className="button button--dark button--admin"
                                onClick={() => setMainOverview("employees")}
                            >
                                Plantenfluisteraars
                            </button>
                            {mainOverview === "gardens" &&
                                <>
                                    <Button
                                        type="button"
                                        className="button button--dark button--profile"
                                        name="Toon alle geveltuintjes"
                                        onClick={() => setOverviewGardens("all")}
                                    />
                                    <Button
                                        type="button"
                                        className="button button--dark button--profile"
                                        name="Toon open aanvragen"
                                        onClick={() => setOverviewGardens("open")}
                                    />
                                    <Button
                                        type="button"
                                        className="button button--dark button--profile"
                                        name="Toon actieve aanvragen"
                                        onClick={() => setOverviewGardens("actief")}
                                    />
                                </>}
                            {mainOverview === "employees" &&
                                <>
                                    <Button
                                        type="button"
                                        className="button button--dark button--profile"
                                        name="Toon alle Plantenfluisteraars"
                                        onClick={() => setOverviewEmployees("all")}
                                    />
                                    <Button
                                        type="button"
                                        className="button button--dark button--profile"
                                        name="Toon actieve Plantenfluisteraars"
                                        onClick={() => setOverviewEmployees("actief")}
                                    />
                                </>}
                        </FlexContainer>
                    </ColoredContainer>

                    {/*/* If button Aanvragen is clicked, show: */}
                    {mainOverview === "gardens" && overviewGardens != "" &&
                    <ColoredContainer
                        classNameItem="FlexItem FlexItem__center FlexItem__side"
                        classNameBlock="block block--center block--white"
                    >
                        <Description
                            title={`${titleStatus} aanvragen`}
                            className="description__centered"
                            classNameTitle="description__title--red"
                        />
                        <InfoSection className="gardens-overview">
                            {gardens.map((garden) => {
                                return <GardenItemAdmin key={garden.id} id={garden.id}/>
                            })}
                        </InfoSection>
                    </ColoredContainer>
                    }

                    {/*/* If button Plantenfluisteraars is clicked, show: */}
                    {mainOverview === "employees" && overviewEmployees != "" &&
                    <ColoredContainer
                        classNameItem="FlexItem FlexItem__center FlexItem__side"
                        classNameBlock="block block--center block--white"
                    >
                        <Description
                            title={`${titleEmployees} Plantenfluisteraars`}
                            className="description__centered"
                            classNameTitle="description__title--red"
                        />
                        <InfoSection className="gardens-overview">
                            {employees.map((employee) => {
                                return <EmployeeItemAdmin key={employee.id} id={employee.id}/>
                            })}
                        </InfoSection>
                    </ColoredContainer>
                    }
                </FlexContainer>
                </>}

                {error && <span>Er is iets misgegaan bij het laden van het dashboard. Probeer het opnieuw.</span>}
                {loading && <span>Loading...</span>}
            </PageContainer>

        </>
    );
}

export default Admin;