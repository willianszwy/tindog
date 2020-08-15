import React from "react";
import api from "../services/api";
import { getUser } from "../services/auth";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Typography, Button, CardMedia, CardActions } from "@material-ui/core";

import FavoriteIcon from '@material-ui/icons/Favorite';
import PetsIcon from '@material-ui/icons/Pets';
import Fab from '@material-ui/core/Fab';

import { MatchButton, NextButton } from '../components/Button';
import Bar from "../components/Bar";

const useStyles = makeStyles(theme => ({
    card: {
        margin: "-80px 10px 0 10px",
        minHeight: "400px"
    },
    media: {
        height: 300,
    },
    action: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: '20px'
    }
}));

const Home = () => {
    const user = getUser();
    const classes = useStyles();
    api.get("/api/home");
    return (

        <React.Fragment>
            <Bar />
            <Card className={classes.card} elevation={3} >
                <CardMedia
                    className={classes.media}
                    image="https://placekitten.com/1000/1000"
                    title="Paella dish"
                />
                <CardContent>


                </CardContent>
                <CardActions className={classes.action}>

                    <NextButton aria-label="like" size="large" variant="outlined" color="primary">
                        <PetsIcon />
                    </NextButton>
                    <MatchButton aria-label="like" size="large" variant="outlined" color="secondary" >
                        <FavoriteIcon />
                    </MatchButton>
                </CardActions>
            </Card>

        </React.Fragment>
    )
};

export default Home;