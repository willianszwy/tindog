import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { CardActions, Button, MenuItem } from "@material-ui/core";
import Bar from "../components/Bar";
import ReactHookFormSelect from "../components/ReactHookFormSelect";
import { useForm, Controller } from "react-hook-form";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { AppContext } from '../context/state';

const useStyles = makeStyles(theme => ({
    card: {
        margin: "-80px 10px 0 10px",
        minHeight: "400px"
    },
}));

const marks = [
    {
        value: 0,
        label: ''
    },
    {
        value: 0.5,
        label: '5 meses',
    },
    {
        value: 1.5,
        label: '1 ano'
    },
    {
        value: 3,
        label: '3 anos',
    },
    {
        value: 5,
        label: '> 5',
    }
];

const Config = props => {
    const classes = useStyles();
    const { state, dispatch } = React.useContext(AppContext);
    const [inputs] = React.useState(state);

    React.useEffect(() => {
        setValue("distancia", state.distancia);
        setValue("idade", state.idade);
        setValue("genero", state.genero);
        setValue("tamanho", state.tamanho);
        setValue("tipo", state.tipo);
        setValue("castracao", state.castracao);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const { handleSubmit, control, errors, setValue } = useForm();
    const onSubmit = data => {
        dispatch({
            type: "updateSearchConfig",
            config: { ...data },
        })
        props.history.push("/");
    };

    function valuetext(value) {
        return `${value}Km`;
    }


    return (

        <React.Fragment>
            <Bar title="Configurações de Busca" />
            <Card className={classes.card} elevation={3} >

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <Typography id="discrete-slider" gutterBottom>
                            Distancia (km)
                        </Typography>

                        <Controller
                            name="distancia"
                            control={control}
                            defaultValue={0}
                            render={(props) => (
                                <Slider
                                    {...props}
                                    onChange={(_, value) => {
                                        props.onChange(value);
                                    }}
                                    getAriaValueText={valuetext}
                                    valueLabelDisplay="auto"
                                    marks
                                    step={5}
                                    min={0}
                                    max={30}
                                />
                            )}
                        />

                        <Typography id="discrete-slider" >
                            Idade entre:
                        </Typography>

                        <Controller
                            name="idade"
                            control={control}
                            defaultValue={[0, 10]}
                            render={(props) => (
                                <Slider
                                    {...props}
                                    onChange={(_, value) => {
                                        props.onChange(value);
                                    }}
                                    getAriaValueText={valuetext}
                                    valueLabelDisplay="off"
                                    marks={marks}
                                    step={null}
                                    min={0}
                                    max={5}
                                />
                            )}
                        />

                        <ReactHookFormSelect
                            name="tipo"
                            variant="filled"
                            size="small"
                            fullWidth
                            control={control}
                            label="Tipo"
                            error={errors.tipo}
                            errors={errors}
                            margin="dense"
                            rules={{ required: false }}
                            defaultValue={inputs.tipo}
                        >
                            <MenuItem value="">Escolha uma opção:</MenuItem>
                            <MenuItem value="gato">Gato</MenuItem>
                            <MenuItem value="cachorro">Cachorro</MenuItem>
                        </ReactHookFormSelect>

                        <ReactHookFormSelect
                            name="genero"
                            variant="filled"
                            size="small"
                            fullWidth
                            control={control}
                            label="Genero"
                            error={errors.genero}
                            errors={errors}
                            margin="dense"
                            rules={{ required: false }}
                            defaultValue={inputs.genero}
                        >
                            <MenuItem value="">Escolha uma opção:</MenuItem>
                            <MenuItem value="fêmea">Fêmea</MenuItem>
                            <MenuItem value="macho">Macho</MenuItem>
                        </ReactHookFormSelect>

                        <ReactHookFormSelect
                            name="tamanho"
                            variant="filled"
                            size="small"
                            fullWidth
                            control={control}
                            label="Tamanho"
                            error={errors.tamanho}
                            errors={errors}
                            margin="dense"
                            rules={{ required: false }}
                            defaultValue={inputs.tamanho}
                        >
                            <MenuItem value="">Escolha uma opção:</MenuItem>
                            <MenuItem value="pequeno">Pequeno</MenuItem>
                            <MenuItem value="médio">Médio</MenuItem>
                            <MenuItem value="grande">Grande</MenuItem>
                            <MenuItem value="gigante">Gigante</MenuItem>
                            <MenuItem value="indefinido">Indefinido</MenuItem>
                        </ReactHookFormSelect>

                        <ReactHookFormSelect
                            name="castracao"
                            variant="filled"
                            size="small"
                            fullWidth
                            control={control}
                            label="Castração"
                            error={errors.castracao}
                            errors={errors}
                            margin="dense"
                            rules={{ required: false }}
                            defaultValue={inputs.castracao}
                        >
                            <MenuItem value="">Escolha uma opção:</MenuItem>
                            <MenuItem value="true">Sim</MenuItem>
                            <MenuItem value="false">Não</MenuItem>
                        </ReactHookFormSelect>



                        <Button type="submit" color="secondary" variant="contained" fullWidth>Salvar</Button>
                    </form>

                </CardContent>
                <CardActions className={classes.action}>

                </CardActions>
            </Card>

        </React.Fragment>
    )
};

export default Config;