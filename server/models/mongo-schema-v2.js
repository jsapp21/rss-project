import { ObjectId } from 'bson';

const User = {
  _id: ObjectId,
  name: String,
  role: String,
};

const Menu = {
  _id: ObjectId,
  name: String,
};

const Item = {
  _id: ObjectId,
  menu: Menu._id,
  name: String,
  price: Number,
  outOfStock: Boolean,
  removed: Boolean,
};

// item on both menus
// outOfStock: temporay, updates item only, displays on UI but unable to order
// removed: perminate, transaction (update prev orders & updated item, does not display on UI)

const Order = {
  _id: ObjectId,
  orderNumber: Number,
  orderedItems: [Item, Item],
  total: Number,
  createdOn: new Date(),
};

// can order from multiple menus
// can update an item

// Reports page
// display orders by each item
// search by order number - index orderNumber
// total sales by each Menu - $sum
// PMIX: for each menu, number of times & sales for each item

// setTimeout for order confirmation
