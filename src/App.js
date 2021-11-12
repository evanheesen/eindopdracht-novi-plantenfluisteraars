import './App.css';
import React, {useContext} from 'react';
import {Switch, Route} from "react-router-dom";
import {AuthContext} from "./context/AuthContext";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Home from "./pages/home/Home";
import NavBar from "./components/navBar/NavBar";
import Concept from "./pages/concept/Concept";
import Prijzen from "./pages/prijzen/Prijzen";
import OverOns from "./pages/overOns/OverOns";
import Aanvragen from "./pages/aanvragen/Aanvragen";
import Login from "./pages/login/Login";
import Registreren from "./pages/registreren/Registreren";
import Profiel from "./pages/profiel/Profiel";
import Admin from "./pages/admin/Admin";

function App() {

    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <NavBar/>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <PrivateRoute path="/profiel" isAuth={isAuth}>
                    <Profiel/>
                </PrivateRoute>
                <PrivateRoute path="/admin" isAuth={isAuth}>
                    <Admin/>
                </PrivateRoute>
                <Route path="/concept">
                    <Concept/>
                </Route>
                <Route path="/prijzen">
                    <Prijzen/>
                </Route>
                <Route path="/over-ons">
                    <OverOns/>
                </Route>
                <Route path="/aanvragen">
                    <Aanvragen/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/registreren">
                    <Registreren/>
                </Route>
            </Switch>
        </>
    );
}

export default App;
