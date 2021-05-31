let calculator = {
  
  read(a, b) {
    this.firstNum = a;
    this.secondNum = b;
  },
  
  sum() {
    return this.firstNum + this.secondNum;
  },
  
  mul() {
    return this.firstNum * this.secondNum;
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
