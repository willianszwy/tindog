import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Avatar, Button, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PetsIcon from '@material-ui/icons/Pets';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';

import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { getUser } from "../../services/auth";

import { Link, withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    menu: {
        width: 250,
    },
    avatar: {
        margin: "0px auto",
        width: 100,
        height: 100
    },
    head: {
        background:
            "#ef80a0",
        padding: "20px 0",
        color: "#fff"
    }
}));

const Menu = () => {
    const classes = useStyles();
    const [state, setState] = React.useState(false);
    const user = getUser();

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState(open);
    };


    return (
        <div>

            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
            >
                <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
                <div className={classes.menu}>
                    <div className={classes.head}>
                        <Avatar
                            alt="usuario"
                            src={user.picture}
                            className={classes.avatar}
                            style={{ alignSelf: "center" }}
                        />
                        <Typography variant="subtitle1" align='center' gutterBottom>
                            {user.name}
                        </Typography>
                        <Typography variant="subtitle2" align='center' gutterBottom>
                            {user.email}
                        </Typography>
                    </div>
                    <Divider />
                    <List>
                        <ListItem
                            component={Link}
                            to="/"
                            button>
                            <ListItemIcon>{<HomeIcon />}</ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>

                        <ListItem
                            component={Link}
                            to="/match"
                            button>
                            <ListItemIcon>{<FavoriteIcon />}</ListItemIcon>
                            <ListItemText primary="Match" />
                        </ListItem>
                        <ListItem
                            component={Link}
                            to="/pets"
                            button>
                            <ListItemIcon>{<PetsIcon />}</ListItemIcon>
                            <ListItemText primary="Pets" />
                        </ListItem>
                        <ListItem
                            component={Link}
                            to="/config"
                            button>
                            <ListItemIcon>{<SettingsRoundedIcon />}</ListItemIcon>
                            <ListItemText primary="Configuração" />
                        </ListItem>
                        <ListItem
                            component={Link}
                            to="/logout"
                            button>
                            <ListItemIcon>{<ExitToAppIcon />}</ListItemIcon>
                            <ListItemText primary="Sair" />
                        </ListItem>

                    </List>


                </div>
            </Drawer>
        </div>
    );
}

export default withRouter(Menu);