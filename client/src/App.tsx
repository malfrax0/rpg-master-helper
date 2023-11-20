import { CssBaseline, ThemeProvider } from '@mui/material';
import { gql } from './__generated__';
import theme from './Theme';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAuth0 } from '@auth0/auth0-react';
import Main from './Pages/Main';
import { useEffect, useState } from 'react';

const GET_ME = gql(/* GraphQL */`
  query Me {
    me {
        id,
        name
    }
  }
`)

function App() {
    const { isAuthenticated, isLoading, loginWithRedirect, user, getAccessTokenSilently } = useAuth0();
    const [accessToken, setAccessToken] = useState<string|undefined>(undefined)

    if (!isAuthenticated && !isLoading) {
        loginWithRedirect();
    }
    useEffect(() => {
        if (isAuthenticated) {
            getAccessTokenSilently({detailedResponse: true}).then((data)=>setAccessToken(data.access_token));
        }
    }, [isAuthenticated])
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {
                    isAuthenticated && accessToken && !isLoading &&
                    (
                        <Main />
                    )
                }
            </ThemeProvider>
        </LocalizationProvider>
    );
}

export default App;
