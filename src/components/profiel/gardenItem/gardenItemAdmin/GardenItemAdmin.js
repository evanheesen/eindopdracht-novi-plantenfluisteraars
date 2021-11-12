import React, {useEffect, useState} from 'react';
import './GardenItemAdmin.css';
import axios from "axios";
import DropdownButton from "../../../buttons/dropdownButton/DropdownButton";
import Button from "../../../buttons/button/Button";

function GardenItemAdmin({id}) {

    const [garden, setGarden] = useState(null);
    // const [gardenStatus, setGardenStatus] = useState("");
    // const source = axios.CancelToken.source();
    const token = localStorage.getItem('token');

    useEffect(() => {
        console.log(id);

        async function fetchData() {
            try {
                const result = await axios.get(`http://localhost:8081/gardens/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                setGarden(result.data);
                console.log("gardenItem result");
                console.log(result.data);
            } catch (e) {
                console.error(e);
            }
        }
        if(id) {
        fetchData();
        }

    },[id]);

    return (
        <div className="garden-item">
            {garden &&
            <>
                <h4>{garden.street} {garden.houseNumber}, {garden.city}</h4>
                <p><strong>Datum aanvraag: </strong>{garden.submissionDate}</p>
                <p><strong>Adres: </strong>{garden.street} {garden.houseNumber}, {garden.city}</p>
                <p><strong>Pakket beplanting: </strong>{garden.packagePlants}</p>

                <Button
                    type="button"
                    className="button__status"
                    name={garden.status}
                />
            </>
            }

        </div>
    );
}

export default GardenItemAdmin;