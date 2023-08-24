import React from 'react';
import WordRow from './WordRow';

function WordList({ rows, markComplete }) {
  return rows
    .map((row, index) => {
      return (
        <WordRow
          key={index}
          row={row}
          markComplete={markComplete}
        />
      );
    });
}

export default WordList;
