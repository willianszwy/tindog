import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


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
    },
    title: {
        flexGrow: 1,
        alignSelf: 'flex-end',
    },
}));

export default function Bar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" elevation={0} className={classes.appbar} >
                <Toolbar className={classes.toolbar} >
                    <Menu />
                </Toolbar>
            </AppBar>
        </div>
    );
}