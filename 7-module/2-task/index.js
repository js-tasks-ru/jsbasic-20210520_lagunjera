import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    if (!this.elem) {
      this.elem = this.createModal();
    }
  }

  createModal() {
    return createElement(`<div class="modal">
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
        Вот сюда нужно добавлять заголовок
        </h3>
      </div>

      <div class="modal__body">
      A сюда нужно добавлять содержимое тела модального окна
      </div>
    </div>

  </div>`);
  }

  setTitle(title) {
    let elem = this.elem.querySelector('.modal__title');
    elem.innerHTML = title;
  }

  setBody(node) {
    let modalBody = this.elem.querySelector('.modal__body');
    modalBody.innerHTML = null;
    modalBody.append(node);
  }

  open() {
    let body = document.querySelector('body');
    //let container = document.querySelector('.container');
    //let button; 

    body.append(this.elem);
    body.classList.add('is-modal-open');

    //button = document.querySelector('.modal__close');
    
    document.addEventListener('click', this.closeBtn.bind(this));
    document.addEventListener('keydown', this.closeEsc.bind(this));
  }

  close() {
    let body = document.querySelector('body');
    let modal = document.querySelector('.modal');
     
    if (modal) {
      modal.remove();
    }

    body.classList.remove('is-modal-open');

    document.removeEventListener('click', this.closeBtn.bind(this));
    document.removeEventListener('keydown', this.closeEsc.bind(this));

  }

  closeBtn(e) {
    if (!e.target.closest('.modal__close')) {
      return;
    }

    this.close();
  }

  closeEsc(e) {
    let key = 'Escape';

    if (!(e.key === key && e.code === key)) {
      return;
    }

    e.preventDefault();
    this.close();
  }   

}
