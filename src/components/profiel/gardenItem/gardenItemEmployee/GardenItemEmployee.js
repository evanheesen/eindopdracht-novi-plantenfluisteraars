import React, {useEffect, useState} from 'react';
import axios from "axios";
import './GardenItemEmployee.css';
import Button from "../../../buttons/button/Button";
import DropdownButton from "../../../buttons/dropdownButton/DropdownButton";

function GardenItemEmployee({id}) {

    const [garden, setGarden] = useState(null);
    const [gardenStatus, setGardenStatus] = useState("");
    const token = localStorage.getItem('token');

    ////// Is dit nodig??
    const source = axios.CancelToken.source();

    useEffect(() => {
        console.log(id);

        async function fetchData() {
            try {
                const result = await axios.get(`http://localhost:8081/gardens/${id}`);
                setGarden(result.data);
                console.log("gardenItem result");
                console.log(result.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchData();
    }, [id]);

    // // When the status changes
    // useEffect(() => {
    //     console.log(status);
    //
    //     async function changeStatus(e) {
    //         e.preventDefault();
    //
    //         try {
    //             const result = await axios.patch(`http://localhost:8081/gardens/${id}`, {
    //                 status: gardenStatus,
    //             });
    //             // setGarden(result.data);
    //             // console.log("gardenItem result");
    //             // console.log(result.data);
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     }
    //
    //     changeStatus();
    // }, [status]);


    // wanneer status verandert
    function changeStatus() {
        const status = document.getElementById("dropdown-status").value;
        setGardenStatus(status);
        changeStatus();

        async function changeStatus() {

            console.log("gardenStatus: " + gardenStatus);

            try {
                await axios.patch(`http://localhost:8081/gardens/garden/${id}`, {
                        cancelToken: source.token,
                        status: gardenStatus,
                    },
                    {
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        }
                    });

                // Moet dit hier??
                return function cleanup() {
                    source.cancel();
                }
            } catch (e) {
                console.error(e);
            }
        }
    }


    return (
        <div className="garden-item">
            {garden &&
            <>
                <h4>{garden.street} {garden.houseNumber}, {garden.city}</h4>
                <p><strong>Datum aanvraag: </strong>{garden.submissionDate}</p>
                <p><strong>Adres: </strong>{garden.street} {garden.houseNumber}, {garden.city}</p>
                {/* classname wordt niet gepakt voor status !!! */}
                {/*<p><strong>Status aanvraag: </strong><span*/}
                {/*    className={garden.status === "Open" ? "status-open" : "status-active"}>{garden.status}</span></p>*/}

                <DropdownButton
                    classNameButton="button__status"
                    classNameSelect="dropdown-status"
                    nameSelect="status"
                    idSelect="dropdown-status"
                    onChange={changeStatus}
                >
                    <option value={garden.status}>{garden.status}</option>
                    */}
                    {garden.status === "Open" &&
                    <option value="Actief">Accepteer</option>
                    }
                    {garden.status === "Actief" &&
                    <option value="Afgerond">Afgerond</option>
                    }
                </DropdownButton>


                {/*<Button*/}
                {/*    type="button"*/}
                {/*    className="button__status"*/}
                {/*>*/}
                {/*    <select className="dropdown-status" name="status" id="dropdown-status" onChange={changeStatus}>*/}
                {/*        <option value={garden.status}>{garden.status}</option>*/}
                {/*        {garden.status === "Open" &&*/}
                {/*        <option value="Actief">Accepteer</option>*/}
                {/*        }*/}
                {/*        {garden.status === "Actief" &&*/}
                {/*        <option value="Afgerond">Afgerond</option>*/}
                {/*        }*/}
                {/*    </select>*/}
                {/*</Button>*/}
            </>
            }

        </div>

    );
}

export default GardenItemEmployee;