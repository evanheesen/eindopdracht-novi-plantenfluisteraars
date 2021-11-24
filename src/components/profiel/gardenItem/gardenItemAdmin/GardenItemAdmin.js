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
import {resetFirstInputPolyfill} from "web-vitals/dist/modules/lib/polyfills/firstInputPolyfill";

function GardenItemAdmin({id}) {

    const [garden, setGarden] = useState(null);
    const [editFields, toggleEditFields] = useState(false);
    const [toggle, setToggle] = useState(false);
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

    // ##### id weggehaald hier!
    }, [toggle]);

    async function onSubmit(data) {

        console.log(data);

        try {
            const result = await axios.patch(`http://localhost:8081/gardens/admin/${id}`, {
                street: data.street === "" ? garden.street : data.street,
                houseNumber: data.housenumber === "" ? garden.houseNumber : data.housenumber,
                postalCode: data.postalcode === "" ? garden.postalCode : data.postalcode,
                city: data.city === "" ? garden.city : data.city,
                status: data.status,
                packagePlants: data.packagePlants,
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

                        {/* when clicked, the FormContainer will show instead */}
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
                        title={`${garden.street} ${garden.houseNumber}, ${garden.city}`}
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
                        <DropdownElement
                            errors={errors}
                            register={register}
                            classNameItem="dropdown-item--full"
                            label="Pakket beplanting"
                            classNameSelect="dropdownField"
                            nameSelect="packagePlants"
                            idSelect="dropdown-package-edit"
                        >
                            <option value={garden.packagePlants}>{garden.packagePlants}</option>
                            <option value="Pakket 1 - Wintergroen"
                                    disabled={garden.packagePlants === "Pakket 1 - Wintergroen"}>Pakket 1 - Wintergroen
                            </option>
                            <option value="Pakket 2 - Kleurrijk Laag"
                                    disabled={garden.packagePlants === "Pakket 2 - Kleurrijk Laag"}>Pakket 2 - Kleurrijk
                                Laag
                            </option>
                            <option value="Pakket 3 - Kleurrijk Hoog"
                                    disabled={garden.packagePlants === "Pakket 3 - Kleurrijk Hoog"}>Pakket 3 - Kleurrijk
                                Hoog
                            </option>
                        </DropdownElement>

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
                                onClick={() => toggleEditFields(false)}
                            />
                        </FlexContainer>


                    </FormContainer>
                </>}

            </>
            }

        </div>
    );
}

export default GardenItemAdmin;