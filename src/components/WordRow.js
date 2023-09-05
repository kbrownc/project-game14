import React from 'react';

function WordRow({ index, row, markDone, deleteWord, rowLength }) {
  return (
    <div>
      <li key={index} className={row.done ? 'singleRow-complete' : 'singleRow'}>
        <span className="itemText">
          {row.name[0]} {row.name[1]} {row.name[2]} {row.name[3]} {row.name[4]}
        </span>
        <button onClick={() => markDone(index)}>{!row.done ? 'Done' : 'Frozen'}</button>
        {rowLength - 1 === index ? <button onClick={() => deleteWord(index)}>Delete</button> : null}
      </li>
    </div>
  );
}

export default WordRow;
