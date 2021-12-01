import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import './GardenItemEmployee.css';
import DropdownButton from "../../../buttons/dropdownButton/DropdownButton";
import {AuthContext} from "../../../../context/AuthContext";
import ItemContent from "../../itemContent/ItemContent";

function GardenItemEmployee({id}) {

    const {user} = useContext(AuthContext);
    const employeeId = user.info.employee.id;
    const [garden, setGarden] = useState(null);
    const [gardenStatus, setGardenStatus] = useState("");
    const token = localStorage.getItem('token');
    const source = axios.CancelToken.source();

    useEffect(() => {

        console.log(id);

        async function fetchData() {
            try {
                const result = await axios.get(`http://localhost:8081/gardens/${id}`,
                    {
                        headers: {
                            cancelToken: source.token,
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
                setGarden(result.data);
                console.log("databaseItem result");
                console.log(result.data);

                return function cleanup() {
                    source.cancel();
                }
            } catch (e) {
                console.error(e);
            }
        }

        if (id) {
            fetchData();
        }

    }, [id]);

    function changeStatus() {
        const status = document.getElementById("dropdown-status").value;
        console.log("status button: " + status);
        console.log("employee id: " + employeeId);
        setGardenStatus(status);
    }

    // // When the status changes
    useEffect(() => {

        async function changeStatus() {
            try {
                await axios.patch(`http://localhost:8081/gardens/garden/${id}/employees/${employeeId}`, {
                        status: gardenStatus,
                    },
                    {
                        headers: {
                            cancelToken: source.token,
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        }
                    });

                return function cleanup() {
                    source.cancel();
                }
            } catch (e) {
                console.error(e);
            }
        }

        if (gardenStatus) {
            changeStatus();
        }

    }, [gardenStatus]);

    return (
        <section className="garden-item">
            {garden &&
            <>
                <ItemContent
                    title={`${garden.street} ${garden.houseNumber}, ${garden.city}`}
                    date={garden.submissionDate}
                    address={`${garden.street} ${garden.houseNumber}, ${garden.postalCode} ${garden.city}`}
                    plants={garden.packagePlants}
                />

                <DropdownButton
                    classNameButton="button__status"
                    classNameSelect={`button__status button__status--${garden.status}`}
                    nameSelect="status"
                    idSelect="dropdown-status"
                    onChange={changeStatus}
                >
                    <option value={garden.status}>{garden.status}</option>
                    {garden.status === "Open" &&
                    <option value="Actief">Accepteer</option>}
                    {garden.status === "Actief" &&
                    <option value="Afgerond">Afgerond</option>}
                </DropdownButton>
            </>
            }

        </section>

    );
}

export default GardenItemEmployee;