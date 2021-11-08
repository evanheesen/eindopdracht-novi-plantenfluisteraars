import React, {createContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import ValidateToken from "../helpers/validateToken";

//1. Context maken
export const AuthContext = createContext({});

//2. Custom provider component
//3. Wikkel Provider component om <App />
// Function is jasje voor Provider. Hiermee wikkelen we een component om de basis heen, zodat we meer functies mee kunnen geven.

function AuthContextProvider({children}) {

    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const history = useHistory();

    // persist on refresh:
    useEffect(() => {
        const token = localStorage.getItem('token'); // checken of we een token hebben
        console.log("Context wordt gerefreshed")

        if (token) { // als er een token is dan op basis van de gegevens de gebruikersdata ophalen
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            const validToken = ValidateToken(decodedToken);
            console.log(`Valid token: ${validToken}`);

            if (validToken) { // als de token nog niet verlopen is,
                getUserData(token, decodedToken);
            } else {
                toggleIsAuth({
                    ...isAuth,
                    status: 'done',
                });
            }
        } else { // zo niet, dan gaan we verder met ons leven
            toggleIsAuth({
                ...isAuth,
                status: 'done',
            });
        }
    }, [])

    async function getUserData(token, decodedToken, pushlink) {
        const idUser = decodedToken.sub;

        try {
            const result = await axios.get(`http://localhost:8081/users/${idUser}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });

            console.log("result:")
            console.log(result);

            // als userinformatie kan worden opgehaald:
            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    username: result.data.username,
                    // email: result.data.email,
                    id: result.data.id,
                    fistName: result.data.firstName,
                    lastName: result.data.lastName,
                },
                status: 'done',
            });

            if (pushlink) {
                history.push(pushlink);
            }

        } catch (e) {
            console.error(e.response.data);
            // console.error(e);
            // als er iets mis is gegaan, geen data in state:
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }

    function logOut() {
        console.log("Je bent uitgelogd");
        localStorage.clear();

        toggleIsAuth({
            ...isAuth,
            isAuth: false,
            user: null,
        });

        history.push("/")
    }

    function logIn(token) {
        localStorage.setItem('token', token); // JWT in local storage plaatsen

        // Zorgen dat we de gebruikersdata ophalen. Nieuw GET request met decoden JWT om gebruikersgegevens op te halen.
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);

        getUserData(token, decodedToken, "/profiel");
        console.log("Je bent ingelogd");
    }


    //4. Data maken die overal beschikbaar is
    const contextAuth = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        logIn: logIn,
        logOut: logOut,
        getUserData: getUserData,
    }

    return (
        <AuthContext.Provider value={contextAuth}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;