import React from "react";
import api from "../services/api";
import { getUser } from "../services/auth";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    card: {
        marginTop: "10px"
    },
}));

const Home = () => {
    const user = getUser();
    const classes = useStyles();
    api.get("/api/home");
    return (
        <Card className={classes.card}>
            <CardContent>
                <Avatar
                    alt="usuario"
                    src={user.picture}
                    className={classes.bigAvatar}
                    style={{ alignSelf: "center" }}
                />
                <Typography variant="subtitle1" gutterBottom>
                    {user.name}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    {user.email}
                </Typography>
            </CardContent>
        </Card>
    )
};

export default Home;