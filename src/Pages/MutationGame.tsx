import { useMutation, useQuery } from "@apollo/client";
import { gql } from "../__generated__"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

const GET_TEMPLATES = gql(/* GraphQL */`
    query GetAllCharacterSheetTemplate {
        characterSheetTemplates {
            id,
            name
        }
    }
`);

const CREATE_GAME = gql(/* GraphQL */`
    mutation CreateGame($game: GameInput!) {
        createGame(game: $game) {
            id,
            name
        }
    }
`);

export type MutationGameProps = {
    open: boolean,
    editId?: string | undefined | null,
    onNewGame: (id: string) => void,
    onEditGame: (id: string) => void,
    onCancel: () => void,
}

export default function MutationGame(props: MutationGameProps) {
    const [mutationCreateGame, {loading: loadingCreate}] = useMutation(CREATE_GAME);
    const {loading: loadingTemplate, data: dataTemplate, error: errorTemplate} = useQuery(GET_TEMPLATES);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [templateId, setTemplateId] = useState("");

    const loading = loadingCreate || loadingTemplate;

    const handleCreation = () => {
        mutationCreateGame({variables: {
            game: {
                name: name,
                description: description,
                templateId: templateId
            }
        }}).then(({data}) => {
            if (props.editId) {
                props.onEditGame(data?.createGame.id as string);
            }
            else {
                props.onNewGame(data?.createGame.id as string);
            }
        });
    }

    return (
        <Dialog
            open={props.open}
        >
            <DialogTitle>Create a new game</DialogTitle>
            <DialogContent>
                {
                    loading ? 
                    <b>Loading...</b> :
                    (
                        <>
                            <TextField autoFocus margin="dense" fullWidth variant="outlined" label="Name" value={name} onChange={(e)=>setName(e.target.value)} />
                            <TextField margin="dense" fullWidth variant="outlined" label="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
                            <Select variant="outlined" margin="dense" fullWidth label="Template" value={templateId} onChange={(e)=>setTemplateId(e.target.value)}>
                                <MenuItem value="">Choose a template...</MenuItem>
                                {
                                    dataTemplate?.characterSheetTemplates?.map((value) => {
                                        return (
                                            <MenuItem value={value.id} key={value.id}>
                                                { value.name }
                                            </MenuItem>
                                        );
                                    })
                                }
                            </Select>
                        </>
                    )
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onCancel}>Cancel</Button>
                <Button onClick={handleCreation}>{props.editId ? "Edit" : "Create"}</Button>
            </DialogActions>
        </Dialog>
    )
}