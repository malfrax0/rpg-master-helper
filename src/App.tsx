import { CssBaseline, ThemeProvider } from '@mui/material';
import { useQuery } from '@apollo/client';
import { gql } from './__generated__';
import Login from './Pages/Login';
import PageLoader from './Components/Utils/PageLoader';
import Main from './Pages/Main';
import theme from './Theme';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const AUTH = gql(/* GraphQL */`
  query Auth {
    auth
  }
`)

function App() {
  const authData = useQuery(AUTH);

  let currentComponent = null;
  if (authData.loading) {
    currentComponent = (<PageLoader/>)
  }
  else {
    if (authData.data?.auth) {
      currentComponent = (<Main/>)
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
