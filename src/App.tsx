import React, { useState } from 'react';
import { Container } from '@mui/material';
import CthulhuRPGInfo from './Data/Temp/CthulhuRPGInfo';
import PlayerContainer from './Components/PlayerInfo/PlayerContainer';
import { useQuery } from '@apollo/client';
import { gql } from './__generated__';
import Login from './Components/Pages/Login';
import PageLoader from './Components/Utils/PageLoader';
import Main from './Components/Pages/Main';

const GET_GAME_TEST = gql(/* GraphQL */`
   query GetGameTest($gameId: String!) {
    getGame(gameId: $gameId) {
      name
      description
      admin {
        id
        name
      }
      characters {
        user {
          id
          name
        }
      }
    }
  }
`);

const AUTH = gql(/* GraphQL */`
  query Auth {
    auth
  }
`)

function App() {
  //const loginData = useQuery(LOGIN, { variables: {email: "leo.nadeau.io@gmail.com", password: "123"} });
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
    <Container>
      {
        currentComponent
      }
      <Login open={!authData.loading && !authData.data?.auth} />
    </Container>
  );
}

export default App;
