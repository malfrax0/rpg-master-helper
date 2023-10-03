import React, { useState } from 'react'
import {Grid} from '@mui/material'
import RPGInfo, { FormObjectParameters as FOP } from '../../Data/RPGInfo'
import ComponentCategory from './ComponentCategory'
import PlayerContext from './PlayerContext'

export interface PlayerContainerProps {
    info: RPGInfo
}

const PlayerContainer = (props: PlayerContainerProps) => {
    const [value, setValue] = useState({});
    const [editMode, setEditMode] = useState(true);

    const onCategoryChanged = (key: string) => (newValue: any) => {
        return new Promise<void>((resolve, reject) => {
            setValue({...value, ...newValue});
            resolve();
        });
    }

    return (
        <PlayerContext.Provider value={{editMode, inGame: true, rpgInfo: props.info, player: value}}>
            <Grid container spacing={2}>
                {
                    props.info.data.map((value: FOP.Category) => {
                        return (
                            <Grid item xs={12} md={value.row ?? 12}>
                                <ComponentCategory category={value} values={value} key={value.key} onValueChanged={onCategoryChanged(value.key)} />
                            </Grid>
                        );
                    })
                }
            </Grid>
        </PlayerContext.Provider>
    )
}

export default PlayerContainer;