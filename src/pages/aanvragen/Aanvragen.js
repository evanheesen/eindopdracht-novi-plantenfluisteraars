import React from 'react';
import axios from "axios";
import styles from "./Aanvragen.module.css";
import aanlegGeveltuin from "../../assets/aanleg-geveltuin.webp";
import ColoredContainer from "../../components/coloredContainer/ColoredContainer";
import ImageContainer from "../../components/imageContainer/ImageContainer";
import InputElement from "../../components/formComponents/inputElement/InputElement";
import SingleSelectElement from "../../components/formComponents/singleSelectElement/SingleSelectElement";
import MultiSelectElement from "../../components/formComponents/multiSelectElement/MultiSelectElement";
import FileUploadElement from "../../components/formComponents/fileUploadElement/FileUploadElement";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";


function Aanvragen() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const history = useHistory();
    const source = axios.CancelToken.source();

    async function onSubmit(data) {

        console.log(data);

        try {
            const result = await axios.post('http://localhost:3000/register', {
                cancelToken: source.token,
                email: data.email,
                password: data.password,
            });
            console.log(result);
            history.push('/login');

            return function cleanup() {
                source.cancel();
            }
        } catch (e) {
            console.error(e);
            console.log(e.response.data);
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
                    <h2 className={styles["h2--form"]} id="aanvraagformulier">Aanvraagformulier</h2>
                    <fieldset className="form--container">
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
                            classNameItem="form-item--full"
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
                            classNameItem="form-item--full"
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
                            name="phonenumber"
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
                            classNameItem="form-item--full"
                            name="address"
                            label="Straat en huisnummer"
                            inputType="text"
                            className="inputField"
                            validationRules={{
                                required: "Adres is verplicht",
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

                        <h3 className="h3--form">Woningsituatie</h3>
                        <MultiSelectElement
                            errors={errors}
                            register={register}
                            classNameItem="form-item--full"
                            name="floorlevel"
                            label="Ik woon in een woning op de begane grond"
                            selectType="checkbox"
                            className="checkbox"
                            validationRules={{
                                required: "Je kan alleen een geveltuin aanvragen als je op de begane grond woont",
                            }}
                        />
                        <div className="form-item--full">
                            <p className="label--singleSelect">Wat is jouw woningsituatie?</p>
                            <SingleSelectElement
                                errors={errors}
                                register={register}
                                className="radioField"
                                name="ownership"
                                value="eigenaar"
                                label="Ik ben eigenaar van de woning"
                            />
                            <SingleSelectElement
                                errors={errors}
                                register={register}
                                className="radioField"
                                name="ownership"
                                value="huurder"
                                label="Ik ben huurder van de woning"
                            />
                        </div>

                        <FileUploadElement
                        errors={errors}
                        register={register}
                        classNameItem="form-item--full"
                        name="permission-owner"
                        className="fileUpload"
                        label="Upload toestemming van de woningeigenaar"
                        />
                        <FileUploadElement
                            errors={errors}
                            register={register}
                            classNameItem="form-item--full"
                            name="situation-drawing"
                            className="fileUpload"
                            label="Upload situatieschets"
                        />

                        {/* toevoegen 2 upload velden (toestemming eigenaar + situatieschets) */}

                        <InputElement
                            errors={errors}
                            register={register}
                            classNameItem="form-item--full"
                            name="width-garden"
                            label="Wat wordt de breedte van de geveltuin (in cm)?"
                            inputType="number"
                            className="inputField inputField--half"
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
                                value="pakket1"
                                label="Pakket 1 - € 25,00 per 30cm"
                            />
                            <SingleSelectElement
                                errors={errors}
                                register={register}
                                className="radioField"
                                name="packageplants"
                                value="pakket2"
                                label="Pakket 2 - € 30,00 per 30cm"
                            />
                            <SingleSelectElement
                                errors={errors}
                                register={register}
                                className="radioField"
                                name="packageplants"
                                value="pakket3"
                                label="Pakket 3 - € 35,00 per 30cm"
                            />
                        </div>

                        <div className="form-item--full">
                            <p className="label--singleSelect">Welk onderhoudsplan wil je?</p>
                            <SingleSelectElement
                                errors={errors}
                                register={register}
                                className="radioField"
                                name="packageplants"
                                value="coaching"
                                label="Coachingsplan - € 5,00 per maand"
                            />
                            <SingleSelectElement
                                errors={errors}
                                register={register}
                                className="radioField"
                                name="packageplants"
                                value="fixed-maintenance"
                                label="Vast onderhoudsplan - € 29,00 per maand"
                            />
                        </div>

                        {/* toevoegen total price veld met calculatie pakket * breedte geveltuin */}

                        <br/>
                        <MultiSelectElement
                            errors={errors}
                            register={register}
                            classNameItem="form-item--full"
                            name="terms-and-conditions"
                            label="Ik ga akkoord met de algemene voorwaarden"
                            selectType="checkbox"
                            className="checkbox"
                            validationRules={{
                                required: "Je bent vergeten akkoord te gaan met de algemene voorwaarden",
                            }}
                        >
                        </MultiSelectElement>
                        <button
                            type="submit"
                            value={true}
                            className="button button--dark"
                            {...register("isAuth")}
                        >
                            Verzend aanvraag
                        </button>
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