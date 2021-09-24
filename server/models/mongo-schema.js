import { ObjectId } from 'bson';

const Users = {
  _id: ObjectId,
  name: String,
  role: String,
};

const Menus = {
  _id: ObjectId,
  name: String,
};

const Items = {
  _id: ObjectId,
  menuId: Menus.ObjectId,
  name: String,
  price: Number,
  outOfStock: Boolean,
};

const Orders = {
  _id: ObjectId,
  menuId: Menus.ObjectId,
  orderedItems: [Items, Items],
  createdOn: new Date(),
};
