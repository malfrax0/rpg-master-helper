import React from 'react';
import { FormObjectParameters as FOP } from '../../Data/RPGInfo';

interface ComponentRendererProps {
    object: FOP.ComponentObjectType,
    onValueChange: (key: string, newValue: any) => void;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({object, onValueChange} : ComponentRendererProps) => {
    const type = FOP.GetType(object as FOP.Base);

    return (
        <>
        {/** switch component here */}
        </>
    )
}

export default ComponentRenderer;