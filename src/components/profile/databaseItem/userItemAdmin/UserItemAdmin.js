import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import ItemContent from "../../itemContent/ItemContent";
import Button from "../../../buttons/button/Button";
import EditIcon from "../../editIcon/EditIcon";
import IconEdit from "../../../../assets/Aanpassen.png";
import FlexContainer from "../../../flexContainer/FlexContainer";

function UserItemAdmin( {username} ) {

    const [user, setUser] = useState(null);
    const [editFields, toggleEditFields] = useState(false)
    const [toggle, setToggle] = useState(false);
    const [status, setStatus] = useState("");
    const {register, handleSubmit, formState: {errors}} = useForm();
    const token = localStorage.getItem('token');
    const source = axios.CancelToken.source();
    // let status = "Inactief";

    useEffect(() => {
        console.log(username);

        async function fetchData() {
            try {
                const result = await axios.get(`http://localhost:8081/users/${username}`,
                    {
                        headers: {
                            cancelToken: source.token,
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                setStatus(result.data.enabled ? "Actief" : "Inactief")
                setUser(result.data);
                console.log(status);
                console.log("userItem result");
                console.log(result.data);

                return function cleanup() {
                    source.cancel();
                }

            } catch (e) {
                console.error(e);
            }
        }

        if (username) {
            fetchData();
        }

    }, [toggle]);

    return (
        <div className="garden-item">
            {user &&
            <>
                {!editFields &&
                    <>
            <ItemContent
                title={user.username}
                email={user.email}
                enabled={user.enabled ? "Ja" : "Nee"}
            />

                        <FlexContainer
                            className="FlexContainer FlexContainer__status-row"
                        >
                            <Button
                                type="button"
                                className={`button__status button__status--${status}`}
                                name={status}
                            />

                            {/* when clicked, the FormContainer will show instead */}
                            <EditIcon
                                name="Edit icon"
                                onClick={() => toggleEditFields(true)}
                                icon={IconEdit}
                            />
                        </FlexContainer>
                    </>}

            </>}
        </div>
    );
}

export default UserItemAdmin;