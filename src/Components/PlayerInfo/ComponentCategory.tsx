import React, { useContext } from 'react';
import {Grid, Box, Card, CardContent, CardHeader} from '@mui/material';
import { FormObjectParameters as FOP } from '../../Data/RPGInfo';
import FormComponentRenderer from '../Forms/FormComponentRenderer';
import PlayerContext from './PlayerContext';

export interface ComponentCategoryProps {
    category: FOP.Category
    hideCard?: boolean
    prevKey?: string    
}

const ComponentCategory = (props: ComponentCategoryProps) => {
    const {inGame, infos, playerId} = useContext(PlayerContext);

    const content = (<Grid container spacing={2}>
        {
            props.category.components.filter((objDef: FOP.Base) => !objDef.inGameOnly || inGame).map((objDef: FOP.Base) => {
                let value = objDef.default ?? "";

                const prevKey = props.prevKey ? (`${props.prevKey}.${props.category.key}`) : props.category.key;
                
                if (`${prevKey}.${objDef.key}` in infos) {
                    value = infos[`${prevKey}.${objDef.key}`];
                }
                else if (typeof value === "object" && "expression" in value && "dynamic" in value)
                {
                    value = FOP.ComputeExpression(value, infos, infos)
                }
                else if ("min" in objDef && !(objDef.default))
                {
                    value = objDef.min;
                }
                
                return (
                    <Grid item xs={12} md={12 / FOP.GetGridSizeFromContainer(props.category.container, props.category.components.length)} key={`${prevKey}.${objDef.key}`}>
                        <FormComponentRenderer object={objDef} key={objDef.key} value={value} prevKey={prevKey} characterSheetId={playerId} />
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