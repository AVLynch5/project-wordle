import React from "react";
import useSWRImmutable from "swr/immutable";

import InputForm from "../InputForm";
import GuessResults from "../GuessResults";
import WinBanner from "../WinBanner";
import LoseBanner from "../LoseBanner";
import Keyboard from "../Keyboard";
import { NUM_OF_GUESSES_ALLOWED, WORD_ENDPOINT, VALID_ENDPOINT } from "../../constants";
import { checkGuess, fetcher } from "../../game-helpers";

function Game() {
  const [guessArray, setGuessArray] = React.useState([]);
  const [status, setStatus] = React.useState("in progress");
  const [guessError, setGuessError] = React.useState(false);
  const [totalGuesses, setTotalGuesses] = React.useState(0);
  // SWR to fetch word and control loading and error states
  const { data, isLoading, isValidating, error, mutate } = useSWRImmutable(WORD_ENDPOINT, fetcher);
  const answer = data ? data[0].toUpperCase() : null;

  const handleAddGuess = async (guess) => {
    const wordDefinition = await fetch(`${VALID_ENDPOINT}/${guess}`);
    const wordJson = await wordDefinition.json();
    const validWord = Array.isArray(wordJson);
    setTotalGuesses(currentValue => currentValue + 1);
    if (validWord) {
      setGuessError(false);
      //check guess before adding to guessArray
      const checkedGuess = checkGuess(guess, answer);
      const newGuessArray = [...guessArray, checkedGuess];
      setGuessArray(newGuessArray);
      if (guess === answer) {
        setStatus("win");
      } else if (newGuessArray.length >= NUM_OF_GUESSES_ALLOWED) {
        setStatus("lose");
      }
    } else {
      setGuessError(true);
    }
  };

  const handleRestart = () => {
    mutate(WORD_ENDPOINT);
    setGuessArray([]);
    setStatus("in progress");
  };

  if (isLoading || isValidating) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>Error ...</p>;
  }
  return (
    <>
      <GuessResults guessArray={guessArray} />
      <InputForm handleAddGuess={handleAddGuess} status={status} guessError={guessError} totalGuesses={totalGuesses}/>
      <Keyboard guessArray={guessArray} />
      {status === "win" && (
        <WinBanner
          guessArrayLength={guessArray.length}
          handleRestart={handleRestart}
        />
      )}
      {status === "lose" && (
        <LoseBanner answer={answer} handleRestart={handleRestart} />
      )}
    </>
  );
}

export default Game;
