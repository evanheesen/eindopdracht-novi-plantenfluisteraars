import React, {useContext, useState} from 'react';
import styles from './Login.module.css';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {Link} from "react-router-dom";
import ColoredContainer from "../../components/coloredContainer/ColoredContainer";
import FormContainer from "../../components/formContainer/FormContainer";
import InputElement from "../../components/formComponents/inputElement/InputElement";
import {useForm} from "react-hook-form";
import aanlegGeveltuin from "../../assets/aanleg-geveltuin.webp";
import ImageContainer from "../../components/imageContainer/ImageContainer";

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

            <div className="section--split">

                <FormContainer
                    classNameItem="section-item section-item--split"
                    classNameBlock="block block--left block--green"
                    classNameContainer="form--container form--container-block"
                    title="Inloggen"
                    onSubmit={handleSubmit(onSubmit)}
                    // buttonClassName="button button--dark"
                    // buttonTitle="Login"
                    // buttonType="submit"
                    // buttonRegister={register}
                >
                    <InputElement
                        errors={errors}
                        register={register}
                        classNameItem="form-item--full"
                        name="email"
                        label="Emailadres"
                        inputType="text"
                        className="inputField"
                        value={email}
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
                        className="inputField"
                        value={password}
                        validationRules={{
                            required: "Wachtwoord is verplicht",
                        }}
                    />

                    {/* Dit of button in form component ?? */}
                    <button
                        type="submit"
                        className="button button--dark"
                    >
                        Login
                    </button>



                </FormContainer>

                <ImageContainer
                    source={aanlegGeveltuin}
                    alt="aanleg-geveltuin"
                    classNameImg="image image--right"
                />

            </div>

        </>

    );
}

export default Login;