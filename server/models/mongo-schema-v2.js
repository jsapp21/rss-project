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

const Order = {
  _id: ObjectId,
  userId: User._id,
  // orderNumber: Number,
  orderItems: [Item, Item],
  orderTotal: Number,
  createdOn: new Date(),
};
