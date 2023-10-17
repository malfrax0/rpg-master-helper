import { More, MoreHoriz, Search } from "@mui/icons-material";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, FormControl, IconButton, Input, InputLabel, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { gql } from "../../__generated__";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import GamePagePlayerItem from "./GamePagePlayerItem";
import ModalStyleCard from "../../Components/Utils/ModalStyle";

const FIND_PLAYER_NOT_IN_GAME = gql(`
    query FindPlayerNotInGame($page: Pagination!, $filter: UserFilter) {
        users(page: $page, filter: $filter) {
            id,
            name
        }
    }
`);

const INVITE_PLAYER = gql(`
    mutation InvitePlayer($playerId: String!, $gameId: String!) {
        inviteUserToGame(gameId: $gameId, userId: $playerId) {
            id
        }
    }
`)

export type GamePagePlayersProps = {
    gameId: string,
    characters: {user?: {name: string|undefined}|undefined|null, id: string|undefined}[] | undefined | null,
    onInvite: (id: string) => void,
    canInvite?: boolean
}

export default function GamePagePlayers(props: GamePagePlayersProps) {
    const {loading: playerLoading, data: playerData, error: playerError, refetch: getPlayers} = useQuery(FIND_PLAYER_NOT_IN_GAME, {variables: {page: {first: 5}, filter: {ignoreInGames: [props.gameId]}}});
    const [invitePlayer, {loading: inviteLoading}] = useMutation(INVITE_PLAYER)
    const [invite, setInvite] = useState(false);
    const [search, setSearch] = useState("");

    const loading = playerLoading || inviteLoading

    const handleSearch = () => {
        if (playerLoading) return;
        getPlayers(
            {
                page: {
                    after: 0,
                    first: 5
                },
                filter: {
                    ignoreInGames: [props.gameId],
                    name: search
                }
            }
        );
    }

    useEffect(() => {
        if (invite) {
            handleSearch();
        }
    }, [invite])

    const handleInvite = (id: string) => () => {
        invitePlayer({
            variables: {
                playerId: id,
                gameId: props.gameId
            }
        }).then(()=>{
            props.onInvite(id);
            setInvite(false);
            setSearch("");
        })
    }

    return (
        <>
            <Card>
                <CardHeader title="Players" />
                <CardContent>
                    <List sx={{width: "100%"}}>
                        {
                            (props.characters && props.characters.length > 0) ?
                            props.characters.map((character) => {
                                return (
                                    <GamePagePlayerItem gameId={props.gameId} onDelete={(id: string)=>props.onInvite(id)} key={character.id} character={character} />
                                )
                            }) : 
                            (<Typography>No players on your game.</Typography>)
                        }
                    </List>
                </CardContent>
                <CardActions>
                    <Button onClick={()=>setInvite(true)}>
                        Invite a player!
                    </Button>
                </CardActions>
            </Card>
            <Modal
                open={invite}
                onClose={()=>setInvite(false)}
            >
                <Card sx={ModalStyleCard}>
                    <CardHeader title="Invite a player" />
                    <CardContent>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Search</InputLabel>
                            <Input
                                value={search}
                                onChange={(e)=>setSearch(e.target.value)}
                                disabled={loading}
                                endAdornment={
                                    <IconButton onClick={handleSearch} disabled={loading}>
                                        <Search />
                                    </IconButton>
                                }
                            />
                        </FormControl>
                        <List>
                            {
                                (playerData && playerData.users) ?
                                (
                                    playerData.users.map((user)=>{
                                        return (
                                            <ListItemButton key={user.id} disabled={loading} onClick={handleInvite(user.id)}>
                                                <ListItemText>{user.name}</ListItemText>
                                            </ListItemButton>
                                        )
                                    })
                                ) :
                                (
                                    <ListItem>
                                        <ListItemText>Search your friend</ListItemText>
                                    </ListItem>
                                )
                            }
                        </List>
                    </CardContent>
                    <CardActions>
                        <Button disabled={inviteLoading} onClick={()=>setInvite(false)}>Cancel</Button>
                    </CardActions>
                </Card>
            </Modal>
        </>
    );
}