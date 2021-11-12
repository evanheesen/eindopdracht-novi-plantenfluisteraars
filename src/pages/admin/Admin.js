import React, {useContext, useEffect} from 'react';
import jwtDecode from "jwt-decode";
import {AuthContext} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";
import FlexContainer from "../../components/flexContainer/FlexContainer";
import ColoredContainer from "../../components/coloredContainer/ColoredContainer";
import InfoSection from "../../components/profiel/infoSection/InfoSection";
import Button from "../../components/buttons/button/Button";

function Admin() {

    const history = useHistory();
    const {user} = useContext(AuthContext);
    const {getUserData} = useContext(AuthContext);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            getUserData(token, decodedToken);
        } else {
            console.log("De gebruiker is niet geauthoriseerd")
            history.push("/login")
        }
    }, []);



    return (
        <>
            {Object.keys(user).length > 0 &&
            <>
                <FlexContainer className="FlexContainer FlexContainer__image-container FlexContainer__image-container--profile">

                    <ColoredContainer
                        classNameItem="FlexItem FlexItem__split"
                        classNameBlock="block block--profile block--green"
                        title="Dashboard admin"
                    >
                        <InfoSection>
                            <strong>Gebruikersnaam:</strong> {user.info.username}
                            <p><strong>Email:</strong> {user.info.email}</p>
                        </InfoSection>
                    </ColoredContainer>

                    <ColoredContainer
                        classNameItem="FlexItem FlexItem__split"
                        classNameBlock="block block--profile block--red"
                        title="Aanpassen"
                    >
                        <InfoSection>
                            <strong>Gebruikersnaam:</strong> {user.info.username}
                            <p><strong>Email:</strong> {user.info.email}</p>
                        </InfoSection>
                    </ColoredContainer>

                    <FlexContainer className="FlexContainer FlexContainer__button-row">
                        <Button
                            type="button"
                            className="button button--red"
                            name="Toon alle geveltuintjes"
                            // onClick={showAll}
                        />
                        <Button
                            type="button"
                            className="button button--red"
                            name="Toon open aanvragen"
                            // onClick={showOpen}
                        />}
                    </FlexContainer>

                </FlexContainer>
            </>
            }
        </>
    );
}

export default Admin;