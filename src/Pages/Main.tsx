import { AccountCircle, AddCircle, Casino, Close, SentimentSatisfied, SentimentVerySatisfied, SpaceDashboard } from "@mui/icons-material";
import { AppBar, Box, Container, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tab, Tabs } from "@mui/material";
import { gql } from "../__generated__";
import { useLazyQuery, useQuery } from "@apollo/client";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import MutationGame from "./MutationGame";
import CthulhuRPGInfo from "../Data/Temp/CthulhuRPGInfo";
import GamePage from "./GamePage/GamePage";
import TabsManager, { TabsManagerRef } from "./TabsManager";

const GET_MY_GAMES = gql(/* GraphQL */`
    query GetMyGames {
        myGames {
            id,
            name,
            description,
            adminId
        }
    }
`);

export default function Main() {
    const {loading: gamesLoading, data: gamesData, error: gamesError, refetch: refetchMyGames} = useQuery(GET_MY_GAMES);

    const [onGameEdition, setOnGameEdition] = useState<string | null>(null);

    const borderWidth = 240;
    const loading = gamesLoading;

    const tabRef = useRef<TabsManagerRef|null>(null);

    const handleGameEdition = (id: string, editMode: boolean = false) => {
        refetchMyGames();
        setOnGameEdition(null);
    }

    const handleOpenGame = ({id, name}: {id: string, name: string}) => () => {
        if (tabRef && tabRef.current) {
            tabRef.current.openTab({
                id: id,
                type: "game",
                name: name,
                node: (<GamePage id={id} />)
            })
        }
    }

    return (
        <Box sx={{ display: "flex" }}>
            <Box component="nav" sx={{width: { xs: borderWidth }, flexShrink: { xs: 0}}}>
                <Drawer
                    variant="permanent"
                    open={true}
                    sx={{ display: { xs: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: borderWidth}}}
                >
                    <div>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AccountCircle />
                                    </ListItemIcon>
                                    <ListItemText primary="My account" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <SentimentVerySatisfied />
                                    </ListItemIcon>
                                    <ListItemText primary="Friends" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                        <Divider/>
                        <List>
                            {
                                loading ? 
                                <b>...</b> :
                                (
                                    gamesData?.myGames?.length == 0 ?
                                    (<ListItem disablePadding alignItems="center">
                                        <ListItemButton>
                                            <ListItemText sx={{textAlign: "center"}}>No game created yet!</ListItemText>
                                        </ListItemButton>
                                    </ListItem>) :
                                    (
                                        gamesData?.myGames?.map((game) => {
                                            return (
                                            <ListItem key={game.id} disablePadding>
                                                <ListItemButton onClick={handleOpenGame(game)}>
                                                    <ListItemIcon>
                                                        <Casino />
                                                    </ListItemIcon>
                                                    <ListItemText primary={game.name} />
                                                </ListItemButton>
                                            </ListItem>
                                            )
                                        })
                                    )
                                )
                            }
                            <ListItem disablePadding>
                                <ListItemButton onClick={()=>{setOnGameEdition("")}}>
                                    <ListItemIcon>
                                        <AddCircle />
                                    </ListItemIcon>
                                    <ListItemText primary="New game" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <SpaceDashboard />
                                    </ListItemIcon>
                                    <ListItemText primary="Templates" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            </Box>
            <TabsManager borderWidth={borderWidth} ref={tabRef} />
            <MutationGame onCancel={()=>{setOnGameEdition(null)}} onEditGame={(id: string)=>{handleGameEdition(id, true)}} onNewGame={handleGameEdition} open={onGameEdition !== null} editId={onGameEdition === "" ? null : onGameEdition} />
        </Box>
    )
}