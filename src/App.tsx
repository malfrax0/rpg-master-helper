import React, { useState } from 'react';
import { Container } from '@mui/material';
import CthulhuRPGInfo from './Data/Temp/CthulhuRPGInfo';
import PlayerContainer from './Components/PlayerInfo/PlayerContainer';

function App() {
  return (
    <Container>
      <PlayerContainer info={CthulhuRPGInfo} />
    </Container>
  );
}

export default App;
