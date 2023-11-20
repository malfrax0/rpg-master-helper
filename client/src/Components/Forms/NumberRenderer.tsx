import { CircularProgress, TextField } from "@mui/material";
import { FormObjectParameters } from "../../Data/RPGInfo";
import { FormBaseProps } from "./interfaces";
import React, {useEffect, useState, useContext} from "react";
import PlayerContext from "../../Context/PlayerContext";

export interface NumberRendererProps extends FormBaseProps {
    object: FormObjectParameters.Number
}

const NumberRenderer = (props: NumberRendererProps) => {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [value, setValue] = useState("");

    const { editMode: editModeContext } = useContext(PlayerContext);

    let editMode = editModeContext;
    if (props.object.definedByList) {
        editMode = false;
    }

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const onValueChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLoading(true);
        props.onChange(parseInt(event.target.value))
            .catch((reason: any)=>{
                setErrorMsg(reason as string);
            })
            .then(()=>{
                setErrorMsg("");
            })
            .finally(()=>setLoading(false));
    }

    const errorProps = errorMsg == "" ? {} : {
        error: true,
        helperText: errorMsg
    }

    const contextProps = editMode ? {} : {}

    return (
        <TextField
            size="small"
            label={props.object.name}
            type="number"
            inputProps={{
                min: props.object.min,
                max: props.object.max,
            }}
            value={parseInt(value)}
            onChange={event=>setValue(event.target.value)}
            onBlur={event => onValueChange(event)}
            InputProps={{
                startAdornment: loading ? (<CircularProgress/>) : undefined
            }}
            fullWidth
            {...errorProps}
            disabled={!editMode}
        />
    );
}

export default NumberRenderer;