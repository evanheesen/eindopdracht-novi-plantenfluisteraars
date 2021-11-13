import React from 'react';
import axios from "axios";
import "./Aanvragen.css";
import aanlegGeveltuin from "../../assets/aanleg-geveltuin.webp";
import ColoredContainer from "../../components/coloredContainer/ColoredContainer";
import ImageContainer from "../../components/imageContainer/ImageContainer";
import InputElement from "../../components/formComponents/inputElement/InputElement";
import SingleSelectElement from "../../components/formComponents/singleSelectElement/SingleSelectElement";
import MultiSelectElement from "../../components/formComponents/multiSelectElement/MultiSelectElement";
import FileUploadElement from "../../components/formComponents/fileUploadElement/FileUploadElement";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import FormContainer from "../../components/formContainer/FormContainer";
import Button from "../../components/buttons/button/Button";


function Aanvragen() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const history = useHistory();
    const source = axios.CancelToken.source();

    async function onSubmit(data) {

        console.log(data);

        try {
            const result = await axios.post('http://localhost:8081/customers', {
                    email: data.email,
                    password: data.password,
                    username: data.username,
                    firstName: data.firstname,
                    lastName: data.lastname,
                    phone: data.phone,
                    street: data.street,
                    houseNumber: data.housenumber,
                    postalCode: data.postalcode,
                    city: data.city,
                    packagePlants: data.packageplants,
                }, {
                    cancelToken: source.token,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

            console.log(result);
            history.push('/login');

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
                <ColoredContainer
                    classNameItem="section-item section-item--split"
                    classNameBlock="block block--left block--green"
                    title="Aanvragen aanleg geveltuin"
                    text="tekst aanvragen geveltuin"
                    buttonClassNameBottom="button button--bottom button--bottom-split"
                    buttonTitleBottom="Ga naar het aanvraagformulier"
                    linkButton="#aanvraagformulier"
                    buttonTypeBottom="button"
                />
                <ImageContainer
                    source={aanlegGeveltuin}
                    alt="aanleg-geveltuin"
                    classNameImg="image image--right"
                />

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="section-item section-item--split"
                >
                    <h2 className="h2--form" id="aanvraagformulier">Aanvraagformulier</h2>
                    <fieldset className="form--container">

                {/*<FormContainer*/}
                {/*    classNameItem={styles["section-item"]}*/}
                {/*    classNameBlock={styles["block-register"]}*/}
                {/*    classNameContainer={styles["form--container"]}*/}
                {/*    title="Aanvraagformulier"*/}
                {/*    onSubmit={handleSubmit(onSubmit)}*/}
                {/*>*/}
                    <InputElement
                        errors={errors}
                        register={register}
                        classNameItem="form-item--half"
                        name="firstname"
                        label="Voornaam"
                        inputType="text"
                        className="inputField"
                        validationRules={{
                            required: "Voornaam is verplicht",
                        }}
                    />
                    <InputElement
                        errors={errors}
                        register={register}
                        classNameItem="form-item--half"
                        name="lastname"
                        label="Achternaam"
                        inputType="text"
                        className="inputField"
                        validationRules={{
                            required: "Achternaam is verplicht",
                        }}
                    />
                    <InputElement
                        errors={errors}
                        register={register}
                        classNameItem="form-item--half"
                        name="email"
                        label="Emailadres"
                        inputType="text"
                        className="inputField"
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
                            classNameItem="form-item--half"
                            name="phone"
                            label="Telefoonnummer"
                            inputType="tel"
                            className="inputField"
                            placeholder="06-12345678"
                            validationRules={{
                                required: "Telefoonnummer is verplicht",
                            }}
                        />
                        <InputElement
                            errors={errors}
                            register={register}
                            classNameItem="form-item--half"
                            name="username"
                            label="Gebruikersnaam"
                            inputType="text"
                            className="inputField"
                            validationRules={{
                                required: "Gebruikersnaam is verplicht",
                                minLength: {
                                    value: 6,
                                    message: "De gebruikersnaam moet minimaal minstens 6 tekens bevatten",
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
                        className="inputField"
                        validationRules={{
                            required: "Wachtwoord is verplicht",
                            minLength: {
                                value: 6,
                                message: "Het wachtwoord moet minimaal minstens 6 tekens bevatten",
                            }
                        }}
                    />
                    <InputElement
                        errors={errors}
                        register={register}
                        classNameItem="form-item--half"
                        name="street"
                        label="Straat"
                        inputType="text"
                        className="inputField"
                        validationRules={{
                            required: "Straat is verplicht",
                        }}
                    />
                        <InputElement
                            errors={errors}
                            register={register}
                            classNameItem="form-item--half"
                            name="housenumber"
                            label="Huisnummer"
                            inputType="text"
                            className="inputField"
                            validationRules={{
                                required: "Huisnummer is verplicht",
                            }}
                        />
                    <InputElement
                        errors={errors}
                        register={register}
                        classNameItem="form-item--half"
                        name="postalcode"
                        label="Postcode"
                        inputType="text"
                        className="inputField"
                        validationRules={{
                            required: "Postcode is verplicht",
                            pattern: {
                                value: /^[0-9]{4}[a-zA-Z]{2}$/,
                                message: "Ongeldige postcode",
                            }
                        }}
                    />
                    <InputElement
                        errors={errors}
                        register={register}
                        classNameItem="form-item--half"
                        name="city"
                        label="Woonplaats"
                        inputType="text"
                        className="inputField"
                        validationRules={{
                            required: "Woonplaats is verplicht",
                        }}
                    />

                    <h3 className="h3--form">Aanleg en Onderhoud</h3>
                    <div className="form-item--full">
                        <p className="label--singleSelect">Welk pakket beplanting wil je?</p>
                        <SingleSelectElement
                            errors={errors}
                            register={register}
                            className="radioField"
                            name="packageplants"
                            value="Pakket 1 - Wintergroen"
                            label="Pakket 1 - Wintergroen"
                        />
                        <SingleSelectElement
                            errors={errors}
                            register={register}
                            className="radioField"
                            name="packageplants"
                            value="Pakket 2 - Kleurrijk Laag"
                            label="Pakket 2 - Kleurrijk Laag"
                        />
                        <SingleSelectElement
                            errors={errors}
                            register={register}
                            className="radioField"
                            name="packageplants"
                            value="Pakket 3 - Kleurrijk Hoog"
                            label="Pakket 3 - Kleurrijk Hoog"
                        />
                    </div>

                    <MultiSelectElement
                        errors={errors}
                        register={register}
                        classNameItem="form-item--conditions"
                        name="terms-and-conditions"
                        label="Ik ga akkoord met de algemene voorwaarden"
                        selectType="checkbox"
                        className="checkbox"
                        validationRules={{
                            required: "Je bent vergeten akkoord te gaan met de algemene voorwaarden",
                        }}
                    >
                    </MultiSelectElement>

                        <Button
                        type="submit"
                        className="button button--dark"
                        name="Verzend aanvraag"
                        />

                    {/*<button*/}
                    {/*    type="submit"*/}
                    {/*    className="button button--dark"*/}
                    {/*>*/}
                    {/*    Verzend aanvraag*/}
                    {/*</button>*/}

                {/*</FormContainer>*/}
                    </fieldset>
                </form>

                <ColoredContainer
                    classNameItem="section-item section-item--split-top"
                    classNameBlock="block block--right block--red"
                    title="Planning"
                    text="bullits planning"
                />
            </div>
        </>
    );
}

export default Aanvragen;