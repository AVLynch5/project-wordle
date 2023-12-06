import React from 'react';

import Banner from '../Banner/Banner';

function WinBanner({ guessArrayLength, handleRestart }) {
  const numOfGuesses = guessArrayLength === 1 ?
    '1 guess' : `${guessArrayLength} guesses`;
  return (
    <Banner
      variant='happy'
    >
      <p>
        <strong>Congratulations!</strong> Got it in
        <strong>{' '}{numOfGuesses}</strong>.
      </p>
      <button
        onClick={handleRestart}
      >
        New Game
      </button>
    </Banner>
  );
}

export default WinBanner;
