import React, { useEffect, useState } from 'react'
import {Grid} from '@mui/material'
import RPGInfo, { FormObjectParameters as FOP } from '../../Data/RPGInfo'
import ComponentCategory from './ComponentCategory'
import PlayerContext from '../../Context/PlayerContext'
import { gql } from '../../__generated__'
import { useQuery, useSubscription } from '@apollo/client'
import PageLoader from '../Utils/PageLoader'
import PageError, { PageErrorSeverity } from '../Utils/PageError'

export interface PlayerContainerProps {
    characterSheetId: string,
    editMode: boolean,
    inGame: boolean
}

const GET_CHARACTER_SHEET = gql(`
    query GetCharacterSheet($characterSheetId: String!) {
        characterSheet(characterSheetId: $characterSheetId) {
            game {
                rpgInfo {
                    template
                }
            }
            characterStats {
                key
                value
            }
            user {
                id
                name 
            }
        }
    }
`);

const STAT_CHANGED = gql(`
    subscription StatChanged($characterSheetId: String!) {
        statChanged(characterSheetId: $characterSheetId) {
            key,
            value
        }
    }
`)

const PlayerContainer = (props: PlayerContainerProps) => {

    const {loading: loadingGet, data, error} = useQuery(GET_CHARACTER_SHEET, { variables: {characterSheetId: props.characterSheetId}, fetchPolicy: "network-only"});
    const {loading: loadingSub} = useSubscription(STAT_CHANGED, {
        onData: (options) => {
            let values = {...infos};
            values[options.data.data?.statChanged.key as string] = options.data.data?.statChanged.value;
            console.log(values);
            setInfos(values);
        }
    });

    const loading = loadingGet || loadingSub;

    const [infos, setInfos] = useState<any>({});

    useEffect(() => {
        let values: {[k: string]: any} = {};
        if  (data && data.characterSheet && data.characterSheet.characterStats) {
            data.characterSheet.characterStats.forEach((stat)=>{
                values[stat.key] = stat.value;
            });
        }
        setInfos(infos);
    }, [data]);

    const rpgInfo = data?.characterSheet.game?.rpgInfo?.template ? (JSON.parse(data?.characterSheet.game?.rpgInfo?.template)) : {};

    if (loading) {
        return (<PageLoader />);
    }

    if (error) {
        return (<PageError severity={PageErrorSeverity.ERROR} error={error ? error.message : ""} />)
    }

    return (
        <PlayerContext.Provider value={{inGame: props.inGame, editMode: props.editMode, rpgInfo: rpgInfo, infos: infos, playerId: props.characterSheetId}}>
            <Grid container spacing={2}>
                {
                    rpgInfo.data.map((category: FOP.Category) => {
                        return (
                            <Grid item xs={12} md={category.row ?? 12}>
                                <ComponentCategory category={category} key={category.key} />
                            </Grid>
                        );
                    })
                }
            </Grid>
        </PlayerContext.Provider>
    )
}

export default PlayerContainer;