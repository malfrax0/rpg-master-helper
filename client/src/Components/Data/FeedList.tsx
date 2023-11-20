import { ApolloQueryResult, Operation, OperationVariables, TypedDocumentNode, useQuery } from "@apollo/client"
import { isArray } from "@apollo/client/utilities"
import { ThemeContext } from "@emotion/react"
import { ArrowCircleDown } from "@mui/icons-material"
import { Box, Button, CircularProgress, Divider, Grid, IconButton, ThemeProvider, Typography, useTheme } from "@mui/material"
import React, { ForwardedRef, MutableRefObject, ReactElement, forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react"

export type FeedListAction = {
    icon: React.ReactNode,
    onFired: () => void
    disabled?: boolean
}

export type FeedListRef = {
    refresh: () => void
}

export type FeedListProps<TData = any, TVariables extends OperationVariables = OperationVariables> = {
    title: string,
    actions?: FeedListAction[],
    query: TypedDocumentNode<TData, TVariables>,
    render: (data: TData) => JSX.Element[] | undefined,
    onRenderLoading?: () => React.ReactNode,
    getVariables: (position: number, numberToFetch: number)=>TVariables,
    numberToFetch: number
}

const FeedListInner = <TData, TVariables extends OperationVariables = OperationVariables>(props: FeedListProps<TData, TVariables>, ref: ForwardedRef<FeedListRef | undefined>) => {

    const {loading, data, refetch} = useQuery(props.query, {variables: props.getVariables(0, props.numberToFetch)});
    const theme = useTheme();

    const [numberToFetch, setNumberToFetch] = useState(3);

    useEffect(() => {
        setNumberToFetch(props.numberToFetch);
    }, [props.query])

    useImperativeHandle(ref, () => ({
        refresh() {
            refetch(props.getVariables(0, props.numberToFetch));
        },
    }));

    const handleShowMore = () => {
        setNumberToFetch(numberToFetch + props.numberToFetch);
        refetch(props.getVariables(0, props.numberToFetch));
    }

    let renderedInfos;
    if (loading) {
        renderedInfos = props.onRenderLoading ? props.onRenderLoading() : <b>Loading...</b>;
    }
    else if (!data) {
        
    }
    else {
        renderedInfos = props.render(data);
    }

    return (
    <Grid container spacing={2}>
        <Grid item xs="auto">
            <Typography variant="h4">{props.title}</Typography>
        </Grid>
        <Grid item sx={{flexGrow: 1, borderBottomStyle: "solid", borderBottomWidth: 1, borderColor: theme.palette.divider, height: 40, marginLeft: 4}}>
        </Grid>
        <Grid container item xs="auto" alignItems={"end"} justifyContent="flex-end" spacing={2}>
            {
                props.actions ?
                props.actions.map((action, ind) => (
                    <IconButton key={ind} disabled={action.disabled} onClick={action.onFired} color="secondary">
                        {action.icon}
                    </IconButton>
                )) : null
            }
        </Grid>
        <Grid container item xs={12} spacing={2}>
            { renderedInfos }
        </Grid>
        <Grid item xs={12}>
            <Box sx={{ m: 1, position: "relative" }}>
                <Button disabled={loading} onClick={handleShowMore} variant="text" color="secondary" fullWidth startIcon={(<ArrowCircleDown/>)}>
                    Show me more!
                </Button>
                {
                    loading && (
                        <CircularProgress size={24} sx={{
                            color: "primary",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            marginTop: "-12px",
                            marginLeft: "-12px"
                        }}/>
                    )
                }
            </Box>
        </Grid>
    </Grid>
    )
};

const FeedList = React.forwardRef(FeedListInner) as <TData = any, TVariables extends OperationVariables = OperationVariables>(
    props: FeedListProps<TData, TVariables> & { ref?: MutableRefObject<FeedListRef | undefined> }
) => ReactElement;

export default FeedList;