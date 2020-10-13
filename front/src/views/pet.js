import React from "react";
import api from "../services/api";
import { getUser } from "../services/auth";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import { CardActions, Divider } from "@material-ui/core";
import Bar from "../components/Bar";
import Carousel from 'react-material-ui-carousel'
import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Chip from '@material-ui/core/Chip';
import { Button, Grid } from '@material-ui/core';
import { Link as RLink } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import getImageURL from '../helpers';

const useStyles = makeStyles(theme => ({
    card: {
        margin: "-80px 10px 0 10px",
        minHeight: "400px"
    },
    media: {
        height: 300,
    },
    root: {
        width: '100%',
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    section0: {
        margin: theme.spacing(1),
    },
    section1: {
        margin: theme.spacing(3, 1),
    },
    section2: {
        margin: theme.spacing(1),
    },
    section3: {
        margin: theme.spacing(3, 1, 1),
    },
}));

const initialData = {
    castracao: "",
    detalhes: "",
    genero: "",
    nome: "",
    peso: 0,
    tamanho: "",
    tipo: "",
    vacinacao: "",
    vermifugacao: "",
    fotos: [],
    doador: { _id: "" }
};


const Pet = props => {
    let { id } = useParams();
    const user = getUser();
    const classes = useStyles();

    const [pet, setPet] = React.useState(initialData);

    React.useEffect(() => {

        api.get(`/api/pets/${id}`)
            .then(response => {
                setPet(response.data);
            })
            .catch(error => { });
    }, [id]);


    return (

        <React.Fragment>
            <Bar back={true} title="Perfil" />
            <Card className={classes.card} elevation={3} >
                <Carousel
                    navButtonsAlwaysVisible={true}
                    autoPlay={false}>
                    {pet.fotos.map((foto, index) => (
                        <CardMedia key={index}
                            className={classes.media}
                            image={getImageURL(foto)}
                            title={`foto ${index} de ${pet.nome}`}
                        />
                    ))}

                </Carousel>

                <CardContent>
                    <div className={classes.root}>
                        {pet.doador._id === user._id && (

                            <div className={classes.section0}>
                                <Button
                                    color="primary"
                                    component={RLink}
                                    to={`/pet/${pet._id}/photos`}
                                ><PhotoAlbumIcon />Gerenciar Fotos</Button>
                                <Button
                                    color="primary"
                                    component={RLink}
                                    to={`/pet/${pet._id}/edit`}
                                ><EditIcon />Perfil</Button>

                            </div>
                        )}

                        <div className={classes.section2}>
                            <div>
                                <Chip color="secondary" size="small" className={classes.chip} label={pet.tipo} variant="outlined" />
                                <Chip size="small" className={classes.chip}
                                    color={pet.genero === "macho" ? "primary" : "secondary"} label={pet.genero} />
                                <Chip size="small"
                                    color="secondary"
                                    className={classes.chip}
                                    label={"tamanho: " + pet.tamanho} variant="outlined" />
                            </div>
                        </div>
                        <div className={classes.section1}>
                            <Grid container alignItems="center">
                                <Grid item xs>
                                    <Typography gutterBottom variant="h4">
                                        {pet.nome}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography gutterBottom variant="h6">
                                        {pet.ano} ano(s) e {pet.mes} mês(es)
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Typography color="textSecondary" variant="body2">
                                {pet.detalhes}
                            </Typography>
                        </div>
                        <Divider />
                        <div className={classes.section2}>
                            <Grid container alignItems="center">
                                <Grid item xs>
                                    <Typography gutterBottom variant="body2" color="textSecondary" >
                                        <strong>Vacinação:</strong> {pet.vacinacao}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography gutterBottom variant="body2" color="textSecondary" >
                                        <strong>Peso:</strong> {pet.peso} kg
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                                <Grid item xs>
                                    <Typography gutterBottom variant="body2" color="textSecondary" >
                                        <strong>Castração: </strong>{pet.castracao ? 'Sim' : "Não"}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography gutterBottom variant="body2" color="textSecondary" >
                                        <strong>Vermifugação:</strong> {pet.vermifugacao ? 'Sim' : "Não"}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                        <Divider />


                    </div>

                </CardContent>
                <CardActions className={classes.action}>
                    {pet.doador._id === user._id && (
                        <Button
                            onClick={() => {
                                api.delete(`/api/pets/${id}`)
                                    .then(response => {
                                        props.history.goBack();
                                    })
                                    .catch(error => { });
                            }}
                            variant="contained"
                            color="secondary"
                            fullWidth
                        >Remover Perfil</Button>
                    )}
                </CardActions>
            </Card>

        </React.Fragment>
    )
};

export default Pet;