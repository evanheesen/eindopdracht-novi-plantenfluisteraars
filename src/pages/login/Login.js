import React, {useContext, useState} from 'react';
import styles from './Login.module.css';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import arrow from "../../assets/white-arrow.png";
import FormContainer from "../../components/formContainer/FormContainer";
import InputElement from "../../components/formComponents/inputElement/InputElement";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";

function Login() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {logIn} = useContext(AuthContext);
    const source = axios.CancelToken.source();

    async function onSubmit(data, e) {
        e.preventDefault();

        console.log(data);

        try {
            const result = await axios.post('http://localhost:3000/login', {
                cancelToken: source.token,
                email: email,
                password: password,
            });
            console.log(result.data.accessToken);
            logIn(result.data.accessToken);

            return function cleanup() {
                source.cancel();
            }

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>

            <div className={styles["login-container"]}>

                <FormContainer
                    classNameItem={styles["section-item"]}
                    classNameBlock={styles["block-login"]}
                    classNameContainer={styles["form--container"]}
                    title="Inloggen"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <InputElement
                        errors={errors}
                        register={register}
                        classNameItem="form-item--full"
                        name="email"
                        label="Emailadres"
                        inputType="text"
                        className={styles["inputField"]}
                        // value={email}
                        validationRules={{
                            required: "Emailadres is verplicht",
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
                        // value={password}
                        validationRules={{
                            required: "Wachtwoord is verplicht",
                        }}
                    />

                    <button
                        type="submit"
                        className="button button--dark"
                    >
                        Login
                    </button>
                </FormContainer>

                <div className={styles["section-item"]}>
                    <img src={arrow} className={styles["arrow"]}/>
                    <p className={styles["register"]}>Heb je nog geen account? Registreer je <Link
                        to="/registreren">hier</Link> dan eerst.</p>
                </div>


            </div>

        </>

    );
}

export default Login;