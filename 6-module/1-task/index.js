/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.render();
  }

  render() {
    if (!this.elem) {
      this.elem = document.createElement('table');
      this.elem.addEventListener('click', this.onClickDelete);
    }
      
    this.elem.insertAdjacentHTML("afterbegin", "<thead><tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr></thead><tbody></tbody>");

    let tbody = this.elem.lastElementChild;

    let trs = this.rows.map(row => `<tr><td>${row.name}</td><td>${row.age}</td><td>${row.salary}</td><td>${row.city}</td><td><button>X</button></td></tr>`).join('');

    tbody.insertAdjacentHTML("beforeEnd", trs);
  }

  onClickDelete(event) {
    if (event.target.tagName !== "BUTTON") {
      return;
    }

    event.target.closest("tr").remove();

  }
   
}