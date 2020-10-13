import React from "react";
import api from "../services/api";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { CardActions, Typography } from "@material-ui/core";
import Bar from "../components/Bar";
import { Link as RLink } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Casinha from '../casinha.svg';

const useStyles = makeStyles(theme => ({
    card: {
        margin: "-80px 10px 0 10px",
        minHeight: "400px"
    },
    img: {
        display: "block",
        width: "50%",
        margin: "5px auto"
    },
    fab: {
        position: "fixed",
        bottom: 20,
        right: 20
    },
    large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
}));



const Pets = () => {
    const classes = useStyles();

    const [pets, setPets] = React.useState([]);

    const petList = pets =>
        pets.map(pet => (
            <div key={pet._id}>
                <ListItem
                    button
                    component={RLink}
                    to={`/pet/${pet._id}`}
                >
                    <ListItemAvatar>
                        <Avatar
                            variant="square"
                            src={`http://localhost:8080/uploads/${pet.fotos[0]}`}
                            className={classes.large}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={pet.nome}
                        secondary={pet.detalhes}
                    />
                    <ListItemSecondaryAction>
                        <IconButton
                            edge="end"
                            aria-label="edit"
                            component={RLink}
                            to={`/pet/${pet._id}`}
                        >
                            <NavigateNextIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>

                <Divider />
            </div>
        ));

    React.useEffect(() => {

        api.get(`/api/pets`)
            .then(response => {
                setPets(petList(response.data));
            })
            .catch(error => { });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (

        <React.Fragment>
            <Bar title="Pets Cadastrados" />
            <Card className={classes.card} elevation={3} >

                <CardContent>
                    {pets.length > 0 ? (<List className={classes.root}>{pets}</List>)
                        :
                        (
                            <div>
                                <img src={Casinha} className={classes.img} alt="logo" />
                                <Typography variant="h5" align="center">
                                    Você ainda não adicionou nenhum Pet para adoção
                        </Typography>
                                <Typography variant="body1" align="center">
                                    Clique no botão abaixo para adicionar
                    </Typography></div>
                        )}

                </CardContent>
                <CardActions className={classes.action}>
                    <Fab
                        color="secondary"
                        aria-label="add"
                        className={classes.fab}
                        component={RLink}
                        to="pet"
                    >
                        <AddIcon />
                    </Fab>
                </CardActions>
            </Card>

        </React.Fragment>
    )
};

export default Pets;