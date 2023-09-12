import React, { useState } from 'react';
import WordRow from './WordRow';
import { wordDictionary } from '../letters/WordDictionary';

function WordList({ rows, setRows, markDone, setMessage }) {
  const [newLetter0, setNewLetter0] = useState('');
  const [newLetter1, setNewLetter1] = useState('');
  const [newLetter2, setNewLetter2] = useState('');
  const [newLetter3, setNewLetter3] = useState('');
  const [newLetter4, setNewLetter4] = useState('');

  function addRow(e) {
    let workRows = JSON.parse(JSON.stringify(rows));
    let workMessage = '';
    // error 1 check - is word a real word
    if (!error1Check(newLetter0 + newLetter1 + newLetter2 + newLetter3 + newLetter4)) {
      workMessage = 'not a valid word';
    }
    // error 2 check - has word already been played (duplicate)
    if (workMessage === '') {
      if (error2Check(workRows)) {
        workMessage = 'duplicate word';
      }
    }
    // error 3 check - words must reuse 1 and only 1 letter from previous row in the same position
    if (workMessage === '') {
      if (error3Check(workRows)) {
        workMessage = 'word must reuse 1 and only 1 letter from previous word';
      }
    }
    // if word is valid, add it to the list and space it out in the input fields
    if (workMessage === '') {
      workRows[workRows.length] = {
        done: false,
        name: [newLetter0, newLetter1, newLetter2, newLetter3, newLetter4],
      };
      setRows(workRows);
      setNewLetter0('');
      setNewLetter1('');
      setNewLetter2('');
      setNewLetter3('');
      setNewLetter4('');
    }
    // send error or blank message
    setMessage(workMessage);
  }

  function deleteWord(e) {
    let workRows = JSON.parse(JSON.stringify(rows));
    workRows.pop();
    if (workRows.length === 0) {
      workRows = [{ done: false, name: ['', '', '', '', ''] }];
    }
    setRows(workRows);
  }

  function error1Check(name) {
    // Lookup word in dictionary
    const found = wordDictionary.find(item => {
      return item === name.toLowerCase();
    });
    if (found === undefined) {
      return false;
    } else {
      return true;
    }
  }

  function error2Check(workRows) {
    // Check for duplicate word
    let resultToReturn = false;
    for (let i = 0; i < workRows.length; i++) {
      for (let j = 0; j < workRows.length; j++) {
        if (i !== j) {
          if (workRows[i].name.join('') === workRows[j].name.join('')) {
            resultToReturn = true;
            break;
          }
        }
      }
      if (resultToReturn) {
        break;
      }
    }
    return resultToReturn;
  }

  function error3Check(workRows) {
    // Check for reuse of letter from previous word
    //  (create Temp list of words including current word)
    let resultToReturn = false;
    let count = 0;
    let workRowsTemp = JSON.parse(JSON.stringify(rows));
    workRowsTemp[workRowsTemp.length] = {
      done: false,
      name: [newLetter0, newLetter1, newLetter2, newLetter3, newLetter4],
    };
    if (workRowsTemp.length < 2) {
      return resultToReturn;
    }
    for (let i = workRowsTemp.length - 2; i < workRowsTemp.length - 1; i++) {
      for (let j = 0; j < 5; j++) {
        if (workRowsTemp[i].name[j] === workRowsTemp[i + 1].name[j]) {
          count = count + 1;
          console.log(count, workRowsTemp[i].name[j], workRowsTemp[i + 1].name[j]);
          if (count > 1) {
            resultToReturn = true;
            break;
          }
        }
      }
      if (resultToReturn) {
        break;
      }
    }
    return resultToReturn;
  }

  return rows.map((row, index, setRows) => {
    return (
      <div key={index}>
        <ul className="allRows">
          <WordRow
            index={index}
            row={row}
            markDone={markDone}
            deleteWord={deleteWord}
            rowLength={rows.length}
          />
        </ul>
        {index === rows.length - 1 || rows.length === 0 ? (
          <div className="rowForm">
            <input
              required
              name="letter1"
              type="text"
              value={newLetter0}
              onChange={e => setNewLetter0(e.target.value)}
            />
            <input
              required
              name="letter2"
              type="text"
              value={newLetter1}
              onChange={e => setNewLetter1(e.target.value)}
            />
            <input
              required
              name="letter3"
              type="text"
              value={newLetter2}
              onChange={e => setNewLetter2(e.target.value)}
            />
            <input
              required
              name="letter4"
              type="text"
              value={newLetter3}
              onChange={e => setNewLetter3(e.target.value)}
            />
            <input
              required
              name="letter5"
              type="text"
              value={newLetter4}
              onChange={e => setNewLetter4(e.target.value)}
            />
            <button type="submit" onClick={addRow}>
              Add
            </button>
          </div>
        ) : null}
      </div>
    );
  });
}

export default WordList;
