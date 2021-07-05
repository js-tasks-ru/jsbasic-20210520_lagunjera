import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    let cartItem = {
      product: product,
      count: 1
    };

    let oldCartItem = this.cartItems.find(
      item => item.product == cartItem.product
    );

    if (!oldCartItem) {
      this.cartItems.push(cartItem);
    } else {
      oldCartItem.count = oldCartItem.count + 1;
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let oldCartItem = this.cartItems.find(
      item => item.product.id == productId
    );

    oldCartItem.count = oldCartItem.count + amount;

    if (oldCartItem.count == 0) {
      let index = this.cartItems.indexOf(oldCartItem);
      this.cartItems.splice(index, 1);
    }
    
    this.onProductUpdate(oldCartItem);
  }

  isEmpty() {
    return this.cartItems.length == 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, cartItem) => sum + cartItem.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, cartItem) => sum + cartItem.product.price * cartItem.count, 0);
  }

  renderProduct(product, count) {
    return createElement(
      `<div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal();
    let body = createElement('<div></div>');
    let bodyForm = this.renderOrderForm();

    modal.setTitle('Your order');
    
    for (let cartItem of this.cartItems) {
      body.append(this.renderProduct(cartItem.product, cartItem.count));
    }
    
    body.append(bodyForm);
    modal.setBody(body);

    modal.open();

    document.querySelector('.modal__body')
            .addEventListener('click', this.changeCountModal.bind(this));

    document.querySelector('.cart-form')
            .addEventListener('submit', this.onSubmit.bind(this));

  }

  changeCountModal(event) {
    if (!event.target.closest('.cart-counter__button')) {
      return;
    }

    let productId = event.target.closest('.cart-product').dataset.productId;
    
    if (event.target.closest('.cart-counter__button_plus')) {
      this.updateProductCount(productId, 1);
    }

    if (event.target.closest('.cart-counter__button_minus')) {
      this.updateProductCount(productId, -1);
    }  
  }

  onProductUpdate(cartItem) {
    let modalOpen = document.querySelector('body').classList.contains('is-modal-open');

    if (modalOpen) {
      let productId = cartItem.product.id;
      let modalBody = document.querySelector('.modal__body');
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

 
      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      if (this.isEmpty()) {
        let modal = new Modal();
        modal.close();
      }
    }

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    let btnSubmit = document.querySelector('button[type="submit"]');
    btnSubmit.classList.add('is-loading');

    event.preventDefault();

    let form = document.querySelector('.cart-form');

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form)
    })
    .then(response => {
      if (response.ok) {
        /* let modal = new Modal();
        modal.setTitle('Success!'); */
      
        document.querySelector('.modal__title').textContent = 'Success!';
        
        document.querySelector('.modal__body').innerHTML = `
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
      `;

        this.cartItems = [];
        this.cartIcon.update(this);
      }    

    });

  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

