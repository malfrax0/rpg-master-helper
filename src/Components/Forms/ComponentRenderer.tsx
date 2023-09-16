import React from 'react';
import { FormObjectParameters as FOP } from '../../Data/RPGInfo';
import {Typography} from "@mui/material";
import NumberRenderer from './NumberRenderer';
import TextRenderer from './TextRenderer';
import SliderRenderer from './SliderRenderer';
import ListBaseObjectRenderer from './ListBaseObjectRenderer';

interface ComponentRendererProps {
    object: FOP.ComponentObjectType,
    onValueChange: (key: string, newValue: any) => Promise<void>,
    value: any,
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({object, onValueChange, value} : ComponentRendererProps) => {
    const type = FOP.GetType(object);

    switch(type)
    {
        case FOP.Type.Number:
            return (<NumberRenderer object={object as FOP.Number} value={value} onChange={(value) => onValueChange((object as FOP.Base).key, value)} />);
        case FOP.Type.Text:
            return (<TextRenderer object={object as FOP.Text} value={value} onChange={(value) => onValueChange((object as FOP.Base).key, value)} />);
        case FOP.Type.Slider:
            return (<SliderRenderer object={object as FOP.Slider} value={value} onChange={(value) => onValueChange((object as FOP.Base).key, value)} />);
        case FOP.Type.ListBasedObject:
            return (<ListBaseObjectRenderer object={object as FOP.ListBasedObject} value={value} onChange={(value) => onValueChange((object as FOP.Base).key, value)} />)
    }

    return (<Typography variant="h3" component="h3">Not implemented</Typography>);
}

export default ComponentRenderer;