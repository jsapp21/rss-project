/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const yup = require('yup');
const { ObjectId } = require('mongodb');

const id = new ObjectId();
const menu1 = [{ _id: id, name: 'Foo Bar' }];
const item1 = { _id: id, menuId: id, name: 'Pizza', price: 3.55, outOfStock: false };
const order1 = {
  _id: id,
  menuId: id,
  orderItems: [{ itemId: id, price: 3.55, quanity: 2, outOfStock: false }],
  createdOn: new Date(),
};

const Menu = yup.array().of(
  yup.object().shape({
    _id: yup.string().required(),
    name: yup.string().required(),
  }),
);

Menu.isValid(menu1).then((isValid) => console.log(`menu1 is valid? ${isValid}`));

const Item = yup.object({
  _id: yup.string().required(),
  menuId: yup.string().required(),
  name: yup.string().required(),
  price: yup.number().positive().required(),
  outOfStock: yup.boolean().required(),
});

const MenuItem = yup.array().of(Item);

Item.isValid(item1).then((isValid) => console.log(`item1 is valid? ${isValid}`));

const orderedItems = yup.object({
  itemId: yup.string().required(),
  price: yup.number().positive().required(),
  quanity: yup.number().positive().required(),
  outOfStock: yup.boolean(),
});

const Order = yup.object({
  _id: yup.string().required(),
  menuId: yup.string().required(),
  orderItems: yup.array().of(orderedItems).required(),
  createdOn: yup.date().required(),
});

Order.isValid(order1).then((isValid) => console.log(`order1 is valid? ${isValid}`));

module.exports = {
  Menu,
  Item,
  Order,
  MenuItem,
};
