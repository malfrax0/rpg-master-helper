import { Divider, Grid } from "@mui/material";
import Slider from "@mui/material/Slider"
import { FormObjectParameters as FOP } from "../../Data/RPGInfo";
import { FormBaseProps } from "./interfaces";
import React, {useContext, useEffect, useState} from "react";
import PlayerContext from "../PlayerInfo/PlayerContext";
import ComponentCategory from "../PlayerInfo/ComponentCategory";
import { grey } from "@mui/material/colors";

export interface ListBaseObjectRendererProps extends FormBaseProps {
    object: FOP.ListBasedObject
}

const ListBaseObjectRenderer = (props: ListBaseObjectRendererProps) => {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [value, setValue] = useState<any[]>([]);

    let inputInfo: {maxlength?: number} = {};
    const {editMode, rpgInfo, infos} = useContext(PlayerContext);

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
    let currentIndex = 0;

    const category = (typeof props.object.object === "string") ? rpgInfo.type?.find((value) => value.key === props.object.object) : props.object.object;
    if (category === undefined) {
        throw "Category of key " + (props.object.object as string) + " is not defined";
    }
    
    return (
        <Grid container spacing={2}>
            {
                Array.from({length: size + (size - 1)}).map((_, index)=>{
                    if (index % 2 == 1) {
                        return (
                            <Grid item md="auto" sx={{ display: { xs: 'none', md: 'block' } }}>
                                <Divider orientation="vertical" />
                            </Grid>
                        );
                    }
                    
                    const idx = index / 2;
                    const maxLength = ((props.object.list.length % size > idx) ? 1 : 0) + Math.round(props.object.list.length / size);

                    const column = (
                        <Grid item xs={12} md key={idx}>
                            <Grid container spacing={2}>
                                {
                                    props.object.list.slice(lastIndex, lastIndex + maxLength - 1).map((item: any, idx: number) => {
                                        let persoCategory = {...category};
                                        persoCategory.key = currentIndex.toString();
                                        
                                        persoCategory.components = persoCategory.components.map((comp) => {
                                            if (!(comp.key in item)) return comp;
                                            let newComp = {...comp};
                                            newComp.default = item[comp.key];

                                            return newComp;
                                        });

                                        const CategoryItem = (
                                            <Grid item xs={12} key={`${props.realKey}.${persoCategory.key}`}>
                                                <ComponentCategory hideCard={true} category={persoCategory} prevKey={props.realKey} />
                                            </Grid>
                                        )
                                        currentIndex++;
                                        return CategoryItem;
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