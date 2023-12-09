import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import ImportForm from '../InputForm';
import GuessResults from '../GuessResults';
import WinBanner from '../WinBanner';
import LoseBanner from '../LoseBanner';
import Keyboard from '../Keyboard';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { checkGuess } from '../../game-helpers';

function Game() {
  const [guessArray, setGuessArray] = React.useState([]);
  const [status, setStatus] = React.useState('in progress');
  // Initializer function - set answer to random word
  const [answer, setAnswer] = React.useState(() => {
    return sample(WORDS);
  });

  const handleAddGuess = (guess) => {
    //check guess before adding to guessArray
    const checkedGuess=checkGuess(guess, answer);
    const newGuessArray = [
      ...guessArray,
      checkedGuess
    ];
    setGuessArray(newGuessArray);
    if (guess === answer) {
      setStatus('win');
    } else if (newGuessArray.length >= NUM_OF_GUESSES_ALLOWED) {
      setStatus('lose');
    }
  }

  const handleRestart = () => {
    const newWord = sample(WORDS);
    setAnswer(newWord);
    setGuessArray([]);
    setStatus('in progress');
  }

  return (
    <>
      <GuessResults guessArray={guessArray}/>
      <ImportForm handleAddGuess={handleAddGuess} status={status}/>
      <Keyboard guessArray={guessArray}/>
      {status === "win" && <WinBanner guessArrayLength={guessArray.length} handleRestart={handleRestart}/>}
      {status === "lose" && <LoseBanner answer={answer} handleRestart={handleRestart}/>}
    </>
  );
}

export default Game;
