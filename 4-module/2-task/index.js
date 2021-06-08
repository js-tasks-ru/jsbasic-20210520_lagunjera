function makeDiagonalRed(table) {
  for (let rowIndex = 0; rowIndex < table.rows.length; rowIndex++) {
    let tdCollection = table.rows[rowIndex].cells;
    
    for (let td of tdCollection) {
      if (td.cellIndex == rowIndex) {
        td.style.backgroundColor = 'red';
      }
    }
  }

  return table;
}
