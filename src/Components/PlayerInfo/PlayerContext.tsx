import React from 'react';
import RPGInfo from '../../Data/RPGInfo';

export interface PlayerContextType {
    editMode: boolean,
    inGame: boolean,
    rpgInfo: RPGInfo,
    playerId: string,
    infos: any
}

const PlayerContext = React.createContext<PlayerContextType>({
    editMode: false,
    inGame: false,
    rpgInfo: {
        name: "context",
        key: "__CONTEXT__",
        shortDescription: "Do not use this object has real rpgInfo",
        longDescription: "",

        data: []
    },
    playerId: "",
    infos: {}
});

export default PlayerContext;