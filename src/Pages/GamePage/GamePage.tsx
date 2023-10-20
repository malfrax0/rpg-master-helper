import { gql } from "../../__generated__";
import { useQuery } from "@apollo/client";
import { Card, CardActions, CardHeader, Grid, IconButton, Paper, Typography } from "@mui/material";
import PageLoader from "../../Components/Utils/PageLoader";
import { Edit, PlayCircle } from "@mui/icons-material";
import GamePagePlayers from "./GamePagePlayers";
import GamePageEventFeed from "./GamePageEventFeed";
import { useContext } from "react";
import UserContext from "../../Context/UserContext";
import { sxHidden } from "../../Components/Utils/Utils";

const GET_GAME = gql(`
    query GetGame($id: String!) {
        game(gameId: $id) {
            id,
            adminId,
            admin {
                name
            },
            characters {
                user {
                    id,
                    name
                },
                id
            },
            description,
            name,
            rpgInfo {
                name,
                description,
                template
            }
        }
    }
`)

export type GamePageProps = {
    id: string
}

export default function GamePage(props: GamePageProps) {
    const { loading, data, error, refetch } = useQuery(GET_GAME, { variables: { id: props.id } });
    const userInfo = useContext(UserContext);

    if (loading) {
        return (<PageLoader />);
    }

    const isAdmin = data?.game.adminId === userInfo.id;

    return (
        <Grid container spacing={2} alignItems="stretch">
            <Grid item md={10} xs={12}>
                <Paper className="p-2 h-full">
                    <Typography variant="h3">{data?.game.name}</Typography>
                    <Typography variant="caption">&nbsp;By <b>@{data?.game.admin?.name}</b></Typography>
                </Paper>
            </Grid>
            <Grid item md={2} xs={12}>
                <Paper className="p-2 h-full">
                    <Grid container>
                        <Grid item>
                            Last stats
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={8}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <GamePageEventFeed gameId={props.id} isAdmin={isAdmin} />
                    </Grid>
                    <Grid item xs={12}>
                        History
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{...sxHidden(!isAdmin)}}>
                        <Card>
                            <CardHeader title="Actions" />
                            <CardActions>
                                <IconButton><Edit /></IconButton>
                                <IconButton><PlayCircle /></IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <GamePagePlayers
                            gameId={props.id}
                            characters={(!data || !data.game || !data.game.characters) ? null : data.game.characters}
                            onInvite={(id: string) => refetch()}
                            canInvite={true}
                            isAdmin={isAdmin}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}