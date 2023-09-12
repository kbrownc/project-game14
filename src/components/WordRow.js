import React from 'react';

function WordRow({ index, row, markDone, deleteWord, rowLength }) {
  return (
    <div>
      <li key={index} className={row.done ? 'singleRow-complete' : 'singleRow'}>
        <div className="itemText">
          {row.name[0].toUpperCase()} {row.name[1].toUpperCase()} {row.name[2].toUpperCase()}{' '}
          {row.name[3].toUpperCase()} {row.name[4].toUpperCase()}
        </div>
        <button onClick={() => markDone(index)}>{!row.done ? 'Done' : 'Frozen'}</button>
        {rowLength - 1 === index ? <button onClick={() => deleteWord(index)}>Delete</button> : null}
      </li>
    </div>
  );
}

export default WordRow;
