import { Close } from "@mui/icons-material";
import { Box, AppBar, Tabs, Tab } from "@mui/material";
import React from "react";
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from "react";

export type TabsManagerProps = {
    borderWidth: number,
}

export type TabsManagerRef = {
    openTab: (info: TabInfo) => number,
    closeTab: (index: number) => void,
}

export type TabInfo = {
    node: React.ReactNode,
    id?: string,
    type: "gameList"|"game"|"template"|"characterSheet",
    name: string
}

export const TabsManagerContext = React.createContext<Partial<TabsManagerRef>>({
    
});

function TabsManager(props: TabsManagerProps, ref: ForwardedRef<TabsManagerRef>) {
    const [currentTab, setCurrentTab] = useState(0);
    const [currentTabContent, setCurrentTabContent] = useState<TabInfo[]>([]);

    const openTab = (info: TabInfo) => {
        let tabIndex = currentTabContent.findIndex((searchInfo) => (
            searchInfo.type === info.type &&
            searchInfo.id === info.id
        ));
        if (tabIndex !== -1) {
            setCurrentTab(tabIndex);
            return tabIndex;
        }
        tabIndex = currentTabContent.length;
        setCurrentTabContent(
            [... currentTabContent, info]
        );
        return tabIndex;
    }
    
    const closeTab = (index: number) => {
        if (index < 0 || index >= currentTabContent.length) return;
        
        let contentsCopy = [...currentTabContent];
        contentsCopy.splice(index, 1);
        setCurrentTabContent(contentsCopy);
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

    useImperativeHandle(ref, () => ({
        openTab,
        closeTab
    }));

    return (
        <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${props.borderWidth}px)`}}}>
            <AppBar position="static">
                <Tabs
                    value={Math.max(0, Math.min(currentTab, currentTabContent.length - 1))}
                    onChange={handleClickTab}
                    variant="scrollable"
                    sx={{minHeight: "72px"}}
                >
                    {
                        currentTabContent.map((value, idx) => {
                            return (<Tab iconPosition="end" wrapped icon={<Close onClick={bindedHandleExitTab(idx)} />} key={`${value.type}-${value.name}-${value.id ?? 'main'}`} label={value.name}/>);
                        })
                    }
                </Tabs>
            </AppBar>
            <div className="p-4">
                <TabsManagerContext.Provider value={{openTab, closeTab}}>
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
                </TabsManagerContext.Provider>
            </div>
        </Box>
    )
}

export default forwardRef(TabsManager);