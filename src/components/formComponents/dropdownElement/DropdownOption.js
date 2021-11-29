import React, {useEffect, useState} from 'react';
import axios from "axios";

function DropdownOption({ id, source, token }) {

    const [employee, setEmployee] = useState();

    useEffect(() => {
        console.log(id);

        async function fetchData() {
            try {
                const result = await axios.get(`http://localhost:8081/employees/${id}`,
                    {
                        headers: {
                            cancelToken: source.token,
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                setEmployee(result.data);
                console.log("employee item result");
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

    }, []);

    return (
        <option value={employee.id}>{employee.firstName}</option>
    );
}

export default DropdownOption;