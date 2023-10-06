import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Modal, Paper, TextField } from "@mui/material"

import { gql } from "../../__generated__"
import { useMutation } from "@apollo/client"
import { useState } from "react"

const LOGIN = gql(/* GraphQL */`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
      }
      token
    }
  }
`)

export type LoginProps = {
    open: boolean,
}

export default function Login(props: LoginProps) {
    const [mutationLogin, {loading, data, error}] = useMutation(LOGIN);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleConnect = () => {
        mutationLogin({variables: {email, password}})
            .then(({data}) => {
                if (data) {
                    localStorage.setItem("token", data.login.token as string);
                    window.location.reload();   
                }
            })
    }

    return (
        <Dialog
            open={props.open}
        >
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                {
                    loading ? 
                    (
                        <b>Chargement...</b>
                    ) :
                    (
                        <>
                            <TextField autoFocus margin="dense" fullWidth variant="outlined" label="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} />
                            <TextField autoFocus margin="dense" fullWidth variant="outlined" type="password" label="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        </>
                    )
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConnect} disabled={loading}>Connect</Button>
            </DialogActions>
        </Dialog>
    )
}