/* eslint-disable no-unused-expressions */
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Item {
    menuId: String
    name: String
    price: Int
    outOfStock: Boolean
    tempOutOfStock: Boolean
  }

  type Query {
    getItem(menuId: String, name: String, price: Int, outOfStock: Boolean, tempOutOfStock: Boolean): Item
  }
`);

module.exports = {
  schema,
};

// you can start with defining a simple schema on your server
// for querying data (like menus or orders)
