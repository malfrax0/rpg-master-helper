import { Card, CardHeader, Avatar, CardContent, Typography, CardActions, Button, Modal, TextField, Grid, InputLabel } from "@mui/material";
import FeedList, {FeedListRef} from "../../Components/Data/FeedList"
import { gql } from "../../__generated__"
import { AddCircle, Cancel, MoreHoriz } from "@mui/icons-material";
import dayjs, {Dayjs} from "dayjs";
import { useState, useRef, useContext } from "react";
import ModalStyleCard from "../../Components/Utils/ModalStyle";
import { DateCalendar, TimePicker } from "@mui/x-date-pickers";
import { useMutation } from "@apollo/client";
import UserContext from "../../Context/UserContext";
import { GameEventResponse } from "../../__generated__/graphql";

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

const CREATE_EVENT = gql(`
    mutation CreateEvent($event: GameEventInput!) {
        createEvent(event: $event) {
            id
        }
    }
`);

const PARTICIPATE_TO_EVENT = gql(`
    mutation ParticipateToEvent($gameEventId: String!, $response: GameEventResponse!) {
        participateToEvent(gameEventId: $gameEventId, response: $response) {
            id
        }
    }
`)

export type GamePageEventFeedProps = {
    gameId: string,
    isAdmin: boolean
}

export default function GamePageEventFeed(props: GamePageEventFeedProps) {
    const [createEvent] = useMutation(CREATE_EVENT);
    const [participateToEvent] = useMutation(PARTICIPATE_TO_EVENT);

    const [add, setAdd] = useState(false);
    const feedListRef = useRef<FeedListRef>();

    const [formData, setFormData] = useState({title: "", content: "", startAt: dayjs(), from: dayjs(), to: dayjs().add(4, 'h')});

    const userInfo = useContext(UserContext);

    const handleFormData = (key: string, data: string|Dayjs|null) => {
        setFormData(
            {
                ...formData,
                [key]: data
            }
        );
    }

    const handleAddEvent = () => {
        let startAt = formData.startAt
            .set('hour', formData.from.hour())
            .set('minute', formData.from.minute())
            .set('second', 0);
        const timeDiff = formData.to.diff(formData.from, "m");
        console.log(formData.from.hour());
        createEvent({
            variables: {
                event: {
                    content: formData.content,
                    title: formData.title,
                    gameId: props.gameId,
                    startAt: startAt.format("YYYY-MM-DDTHH:mm:ssZ"),
                    duration: timeDiff
                }
            }
        }).then(({})=>{
            setAdd(false);
            if (feedListRef && feedListRef.current) {
                feedListRef.current.refresh();
            }
        })
    }

    const handleParticipate = (gameEventId: string, response: "PARTICIPATE" | "CANNOT" | "MAYBE") => () => {
        let responseEnum: GameEventResponse;
        switch (response) {
            case "PARTICIPATE":
                responseEnum = GameEventResponse.Participate;
                break;
            case "CANNOT":
                responseEnum = GameEventResponse.Cannot;
                break;
            case "MAYBE":
                responseEnum = GameEventResponse.Maybe;
                break;
        }
        
        participateToEvent({
            variables: {
                gameEventId: gameEventId,
                response: responseEnum
            }
        }).then(() => {
            if (feedListRef.current)  {
                feedListRef.current?.refresh();
            }
        });
    }

    const ParticipationButton = (props: {response: "PARTICIPATE" | "CANNOT" | "MAYBE", eventId: string, vote: number, myVote: string, icon: React.ReactNode, text: string}) => (
        <Grid item sm={4}>
            <Button
                onClick={handleParticipate(props.eventId, props.response)}
                variant={props.myVote === props.response ? "contained" : "outlined"}
                color={(props.myVote === props.response || props.myVote === "") ? "primary" : "secondary"}
                startIcon={props.icon}
                fullWidth
            >
                {`${props.text}${props.vote > 0 ? ` (${props.vote})` : ''}`}
            </Button>
        </Grid>
    )

    return (
        <>
            <FeedList
                title="Event"
                query={GET_EVENTS}
                render={(data): JSX.Element[] | undefined => {
                    return data?.events?.map((event) => {
                        const startAt = dayjs(event.startAt, "YYYY-MM-DDTHH:mm:ssZ");
                        const endAt = startAt.add(event.duration || 0, "m");
                        let vote: string = "";
                        let votes: {[k: string]: number} = {PARTICIPATE: 0, MAYBE: 0, CANNOT: 0};

                        let myParticipation: string|undefined = undefined;
                        event.participations?.forEach((participation) => {
                            if (participation.user?.id === userInfo.id) {
                                myParticipation = participation.response;
                            }
                            votes[participation.response]++;
                        });
                        if (myParticipation) {
                            vote = myParticipation;
                        }

                        return (
                            <Grid item xs={12}>
                                <Card sx={{width: "100%", marginTop: 0}}>
                                    <CardHeader avatar={<Avatar>R</Avatar>} title={event.title} subheader={`From ${startAt.format("HH:mm")} To ${endAt.format("HH:mm")} the ${startAt.format("MMMM DD, YYYY")}`} />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {event.content}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Grid container spacing={1} alignItems="stretch">
                                            <ParticipationButton eventId={event.id} icon={<AddCircle/>} myVote={vote} response="PARTICIPATE" text="I will be here!" vote={votes.PARTICIPATE} />
                                            <ParticipationButton eventId={event.id} icon={<MoreHoriz/>} myVote={vote} response="MAYBE" text="Maybe..." vote={votes.MAYBE} />
                                            <ParticipationButton eventId={event.id} icon={<Cancel/>} myVote={vote} response="CANNOT" text="I can't..." vote={votes.CANNOT} />
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    });
                }}
                ref={feedListRef}
                numberToFetch={3}
                actions={props.isAdmin ? [
                    {
                        icon: (<AddCircle/>),
                        onFired() {
                            setAdd(true)
                        },
                        disabled: add
                    }
                ] : []}
                getVariables={(position: number, numberToFetch: number) => {
                    return {
                        page: {
                            after: position,
                            first: numberToFetch
                        },
                        gameId: props.gameId
                    }
                }}
            />
            <Modal
                open={add}
                onClose={()=>setAdd(false)}
            >
                <Card sx={ModalStyleCard}>
                    <CardHeader title="Add an event" />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth value={formData.title} onChange={(e) => handleFormData("title", e.target.value)} label="Title" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField multiline fullWidth rows={3}  value={formData.content} onChange={(e)=>handleFormData("content", e.target.value)} label="Content" />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Start the</InputLabel>
                                <DateCalendar
                                    disablePast={true}
                                    value={formData.startAt}
                                    onChange={(value)=>handleFormData("startAt", value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TimePicker label="At" ampm={false} value={formData.from} onChange={(value)=>handleFormData("from", value)} />
                            </Grid>
                            <Grid item xs={6}>
                                <TimePicker label="To" ampm={false} value={formData.to} onChange={(value)=>handleFormData("to", value)} />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button onClick={handleAddEvent}>
                            Add
                        </Button>
                    </CardActions>
                </Card>
            </Modal>
        </>
    )
}