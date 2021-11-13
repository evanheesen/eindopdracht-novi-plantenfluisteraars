import React, {useEffect, useState} from 'react';
import axios from "axios";
import './EmployeeItemAdmin.css';
import Button from "../../../buttons/button/Button";

function EmployeeItemAdmin({id}) {

    const [employee, setEmployee] = useState(null);
    const token = localStorage.getItem('token');
    const source = axios.CancelToken.source();

    useEffect(() => {
        console.log(id);

        async function fetchData() {
            try {
                const result = await axios.get(`http://localhost:8081/employees/${id}`, {
                        cancelToken: source.token,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                setEmployee(result.data);
                console.log("employeeItem result");
                console.log(result.data);

                return function cleanup() {
                    source.cancel();
                }
            } catch (e) {
                console.error(e);
            }
        }
        if(id) {
            fetchData();
        }

    //    hier id weggehaald!!
    },[]);

    return (
        <div className="garden-item">
            {employee &&
            <>
                <h4>{employee.firstName} {employee.lastName}</h4>
                <p><strong>Adres: </strong>{employee.street} {employee.houseNumber}, {employee.city}</p>
                <p><strong>Telefoonnummer: </strong>{employee.phone}</p>

                <Button
                    type="button"
                    className={`button__status button__status--${employee.status}`}
                    name={employee.status}
                />
            </>
            }

        </div>
    );
}

export default EmployeeItemAdmin;