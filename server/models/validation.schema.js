/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const yup = require('yup');
const { ObjectId } = require('bson');

const id = new ObjectId();
const menu1 = [{ _id: id, name: 'Foo Bar' }];
const item1 = { _id: id, menuId: id, name: 'Pizza', price: 3.55, outOfStock: false };
const order1 = {
  _id: id,
  menuId: id,
  userId: id,
  orderItems: [{ name: 'slice of pizza', price: 3.55, quantity: 2, outOfStock: false, tempOutOfStock: false }],
  orderTotal: 12.5,
  createdOn: new Date(),
};

const Menu = yup.array().of(
  yup.object().shape({
    _id: yup.string().required(),
    name: yup.string().required(),
  }),
);

// Menu.isValid(menu1).then((isValid) => console.log(`menu1 is valid? ${isValid}`));

const Item = yup.object({
  _id: yup.string(),
  menuId: yup.string().required(),
  name: yup.string().required(),
  price: yup.number().positive().required(),
  outOfStock: yup.boolean().required(),
  tempOutOfStock: yup.boolean().required(),
});

const MenuItem = yup.array().of(Item);

// Item.isValid(item1).then((isValid) => console.log(`item1 is valid? ${isValid}`));

const orderedItems = yup.object({
  name: yup.string().required(),
  price: yup.number().positive().required(),
  quantity: yup.number().positive().required(),
  outOfStock: yup.boolean().required(),
  tempOutOfStock: yup.boolean().required(),
});

const Order = yup.object({
  _id: yup.string(),
  menuId: yup.string().required(),
  orderItems: yup.array().of(orderedItems).required(),
  orderTotal: yup.number().required(),
  userId: yup.string().required(),
  createdOn: yup.date(),
});

// Order.isValid(order1).then((isValid) => console.log(`order1 is valid? ${isValid}`));

module.exports = {
  Menu,
  Item,
  Order,
  MenuItem,
};
