import React, {useEffect, useState} from 'react';
import './GardenItemAdmin.css';
import axios from "axios";
import Button from "../../../buttons/button/Button";
import EditIcon from "../../editIcon/EditIcon";
import IconEdit from "../../../../assets/Aanpassen.png";
import FlexItem from "../../../flexItem/FlexItem";
import FlexContainer from "../../../flexContainer/FlexContainer";
import ItemContent from "../../itemContent/ItemContent";

function GardenItemAdmin({id}) {

    const [garden, setGarden] = useState(null);
    // const [gardenStatus, setGardenStatus] = useState("");
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
                            }
                        });
                    setGarden(result.data);
                    console.log("gardenItem result");
                    console.log(result.data);

                    return function cleanup() {
                        source.cancel();
                    }

                } catch
                    (e) {
                    console.error(e);
                }
            }

            if (id) {
                fetchData();
            }

            //    Hier id weggehaald al dependency!!!!!
        }

        ,
        []
    )
    ;

    return (
        <div className="garden-item">
            {garden &&
            <>
                <ItemContent
                title={`${garden.street} ${garden.houseNumber}, ${garden.city}`}
                date={garden.submissionDate}
                address={`${garden.street} ${garden.houseNumber}, ${garden.postalCode} ${garden.city}`}
                plants={garden.packagePlants}
                >
                    {garden.status === "Actief" &&
                    <p><strong>Plantenfluisteraar: </strong>{garden.employee.firstName} {garden.employee.lastName}</p>
                    }
                </ItemContent>

                <FlexContainer
                    className="FlexContainer FlexContainer__status-row"
                >
                    <Button
                        type="button"
                        className={`button__status button__status--${garden.status}`}
                        name={garden.status}
                    />
                    <EditIcon
                        name="Edit icon"
                        // onClick=""
                        icon={IconEdit}
                    />
                </FlexContainer>
            </>
            }

        </div>
    );
}

export default GardenItemAdmin;