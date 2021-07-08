import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {

    this.createBaseComponents();
    
    let response = await fetch('products.json');

    if (!response.ok) {
      return;
    }

    this.products = await response.json();
    
    this.productsGrid = new ProductsGrid(this.products);

    let productsGridHolder = document.querySelector('[data-products-grid-holder]');

    productsGridHolder.innerHTML = null;
    productsGridHolder.append(this.productsGrid.elem);
    
    this.initialProductsFiltering();
    
    this.addEventListeners();

  }


  createBaseComponents() {
    this.carousel = new Carousel(slides);
    document.querySelector('[data-carousel-holder]')
            .append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]')
            .append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    document.querySelector('[data-slider-holder]')
            .append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]')
            .append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);
  }
  
  initialProductsFiltering() {
    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });
  }

  addEventListeners() {
    this.stepSlider.elem.addEventListener('slider-change', this.onSliderChange.bind(this));    
    this.ribbonMenu.elem.addEventListener('ribbon-select', this.onRibbonSelect.bind(this));
    document.querySelector('body').addEventListener('product-add', this.onProductAdd.bind(this));
    document.querySelector('#nuts-checkbox').addEventListener('change', this.onChangeNutsCbx.bind(this));
    document.querySelector('#vegeterian-checkbox').addEventListener('change', this.onChangeVegeterianCbx.bind(this));
  }

  onProductAdd(event) {
    console.log(this);
    let productId = event.detail;
    let product = this.products.filter(
      product => product.id == productId
    )[0];

    this.cart.addProduct(product);
    
  }

  onSliderChange(event) {
    let spicyness = event.detail;

    this.productsGrid.updateFilter({
      maxSpiciness: spicyness
    });
  }

  onRibbonSelect(event) {
    let categoryId = event.detail;

    this.productsGrid.updateFilter({
      category: categoryId
    });
  }

  onChangeNutsCbx(event) {
    this.productsGrid.updateFilter({
      noNuts: event.target.checked
    });
  }

  onChangeVegeterianCbx(event) {
    this.productsGrid.updateFilter({
      noNuts: event.target.checked
    });

  }
}
