import React, { useEffect, useState } from 'react';
import { FormObjectParameters as FOP } from '../../Data/RPGInfo';
import {Typography} from "@mui/material";
import NumberRenderer from './NumberRenderer';
import TextRenderer from './TextRenderer';
import SliderRenderer from './SliderRenderer';
import ListBaseObjectRenderer from './ListBaseObjectRenderer';
import { gql } from '../../__generated__';
import { useMutation } from '@apollo/client';

interface ComponentRendererProps {
    object: FOP.ComponentObjectType,
    value: any,
    characterSheetId: string,
    prevKey: string
}

const UPDATE_CHARACTER_SHEET = gql(`
    mutation UpdateValueOfCharacterSheet($characterSheetId: String!, $key: String!, $value: String!) {
        updateValueOfCharacterSheet(characterSheetId: $characterSheetId, key: $key, value: $value) {
            value
        }
    }
`);

const FormComponentRenderer: React.FC<ComponentRendererProps> = ({object, value: topValue, prevKey, characterSheetId} : ComponentRendererProps) => {
    const type = FOP.GetType(object);
    const [currentValue, setCurrentValue] = useState<any|null>(null);
    const [updateCharacterSheet, {loading}] = useMutation(UPDATE_CHARACTER_SHEET);

    useEffect(()  => {
        setCurrentValue(topValue);
    }, [topValue]);

    const onValueChange = async (key: string, value: any): Promise<void> => {
        if (typeof value === "number") {
            value = value.toString();
        }
        await updateCharacterSheet({
            variables: {
                characterSheetId: characterSheetId,
                key: `${prevKey}.${key}`,
                value: value
            }
        }).then(({data})=>{
            if (data && data.updateValueOfCharacterSheet && data.updateValueOfCharacterSheet.value) {
                setCurrentValue(data.updateValueOfCharacterSheet.value);
            }
        })
    }

    const realKey = `${prevKey}.${(object as FOP.Base).key}`;

    switch(type)
    {
        case FOP.Type.Number:
            return (<NumberRenderer realKey={realKey} object={object as FOP.Number} value={currentValue} onChange={(value, overrideKey) => onValueChange(overrideKey || (object as FOP.Base).key, value)} />);
        case FOP.Type.Text:
            return (<TextRenderer realKey={realKey} object={object as FOP.Text} value={currentValue} onChange={(value, overrideKey) => onValueChange(overrideKey || (object as FOP.Base).key, value)} />);
        case FOP.Type.Slider:
            return (<SliderRenderer realKey={realKey} object={object as FOP.Slider} value={currentValue} onChange={(value, overrideKey) => onValueChange(overrideKey || (object as FOP.Base).key, value)} />);
        case FOP.Type.ListBasedObject:
            return (<ListBaseObjectRenderer realKey={realKey} object={object as FOP.ListBasedObject} value={currentValue} onChange={(value, overrideKey) => onValueChange(overrideKey || (object as FOP.Base).key, value)} />)
    }

    return (<Typography variant="body1" component="body">Not implemented</Typography>);
}

export default FormComponentRenderer;