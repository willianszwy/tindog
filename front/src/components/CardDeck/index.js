import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialCard from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link as RLink } from "react-router-dom";
import getImageURL from '../../helpers';

const useStyles = makeStyles({
    root: {
        margin: "10px 10px 0 10px",
    },
    cardMedia: {
        height: 300,
        objectFit: 'cover',
        objectPosition: 'top',
        userSelect: 'none',
        pointerEvents: 'none',
    },
});

const CardDeck = ({
    pet: {
        nome,
        detalhes,
        fotos,
        _id,
        distancia
    },
}) => {
    const classes = useStyles();
    return (
        <RLink
            to={`/pet/${_id}`}
        >
            <MaterialCard className={classes.root}>
                <CardMedia
                    className={classes.cardMedia}
                    component="img"
                    height="250"
                    image={getImageURL(fotos[0])}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h3">
                        {nome}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="h3">
                        {distancia < 1 ? "Menos de 1km" : `${Math.round(distancia)}km`} de você
                    </Typography>
                    <Typography gutterBottom variant="body1" component="h3">
                        {detalhes}
                    </Typography>
                </CardContent>
            </MaterialCard>
        </RLink>)
};

export default CardDeck;
