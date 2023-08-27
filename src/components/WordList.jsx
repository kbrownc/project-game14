import React from 'react';
import WordRow from './WordRow';

function WordList({ rows, markDone }) {
  return rows
    .map((row, index) => {
      return (
        <WordRow
          key={index}
          row={row}
          markDone={markDone}
          index={index}
        />
      );
    });
}

export default WordList;
