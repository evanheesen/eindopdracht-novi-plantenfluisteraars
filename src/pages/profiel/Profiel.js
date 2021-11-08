import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import ColoredContainer from "../../components/coloredContainer/ColoredContainer";
import styles from './Profiel.module.css';
import profileAnonymous from '../../assets/profile-picture-anonymous.png';
import ImageContainer from "../../components/imageContainer/ImageContainer";

function Profiel() {

    // const {user} = useContext(AuthContext);

    const [userData, setUserData] = useState({});
    // const [error, toggleError] = useState(false);
    // const [loading, toggleLoading] = useState(false);

    useEffect(() => {

        async function fetchData() {
            // toggleError(false);
            // toggleLoading(true);

            try {
                const result = await axios.get(`http://localhost:8081/users`);
                console.log(result.data);
                setUserData(result.data);
            } catch (e) {
                console.error(e);
                // toggleError(true);
            }
            // toggleLoading(false);
        }

        // impliciete check op daadwerkelijke coordinaten
        // if (coordinates) {
        fetchData();
        // }

    }, []);

    return (
        <div className={styles["profile-container"]}>

            {Object.keys(userData).length > 0 &&
            <>
                <ColoredContainer
                    classNameItem="section-item section-item--split"
                    classNameBlock="block block--left block--red"
                    title="Profiel"
                >
                    {/*<p><strong>Voornaam:</strong> {user.firstName}</p>*/}
                    {/*<p><strong>Achternaam:</strong> {user.lastName}</p>*/}
                    {/*<p><strong>Email:</strong> {user.email}</p>*/}
                    <p><strong>Voornaam:</strong> {userData[0].firstName}</p>
                    <p><strong>Achternaam:</strong> {userData[0].lastName}</p>
                    <p><strong>Email:</strong> {userData[0].email}</p>
                </ColoredContainer>
                <ImageContainer
                    source={profileAnonymous}
                    alt="plantenfluisteraar"
                    classNameImg={styles["image-profile"]}
                />
            </>
            }
        </div>
    );
}

export default Profiel;