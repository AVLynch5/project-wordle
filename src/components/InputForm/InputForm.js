import React from 'react';

import { WORD_LENGTH } from '../../constants';

function InputForm({ handleAddGuess, status, guessError, totalGuesses }) {
  const [guess, setGuess] = React.useState('');
  return (
    <React.Fragment
      key={totalGuesses}
    >
      <form
        className="guess-input-wrapper"
        onSubmit={event => {
          event.preventDefault();
          handleAddGuess(guess);
          setGuess('');
        }}
      >
        <label htmlFor="guess-input">Enter guess:</label>
        <input
          required
          id="guess-input"
          className={guessError ? 'error' : null}
          type="text"
          value={guess}
          onChange={event => {
            const upperCaseEntry = event.target.value.toUpperCase();
            setGuess(upperCaseEntry);
          }}
          pattern={`[A-Za-z]{${WORD_LENGTH}}`}
          title={`${WORD_LENGTH} letter word`}
          disabled={status !== "in progress"}
        />
        <span
          className={guessError ? 'error-span visible' : 'error-span'}
        >
          Please enter a real word
        </span>
      </form>
    </React.Fragment>
  );
}

export default InputForm;
