/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const Menu = {
  _id: ObjectID,
  name: String,
};

const Item = {
  _id: ObjectID,
  menuId: Menu.ObjectID,
  name: String,
  price: Number,
  outOfStock: false,
};

const Order = {
  _id: ObjectID,
  menuId: Menu.ObjectID,
  orderItems: [
    {
      itemId: Item.ObjectID,
      price: Number,
      quanity: Number,
    },
    {
      itemId: Item.ObjectID,
      price: Number,
      quanity: Number,
    },
  ],
  createdOn: new Date(),
};

// findAndModify({ query: {"orderItems.itemId": "61268fd994e188d819d9ec03" }, update: [{ $set: { "orderItems.outOfStock": true } }], new: true })
// updates all items both

// .findAndModify({ query: {"orderItems.itemId": "61268fd994e188d819d9ec03" }, update: [{ $set: { "orderItems.$[elem].outOfStock": true } }], arrayFilters: [{ "elem.itemId": { $eq: "61268fd994e188d819d9ec03" } }] }) 
