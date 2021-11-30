import React, {useEffect, useState} from 'react';
import './GardenItemAdmin.css';
import axios from "axios";
import Button from "../../../buttons/button/Button";
import EditIcon from "../../editIcon/EditIcon";
import IconEdit from "../../../../assets/Aanpassen.png";
import FlexContainer from "../../../flexContainer/FlexContainer";
import ItemContent from "../../itemContent/ItemContent";
import FormContainer from "../../../formContainer/FormContainer";
import {useForm} from "react-hook-form";
import InputElement from "../../../formComponents/inputElement/InputElement";
import DropdownElement from "../../../formComponents/dropdownElement/DropdownElement";
import {logDOM} from "@testing-library/react";
import DropdownOption from "../../../formComponents/dropdownElement/DropdownOption";

function GardenItemAdmin({ id }) {

    const [garden, setGarden] = useState(null);
    const [editFields, toggleEditFields] = useState(false)
    const [toggle, setToggle] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const token = localStorage.getItem('token');
    const source = axios.CancelToken.source();
    let employees = [];

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

            } catch (e) {
                console.error(e);
            }
        }

        if (id) {
            fetchData();
        }

    }, [toggle]);

    async function onSubmit(data) {

        console.log(data);

        try {
            const result = await axios.patch(`http://localhost:8081/gardens/admin/${id}`, {
                firstName: data.firstname === "" ? garden.customer.firstName : data.firstname,
                lastName: data.lastname === "" ? garden.customer.lastName : data.lastname,
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
            setToggle(!toggle);
            toggleEditFields(false);

            return function cleanup() {
                source.cancel();
            }
        } catch (e) {
            console.error(e);
        }

    }

    async function deleteItem() {

        try {
            const result = await axios.delete(`http://localhost:8081/gardens/delete/${id}`,
                {
                headers: {
                    cancelToken: source.token,
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log(result);
            setToggle(!toggle);
            toggleEditFields(false);

            return function cleanup() {
                source.cancel();
            }
        } catch (e) {
            console.error(e);
        }

    }

    useEffect(() => {

        async function getEmployees() {

        try {
            const employeeList = await axios.get(`http://localhost:8081/employees`,
                {
                    headers: {
                        cancelToken: source.token,
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });

            employees = employeeList.data;
            console.log("list employees:");
            console.log(employees);

            return function cleanup() {
                source.cancel();
            }
        } catch (e) {
            console.error(e);
        }
    }

        if (editFields) {
            getEmployees();
        }

    }, [editFields]);

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
                        customer={`${garden.customer.firstName} ${garden.customer.lastName}`}
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
                            name="firstname"
                            placeholder={garden.customer.firstName}
                            label="Voornaam bewoner"
                            inputType="text"
                            className="inputField"
                        />
                        <InputElement
                            errors={errors}
                            register={register}
                            classNameItem="form-item--half"
                            name="lastname"
                            placeholder={garden.customer.lastName}
                            label="Achternaam"
                            inputType="text"
                            className="inputField"
                        />
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
                            <option value="Inactief" disabled={garden.status === "Inactief"}>Inactief</option>
                            <option value="Open" disabled={garden.status === "Open"}>Open</option>
                            <option value="Inactief" disabled>Actief</option>
                            <option value="Afgerond"
                                    disabled={garden.status === "Open" || garden.status === "Inactief" || garden.status === "Afgerond"}>Afgerond
                            </option>
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


                        {/* Get list employees in dropdown */}
                        <DropdownElement
                            errors={errors}
                            register={register}
                            classNameItem="dropdown-item--full"
                            label="Plantenfluisteraar"
                            classNameSelect="dropdownField"
                            nameSelect="employee"
                            idSelect="dropdown-employee-edit"
                        >

                            {/* Dit werkt nog niet!! Waarom niet?? */}
                            {garden.employee &&
                            <>
                                <option value={garden.employee.id}>{garden.employee.firstName} {garden.employee.lastName}</option>
                                {employees.map((employee) => {
                                    return <option value={employee.id}>{employee.firstName}</option>
                                    // <DropdownOption
                                    //     key={employee.id}
                                    //     id={employee.id}
                                    // />
                                })}
                                </>}
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