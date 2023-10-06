import { AccountCircle } from "@mui/icons-material";
import { Box, Container, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";


export default function Main() {

    return (
        <Container>
            <Box component="nav" sx={{widht: 240}}>
                <Drawer
                    variant="permanent"
                    open={true}
                >
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemButton>
                                    <AccountCircle />
                                </ListItemButton>
                                <ListItemText primary="Mon profil" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - 240px)`}}}>
                Bonjour
            </Box>
        </Container>
    )
}