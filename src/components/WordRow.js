import React from 'react';

function WordRow({ row, markComplete }) {
  return (
    <div className="addbutton">
      <li className={row.complete ? 'singleRow-complete' : 'singleRow'}>
        <span className="itemText">{row[0]} {row[1]} {row[2]} {row[3]} {row[4]}</span>
        <button onClick={() => markComplete(row.id)}>Done</button>
      </li>
    </div>
  );
}

export default WordRow;
