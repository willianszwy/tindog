import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { MatchButton, NextButton } from '../Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "-30px",
    },
    iconButtonContainerLeft: {
        display: 'flex',
        justifyContent: 'center',
    },
    iconButtonContainerRight: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

export default function CardButtons({
    right,
    left,
}) {
    const classes = useStyles();

    return (
        <Grid container justify="space-evenly" className={classes.root}>
            <Grid item xs={6} className={classes.iconButtonContainerLeft}>
                <NextButton
                    onClick={left}
                    aria-label="dislike"
                    className={classes.margin}
                >
                    <CloseIcon fontSize="large" />
                </NextButton>
            </Grid>

            <Grid item xs={6} className={classes.iconButtonContainerRight}>
                <MatchButton
                    onClick={right}
                    aria-label="like"
                    className={classes.margin}
                >
                    <FavoriteIcon fontSize="large" />
                </MatchButton>
            </Grid>
        </Grid>
    );
}