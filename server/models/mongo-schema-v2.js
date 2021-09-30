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
  temptOutOfStock: Boolean,
};

// item on both menus

const Order = {
  _id: ObjectId,
  userId: User._id,
  // orderNumber: Number,
  orderItems: [Item, Item],
  orderTotal: Number,
  createdOn: new Date(),
};

// can order from multiple menus
// can update an item

// Reports page
// display orders by each item
// search by order number - index orderNumber
// total sales by each Menu - $sum
// PMIX: for each menu, number of times & sales for each item
