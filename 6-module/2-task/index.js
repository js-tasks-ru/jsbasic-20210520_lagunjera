import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.render();
  }

  render() {
    let cardTop = this.createCardTop();
    let cardBody = this.createCardBody();

    if (!this.elem) {
      this.elem = document.createElement('div');
      this.elem.addEventListener('click', this.addProduct.bind(this));
    }

    this.elem.append(cardTop);
    this.elem.append(cardBody);
    this.elem.classList.add('card');
  }

  createCardTop() {
    let productImg = `<img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">`;
    let productPrice = `<span class="card__price">€${this.product.price.toFixed(2)}</span>`;
    let div = document.createElement('div');

    div.insertAdjacentHTML('afterbegin', productImg + productPrice);
    div.classList.add('card__top');

    return div;
  }

  createCardBody() {
    let cardTitle = document.createElement('div');
    let productName = this.product.name;
    let button = document.createElement('button');
    let div = document.createElement('div');

    cardTitle.insertAdjacentHTML('afterbegin', productName);
    cardTitle.classList.add('card__title');

    button.insertAdjacentHTML('afterbegin', '<img src="/assets/images/icons/plus-icon.svg" alt="icon">');
    button.setAttribute('type', 'button');
    button.classList.add('card__button');

    div.append(cardTitle);
    div.append(button);
    div.classList.add('card__body');

    return div;
  }

  addProduct(event) {
    if (!event.target.closest('.card__button')) {
      return;
    }

    let eventAddProduct = new CustomEvent('product-add', {detail: this.product.id, bubbles: true});
    this.elem.dispatchEvent(eventAddProduct);
  }

}