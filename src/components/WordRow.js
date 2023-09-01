import React from 'react';

function WordRow({ index, row, markDone, deleteWord }) {
  return (
    <div className="addbutton">
      <li key={index} className={row.done ? 'singleRow-complete' : 'singleRow'}>
        <span className="itemText">
          {row.name[0]} {row.name[1]} {row.name[2]} {row.name[3]} {row.name[4]}
        </span>
        <button onClick={() => markDone(index)}>{!row.done ? 'Done' : 'Frozen'}</button>
        <button onClick={() => deleteWord(index)}>Delete</button>
      </li>
    </div>
  );
}

export default WordRow;
