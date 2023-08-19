import React from 'react';
import WordRow from './WordRow';

function WordList({ rows, markComplete }) {
  return rows
    .map(row => {
      return (
        <WordRow
          key={row.id}
          row={row}
          markComplete={markComplete}
        />
      );
    });
}

export default WordList;
