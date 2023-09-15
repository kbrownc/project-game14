import React from 'react';

function WordRow({ index, row, rowLength }) {
  return (
    <div className="temp1">
      <li key={index} className='row'>
        <div className="itemText">
          <span className="itemText2">{row.name[0].toUpperCase()}</span>
          <span className="itemText2">{row.name[1].toUpperCase()}</span> 
          <span className="itemText2">{row.name[2].toUpperCase()}</span>
          <span className="itemText2">{row.name[3].toUpperCase()} </span>
          <span className="itemText2">{row.name[4].toUpperCase()}</span>
        </div>
      </li>
    </div>
  );
}

export default WordRow;
