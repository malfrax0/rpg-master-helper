import { AccountCircle, AddCircle, Casino, Close, SentimentSatisfied, SentimentVerySatisfied, SpaceDashboard } from "@mui/icons-material";
import { AppBar, Box, Container, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tab, Tabs } from "@mui/material";
import { gql } from "../__generated__";
import { useLazyQuery, useQuery } from "@apollo/client";
import React, { MouseEvent, useEffect, useState } from "react";
import MutationGame from "./MutationGame";
import CthulhuRPGInfo from "../Data/Temp/CthulhuRPGInfo";
import GamePage from "./GamePage/GamePage";

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

type TabInfo = {
    node: React.ReactNode,
    id?: string,
    type: "gameList"|"game"|"template",
    name: string
}

export default function Main() {
    const {loading: gamesLoading, data: gamesData, error: gamesError, refetch: refetchMyGames} = useQuery(GET_MY_GAMES);
    const [currentTab, setCurrentTab] = useState(0);
    const [currentTabContent, setCurrentTabContent] = useState<TabInfo[]>([]);

    const [onGameEdition, setOnGameEdition] = useState<string | null>(null);

    const borderWidth = 240;
    const loading = gamesLoading;

    const handleGameEdition = (id: string, editMode: boolean = false) => {
        refetchMyGames();
        setOnGameEdition(null);
    }

    const handleOpenGame = ({id, name}: {id: string, name: string}) => () => {
        const gameIndex = currentTabContent.findIndex((value)=>value.type === "game" && value.id === id);
        if (gameIndex !== -1) {
            setCurrentTab(gameIndex);
            return;
        }
        setCurrentTabContent([...currentTabContent, {
            node: (<GamePage id={id} />),
            id: id,
            type: "game",
            name: name
        }]);
    }

    const handleExitTab = (ind: number) => {
        let newTabs = [...currentTabContent];
        newTabs.splice(ind, 1);
        setCurrentTabContent(newTabs);
    }

    const bindedHandleExitTab = (ind: number) => () => handleExitTab(ind);

    const handleClickTab = (e: React.SyntheticEvent<Element, Event>, newValue: number) => {
        if ((e.target as any).nodeName.toLowerCase() !== "button") {
            if (currentTab >= newValue) {
                setCurrentTab(Math.max(0, currentTab - 1));
            }
        }
        else {
            setCurrentTab(newValue);
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
            <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${borderWidth}px)`}}}>
                <AppBar position="static">
                    <Tabs
                        value={Math.max(0, Math.min(currentTab, currentTabContent.length - 1))}
                        onChange={handleClickTab}
                        variant="scrollable"
                        sx={{minHeight: "72px"}}
                    >
                        {
                            currentTabContent.map((value, idx) => {
                                console.log("Generate tab");
                                return (<Tab iconPosition="end" wrapped icon={<Close onClick={bindedHandleExitTab(idx)} />} key={`${value.type}-${value.name}-${value.id ?? 'main'}`} label={value.name}/>);
                            })
                        }
                    </Tabs>
                </AppBar>
                <div className="p-4">
                    {
                        currentTabContent.map((tabInfo, ind) => {
                            const disabled = ind == currentTab ? "" : "hidden";
                            return (
                                <div className={`${disabled} w-full`} key={`${tabInfo.type}-${tabInfo.name}-${tabInfo.id ?? 'main'}`}>
                                    { tabInfo.node }
                                </div>
                            )
                        })
                    }
                </div>
            </Box>
            <MutationGame onCancel={()=>{setOnGameEdition(null)}} onEditGame={(id: string)=>{handleGameEdition(id, true)}} onNewGame={handleGameEdition} open={onGameEdition !== null} editId={onGameEdition === "" ? null : onGameEdition} />
        </Box>
    )
}