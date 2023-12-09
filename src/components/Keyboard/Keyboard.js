import React from 'react';

import { arrayToObject } from '../../game-helpers';

function Keyboard({ guessArray }) {
  const keyboardRows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  const letterStatusObj = guessArray
    ? arrayToObject(guessArray)
    : undefined;

  return (
    <div className="keyboard-container">
      {keyboardRows.map((row, index) => {
        const rowArray = row.split('');
        return (
          <div key={index} className="keyboard-row">
            {rowArray.map((letter, index) => {
              return (
                <div key={index} className={letterStatusObj ? `keyboard-letter ${letterStatusObj[letter]}` : 'keyboard-letter'}>
                  <strong>{letter}</strong>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Keyboard;
