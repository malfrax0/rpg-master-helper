import React from 'react';
import logo from './logo.svg';
import './App.css';
import GeneratedInput from './Components/Forms/NumberRenderer';
import CthulhuRPGInfo from './Data/Temp/CthulhuRPGInfo';

function App() {
  return (
    <div>
      <GeneratedInput object={CthulhuRPGInfo.data[0].components[0]} />
    </div>
  );
}

export default App;
