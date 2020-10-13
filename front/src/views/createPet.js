import React from "react";
import {
    Card, CardActions,
    CardContent, Button,
    FormControl, InputLabel,
    FilledInput, FormHelperText,
    MenuItem, Grid
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Bar from "../components/Bar";
import ReactHookFormSelect from "../components/ReactHookFormSelect";
import { useForm, Controller } from "react-hook-form";
import api from "../services/api";
import { useParams } from "react-router-dom";



const useStyles = makeStyles(theme => ({
    card: {
        margin: "-80px 10px 0 10px",
        minHeight: "400px"
    },
    fab: {
        position: "fixed",
        bottom: 20,
        right: 20
    }
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
    ano: "",
    mes: ""
};

const CreatePet = props => {
    let { id } = useParams();

    const [inputs] = React.useState(initialData);

    React.useEffect(() => {
        if (id) {
            api.get(`/api/pets/${id}`)
                .then(response => {
                    setValue("nome", response.data.nome);
                    setValue("detalhes", response.data.detalhes);
                    setValue("genero", response.data.genero);
                    setValue("peso", response.data.peso);
                    setValue("tamanho", response.data.tamanho);
                    setValue("tipo", response.data.tipo);
                    setValue("vacinacao", response.data.vacinacao);
                    setValue("vermifugacao", response.data.vermifugacao.toString());
                    setValue("castracao", response.data.castracao.toString());
                    setValue("mes", response.data.mes);
                    setValue("ano", response.data.ano);
                })
                .catch(error => { });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const classes = useStyles();
    const { handleSubmit, control, errors, setValue } = useForm();
    const onSubmit = data => {

        navigator.geolocation.getCurrentPosition(position => {
            data.location = {
                type: "Point",
                coordinates: [position.coords.longitude, position.coords.latitude]
            };
            if (!id) {
                api.post('/api/pets', data)
                    .then(response => { props.history.goBack(); })
                    .catch(error => { });
            } else {
                api.put(`/api/pets/${id}`, data).then(response => { props.history.goBack(); })
                    .catch(error => { });
            }
        });

    };


    return (
        <React.Fragment>

            <Bar back={true} title={id ? "Alterar Perfil" : "Cadastrar Perfil"} />
            <Card className={classes.card} elevation={3} >

                <CardContent>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <FormControl fullWidth error={errors.nome} variant="filled" size="small">
                            <InputLabel >Nome</InputLabel>
                            < Controller
                                as={FilledInput}
                                name="nome"
                                control={control}
                                defaultValue={inputs.nome}
                                rules={{ required: true }}
                            />
                            <FormHelperText >{errors.nome && "O campo Nome é requerido"}</FormHelperText>
                        </FormControl>

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
                            rules={{ required: true }}
                            defaultValue={inputs.tipo}
                        >
                            <MenuItem value="">Escolha uma opção:</MenuItem>
                            <MenuItem value="gato">Gato</MenuItem>
                            <MenuItem value="cachorro">Cachorro</MenuItem>
                        </ReactHookFormSelect>
                        <div>
                            <Grid container spacing={1}>
                                <Grid item xs={6} >
                                    <FormControl fullWidth error={errors.ano} variant="filled" size="small">
                                        <InputLabel >Ano</InputLabel>
                                        < Controller
                                            as={FilledInput}
                                            name="ano"
                                            type="number"
                                            control={control}
                                            defaultValue={inputs.ano}
                                            rules={{
                                                required: "O campo Ano é requerido",
                                                min: {
                                                    value: 0,
                                                    message: 'O Ano precisa ser maior ou igual 0 '
                                                }, max: {
                                                    value: 20,
                                                    message: 'O Ano precisa ser menor ou igual 20 '
                                                }
                                            }}
                                        />
                                        <FormHelperText >{errors.ano && errors.ano.message}</FormHelperText>
                                    </FormControl>

                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth error={errors.mes} variant="filled" size="small">
                                        <InputLabel >Meses</InputLabel>
                                        < Controller
                                            as={FilledInput}
                                            name="mes"
                                            type="number"
                                            control={control}
                                            defaultValue={inputs.mes}
                                            rules={{
                                                required: "O campo Meses é requerido",
                                                min: {
                                                    value: 0,
                                                    message: 'O Mês precisa ser maior ou igual a 0 '
                                                }, max: {
                                                    value: 11,
                                                    message: 'O Mês precisa ser menor ou igual a 11 '
                                                }
                                            }}
                                        />
                                        <FormHelperText >{errors.mes && errors.mes.message}</FormHelperText>
                                    </FormControl>

                                </Grid>
                            </Grid>

                        </div>




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
                            rules={{ required: true }}
                            defaultValue={inputs.tamanho}
                        >
                            <MenuItem value="">Escolha uma opção:</MenuItem>
                            <MenuItem value="pequeno">Pequeno</MenuItem>
                            <MenuItem value="médio">Médio</MenuItem>
                            <MenuItem value="grande">Grande</MenuItem>
                            <MenuItem value="gigante">Gigante</MenuItem>
                            <MenuItem value="indefinido">Indefinido</MenuItem>
                        </ReactHookFormSelect>

                        <FormControl fullWidth error={errors.peso} variant="filled" size="small"
                            margin="dense">
                            <InputLabel >Peso</InputLabel>
                            < Controller
                                as={FilledInput}
                                name="peso"
                                control={control}
                                defaultValue={inputs.peso}
                                type="number"
                                rules={{ required: true }}
                            />
                            <FormHelperText >{errors.peso && "O campo Peso é requerido"}</FormHelperText>
                        </FormControl>

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
                            rules={{ required: true }}
                            defaultValue={inputs.genero}
                        >
                            <MenuItem value="">Escolha uma opção:</MenuItem>
                            <MenuItem value="fêmea">Fêmea</MenuItem>
                            <MenuItem value="macho">Macho</MenuItem>
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
                            rules={{ required: true }}
                            defaultValue={inputs.castracao}
                        >
                            <MenuItem value="">Escolha uma opção:</MenuItem>
                            <MenuItem value="true">Sim</MenuItem>
                            <MenuItem value="false">Não</MenuItem>
                        </ReactHookFormSelect>

                        <ReactHookFormSelect
                            name="vermifugacao"
                            variant="filled"
                            size="small"
                            fullWidth
                            control={control}
                            label="Vermifugação"
                            error={errors.vermifugacao}
                            errors={errors}
                            margin="dense"
                            rules={{ required: true }}
                            defaultValue={inputs.vermifugacao}
                        >
                            <MenuItem value="">Escolha uma opção:</MenuItem>
                            <MenuItem value="true">Sim</MenuItem>
                            <MenuItem value="false">Não</MenuItem>
                        </ReactHookFormSelect>

                        <ReactHookFormSelect
                            name="vacinacao"
                            variant="filled"
                            size="small"
                            fullWidth
                            control={control}
                            label="Vacinação"
                            error={errors.vacinacao}
                            errors={errors}
                            margin="dense"
                            rules={{ required: true }}
                            defaultValue={inputs.vacinacao}
                        >
                            <MenuItem value="">Escolha uma opção:</MenuItem>
                            <MenuItem value="não vacinado">Não</MenuItem>
                            <MenuItem value="raiva">Raiva</MenuItem>
                            <MenuItem value="V4">V4</MenuItem>
                            <MenuItem value="V8">V8</MenuItem>
                            <MenuItem value="V10">V10</MenuItem>
                            <MenuItem value="raiva, v4">Raiva, V4</MenuItem>
                            <MenuItem value="raiva, v8">Raiva, V8</MenuItem>
                            <MenuItem value="raiva, v10">Raiva,V10</MenuItem>
                        </ReactHookFormSelect>

                        <FormControl fullWidth error={errors.detalhes} variant="filled" size="small" margin="dense" >
                            <InputLabel >Detalhes</InputLabel>
                            < Controller
                                as={FilledInput}
                                name="detalhes"
                                control={control}
                                defaultValue={inputs.detalhes}
                                multiline
                                rows={4}
                                rules={{ required: true }}
                            />
                            <FormHelperText >{errors.detalhes && "O campo Detalhes é requerido"}</FormHelperText>
                        </FormControl>

                        <Button type="submit" color="secondary" variant="contained" fullWidth>{id ? "Alterar" : "Cadastrar"}</Button>
                    </form>

                </CardContent>
                <CardActions className={classes.action}>

                </CardActions>
            </Card>

        </React.Fragment>
    )
};

export default CreatePet;