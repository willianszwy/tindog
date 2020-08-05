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

            <PrivateRoute path="/" component={Home} />

            <Route path="*" component={() => <Redirect to="/" />} />
        </Switch>
    </Router>
);

export default Routes;