import React, {useEffect, useState} from 'react';
import axios from "axios";
import InfoSection from "../../infoSection/InfoSection";

function GardenItemCustomer({id, }) {

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
        <section className="garden-item">
            {garden &&
            <>
                <p><strong>Datum aanvraag: </strong>{garden.submissionDate}</p>
                <p><strong>Adres: </strong>{garden.street} {garden.houseNumber}, {garden.city}</p>
                {garden.status != "Open" &&
                    <>
                <p><strong>Naam Plantenfluisteraar: </strong>{garden.employee.firstName} {garden.employee.lastName}</p>
                    <p><strong>Telefoon Plantenfluisteraar: </strong>{garden.employee.phone}</p>
                    </>
                }
                {/* classname wordt niet gepakt voor status !!! */}
                <p><strong>Status aanvraag: </strong><span className="status-active">{garden.status}</span></p>
            </>
            }

        </section>
    );
}

export default GardenItemCustomer;