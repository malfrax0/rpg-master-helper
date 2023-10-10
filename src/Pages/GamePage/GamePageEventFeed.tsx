import { Card, CardHeader, Avatar, CardContent, Typography, CardActions, Button } from "@mui/material";
import FeedList from "../../Components/Data/FeedList"
import { gql } from "../../__generated__"
import { AddCircle, Cancel, Close, MoreHoriz, TaskAlt } from "@mui/icons-material";
import dayjs from "dayjs";

const GET_EVENTS = gql(`
    query GetEvents($page: Pagination!, $gameId: String!) {
        events(page: $page, gameId: $gameId) {
            id,
            title,
            content,
            startAt,
            duration,
            participations {
                response,
                user {
                    id,
                    name
                }
            }
        }
    }
`);

export default function GamePageEventFeed() {

    return (
        <FeedList
            title="Event"
            query={GET_EVENTS}
            render={(data): JSX.Element[] | undefined => {
                return data?.events?.map((event) => {
                    const startAt = dayjs(event.startAt, "YYYY-MM-DDTHH:mm:ssZ");
                    const endAt = startAt.add(event.duration || 0, "m");

                    return (
                        <Card sx={{width: "100%", marginTop: 0}}>
                            <CardHeader avatar={<Avatar>R</Avatar>} title={event.title} subheader={`From ${startAt.format("HH:mm")} To ${endAt.format("HH:mm")} the ${startAt.format("MMMM DD, YYYY")}`} />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {event.content}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button startIcon={<AddCircle/>}>I will be here!</Button>
                                <Button startIcon={<MoreHoriz/>}>Maybe...</Button>
                                <Button startIcon={<Cancel/>}>I can't be here...</Button>
                            </CardActions>
                        </Card>
                    )
                });
            }}
            actions={[
                
            ]}
        />
    )
}