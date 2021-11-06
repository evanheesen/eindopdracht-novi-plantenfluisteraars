import React from 'react';
import {Link, useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import styles from "../registreren/Registreren.module.css";
import arrow from "../../assets/white-arrow.png";
import FormContainer from "../../components/formContainer/FormContainer";
import InputElement from "../../components/formComponents/inputElement/InputElement";
import FileUploadElement from "../../components/formComponents/fileUploadElement/FileUploadElement";

function Registreren() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const history = useHistory();
    const source = axios.CancelToken.source();

    async function onSubmit(data) { // wachten op data, dus daarom asynchrome functie

        console.log(data)

        try {
            const result = await axios.post('http://localhost:8081/bewoners', {
                cancelToken: source.token,
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
            });
            console.log(result)
            history.push("/login")

            return function cleanup() {
                source.cancel();
            }

        } catch (e) {
            console.error(e.response.data);
        }
    }

    return (
        <>
            <div className={styles["register-container"]}>

                <FormContainer
                    classNameItem={styles["section-item"]}
                    classNameBlock={styles["block-register"]}
                    classNameContainer={styles["form--container"]}
                    title="Registreren als Plantenfluisteraar"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <InputElement
                        errors={errors}
                        register={register}
                        classNameItem="form-item--half"
                        name="first-name"
                        label="Voornaam"
                        inputType="text"
                        className={styles["inputField"]}
                        validationRules={{
                            required: "Voornaam is verplicht",
                        }}
                    />
                    <InputElement
                        errors={errors}
                        register={register}
                        classNameItem="form-item--half"
                        name="last-name"
                        label="Achternaam"
                        inputType="text"
                        className={styles["inputField"]}
                        validationRules={{
                            required: "Achternaam is verplicht",
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
                                message: "Het emailadres moet minimaal minstens 6 tekens bevatten",
                            }
                        }}
                    />
                    <InputElement
                        errors={errors}
                        register={register}
                        classNameItem="form-item--full"
                        name="password"
                        label="Wachtwoord"
                        inputType="password"
                        className={styles["inputField"]}
                        validationRules={{
                            required: "Wachtwoord is verplicht",
                            minLength: {
                                value: 6,
                                message: "Het wachtwoord moet minimaal minstens 6 tekens bevatten",
                            }
                        }}
                    />
                    <FileUploadElement
                        errors={errors}
                        register={register}
                        classNameItem="form-item--full"
                        name="photo"
                        className="fileUpload"
                        label="Upload een leuke foto van jezelf"
                    />

                    <button
                        type="submit"
                        value={true}
                        className="button button--dark"
                        {...register("isAuth")}
                    >
                        Registreren
                    </button>
                </FormContainer>

                <div className={styles["section-item"]}>
                    <img src={arrow} className={styles["arrow"]}/>
                    <p className={styles["register"]}>Heb je al een account? Log dan <Link to="/login">hier</Link> in.</p>
                </div>


            </div>

        </>
    );
}

export default Registreren;