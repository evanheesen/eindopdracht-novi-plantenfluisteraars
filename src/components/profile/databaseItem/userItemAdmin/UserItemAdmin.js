import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import ItemContent from "../../itemContent/ItemContent";

function UserItemAdmin( {username} ) {

    const [user, setUser] = useState(null);
    const [editFields, toggleEditFields] = useState(false)
    const [toggle, setToggle] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const token = localStorage.getItem('token');
    const source = axios.CancelToken.source();

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
                setUser(result.data);
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
                enabled={user.enabled}
            />
                    </>}
            </>}
        </div>
    );
}

export default UserItemAdmin;