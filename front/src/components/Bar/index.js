import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { withRouter } from 'react-router-dom';


import Menu from "../../components/Menu";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    toolbar: {
        minHeight: 150,
        alignItems: 'flex-start',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),

    },
    appbar: {
        background: "#ef80a0",
        color: "#fff"
    },
    title: {
        flexGrow: 1,
        marginTop: theme.spacing(1),
    },
    icon: {
        color: "#fff"
    }
}));

const Bar = props => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" elevation={0} className={classes.appbar} >
                <Toolbar className={classes.toolbar} >
                    {props.back === true ?
                        (<IconButton onClick={() => props.history.goBack()}> <ArrowBackIosIcon className={classes.icon} /> </IconButton>)

                        : (<Menu />)}
                    <Typography variant="h6" className={classes.title}>
                        {props.title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(Bar);