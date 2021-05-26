function factorial(n) {
  let result = 1;
  
  for (let i = 0; (n - i) != 0; i++) {
    result *= n - i;
  }

  return result;    
}
