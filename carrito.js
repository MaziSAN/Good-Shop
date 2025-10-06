export default class Carrito {
  constructor(currency = '€') {
    this.currency = currency;
    this.items = [];
  }

  addItem(title, price, image) {
    const existing = this.items.find((p) => p.title === title);
    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({
        title,
        price: Number(price),
        image,
        quantity: 1,
      });
    }
  }

  removeItem(title) {
    this.items = this.items.filter((p) => p.title !== title);
  }

  updateQuantity(title, quantity) {
    const item = this.items.find((p) => p.title === title);
    if (item) {
      item.quantity = Math.max(1, Number(quantity));
    }
  }

  clear() {
    this.items = [];
  }

  getTotal() {
    return this.items.reduce((sum, p) => sum + p.price * p.quantity, 0);
  }

  obtenerCarrito() {
    return {
      currency: this.currency,
      total: this.getTotal().toFixed(2),
      products: this.items.map((p) => ({
        title: p.title,
        price: p.price.toFixed(2),
        quantity: p.quantity,
        subtotal: (p.price * p.quantity).toFixed(2),
      })),
    };
  }
}
