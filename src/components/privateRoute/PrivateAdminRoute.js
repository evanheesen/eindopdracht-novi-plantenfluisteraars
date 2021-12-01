import React from 'react';
import {Redirect, Route} from "react-router-dom";

function PrivateAdminRoute({ isAuth, admin, children, ...rest }) {
    return (
        <Route {...rest}>
            {isAuth && admin ? children : <Redirect to="/" />}
        </Route>
    );
}

export default PrivateAdminRoute;