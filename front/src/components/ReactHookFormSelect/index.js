import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Controller } from "react-hook-form";

const ReactHookFormSelect = ({
    name,
    label,
    control,
    defaultValue,
    children,
    rules,
    ...props
}) => {
    const labelId = `${name}-label`;
    return (
        <FormControl {...props}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Controller
                as={
                    <Select labelId={labelId} label={label}>
                        {children}
                    </Select>
                }
                name={name}
                control={control}
                rules={rules}
                defaultValue={defaultValue}
            />
            <FormHelperText >{props.errors[name] && `O campo ${label} é requerido`}</FormHelperText>
        </FormControl>
    );
};
export default ReactHookFormSelect;