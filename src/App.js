import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./pages/home/Home";
import NavBar from "./components/navBar/NavBar";
import Concept from "./pages/concept/Concept";
import Prijzen from "./pages/prijzen/Prijzen";

function App() {
    return (
        <Router>
            <NavBar/>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/concept">
                    <Concept/>
                </Route>
                <Route path="/prijzen">
                    <Prijzen/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
