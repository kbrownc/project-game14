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
