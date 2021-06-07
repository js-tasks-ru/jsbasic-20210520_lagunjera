function highlight(table) {
  let rows = table.tBodies[0].rows;
  
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            
    if (rows[rowIndex].cells[3].hasAttribute('data-available')) {
      let availableAttr = rows[rowIndex].cells[3].dataset.available;
      
      if (availableAttr == 'true') {
        rows[rowIndex].classList.add('available');
      } else {
        rows[rowIndex].classList.add('unavailable');
      }

    } else {
      rows[rowIndex].hidden = true;
    }
    
    if (rows[rowIndex].cells[2].innerHTML == 'm') {
      rows[rowIndex].classList.add('male');
    } else {
      rows[rowIndex].classList.add('female');
    }

    if (rows[rowIndex].cells[1].innerHTML < 18) {
      rows[rowIndex].style.textDecoration = 'line-through';
    }
  }

  return table;  
}