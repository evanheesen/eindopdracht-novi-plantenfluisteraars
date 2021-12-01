import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import InfoSection from "../../infoSection/InfoSection";
import Button from "../../../buttons/button/Button";
import {AuthContext} from "../../../../context/AuthContext";
import ItemContent from "../../itemContent/ItemContent";

function GardenItemCustomer({id}) {

    const {user} = useContext(AuthContext);
    const customerId = user.info.customer.id;
    const [garden, setGarden] = useState(null);
    const token = localStorage.getItem('token');
    const source = axios.CancelToken.source();

    useEffect(() => {
        // console.log(id);

        async function fetchData() {
            try {
                const result = await axios.get(`http://localhost:8081/gardens/customers/${customerId}`,
                    {
                        headers: {
                            cancelToken: source.token,
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                setGarden(result.data[0]);
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

    return (
        <section className="garden-item">
            {garden &&
            <>
                <ItemContent
                    title={`${garden.street} ${garden.houseNumber}, ${garden.city}`}
                    date={garden.submissionDate}
                    address={`${garden.street} ${garden.houseNumber}, ${garden.postalCode} ${garden.city}`}
                    plants={garden.packagePlants}
                >
                    {garden.status === "Actief" &&
                    <>
                        <p><strong>Plantenfluisteraar: </strong>{garden.employee.firstName} {garden.employee.lastName}
                        </p>
                        <p><strong>Telefoon Plantenfluisteraar: </strong>{garden.employee.phone}</p>
                    </>
                    }
                </ItemContent>

                <Button
                    type="button"
                    className={`button__status button__status--${garden.status}`}
                    name={garden.status}
                />
            </>
            }

        </section>
    );
}

export default GardenItemCustomer;