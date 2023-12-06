import React from 'react';

function Keyboard() {
  const keyboardRows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

  return (
    <div className="keyboard-container">
      {keyboardRows.map((row, index) => {
        const rowArray = row.split('');
        return (
          <div key={index} className="keyboard-row">
            {rowArray.map((letter, index) => {
              return (
                <div key={index} className="keyboard-letter">
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
