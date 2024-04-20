import React from 'react';
import { useNavigate } from 'react-router-dom';

function StartPage() {
  const history = useNavigate();

  const startGame = () => {
    history.push('/city-selection');
  };

  return (
    <div>
      <h1>Welcome to Criminal Capture Game</h1>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

export default StartPage;
