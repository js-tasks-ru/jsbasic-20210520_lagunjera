import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.addEventListeners();
  }
  
  render() {
    if (!this.elem) {
      this.elem = createElement(`<div class="ribbon"></div>`);
    }

    let arrowLeft = this.createRibbonArrowLeft();
    let arrowRight = this.createRibbonArrowRight();
    
    let ribbonInner = this.createRibbonInner();

    this.elem.append(ribbonInner);
    this.elem.append(arrowLeft);
    this.elem.append(arrowRight);
  }

  createRibbonArrowLeft() {
    return createElement(`<button class="ribbon__arrow ribbon__arrow_left">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </button>`);
  }

  createRibbonArrowRight() {
    return createElement(`<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </button>`); 
  }

  createRibbonInner() {
    let ribbonStr = this.categories.map(item => `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`)
                                     .join('');

    let ribbonInner = createElement(`<nav class="ribbon__inner">` + ribbonStr + `</nav>`);
    ribbonInner.firstElementChild.classList.add('ribbon__item_active');
    ribbonInner.lastElementChild.dataset.id = 'on-the-side ribbon__item_active';

    return ribbonInner;
  }

  addEventListeners() {
    this.elem.addEventListener('click', this.shiftMenu.bind(this));
    this.elem.addEventListener('click', this.chooseCategory.bind(this));
    this.elem.querySelector('.ribbon__inner').addEventListener('scroll', this.onScroll.bind(this));
  }

  shiftMenu(e) {
    let ribbonInner = document.querySelector(".ribbon__inner");

    if (e.target.closest(".ribbon__arrow_right")) {
      ribbonInner.scrollBy(350, 0);

      this.updateArrows();
    }
    
    if (e.target.closest(".ribbon__arrow_left")) {
      ribbonInner.scrollBy(-350, 0);

      this.updateArrows();
    } 

  }

  chooseCategory(e) {
    if (!e.target.closest('.ribbon__item')) {
      return;
    }

    e.preventDefault();
    
    let allRibbonItems = document.getElementsByClassName('ribbon__item');
    
    for (let i = 0; i < allRibbonItems.length; i++) {
      allRibbonItems[i].classList.remove('ribbon__item_active');
    }

    let ribbonItemChosen = e.target.closest('.ribbon__item');
    ribbonItemChosen.classList.add('ribbon__item_active');

    let categoryChosen = new CustomEvent('ribbon-select', {detail: e.target.closest('.ribbon__item').dataset.id, bubbles: true});
    this.elem.dispatchEvent(categoryChosen);

  }

  onScroll(event) {
    this.updateArrows();
  }

  updateArrows() {
    let arrowLeft = document.querySelector(".ribbon__arrow_left");
    let arrowRight = document.querySelector(".ribbon__arrow_right");
    let ribbonInner = document.querySelector(".ribbon__inner");
    let scrollWidth = ribbonInner.scrollWidth;
    let clientWidth = ribbonInner.clientWidth;
    let scrollLeft = ribbonInner.scrollLeft;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;


    scrollRight = scrollRight < 1 ? 0 : scrollRight;

    if (scrollRight > 0) {
      arrowRight.classList.add('ribbon__arrow_visible');
    } else {
      arrowRight.classList.remove('ribbon__arrow_visible');
    }

    if (scrollLeft > 0) {
      arrowLeft.classList.add('ribbon__arrow_visible');
    } else {
      arrowLeft.classList.remove('ribbon__arrow_visible');
    }

  }

}
