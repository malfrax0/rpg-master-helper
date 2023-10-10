import React, { useState } from 'react';
import { Container, ThemeProvider } from '@mui/material';
import CthulhuRPGInfo from './Data/Temp/CthulhuRPGInfo';
import PlayerContainer from './Components/PlayerInfo/PlayerContainer';
import { useQuery } from '@apollo/client';
import { gql } from './__generated__';
import Login from './Pages/Login';
import PageLoader from './Components/Utils/PageLoader';
import Main from './Pages/Main';
import theme from './Theme';

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
      // currentComponent = (<PlayerContainer info={CthulhuRPGInfo} />)
      currentComponent = (<Main/>)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      {
        currentComponent
      }
      <Login open={!authData.loading && !authData.data?.auth} />
    </ThemeProvider>
  );
}

export default App;
