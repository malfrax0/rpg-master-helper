import { ApolloQueryResult, OperationVariables, TypedDocumentNode, useQuery } from "@apollo/client"
import { isArray } from "@apollo/client/utilities"
import { ArrowCircleDown } from "@mui/icons-material"
import { Button, Grid, IconButton, Typography } from "@mui/material"
import React from "react"

export type FeedListAction = {
    icon: React.ReactNode,
    onFired: () => void
    disabled?: boolean
}

type RefetchType<TData = any, TVariables extends OperationVariables = OperationVariables> = (variables?: Partial<TVariables>) => Promise<ApolloQueryResult<TData>>

export type FeedListProps<TData = any, TVariables extends OperationVariables = OperationVariables> = {
    title: string,
    actions?: FeedListAction[],
    refetch?: (refetch: RefetchType<TData, TVariables>) => void,
    query: TypedDocumentNode<TData, TVariables>,
    render: (data: TData | undefined) => JSX.Element[] | undefined,
    onRenderLoading?: () => React.ReactNode,
    variables?: TVariables
}

export default function FeedList<TData = any, TVariables extends OperationVariables = OperationVariables>(props: FeedListProps<TData, TVariables>) {
    const {loading, data, error, refetch} = useQuery(props.query, {variables: props.variables});

    if (props.refetch) {
        props.refetch(refetch);
    }

    let renderedInfos;
    if (loading) {
        renderedInfos = props.onRenderLoading ? props.onRenderLoading() : <b>Loading...</b>;
    }
    else {
        renderedInfos = props.render(data);
    }

    return (
    <Grid container spacing={2}>
        <Grid item xs="auto">
            <Typography variant="h4">{props.title}</Typography>
        </Grid>
        <Grid item sx={{flexGrow: 1, borderBottomStyle: "solid", borderBottomWidth: 1, borderColor: "black", height: 40, marginLeft: 4}}>
        </Grid>
        <Grid container item xs="auto" alignItems={"end"} justifyContent="flex-end">
            {
                props.actions ?
                props.actions.map((action, ind) => (
                    <IconButton key={ind} disabled={action.disabled} onClick={action.onFired}>
                        {action.icon}
                    </IconButton>
                )) : null
            }
        </Grid>
        <Grid item xs={12}>
            { renderedInfos }
        </Grid>
        <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth startIcon={(<ArrowCircleDown/>)}>
                Show me more!
            </Button>
        </Grid>
    </Grid>
    )
}