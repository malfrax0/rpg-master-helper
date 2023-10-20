import React, { useContext } from 'react';
import {Grid, Box, Card, CardContent, CardHeader} from '@mui/material';
import { FormObjectParameters as FOP } from '../../Data/RPGInfo';
import FormComponentRenderer from '../Forms/FormComponentRenderer';
import PlayerContext from '../../Context/PlayerContext';

export interface ComponentCategoryProps {
    category: FOP.Category
    hideCard?: boolean
    prevKey?: string,
    includeObject?: any | undefined
}

const GetMatchingKeysForInfos = (infos: any, includeObjectList: any, key: string) => {
    const keys = Object.keys(infos).filter((keyInfo) => keyInfo.startsWith(key));
    let ret: any = includeObjectList;
    keys.forEach((key) => {
        const splittedKey = key.split(".")
        ret[splittedKey[splittedKey.length - 1]] = infos[key];
    });
    console.log(key, ret);
    return ret;
}

const ComponentCategory = (props: ComponentCategoryProps) => {
    const {inGame, infos, playerId, rpgInfo} = useContext(PlayerContext);

    const content = (<Grid container spacing={2}>
        {
            props.category.components.filter((objDef: FOP.Base) => !objDef.inGameOnly || inGame).map((objDef: FOP.Base) => {
                let value = objDef.default ?? "";

                const prevKey = props.prevKey ? (`${props.prevKey}.${props.category.key}`) : props.category.key;
                if (!objDef.definedByDefault && `${prevKey}.${objDef.key}` in infos) {
                    value = infos[`${prevKey}.${objDef.key}`];
                }
                else if (typeof value === "object" && "expression" in value && "dynamic" in value) {
                    const objectsData = props.includeObject ? GetMatchingKeysForInfos(infos, props.includeObject, prevKey) : infos;
                    if (props.includeObject) {
                        console.log(prevKey, objectsData);
                    }
                    value = FOP.ComputeExpression(value, infos, objectsData)
                }
                else if ("min" in objDef && !(objDef.default)) {
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
            <CardHeader title={props.category.name} />
            <CardContent>
                {content}
            </CardContent>
        </Card>
    )
}

export default ComponentCategory;