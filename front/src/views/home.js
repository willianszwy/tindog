import React from "react";
import api from "../services/api";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import Bar from "../components/Bar";

import { AppContext } from '../context/state';
import CardDeck from '../components/CardDeck';
import CardButtons from '../components/CardButtons';

import { Swipeable, direction } from 'react-deck-swiper';
import Casinha from '../casinha.svg';

const useStyles = makeStyles(theme => ({
    card: {
        margin: "10px 10px 0 10px",
        minHeight: "400px"
    },
    img: {
        display: "block",
        width: "50%",
        margin: "5px auto"
    },
    media: {
        height: 300,
    }, centerContent: {
        flexDirection: 'column',
        display: 'flex',
        marginTop: "-120px",
        width: "100%"
    },
    marginTop5: {
        marginTop: theme.spacing(5),
    },
    marginTop2: {
        marginTop: theme.spacing(2),
    },
    marginTop1: {
        marginTop: theme.spacing(1),
    },
}));

const Home = () => {
    const { state, dispatch } = React.useContext(AppContext);
    const classes = useStyles();

    const [pets, setPets] = React.useState([]);

    const renderButtons = ({
        right,
        left,
    }) => (
            <CardButtons
                right={right}
                left={left}
            />
        );

    const handleOnSwipe = (swipeDirection) => {
        let swipe = "";
        if (swipeDirection === direction.RIGHT) {
            swipe = "right";
        }

        if (swipeDirection === direction.LEFT) {
            swipe = "left";
        }
        api.post(`/api/pets/${pets[0]._id}/match`, { swipe })
            .then(response => {
                setPets((prev) => prev.slice(1));
            })
            .catch(error => { });

    }

    React.useEffect(() => {

        api.get(`/api/search`, {
            params: {
                ...state
            }
        })
            .then(response => {
                setPets(response.data);
            })
            .catch(error => { });

        navigator.geolocation.getCurrentPosition(function (position) {
            dispatch({
                type: "updateLocalization",
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (

        <div>
            <Bar title="TinDog" />
            <Grid container className={classes.centerContent}>


                <Grid item xs={12} className={classes.marginTop2}>

                    {pets.length > 0 ?
                        (
                            <Swipeable onSwipe={handleOnSwipe} renderButtons={renderButtons}>
                                <CardDeck pet={pets[0]}></CardDeck>
                            </Swipeable>)
                        : (
                            <Card className={classes.card} elevation={3} >
                                <CardContent>
                                    <img src={Casinha} className={classes.img} alt="logo" />
                                    <Typography variant="h5" align="center">
                                        Não encontramos nenhum resultado de acordo com suas preferências
                                    </Typography>

                                </CardContent>
                            </Card>)}

                </Grid>
            </Grid>

        </div>
    )
};

export default Home;