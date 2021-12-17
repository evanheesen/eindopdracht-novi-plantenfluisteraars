import React, {useEffect, useState} from 'react';
import ItemContent from "../../itemContent/ItemContent";
import FormContainer from "../../../formContainer/FormContainer";
import Button from "../../../buttons/button/Button";
import FlexContainer from "../../../flexContainer/FlexContainer";
import InputElement from "../../../formComponents/inputElement/InputElement";
import {useForm} from "react-hook-form";
import axios from "axios";
import styles from "../../../../pages/registreren/Registreren.module.css";

function AddAdmin() {

    const {register, reset, handleSubmit, formState: {errors}} = useForm();
    const token = localStorage.getItem('token');
    const source = axios.CancelToken.source();
    const [adminAdded, setAdminAdded] = useState(false);
    const [showFields, toggleShowFields] = useState(true);
    const [errorMessage, toggleErrorMessage] = useState(false);

    async function onSubmit(data) {
        console.log(data);

        try {
            const result = await axios.get(`http://localhost:8081/users/${data.username}`,
                {
                headers: {
                    cancelToken: source.token,
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log("result user with this username:")
            console.log(result);

            if (result.data != null) {
                toggleErrorMessage(true);
            } else {
                createUser(data);
            }

            return function cleanup() {
                source.cancel();
            }
        } catch (e) {
            console.error(e);
        }

    }

    async function createUser(data) {
        try {
            const result = await axios.post(`http://localhost:8081/users`, {
                email: data.email,
                username: data.username,
                password: data.password,
                isAdmin: true,
            }, {
                headers: {
                    cancelToken: source.token,
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log(result);
            reset({
                email: "",
                username: "",
                password: ""
            });

            setAdminAdded(true);
            toggleShowFields(false);
            toggleErrorMessage(false);

            return function cleanup() {
                source.cancel();
            }
        } catch (e) {
            console.error(e);
        }
    }

useEffect(() => {

    if (adminAdded) {
        toggleShowFields(false);
    }

}, [adminAdded]);

function addAnotherAdmin() {
    toggleShowFields(true)
    setAdminAdded(false);
}

return (
    <div className="garden-item">
        {showFields &&
        <>
            <ItemContent
                title="Nieuwe administrator"
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
                    name="username"
                    label="Gebruikersnaam"
                    inputType="text"
                    placeholder="minimaal 6 karakters"
                    className={styles["inputField"]}
                    errorUsername={errorMessage}
                    validationRules={{
                        required: "Username is verplicht",
                        minLength: {
                            value: 6,
                            message: "De username moet minstens 6 tekens bevatten",
                        }
                    }}
                />
                <InputElement
                    errors={errors}
                    register={register}
                    classNameItem="form-item--half"
                    name="password"
                    label="Wachtwoord"
                    inputType="password"
                    placeholder="minimaal 6 karakters"
                    className={styles["inputField"]}
                    validationRules={{
                        required: "Wachtwoord is verplicht",
                        minLength: {
                            value: 6,
                            message: "Het wachtwoord moet minstens 6 tekens bevatten",
                        }
                    }}
                />
                <InputElement
                    errors={errors}
                    register={register}
                    classNameItem="form-item--full"
                    name="email"
                    label="Emailadres"
                    inputType="text"
                    className={styles["inputField"]}
                    validationRules={{
                        required: "Emailadres is verplicht",
                        minLength: {
                            value: 6,
                            message: "Het emailadres moet minstens 6 tekens bevatten",
                        }
                    }}
                />
                <FlexContainer
                    className="FlexContainer FlexContainer__status-row FlexContainer__edit"
                >
                    <Button
                        type="submit"
                        className="button--edit"
                        name="Voeg admin toe"
                    />
                </FlexContainer>

            </FormContainer>
        </>
        }

        {!showFields &&
        <>
            <ItemContent
                title="Administrator toegevoegd"
            />
            <Button
                type="button"
                className="button button--dark button--profile button--sub"
                name="Voeg nog een admin toe"
                onClick={addAnotherAdmin}
            />
        </>
        }

    </div>
);
}

export default AddAdmin;