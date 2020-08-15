import React from "react";
import api from "../services/api";
import { getUser } from "../services/auth";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { CardActions } from "@material-ui/core";
import Bar from "../components/Bar";

const useStyles = makeStyles(theme => ({
    card: {
        margin: "-80px 10px 0 10px",
        minHeight: "400px"
    },
}));

const Pets = () => {
    const user = getUser();
    const classes = useStyles();
    return (

        <React.Fragment>
            <Bar />
            <Card className={classes.card} elevation={3} >

                <CardContent>
                    <h1>pets</h1>

                </CardContent>
                <CardActions className={classes.action}>

                </CardActions>
            </Card>

        </React.Fragment>
    )
};

export default Pets;