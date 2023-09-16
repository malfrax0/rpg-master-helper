import React, { useContext } from 'react';
import {Grid, Box, Card, CardContent, CardHeader} from '@mui/material';
import { FormObjectParameters as FOP } from '../../Data/RPGInfo';
import ComponentRenderer from '../Forms/ComponentRenderer';
import PlayerContext from './PlayerContext';

export interface ComponentCategoryProps {
    category: FOP.Category
    values: any
    onValueChanged: (newValue: any) => Promise<void>
    hideCard?: boolean
}

const ComponentCategory = (props: ComponentCategoryProps) => {


    const {inGame, player} = useContext(PlayerContext);

    const onComponentChanged = (key: string, newValue: string) => {
        let newData = props.values;
        newData[key] = newValue;
        return props.onValueChanged(newData);
    }

    const content = (<Grid container spacing={2}>
        {
            props.category.components.filter((objDef: FOP.Base) => !objDef.inGameOnly || inGame).map((objDef: FOP.Base) => {
                let value = objDef.default ?? "";
                if (objDef.key in props.values) {
                    value = props.values[objDef.key];
                }
                else if (typeof value === "object" && "expression" in value && "dynamic" in value)
                {
                    value = FOP.ComputeExpression(value, player, props.values)
                }
                else if ("min" in objDef)
                {
                    value = objDef.min;
                }

                return (
                    <Grid item xs={12} md={12 / FOP.GetGridSizeFromContainer(props.category.container, props.category.components.length)}>
                        <ComponentRenderer object={objDef} key={objDef.key} value={value} onValueChange={onComponentChanged} />
                    </Grid>
                );
            })
        }
    </Grid>)

    if (props.hideCard) return content;

    return (
        <Card style={{height: "100%"}}>
            <CardHeader title={props.category.name}/>
            <CardContent>
                {content}
            </CardContent>
        </Card>
    )
}

export default ComponentCategory;