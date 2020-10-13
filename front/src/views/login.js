import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


import { isAuthenticated, login } from '../services/auth';
import api from '../services/api';

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from '@material-ui/icons/Facebook';

import FaceBookButton from "../components/Button";





const useStyles = makeStyles(theme => ({
    card: {
        margin: "10px 10px 0 10px",
        minHeight: "400px"
    },
    img: {
        display: "block",
        width: "50%",
        margin: "20px auto"
    },
    button: {
        marginBottom: "8px"
    }
}));


const Login = props => {
    if (isAuthenticated()) props.history.push("/");
    const classes = useStyles();
    const responseFacebook = (response) => {
        api.post("/auth/facebook/token", { access_token: response.accessToken })
            .then(response => {
                login(response.data);

                props.history.push("/");
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data.msg);
                } else if (error.request) {
                    console.log("Erro na conexão ao servidor");
                } else {
                    console.log(error);
                }
            });
    }

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <FacebookLogin
                        appId="2345232325785017"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={responseFacebook}
                        render={renderProps => (
                            <FaceBookButton
                                onClick={renderProps.onClick}
                                variant="contained"
                                size="large"
                                color="primary"
                                startIcon={<FacebookIcon />}
                                fullWidth
                            >
                                Login com o Facebook
                            </FaceBookButton>

                        )}
                    />




                </CardContent>
            </Card>
        </div>

    )
};

export default Login;