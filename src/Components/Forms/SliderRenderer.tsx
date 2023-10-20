import { CircularProgress } from "@mui/material";
import Slider from "@mui/material/Slider"
import { FormObjectParameters } from "../../Data/RPGInfo";
import { FormBaseProps } from "./interfaces";
import React, {useContext, useEffect, useState} from "react";
import PlayerContext from "../../Context/PlayerContext";

export interface TextRendererProps extends FormBaseProps {
    object: FormObjectParameters.Slider
}

const SliderRenderer = (props: TextRendererProps) => {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [value, setValue] = useState("");

    let inputInfo: {maxlength?: number} = {};
    const { editMode: editModeContext } = useContext(PlayerContext);

    let editMode = editModeContext;
    if (props.object.definedByList) {
        editMode = false;
    }
    
    // inputInfo['maxlength'] = props.object.length
    
    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const onValueChange = async (newValue: number | number[]) => {
        setLoading(true);
        props.onChange(newValue)
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

    const min = props.object.min ?? 0;
    const max = props.object.max ?? 100;

    let marks = Array.from({
        length: ((max as number) - (min as number) + 1) / (props.object.step ?? 1)
    }, (_, index: number)=>{
        const ret: {value: number, label: string|undefined} = {
            value: index,
            label: undefined
        }
        return ret;
    });
    
    marks[0].label = marks[0].value.toString();
    marks[marks.length - 1].label = marks[marks.length - 1].value.toString();

    return (
        <Slider
            min={min as number}
            max={max as number}
            valueLabelDisplay="on"
            marks={marks}
            step={props.object.step ?? 1}
            value={parseInt(value)}
            onChange={(_: any, newValue: number|number[])=>setValue(newValue.toString())}
            onBlur={(event: React.ChangeEvent<HTMLSpanElement>) => {onValueChange(parseInt(value))}}
            style={{
                marginTop: 24
            }}
        />
    );
}

export default SliderRenderer;