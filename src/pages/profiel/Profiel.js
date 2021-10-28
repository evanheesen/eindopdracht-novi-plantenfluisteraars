import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

function Profiel() {

    const {user} = useContext(AuthContext);

    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Voornaam:</strong> {user.firstName}</p>
                <p><strong>Achternaam:</strong> {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </section>
            <p>Terug naar de <Link to="/">Homepagina</Link></p>

        </>
    );
}

export default Profiel;