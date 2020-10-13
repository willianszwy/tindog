import React from "react";
import api from "../services/api";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { CardActions } from "@material-ui/core";
import Bar from "../components/Bar";
import Uploader from "../components/Uploader";
import { useParams } from "react-router-dom";
import { CardMedia, Button } from "@material-ui/core";
import Carousel from 'react-material-ui-carousel'
import getImageURL from '../helpers';

const useStyles = makeStyles(theme => ({
    card: {
        margin: "-80px 10px 0 10px",
        minHeight: "400px"
    }
    ,
    button: {
        marginBottom: 20
    },
}));



const Photos = props => {
    let { id } = useParams();
    const classes = useStyles();

    const [fotos, setFotos] = React.useState([]);
    const [atual, setAtual] = React.useState(0);

    React.useEffect(() => {

        api.get(`/api/pets/${id}`)
            .then(response => {
                setFotos(response.data.fotos);
            })
            .catch(error => { });
    }, [id]);

    const removeFoto = () => {
        api.delete(`/api/pets/${id}/photo/${fotos[atual]}`)
            .then(response => {
            })
            .catch(error => { });
        setFotos(fotos.filter(foto => foto !== fotos[atual]));
    }


    return (

        <React.Fragment>
            <Bar back={true} title="Gerenciar Fotos" />
            <Card className={classes.card} elevation={3} >

                <Carousel
                    onChange={(index, active) => setAtual(index)}
                    navButtonsAlwaysVisible={true}
                    autoPlay={false}>
                    {fotos.map((foto, index) => (<CardMedia key={index}
                        component="img"
                        alt="Contemplative Reptile"
                        height="300"
                        image={getImageURL(foto)}
                        title="Contemplative Reptile"
                    />))}

                </Carousel>

                <CardContent>
                    <Button
                        className={classes.button}
                        onClick={removeFoto}
                        fullWidth
                        variant="contained">Remover Foto</Button>
                    <Uploader pet={id} success={() => props.history.goBack()}></Uploader>
                </CardContent>
                <CardActions className={classes.action}>

                </CardActions>
            </Card>

        </React.Fragment>
    )
};

export default Photos;