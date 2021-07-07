export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

