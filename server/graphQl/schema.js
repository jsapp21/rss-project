/* eslint-disable no-unused-expressions */
const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
  type User {
    _id: ID
    name: String
    role: String
  }

  type Item {
    _id: ID
    menuId: String
    name: String
    price: Float
    quantity: Int
    outOfStock: Boolean
    tempOutOfStock: Boolean
    orders: [Order]
  }
  
  type Menu {
    _id: ID
    name: String
  }

  type Order {
    _id: ID
    menuId: String
    orderItems: [Item]
    orderTotal: Float
    userId: String
    createdOn: String
    canceled: Boolean
  }

  type Product {
    name: String
    menu: String
    avgPrice: Float
    itemCount: Int
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

  input OrderedItemInput {
    name: String
    price: Float
    quantity: Int
    outOfStock: Boolean
    tempOutOfStock: Boolean
  }
  
  input OrderInput {
    menuId: String
    orderTotal: Float
    orderItems: [OrderedItemInput]
    userId: String
    createdOn: String
    canceled: Boolean
  }

  input OrdersInputFilter {
    _id: ID
    menuId: String
    orderItems: [Item]
    orderTotal: Float
    userId: String
    createdOn: String
    canceled: Boolean
  }
  
  type Query {
    getMenus: [Menu]
    getMenuItems(menuId: String!): [Item]
    getUsers: [User]
    getOrders(userId: String!, input: OrdersInputFilter): [Order]
    getPmix: [Product]
  }
  
  type Mutation {
    addItem(input: ItemInput): Item
    updatedItemStock(input: ItemInput): Item
    deleteItem(input: ItemInput): Item
    addOrder(input: OrderInput): Order
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = {
  schema,
};
