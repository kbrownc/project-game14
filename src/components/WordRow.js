import React from 'react';

function WordRow({ row, markDone, index }) {
  return (
    <div className="addbutton">
      <li className={row.done ? 'singleRow-complete' : 'singleRow'}>
        <span className="itemText">
          {row.name[0]} {row.name[1]} {row.name[2]} {row.name[3]} {row.name[4]}
        </span>
        <button onClick={() => markDone(index)}>{!row.done ? 'Done' : 'Frozen'}</button>
      </li>
    </div>
  );
}

export default WordRow;
