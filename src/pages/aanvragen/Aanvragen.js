import React from 'react';
import axios from "axios";
import styles from "./Aanvragen.module.css";
import aanlegGeveltuin from "../../assets/aanleg-geveltuin.webp";
import ColoredContainer from "../../components/coloredContainer/ColoredContainer";
import ImageContainer from "../../components/imageContainer/ImageContainer";
import InputElement from "../../components/formComponents/inputElement/InputElement";
import SingleSelectElement from "../../components/formComponents/singleSelectElement/SingleSelectElement";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import MultiSelectElement from "../../components/formComponents/multiSelectElement/MultiSelectElement";

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
                    buttonLinkBottom="/#aanvraagformulier"
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
                    <h2 className={styles["h2--form"]}>Aanvraagformulier</h2>
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
                            <SingleSelectElement
                                errors={errors}
                                register={register}
                                classNameItem="form-item--full"
                                name="ownership"
                                label="Wat is jouw woningsituatie?"
                                className="radioField"
                                value1="Ik ben eigenaar van de woning"
                                value2="Ik ben huurder van de woning"
                            />
                        </div>


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
                        <SingleSelectElement
                            errors={errors}
                            register={register}
                            name="package"
                            label="Welk pakket beplanting wil je?"
                        >
                            <option value="package1">Pakket 1 - € 25,00 per 30cm</option>
                            <option value="package2">Pakket 2 - € 30,00 per 30cm</option>
                            <option value="package3">Pakket 3 - € 35,00 per 30cm</option>
                        </SingleSelectElement>

                        {/* toevoegen total price veld met calculatie pakket * breedte geveltuin */}

                        <SingleSelectElement
                            errors={errors}
                            register={register}
                            name="maintenance"
                            label="Welk onderhoudsplan wil je?"
                        >
                            <option value="coaching">Coachingsplan - € 5,00 per maand</option>
                            <option value="fixed-maintenance">Vast onderhoudsplan - € 29,00 per maand</option>
                        </SingleSelectElement>


                        <MultiSelectElement
                            errors={errors}
                            register={register}
                            name="terms-and-conditions"
                            label="Ik ga akkoord met de algemene voorwaarden"
                            selectType="checkbox"
                            validationRules={{
                                required: "Je bent vergeten akkoord te gaan met de algemene voorwaarden",
                            }}
                        >
                        </MultiSelectElement>
                        <button
                            type="submit"
                            value={true}
                            {...register("isAuth")}
                        >
                            Verzend aanvraag
                        </button>
                    </fieldset>
                </form>

                <ColoredContainer
                    classNameItem="section-item section-item--split"
                    classNameBlock="block block--right block--red"
                    title="Planning"
                    text="bullits planning"
                />
            </div>
        </>
    );
}

export default Aanvragen;