import React, { useEffect } from 'react';
import WordRow from './WordRow';
import { wordDictionary } from '../letters/WordDictionary';

function WordList({rows,randomLetter,setRandomLetter,randomPosition,setRandomPosition,
    setRows,newLetter,setNewLetter,setMessage,easyHard,verifyLetter}) {

  useEffect(() => {
    if (randomPosition === 0) {
      setNewLetter(prevLetters => {
        return { ...prevLetters, newLetter0: randomLetter };
      });
    } else if (randomPosition === 1) {
      setNewLetter(prevLetters => {
        return { ...prevLetters, newLetter1: randomLetter };
      });
    } else if (randomPosition === 2) {
      setNewLetter(prevLetters => {
        return { ...prevLetters, newLetter2: randomLetter };
      });
    } else if (randomPosition === 3) {
      setNewLetter(prevLetters => {
        return { ...prevLetters, newLetter3: randomLetter };
      });
    } else {
      setNewLetter(prevLetters => {
        return { ...prevLetters, newLetter4: randomLetter };
      });
    }
  }, [rows.length,randomLetter,randomPosition,setNewLetter]);

  function addRow(e) {
    let workRows = JSON.parse(JSON.stringify(rows));
    let workMessage = '';
    // error 1 check - is word a real word
    if (
      !error1Check(
        newLetter.newLetter0 +
          newLetter.newLetter1 +
          newLetter.newLetter2 +
          newLetter.newLetter3 +
          newLetter.newLetter4
      )
    ) {
      workMessage = 'not a valid word';
    }
    // error 2 check - has word already been played (duplicate)
    if (workMessage === '') { 
      if (error2Check(workRows)) {
        workMessage = 'Duplicate word'; 
      }
    }
    // error 3 check - words must reuse 1 and only 1 letter from previous row in the same position
    if (workMessage === '') {
      if (error3Check(workRows)) {
        workMessage = 'Reuse 1 letter from previous word';
      }
    }
    if (workMessage === '') {
      if (error4Check()) {
        workMessage = 'Word must have all 5 letters filled';
      }
    }
    // if word is valid, add it to the list and space it out in the input fields
    if (workMessage === '') {
      workRows[workRows.length] = {
        name: [
          newLetter.newLetter0,
          newLetter.newLetter1,
          newLetter.newLetter2,
          newLetter.newLetter3,
          newLetter.newLetter4,
        ],
      };
      setRows(workRows);
      setNewLetter(prevLetters => {
        return {
          ...prevLetters,
          newLetter0: '',
          newLetter1: '',
          newLetter2: '',
          newLetter3: '',
          newLetter4: ''
        };
      });
      if (rows.length === 4) {
        workMessage = 'End of Game';
      }
      // Set randomeLetter to null if not required/Verify if 20 words fit selected letter
      if (easyHard === 'hard') {
        const tempRandomPosition = Math.floor(Math.random() * 5)
        const tempRandomLetter = verifyLetter(tempRandomPosition)
        setRandomLetter(tempRandomLetter);
        setRandomPosition(tempRandomPosition);
      } else {
        setRandomLetter('');
      }
    }
    // send error or blank message
    setMessage(workMessage);
  }

  function error1Check(name) {
    // Lookup word in dictionary
    const found = wordDictionary.find(item => {
      return item === name.toLowerCase();
    });
    if (found === undefined) {
      return true; /* temporary true for testing */
    } else {
      return true;
    }
  }

  function error2Check(workRows) {
    // Check for duplicate word
    let resultToReturn = false;
    let tempWord = newLetter.newLetter0 + newLetter.newLetter1 + newLetter.newLetter2 +
          newLetter.newLetter3 + newLetter.newLetter4
    for (let i = 0; i < workRows.length; i++) {
      if (workRows[i].name.join('').toLowerCase() === tempWord.toLowerCase()) {
        resultToReturn = true;
        break;
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
      name: [
        newLetter.newLetter0,
        newLetter.newLetter1,
        newLetter.newLetter2,
        newLetter.newLetter3,
        newLetter.newLetter4,
      ],
    };
    if (workRowsTemp.length < 2) {
      return resultToReturn;
    }
    for (let i = workRowsTemp.length - 2; i < workRowsTemp.length - 1; i++) {
      for (let j = 0; j < 5; j++) {
        if (workRowsTemp[i].name[j].toUpperCase() === workRowsTemp[i + 1].name[j].toUpperCase()) {
          count = count + 1;
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
    if (count === 0) {
      resultToReturn = true;
    }
    return resultToReturn;
  }

  function error4Check() {
    // Check if any of the 5 letter input was left blank
    let resultToReturn = false;
    if (
      newLetter.newLetter0 === '' ||
      newLetter.newLetter0 === null ||
      newLetter.newLetter1 === '' ||
      newLetter.newLetter1 === null ||
      newLetter.newLetter2 === '' ||
      newLetter.newLetter2 === null ||
      newLetter.newLetter3 === '' ||
      newLetter.newLetter3 === null ||
      newLetter.newLetter4 === '' ||
      newLetter.newLetter4 === null
    ) {
      resultToReturn = true;
    } else {
      resultToReturn = false;
    }
    return resultToReturn;
  }

  const editInput = e => {
    const name = e.target.name;
    const value = e.target.value.replace(/[^a-z]/gi, '');
    setNewLetter((prev) => {
      return  { ...prev, [name]: value};
    })
  };

  return (
    <div>
      <div>
        {rows.map((row, index, setRows) => {
          return (
            <div key={index}>
              <ul className="allRows">
                <WordRow index={index} row={row} rowLength={rows.length} />
              </ul>
            </div>
          );
        })}
      </div>
      <div>
        {rows.length < 5 ? (
          <div className="rowForm">
            {(randomPosition === 0 && easyHard === 'easy' && rows.length === 0) || (
              randomPosition === 0 && easyHard === 'hard') ? (
              <input 
                required 
                name="newLetter0" 
                type="text" 
                value={newLetter.newLetter0} 
                readOnly={true} 
              />
            ) : (
              <input
                required
                name="newLetter0"
                type="text"
                value={newLetter.newLetter0}
                maxLength="1"
                title="Only letter of alphabet"
                onChange={editInput}
              />
            )}
            {(randomPosition === 1 && easyHard === 'easy' && rows.length === 0) || (
              randomPosition === 1 && easyHard === 'hard') ? (
              <input required name="newLetter1" type="text" value={newLetter.newLetter1} readOnly={true} />
            ) : (
              <input
                required
                name="newLetter1"
                type="text"
                value={newLetter.newLetter1}
                maxLength="1"
                onChange={editInput}
              />
            )}
            {(randomPosition === 2 && easyHard === 'easy' && rows.length === 0) || (
              randomPosition === 2 && easyHard === 'hard') ? (
              <input required name="newLetter2" type="text" value={newLetter.newLetter2} readOnly={true} />
            ) : (
              <input
                required
                name="newLetter2"
                type="text"
                value={newLetter.newLetter2}
                maxLength="1"
                onChange={editInput}
              />
            )}
            {(randomPosition === 3 && easyHard === 'easy' && rows.length === 0) || (
              randomPosition === 3 && easyHard === 'hard') ? (
              <input required name="newLetter3" type="text" value={newLetter.newLetter3} readOnly={true} />
            ) : (
              <input
                required
                name="newLetter3"
                type="text"
                value={newLetter.newLetter3}
                maxLength="1"
                onChange={editInput}
              />
            )}
            {(randomPosition === 4 && easyHard === 'easy' && rows.length === 0) || (
              randomPosition === 4 && easyHard === 'hard') ? (
              <input required name="newLetter4" type="text" value={newLetter.newLetter4} readOnly={true} />
            ) : (
              <input
                required
                name="newLetter4"
                type="text"
                value={newLetter.newLetter4}
                maxLength="1"
                onChange={editInput}
              />
            )}
            <button type="submit" onClick={addRow}>
              Add
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default WordList;
