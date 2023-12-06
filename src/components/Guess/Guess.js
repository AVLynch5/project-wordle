import React from 'react';

import { range } from '../../utils';
import { WORD_LENGTH } from '../../constants';

function Guess({ guess }) {

  return (
    <>
      <p className="guess">
        {range(WORD_LENGTH).map(num => {
          return (
            <span
              key={num}
              className={guess ? `cell ${guess[num].status}` : 'cell'}
            >
              {guess ? guess[num].letter : undefined}
            </span>
          );
        })}
      </p>
    </>
  );
}

export default Guess;
