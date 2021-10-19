/* eslint-disable no-debugger */
/* eslint-disable array-callback-return */
const items = require('../../services/items.service');
const menus = require('../../services/menus.service');

// obj, args, context, info
// resolver map
const itemResolvers = {
  Query: {
    getMenuItems: async (obj, args) => items.getMenuItems(args.menuId),
    getMenu: async (obj, args) => menus.getMenu(args.id),
  },
  Mutation: {
    createNewItem: async (obj, arg) => {
      const newItem = arg.input;
      const result = await items.postItem(newItem);
      return result;
    },
    updatedItemStockTemporarily: async (obj, arg) => {
      const updateItem = arg.input;
      debugger;
      const result = await items.tempOutOfStock(updateItem);
      return result.value;
    },
    deleteItemUpdateOrders: async (obj, arg) => {
      const item = arg.input;
      debugger;
      await items.deleteItemTransaction(item);
      return 'Item has been deleted and previous orders updated.';
    },
  },
};

module.exports = itemResolvers;
