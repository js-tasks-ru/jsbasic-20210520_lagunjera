import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render() {
    if (!this.elem) {
      this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>`);
    }

    this.elem.querySelector('.products-grid__inner').innerHTML = '';

    for (let product of this.products) {
      let productCard = new ProductCard(product);
      this.elem.querySelector('.products-grid__inner').append(productCard.elem);
    }
  }


  updateFilter(filters) {
    for (let key in filters) {
      this.filters[key] = filters[key];
    }

    this.filterProducts();
  }


  filterProducts(filters) {
    filters = this.filters;
    let filteredProducts = this.products;

    if ((!filters.noNuts || filters.noNuts == false) && 
        (!filters.vegeterianOnly || filters.noNvegeterianOnlyuts == false) && 
        (!filters.maxSpiciness || filters.maxSpiciness == 4) && 
        (!filters.category || filters.category == '')
    ) {
      this.render();
    }

    if (filters.noNuts) {
      filteredProducts = filteredProducts.filter(item => 
        item.nuts !== true
      );
    }

    if (filters.vegeterianOnly) {
      filteredProducts = filteredProducts.filter(item => 
        item.vegeterian == true
      );
    }

    if (filters.maxSpiciness) {
      filteredProducts = filteredProducts.filter(item => 
        item.spiciness <= filters.maxSpiciness
      );
    }

    if (filters.category) {
      filteredProducts = filteredProducts.filter(item => 
        item.category == filters.category
      );
    }
   
    this.elem.querySelector('.products-grid__inner').innerHTML = '';

    for (let product of filteredProducts) {
      let productCard = new ProductCard(product);
      this.elem.querySelector('.products-grid__inner').append(productCard.elem);
    }

    
  }
}
