import React from "react";
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import { isAuthenticated, isActivate } from "./services/auth";

import Login from "./views/login";
import Home from "./views/home";
import Config from "./views/config";
import Pets from "./views/pets";
import Match from "./views/match";
import Logout from "./views/logout";
import CreatePet from "./views/createPet";
import Pet from "./views/pet";
import Photos from "./views/photos";
import Contact from "./views/contact";
import Confirm from "./views/confirm";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                isActivate() ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/confirm",
                                state: { from: props.location }
                            }}
                        />
                    )
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
            <Route path="/confirm" component={Confirm} />

            <PrivateRoute path="/config" component={Config} />
            <PrivateRoute path="/match" component={Match} />
            <PrivateRoute path="/pets" component={Pets} />
            <PrivateRoute path="/pet/:id/edit" component={CreatePet} />
            <PrivateRoute path="/pet/:id/photos" component={Photos} />
            <PrivateRoute path="/pet/:id" component={Pet} />
            <PrivateRoute path="/pet" component={CreatePet} />
            <PrivateRoute path="/contact/:id" component={Contact} />



            <PrivateRoute path="/" component={Home} />

            <Route path="*" component={() => <Redirect to="/" />} />
        </Switch>
    </Router>
);

export default Routes;