/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const Menu = {
  _id: ObjectID,
  name: String,
};

const Item = {
  _id: ObjectID,
  menuId: Menu.ObjectID,
  name: String,
  price: Number,
};

const Order = {
  _id: ObjectID,
  menuId: Menu.ObjectID,
  orderItems: [
    {
      itemId: Item.ObjectID,
      price: Number,
      quanity: Number,
    },
    {
      itemId: Item.ObjectID,
      price: Number,
      quanity: Number,
    },
  ],
  createdOn: new Date(),
};
