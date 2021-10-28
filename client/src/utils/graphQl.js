import { gql } from '@apollo/client';

// ################## QUERIES ##################

export const GET_ITEMS = gql`
  query GetMenuItems($menuId: String!) {
    getMenuItems(menuId: $menuId) {
      _id
      name
      price
      tempOutOfStock
      outOfStock
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      _id
      name
    }
  }
`;

export const GET_MENUS = gql`
  query GetMenu {
    getMenus {
      _id
      name
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders($userId: String!) {
    getOrders(userId: $userId) {
      _id
      orderTotal
      orderItems {
        name
        price
        quantity
        outOfStock
        tempOutOfStock
      }
      createdOn
      canceled
    }
  }
`;

export const GET_PMIX = gql`
  query GetPmix {
    getPmix {
      name
      menu
      avgPrice
      itemCount
    }
  }
`;

// ################## MUTATIONS ##################

export const ADD_ITEM = gql`
  mutation AddItem($input: ItemInput) {
    addItem(input: $input) {
      menuId
      name
      price
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation DeleteItem($input: ItemInput) {
    deleteItem(input: $input) {
      _id
      name
    }
  }
`;

export const UPDATE_ITEM_STOCK = gql`
  mutation UpdatedItemStock($input: ItemInput) {
    updatedItemStock(input: $input) {
      _id
      tempOutOfStock
    }
  }
`;

export const ADD_ORDER = gql`
  mutation AddOrder($input: OrderInput) {
    addOrder(input: $input) {
      _id
      orderItems {
        name
      }
    }
  }
`;
