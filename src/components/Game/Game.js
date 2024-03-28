import React from 'react';
import useSWRImmutable from 'swr/immutable'

import ImportForm from '../InputForm';
import GuessResults from '../GuessResults';
import WinBanner from '../WinBanner';
import LoseBanner from '../LoseBanner';
import Keyboard from '../Keyboard';
import { NUM_OF_GUESSES_ALLOWED, ENDPOINT } from '../../constants';
import { checkGuess, fetcher } from '../../game-helpers';

function Game() {
  const [guessArray, setGuessArray] = React.useState([]);
  const [status, setStatus] = React.useState('in progress');
  // SWR to fetch word and control loading and error states
  const { data, isLoading, error, mutate } = useSWRImmutable(ENDPOINT, fetcher);
  const answer = data ? data[0].toUpperCase() : null;
  
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
    mutate(ENDPOINT);
    setGuessArray([]);
    setStatus('in progress');
  }

  if (isLoading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>Error ...</p>;
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
