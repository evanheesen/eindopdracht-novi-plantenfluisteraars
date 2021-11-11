import React, {useEffect, useState} from 'react';
import axios from "axios";
import InfoSection from "../../infoSection/InfoSection";

function GardenItemCustomer({id, oppositePerson}) {

    const [garden, setGarden] = useState(null);

    useEffect(() => {
        console.log(id);
       async function fetchData() {
           try {
               const result = await axios.get(`http://localhost:8081/gardens/${id}`);
               setGarden(result.data);
               console.log("gardenItem result:");
               console.log(result.data);
           } catch(e) {
               console.error(e);
           }
       }

       fetchData();
    }, [id]);

    return (
        <InfoSection className="gardens-overview">
            {garden &&
            <>
                <p><strong>Datum aanvraag: </strong>{garden.submissionDate}</p>

                {/* nog dynamisch maken employee/customer */}
                <p><strong>Naam {oppositePerson}: </strong>{garden.employee.firstName} {garden.employee.lastName}</p>
                    {/*// {garden.employee.firstName} {garden.employee.lastName}*/}
                <p><strong>Adres: </strong>{garden.street}</p>
                <p><strong>Datum aanvraag: </strong>{garden.status}</p>
            </>
            }

        </InfoSection>
    );
}

export default GardenItemCustomer;