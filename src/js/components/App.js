import React from 'react';
import TicTacToe from './TicTacToe';
import Controls from './Controls';

const App = () => (
  <div>
    <React.StrictMode>
      <TicTacToe />
      <Controls />
    </React.StrictMode>
  </div>
);

export default App;