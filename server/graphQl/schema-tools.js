/* eslint-disable no-unused-expressions */
const { makeExecutableSchema } = require('graphql-tools');
const itemResolvers = require('./resolvers/item.resolvers');

const typeDefs = `
  type User {
    _id: ID
    name: String
    role: String
  }

  type Item {
    _id: ID
    menuId: ID
    name: String
    price: Float
    outOfStock: Boolean
    tempOutOfStock: Boolean
  }

  type OrderedItems {
    name: String
    price: Float
    quantity: Int
    outOfStock: Boolean
    tempOutOfStock: Boolean
  }
  
  type Menu {
    _id: ID
    name: String
  }

  type Order {
    _id: ID
    menuId: ID
    orderItems: [OrderedItems]
    orderTotal: Float
    userId: ID
    createdOn: String
  }

  type Product {
    _id: String
    menu: String
    avgPrice: Float
    itemCount: Int
  }

  type Query {
    getMenus: [Menu]
    getMenuItems(menuId: ID!): [Item]
    getUsers: [User]
    getOrders(userId: ID!): [Order]
    getPmix: [Product]
  }

  input ItemInput {
    _id: ID
    menuId: String
    name: String
    price: Int
    quantity: Int
    outOfStock: Boolean = false
    tempOutOfStock: Boolean = false
  }

  input OrderInput {
    _id: ID
    menuId: ID
    orderItems: [ItemInput]
    orderTotal: Float
    userId: ID
    createdOn: String
  }

  type Mutation {
    addItem(input: ItemInput): Item
    updatedItemStock(input: ItemInput): Item
    deleteItem(input: ItemInput): Item
    addOrder(input: OrderInput): Order
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers: itemResolvers });

module.exports = {
  schema,
};
