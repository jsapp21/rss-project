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
  
  type Menu {
    _id: ID
    name: String
  }

  type Query {
    getMenus: [Menu]
    getMenuItems(menuId: ID!): [Item]
    getUsers: [User]
  }

  input AddItemInput {
    _id: ID
    menuId: String!
    name: String!
    price: Int!
    outOfStock: Boolean = false
    tempOutOfStock: Boolean = false
  }

  input UpdateItemInput {
    _id: ID!
    tempOutOfStock: Boolean!
  }

  input DeleteItemInput {
    _id: ID!
    name: String!
  }

  type Mutation {
    createNewItem(input: AddItemInput): Item
    updatedItemStockTemporarily(input: UpdateItemInput): Item
    deleteItemUpdateOrders(input: DeleteItemInput): String
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers: itemResolvers });

module.exports = {
  schema,
};
