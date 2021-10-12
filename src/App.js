import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/navBar/NavBar";

function App() {
    return (
        <Router>
            <NavBar/>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
