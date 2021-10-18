class Item {
  constructor(id, menuId, name, price, outOfStock, tempOutOfStock) {
    this.id = id;
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
