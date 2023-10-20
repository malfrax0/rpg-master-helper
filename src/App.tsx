import { CssBaseline, ThemeProvider } from '@mui/material';
import { useQuery } from '@apollo/client';
import { gql } from './__generated__';
import Login from './Pages/Login';
import PageLoader from './Components/Utils/PageLoader';
import Main from './Pages/Main';
import theme from './Theme';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import UserContext from './Context/UserContext';

const AUTH = gql(/* GraphQL */`
  query Auth {
    auth
  }
`)

const GET_ME = gql(/* GraphQL */`
  query Me {
    me {
        id,
        name
    }
  }
`)

function App() {
    const authData = useQuery(AUTH);
    const meData = useQuery(GET_ME);

    let currentComponent = null;
    if (authData.loading || meData.loading) {
        currentComponent = (<PageLoader />)
    }
    else {
        if (authData.data?.auth && meData.data) {
            currentComponent = (
                <UserContext.Provider value={meData.data.me}>
                    <Main />
                </UserContext.Provider>
            );
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {
                    currentComponent
                }
                <Login open={!authData.loading && !authData.data?.auth} />
            </ThemeProvider>
        </LocalizationProvider>
    );
}

export default App;
