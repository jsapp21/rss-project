/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const yup = require('yup');

const User = yup.array().of(
  yup.object().shape({
    _id: yup.string(),
    name: yup.string().required(),
    role: yup.string().required(),
  }),
);

const Menu = yup.array().of(
  yup.object().shape({
    _id: yup.string(),
    name: yup.string().required(),
  }),
);

const Item = yup.object({
  _id: yup.string(),
  menuId: yup.string().required(),
  name: yup.string().required(),
  price: yup.number().positive().required(),
  outOfStock: yup.boolean().required(),
  tempOutOfStock: yup.boolean().required(),
});

const MenuItem = yup.array().of(Item);

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
  canceled: yup.boolean(),
  createdOn: yup.date(),
});

module.exports = {
  User,
  Menu,
  Item,
  Order,
  MenuItem,
};
