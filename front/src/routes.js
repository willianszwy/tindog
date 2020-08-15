import React from "react";
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import Login from "./views/login";
import Home from "./views/home";
import Config from "./views/config";
import Pets from "./views/pets";
import Match from "./views/match";
import Logout from "./views/logout";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (

                <Component {...props} />

            ) : (
                    <Redirect
                        to={{ pathname: "/login", state: { from: props.location } }}
                    />
                )
        }
    />
);

const Routes = () => (
    <Router>
        <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/logout" exact component={Logout} />

            <PrivateRoute path="/config" component={Config} />
            <PrivateRoute path="/match" component={Match} />
            <PrivateRoute path="/pets" component={Pets} />
            <PrivateRoute path="/" component={Home} />

            <Route path="*" component={() => <Redirect to="/" />} />
        </Switch>
    </Router>
);

export default Routes;