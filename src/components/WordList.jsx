import React from 'react';
import WordRow from './WordRow';

function WordList({ rows, markDone, topScores }) {
  return rows.map((row, index) => {
    return (
      <ul className="allRows">
        <WordRow key={index} row={row} markDone={markDone} index={index} />
      </ul>
    );
  });
}

export default WordList;
