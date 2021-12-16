import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import ItemContent from "../../itemContent/ItemContent";
import Button from "../../../buttons/button/Button";
import EditIcon from "../../editIcon/EditIcon";
import IconEdit from "../../../../assets/Aanpassen.png";
import FlexContainer from "../../../flexContainer/FlexContainer";
import InputElement from "../../../formComponents/inputElement/InputElement";
import FormContainer from "../../../formContainer/FormContainer";
import DropdownElement from "../../../formComponents/dropdownElement/DropdownElement";

function UserItemAdmin( {username} ) {

    const [user, setUser] = useState(null);
    const [editFields, toggleEditFields] = useState(false)
    const [toggle, setToggle] = useState(false);
    const [itemDeleted, toggleItemDeleted] = useState(false);
    const [status, setStatus] = useState("");
    const {register, reset, handleSubmit, formState: {errors}} = useForm();
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

    async function onSubmit(data) {
        console.log(data);

        try {
            const result = await axios.patch(`http://localhost:8081/users/edit/${username}`, {
                email: data.email,
                status: data.status,
            }, {
                headers: {
                    cancelToken: source.token,
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log(result);
            toggleEditFields(false);
            setToggle(!toggle);

            return function cleanup() {
                source.cancel();
            }
        } catch (e) {
            console.error(e);
        }

    }

    async function deleteItem() {

        try {
            const result = await axios.delete(`http://localhost:8081/users/delete/${username}`,
                {
                    headers: {
                        cancelToken: source.token,
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });

            console.log(result);
            toggleEditFields(false);
            toggleItemDeleted(true);

            return function cleanup() {
                source.cancel();
            }
        } catch (e) {
            console.error(e);
        }

    }

    useEffect(() => {

        if (itemDeleted) {
            setUser("deleted");
        }

    }, [itemDeleted]);

    function cancelEdit() {
        toggleEditFields(false);
        reset({
            username: user.username,
            email: user.email
        });
    }

    return (
        <div className="garden-item">
            {user && user != "deleted" &&
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
                            <EditIcon
                                name="Edit icon"
                                onClick={() => toggleEditFields(true)}
                                icon={IconEdit}
                            />
                        </FlexContainer>
                    </>}

                {editFields &&
                <>
                    <ItemContent
                        title={user.username}
                    />
                    <FormContainer
                        classNameContainer="form--container form--edit"
                        classNameBlock="FlexItem FlexItem--split"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <InputElement
                            errors={errors}
                            register={register}
                            classNameItem="form-item--half"
                            name="email"
                            placeholder={user.email}
                            label="Emailadres"
                            inputType="email"
                            className="inputField inputField--edit"
                        />
                        <DropdownElement
                            errors={errors}
                            register={register}
                            classNameItem="dropdown-item--half"
                            label="Status"
                            classNameSelect="dropdownField"
                            nameSelect="status"
                            idSelect="dropdown-status-edit"
                            defaultValue="statusDefault"
                        >
                            <option value="statusDefault" disabled>{user.enabled === true ? "Actief" : "Inactief"}</option>
                            <option value="Inactief" hidden={user.enabled === false}>Inactief</option>
                            <option value="Actief" hidden={user.enabled === true}>Actief</option>
                        </DropdownElement>

                        <Button
                            type="button"
                            className="button--delete"
                            name="Item verwijderen"
                            onClick={deleteItem}
                        />

                        <FlexContainer
                            className="FlexContainer FlexContainer__status-row FlexContainer__edit"
                        >
                            <Button
                                type="submit"
                                className="button--edit"
                                name="Bevestig wijzigingen"
                            />
                            <Button
                                type="button"
                                className="button--edit button--edit-cancel"
                                name="Annuleer"
                                onClick={cancelEdit}
                            />
                        </FlexContainer>

                    </FormContainer>
                </>}

            </>}
            {user && user === "deleted" &&
            <ItemContent
                title="Item succesvol verwijderd"
            />
            }

        </div>
    );
}

export default UserItemAdmin;