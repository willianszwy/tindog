import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { isAuthenticated, setUser } from "../services/auth";
import { useForm, Controller } from "react-hook-form";
import api from "../services/api";

import {
    Button,
    FormControl, InputLabel,
    FilledInput, FormHelperText,
    FormControlLabel, Checkbox
} from "@material-ui/core";

const isValidCPF = (cpf) => {
    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
        !cpf ||
        cpf.length !== 11 ||
        cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999"
    ) {
        return false
    }
    let soma = 0
    let resto
    for (let i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto === 10) || (resto === 11)) resto = 0
    if (resto !== parseInt(cpf.substring(9, 10))) return false
    soma = 0
    for (let i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto === 10) || (resto === 11)) resto = 0
    if (resto !== parseInt(cpf.substring(10, 11))) return false
    return true
}

const Confirm = props => {
    if (!isAuthenticated()) {
        props.history.push("/login");
    }
    const [inputs] = React.useState({ telefone: "", cpf: "", whatsapp: false });
    const { handleSubmit, control, errors } = useForm();
    const onSubmit = data => {
        api.put(`/api/users`, data)
            .then(response => {
                setUser(response.data);
                props.history.push("/");
            })
            .catch(error => { });
    };
    return (
        <div>

            <Dialog
                open={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Complete o seu cadastro"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Digite os dados abaixo para poder utilizar o sistema!
                    </DialogContentText>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl fullWidth error={errors.cpf} variant="filled" size="small" margin="dense">
                            <InputLabel >CPF</InputLabel>
                            < Controller
                                as={FilledInput}
                                name="cpf"
                                control={control}
                                defaultValue={inputs.cpf}
                                rules={{
                                    required: "Digite seu CPF",
                                    validate: value => isValidCPF(value) || "CPF inválido"
                                }}
                            />
                            <FormHelperText >{errors.cpf && errors.cpf.message}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth error={errors.telefone} variant="filled" size="small" margin="dense">
                            <InputLabel >Telefone</InputLabel>
                            < Controller
                                as={FilledInput}
                                name="telefone"
                                control={control}
                                defaultValue={inputs.telefone}
                                rules={{
                                    required: "Digite seu telefone",
                                    pattern: {
                                        value: /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/,
                                        message: "Digite um numero válido (XX)XXXXX-XXXX",
                                    },
                                }}
                            />
                            <FormHelperText >{errors.telefone && errors.telefone.message}</FormHelperText>
                        </FormControl>


                        <Controller
                            control={control}
                            name="whatsapp"
                            defaultValue={inputs.whatsapp}
                            render={({ onChange, onBlur, value, name }) => (
                                <FormControlLabel
                                    control={<Checkbox
                                        onBlur={onBlur}
                                        onChange={e => onChange(e.target.checked)}
                                        checked={value}
                                        name={name}
                                    />}
                                    label="Whatsapp"
                                />
                            )}
                        />


                        <Button
                            margin="dense"
                            type="submit"
                            color="secondary"
                            variant="contained" fullWidth

                        >
                            Salvar
                    </Button>
                    </form>

                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>

        </div>
    );
};

export default Confirm;