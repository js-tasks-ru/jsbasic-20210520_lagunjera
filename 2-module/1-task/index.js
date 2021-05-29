function sumSalary(salaries) {
  let sumSalaries = 0;

  for (let prop in salaries) {
    if (isFinite(salaries[prop]) && 
        typeof (salaries[prop]) !== 'boolean') {
      
      sumSalaries += salaries[prop];
    }
  }
  return sumSalaries;
}
