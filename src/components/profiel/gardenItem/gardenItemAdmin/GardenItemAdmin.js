import React, {useEffect, useState} from 'react';
import './GardenItemAdmin.css';
import axios from "axios";
import Button from "../../../buttons/button/Button";
import EditIcon from "../../editIcon/EditIcon";
import IconEdit from "../../../../assets/Aanpassen.png";
import FlexItem from "../../../flexItem/FlexItem";
import FlexContainer from "../../../flexContainer/FlexContainer";
import ItemContent from "../../itemContent/ItemContent";
import FormContainer from "../../../formContainer/FormContainer";
import {useForm} from "react-hook-form";
import styles from "../../../../pages/registreren/Registreren.module.css";
import InputElement from "../../../formComponents/inputElement/InputElement";
import SingleSelectElement from "../../../formComponents/singleSelectElement/SingleSelectElement";
import DropdownElement from "../../../formComponents/dropdownElement/DropdownElement";

function GardenItemAdmin({id}) {

    const [garden, setGarden] = useState(null);
    const [editFields, toggleEditFields] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm();
    // const [gardenStatus, setGardenStatus] = useState("");
    const token = localStorage.getItem('token');
    const source = axios.CancelToken.source();

    useEffect(() => {
        console.log(id);

        async function fetchData() {
            try {
                const result = await axios.get(`http://localhost:8081/gardens/${id}`,
                    {
                        headers: {
                            cancelToken: source.token,
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
                setGarden(result.data);
                console.log("gardenItem result");
                console.log(result.data);

                return function cleanup() {
                    source.cancel();
                }

            } catch
                (e) {
                console.error(e);
            }
        }

        if (id) {
            fetchData();
        }

    }, [id]);


    return (
        <div className="garden-item">
            {garden &&
            <>
                {!editFields &&
                <>
                    <ItemContent
                        title={`${garden.street} ${garden.houseNumber}, ${garden.city}`}
                        date={garden.submissionDate}
                        address={`${garden.street} ${garden.houseNumber}, ${garden.postalCode} ${garden.city}`}
                        plants={garden.packagePlants}
                    >
                        {garden.status === "Actief" &&
                        <p><strong>Plantenfluisteraar: </strong>{garden.employee.firstName} {garden.employee.lastName}
                        </p>
                        }
                    </ItemContent>

                    <FlexContainer
                        className="FlexContainer FlexContainer__status-row"
                    >
                        <Button
                            type="button"
                            className={`button__status button__status--${garden.status}`}
                            name={garden.status}
                        />

                        {/* when clicked, the */}
                        <EditIcon
                            name="Edit icon"
                            // onClick=""
                            icon={IconEdit}
                        />
                    </FlexContainer>
                </>}

                <>
                    <ItemContent
                        title={`${garden.street} ${garden.houseNumber}, ${garden.city}`}
                    />
                    <FormContainer
                        classNameContainer="form--container"
                        classNameBlock="FlexItem FlexItem--split"
                        // onSubmit={handleSubmit(onSubmit)}
                    >
                        <InputElement
                            errors={errors}
                            register={register}
                            classNameItem="form-item--half"
                            name="street"
                            placeholder={garden.street}
                            label="Straat"
                            inputType="text"
                            className="inputField"
                        />
                        <InputElement
                            errors={errors}
                            register={register}
                            classNameItem="form-item--half"
                            name="housenumber"
                            label="Huisnummer"
                            placeholder={garden.houseNumber}
                            inputType="text"
                            className="inputField"
                        />
                        <InputElement
                            errors={errors}
                            register={register}
                            classNameItem="form-item--half"
                            name="postalcode"
                            label="Postcode"
                            placeholder={garden.postalCode}
                            inputType="text"
                            className="inputField"
                            validationRules={{
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
                            placeholder={garden.city}
                            inputType="text"
                            className="inputField"
                        />
                        {/*<div className="form-item--full">*/}
                            <DropdownElement
                                errors={errors}
                                register={register}
                                classNameItem="dropdown-item--half"
                                label="Status"
                                classNameSelect="dropdownField"
                                nameSelect="status"
                                idSelect="dropdown-status-edit"
                            >
                                <option value={garden.status}>{garden.status}</option>
                                {garden.status === "Open" &&
                                <option value="Actief">Accepteer</option>}
                                {garden.status === "Actief" &&
                                <option value="Afgerond">Afgerond</option>}
                            </DropdownElement>
                        {/*</div>*/}


                        {/*<div className="form-item--full">*/}
                        {/*    <p className="label--singleSelect">Pakket beplanting</p>*/}
                        {/*    <SingleSelectElement*/}
                        {/*        errors={errors}*/}
                        {/*        register={register}*/}
                        {/*        className="radioField"*/}
                        {/*        name="packageplants"*/}
                        {/*        checked={garden.packagePlants === "Pakket 1 - Wintergroen"}*/}
                        {/*        value="Pakket 1 - Wintergroen"*/}
                        {/*        label="Pakket 1 - Wintergroen"*/}
                        {/*    />*/}
                        {/*    <SingleSelectElement*/}
                        {/*        errors={errors}*/}
                        {/*        register={register}*/}
                        {/*        className="radioField"*/}
                        {/*        name="packageplants"*/}
                        {/*        checked={garden.packagePlants === "Pakket 2 - Kleurrijk Laag"}*/}
                        {/*        value="Pakket 2 - Kleurrijk Laag"*/}
                        {/*        label="Pakket 2 - Kleurrijk Laag"*/}
                        {/*    />*/}
                        {/*    <SingleSelectElement*/}
                        {/*        errors={errors}*/}
                        {/*        register={register}*/}
                        {/*        className="radioField"*/}
                        {/*        name="packageplants"*/}
                        {/*        checked={garden.packagePlants === "Pakket 3 - Kleurrijk Hoog"}*/}
                        {/*        value="Pakket 3 - Kleurrijk Hoog"*/}
                        {/*        label="Pakket 3 - Kleurrijk Hoog"*/}
                        {/*    />*/}
                        {/*</div>*/}

                    </FormContainer>
                </>

            </>
            }

        </div>
    );
}

export default GardenItemAdmin;