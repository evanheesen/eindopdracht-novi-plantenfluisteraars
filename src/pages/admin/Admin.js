import React, {useContext, useEffect, useState} from 'react';
import jwtDecode from "jwt-decode";
import {AuthContext} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";
import FlexContainer from "../../components/flexContainer/FlexContainer";
import ColoredContainer from "../../components/coloredContainer/ColoredContainer";
import InfoSection from "../../components/profile/infoSection/InfoSection";
import Button from "../../components/buttons/button/Button";
import Description from "../../components/description/Description";
import axios from "axios";
import GardenItemAdmin from "../../components/profile/databaseItem/gardenItemAdmin/GardenItemAdmin";
import EmployeeItemAdmin from "../../components/profile/databaseItem/employeeItemAdmin/EmployeeItemAdmin";
import PageContainer from "../../components/pageContainer/PageContainer";
import UserItemAdmin from "../../components/profile/databaseItem/userItemAdmin/UserItemAdmin";
import AddAdmin from "../../components/profile/databaseItem/addAdmin/AddAdmin";

function Admin() {

    const history = useHistory();
    const {user} = useContext(AuthContext);
    const {getUserData} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const source = axios.CancelToken.source();

    const [mainOverview, setMainOverview] = useState("");
    const [overviewEmployees, setOverviewEmployees] = useState("all");
    const [overviewGardens, setOverviewGardens] = useState("all");
    const [overviewAdmins, setOverviewAdmins] = useState("all");
    const [gardens, setGardens] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [admins, setAdmins] = useState([]);

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const titleStatus = overviewGardens === "all" ? "Alle" : (overviewGardens === "open" ? "Open" : "Actieve");
    const titleEmployees = overviewEmployees === "all" ? "Alle" : "Actieve";

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
        }

        if (overviewGardens) {
            getGardens(token);
        }
        toggleLoading(false);

    }, [overviewGardens])

    useEffect(() => {
        const urlString = overviewEmployees === "all" ? "" : "status/" + overviewEmployees;
        console.log(urlString);

        async function getEmployees(token) {
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
        }

        if (overviewEmployees) {
            getEmployees(token);
        }
        toggleLoading(false);

    }, [overviewEmployees])

    useEffect(() => {

        async function getAdmins(token) {
            toggleError(false);
            toggleLoading(true);

            try {
                const result = await axios.get(`http://localhost:8081/users/`,
                    {
                        headers: {
                            cancelToken: source.token,
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });

                const users = result.data;
                const listAdmins = users.filter((user) => {
                    return user.authorities.some(authority => (authority.authority === "ROLE_ADMIN"))
                });

                setAdmins(listAdmins);
                console.log("result admins: ");
                console.log(listAdmins);

                return function cleanup() {
                    source.cancel();
                }

            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

        if (overviewAdmins) {
            getAdmins(token);
        }
        toggleLoading(false);

    }, [overviewAdmins])


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
                                <Button
                                    type="button"
                                    className="button button--dark button--admin"
                                    onClick={() => setMainOverview("gardens")}
                                    name="Geveltuintjes"
                                />
                                {mainOverview === "gardens" &&
                                <>
                                    <Button
                                        type="button"
                                        className="button button--dark button--profile button--sub"
                                        id="button--gardens-all"
                                        name="Toon alle geveltuintjes"
                                        onClick={() => setOverviewGardens("all")}
                                    />
                                    <Button
                                        type="button"
                                        className="button button--dark button--profile button--sub"
                                        id="button--gardens-open"
                                        name="Toon open aanvragen"
                                        onClick={() => setOverviewGardens("open")}
                                    />
                                    <Button
                                        type="button"
                                        className="button button--dark button--profile button--sub"
                                        id="button--gardens-active"
                                        name="Toon actieve aanvragen"
                                        onClick={() => setOverviewGardens("actief")}
                                    />
                                </>}

                                <Button
                                    type="button"
                                    className="button button--dark button--admin"
                                    onClick={() => setMainOverview("employees")}
                                    name="Plantenfluisteraars"
                                />

                                {mainOverview === "employees" &&
                                <>
                                    <Button
                                        type="button"
                                        className="button button--dark button--profile button--sub"
                                        id="button--employees-all"
                                        name="Toon alle Plantenfluisteraars"
                                        onClick={() => setOverviewEmployees("all")}
                                    />
                                    <Button
                                        type="button"
                                        className="button button--dark button--profile button--sub"
                                        id="button--employees-active"
                                        name="Toon actieve Plantenfluisteraars"
                                        onClick={() => setOverviewEmployees("actief")}
                                    />
                                </>}

                                <Button
                                    type="button"
                                    className="button button--dark button--admin"
                                    onClick={() => setMainOverview("admins")}
                                    name="Administrators"
                                />

                                {mainOverview === "admins" &&
                                <>
                                    <Button
                                        type="button"
                                        className="button button--dark button--profile button--sub"
                                        id="button--users-all"
                                        name="Toon alle Administrators"
                                        onClick={() => setOverviewAdmins("all")}
                                    />
                                    <Button
                                        type="button"
                                        className="button button--dark button--profile button--sub"
                                        id="button--users-new"
                                        name="Maak nieuwe Administrator"
                                        onClick={() => setOverviewAdmins("new")}
                                    />
                                </>}

                            </FlexContainer>
                        </ColoredContainer>

                        {/*/* If button Aanvragen is clicked, show: */}
                        {mainOverview === "gardens" && overviewGardens != "" &&
                        <ColoredContainer
                            classNameItem="FlexItem FlexItem__center FlexItem__side"
                            classNameBlock="block block--center block--white block--admin"
                        >
                            <Description
                                title={`${titleStatus} aanvragen`}
                                className="description__centered"
                                classNameTitle="description__title--red"
                            />
                            <InfoSection className="gardens-overview">
                                {gardens.map((garden) => {
                                    return <GardenItemAdmin
                                        key={garden.id}
                                        id={garden.id}
                                    />
                                })}
                            </InfoSection>

                        </ColoredContainer>
                        }

                        {/*/* If button Plantenfluisteraars is clicked, show: */}
                        {mainOverview === "employees" && overviewEmployees != "" &&
                        <ColoredContainer
                            classNameItem="FlexItem FlexItem__center FlexItem__side"
                            classNameBlock="block block--center block--white block--admin"
                        >
                            <Description
                                title={`${titleEmployees} Plantenfluisteraars`}
                                className="description__centered"
                                classNameTitle="description__title--red"
                            />
                            <InfoSection className="gardens-overview">
                                {employees.map((employee) => {
                                    return <EmployeeItemAdmin
                                        key={employee.id}
                                        id={employee.id}
                                    />
                                })}
                            </InfoSection>
                        </ColoredContainer>
                        }


                        {/*/* If button Administrators is clicked, show: */}
                        {mainOverview === "admins" && overviewAdmins != "" &&
                        <ColoredContainer
                            classNameItem="FlexItem FlexItem__center FlexItem__side"
                            classNameBlock="block block--center block--white block--admin"
                        >
                            <Description
                                title={overviewAdmins === "new" ? "Voeg administrator toe" : "Alle administrators"}
                                className="description__centered"
                                classNameTitle="description__title--red"
                            />
                            {overviewAdmins === "all" &&
                            <InfoSection className="gardens-overview">
                                {admins.map((admin) => {
                                    return <UserItemAdmin
                                        key={admin.username}
                                        username={admin.username}
                                    />
                                })}
                            </InfoSection>}
                            {overviewAdmins === "new" &&
                            <InfoSection className="gardens-overview">
                                <AddAdmin/>
                            </InfoSection>
                            }
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