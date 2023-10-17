import { ContactPage, Delete, MoreHoriz } from "@mui/icons-material";
import { ListItem, IconButton, ListItemAvatar, Avatar, ListItemText, Menu, MenuList, MenuItem, ListItemIcon } from "@mui/material";
import { useContext, useState } from "react";
import { gql } from "../../__generated__";
import { useMutation } from "@apollo/client";
import { TabsManagerContext } from "../TabsManager";
import PlayerContainer from "../../Components/PlayerInfo/PlayerContainer";

const REMOVE_PLAYER_FROM_GAME = gql(`
    mutation RemovePlayerFromGame($gameId: String!, $userId: String!) {
        removeUserFromGame(gameId: $gameId, userId: $userId)
    }
`)

export type GamePagePlayerItemProps = {
    gameId: string,
    character: {
        id?: string,
        user?: {
            id?: string|null
            name?: string|null
        }|null
    },
    onDelete: (id: string) => void
};

export default function GamePagePlayerItem(props: GamePagePlayerItemProps) {
    const [mutationRemovePlayer] = useMutation(REMOVE_PLAYER_FROM_GAME);
    const [menuEl, setMenuEl] = useState<null|HTMLElement>(null);

    const TabsContext = useContext(TabsManagerContext);

    const handleDelete = () => {
        mutationRemovePlayer({variables: {gameId: props.gameId, userId: props.character.user?.id as string}})
            .then(()=>{
                props.onDelete(props.character.id as string);
                setMenuEl(null);
            });
    }

    const handleShowCharacterSheet = () => {
        if (TabsContext.openTab) {
            TabsContext.openTab({
                id: props.character.id,
                type: "characterSheet",
                name: props.character?.user?.name as string,
                node: (<PlayerContainer inGame={false} editMode={true} characterSheetId={props.character.id as string} />)
            })
        }
        setMenuEl(null);
    }

    return (
        <ListItem secondaryAction={
            <IconButton edge="end" onClick={(e)=>setMenuEl(e.currentTarget)}>
                <MoreHoriz />
            </IconButton>
        }>
            <ListItemAvatar>
                <Avatar>R</Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.character.user?.name} />
            <Menu
                open={menuEl !== null}
                onClose={()=>setMenuEl(null)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                anchorEl={menuEl}
            >
                <MenuItem divider onClick={handleShowCharacterSheet}>
                    <ListItemIcon>
                        <ContactPage/>
                    </ListItemIcon>
                    <ListItemText>Show character sheet</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    <ListItemIcon>
                        <Delete color="error"/>
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{color: "error"}}>Remove from game</ListItemText>
                </MenuItem>
            </Menu>
        </ListItem>
    )
}