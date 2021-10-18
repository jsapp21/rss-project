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
    // WORKING ON MUTATIONS NEXT
  },
};

module.exports = itemResolvers;
