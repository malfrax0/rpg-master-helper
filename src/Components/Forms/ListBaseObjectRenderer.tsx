import { Grid } from "@mui/material";
import Slider from "@mui/material/Slider"
import { FormObjectParameters as FOP } from "../../Data/RPGInfo";
import { FormBaseProps } from "./interfaces";
import React, {useContext, useEffect, useState} from "react";
import PlayerContext from "../PlayerInfo/PlayerContext";
import ComponentCategory from "../PlayerInfo/ComponentCategory";

export interface ListBaseObjectRendererProps extends FormBaseProps {
    object: FOP.ListBasedObject
}

const ListBaseObjectRenderer = (props: ListBaseObjectRendererProps) => {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [value, setValue] = useState<any[]>([]);

    let inputInfo: {maxlength?: number} = {};
    const {editMode, rpgInfo} = useContext(PlayerContext);
    
    useEffect(() => {
        try
        {
            setValue(JSON.parse(props.value).data);
        }
        catch (_)
        {
            setValue(props.object.list);
        }
    }, [props.value]);

    const onValueChange = (idx: number) => async (newValue: any) => {
        setLoading(true);
        let currentValue = value;
        currentValue[idx] = newValue;
        props.onChange(JSON.stringify(currentValue).toString())
            .catch((reason: any)=>{
                setErrorMsg(reason as string);
            })
            .then(()=>{
                setErrorMsg("");
            })
            .finally(()=>setLoading(false));
    }

    const size = 12 / FOP.GetGridSizeFromContainer(props.object.container);

    const errorProps = errorMsg == "" ? {} : {
        error: true,
        helperText: errorMsg
    }

    let lastIndex = 0;

    return (
        <Grid container spacing={2}>
            {
                Array.from({length: size}).map((_, idx)=>{
                    const maxLength = ((props.object.list.length % size > idx) ? 1 : 0) + Math.round(props.object.list.length / size);

                    const column = (
                        <Grid item xs={12} md={FOP.GetGridSizeFromContainer(props.object.container)}>
                            <Grid container spacing={2}>
                                {
                                    props.object.list.slice(lastIndex, lastIndex + maxLength - 1).map((item: any, idx: number) => {
                                        const category = (typeof props.object.object === "string") ? rpgInfo.type?.find((value) => value.key === props.object.object) : props.object.object;
                                        if (category === undefined) {
                                            throw "Category of key " + (props.object.object as string) + " is not defined";
                                        }
                    
                                        return (
                                            <Grid item xs={12}>
                                                {/** @ts-ignore */}
                                                <ComponentCategory hideCard={true} category={category} values={item} onValueChanged={onValueChange(lastIndex + idx)} />
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                        </Grid>
                    )

                    lastIndex = lastIndex + maxLength - 1;
                    
                    return column;
                })
            }
        </Grid>
    );
}

export default ListBaseObjectRenderer;