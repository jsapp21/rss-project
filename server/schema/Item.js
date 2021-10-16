class Item {
  constructor(menuId, name, price, outOfStock, tempOutOfStock) {
    this.menuId = menuId;
    this.name = name;
    this.price = price;
    this.outOfStock = outOfStock;
    this.tempOutOfStock = tempOutOfStock;
  }
}

module.exports = {
  Item,
};
