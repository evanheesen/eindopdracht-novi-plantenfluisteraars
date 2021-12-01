import React from "react";
import {Redirect, Route} from "react-router-dom";

function PrivateUserRoute({isAuth, admin, children, ...rest}) {
    return (
        <Route {...rest}>
            {isAuth && !admin ? children : <Redirect to="/"/>}
        </Route>
    );
}

export default PrivateUserRoute;