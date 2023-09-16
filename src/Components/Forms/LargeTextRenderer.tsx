import { CircularProgress, TextField } from "@mui/material";
import { FormObjectParameters } from "../../Data/RPGInfo";
import { FormBaseProps } from "./interfaces";
import React, {useContext, useEffect, useState} from "react";
import PlayerContext from "../PlayerInfo/PlayerContext";

export interface LargeTextRendererProps extends FormBaseProps {
    object: FormObjectParameters.LargeText
}

const LargeTextRenderer = (props: LargeTextRendererProps) => {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [value, setValue] = useState("");

    let inputInfo: {maxlength?: number} = {};
    const { editMode } = useContext(PlayerContext);
    
    inputInfo['maxlength'] = props.object.length
    
    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const onValueChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLoading(true);
        props.onChange(event.target.value)
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

    return (
        <TextField
            size="small"
            label={props.object.name}
            type="text"
            value={value}
            onChange={event=>setValue(event.target.value)}
            onBlur={event => onValueChange(event)}
            inputProps={inputInfo}
            InputProps={{
                startAdornment: loading ? (<CircularProgress/>) : undefined
            }}
            multiline
            minRows={2}
            rows={props.object.row ?? 2}
            {...errorProps}
            disabled={!editMode}
        />
    );
}

export default LargeTextRenderer;