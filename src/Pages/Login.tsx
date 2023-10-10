import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Modal, Paper, TextField } from "@mui/material"

import { gql } from "../__generated__"
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
const REGISTER = gql(/* GraphQL */`
  mutation Register($email: String!, $password: String!, $name: String!) {
    register(email: $email, password: $password, name: $name) {
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
    const [mutationLogin, {loading: loadingLogin}] = useMutation(LOGIN);
    const [mutationRegister, {loading: loadingRegister}] = useMutation(REGISTER);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);
    const [username, setUsername] = useState("");

    const loading = loadingLogin || loadingRegister;

    const handleConnect = () => {
        if (register) {
            mutationRegister({variables: {email, password, name: username}})
                .then(({data}) => {
                    if (data) {
                        localStorage.setItem("token", data.register.token as string);
                        window.location.reload();
                    }
                })
        }
        else {
            mutationLogin({variables: {email, password}})
                .then(({data}) => {
                    if (data) {
                        localStorage.setItem("token", data.login.token as string);
                        window.location.reload();   
                    }
                })
        }
        
    }

    return (
        <Dialog
            open={props.open}
        >
            <DialogTitle>{register ? "Register" : "Login"}</DialogTitle>
            <DialogContent>
                {
                    loading ? 
                    (
                        <b>Chargement...</b>
                    ) :
                    (
                        <>
                            {
                                register ? 
                                <TextField autoFocus margin="dense" fullWidth variant="outlined" label="Username" value={username} onChange={(e)=>setUsername(e.target.value)} /> :
                                <></>
                            }
                            <TextField autoFocus margin="dense" fullWidth variant="outlined" label="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} />
                            <TextField autoFocus margin="dense" fullWidth variant="outlined" type="password" label="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        </>
                    )
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>setRegister(!register)}>{ register ? "Go to login" : "No account? Register!"}</Button>
                <Button onClick={handleConnect} disabled={loading}>{register ? "Register" : "Connect"}</Button>
            </DialogActions>
        </Dialog>
    )
}