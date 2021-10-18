/* eslint-disable no-unused-expressions */
const { makeExecutableSchema } = require('graphql-tools');
const itemResolvers = require('./resolvers/item.resolvers');

const typeDefs = `
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
    getMenu(id: ID!): [Menu]
  }

  type Query {
    getMenuItems(menuId: ID!): [Item]
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers: itemResolvers });

module.exports = {
  schema,
};
