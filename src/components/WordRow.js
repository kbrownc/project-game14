import React from 'react';

function WordRow({ row, markComplete }) {
  return (
    <div className="addbutton">
      <li className={row.complete ? 'singleRow-complete' : 'singleRow'}>
        <span className="itemText">{row.name}</span>
        <button onClick={() => markComplete(row.id)}>Done</button>
      </li>
    </div>
  );
}

export default WordRow;
