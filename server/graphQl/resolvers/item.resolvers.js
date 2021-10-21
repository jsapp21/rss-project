/* eslint-disable no-debugger */
/* eslint-disable array-callback-return */
const items = require('../../services/items.service');
const menus = require('../../services/menus.service');
const users = require('../../services/users.service');
const orders = require('../../services/orders.service');

// obj, args, context, info
// resolver map
const itemResolvers = {
  Query: {
    getMenuItems: async (obj, args) => {
      const result = await items.getMenuItems(args.menuId);
      return result;
    },
    getMenus: async () => menus.getAllMenus(),
    getUsers: async () => users.getUsers(),
    getOrders: async (obj, args) => {
      const result = await orders.getAllOrdersByUser(args.userId);
      return result;
    },
    getPmix: async () => orders.pmixReport(),
  },
  Mutation: {
    addItem: async (obj, arg) => {
      const newItem = arg.input;
      const result = await items.postItem(newItem);
      return result;
    },
    updatedItemStock: async (obj, arg) => {
      const updateItem = arg.input;
      const result = await items.tempOutOfStock(updateItem);
      return result.value;
    },
    deleteItem: async (obj, arg) => {
      const item = arg.input;
      await items.deleteItemTransaction(item);
    },
    addOrder: async (obj, arg) => {
      // TODO: make this work
      const order = arg.input;
      debugger;
      const result = await orders.postOrder(order);
      debugger;
      return result;
    },
  },
};

module.exports = itemResolvers;
