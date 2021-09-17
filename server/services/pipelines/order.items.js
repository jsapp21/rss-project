const { ObjectId } = require('bson');

const ordersWithItems = [
  {
    $match: {
      'orderItems.itemId': new ObjectId('6138d6894cd22d052fcb91f6'),
    },
  },
  {
    $unwind: {
      path: '$orderItems',
    },
  },
  {
    $lookup: {
      from: 'items',
      localField: 'orderItems.itemId',
      foreignField: '_id',
      as: 'items_per_order',
    },
  },
  {
    $unwind: {
      path: '$items_per_order',
    },
  },
  {
    $group: {
      _id: '$_id',
      menuId: {
        $first: '$menuId',
      },
      items: {
        $push: {
          _id: '$orderItems.itemId',
          name: '$items_per_order.name',
          price: '$orderItems.price',
          quantity: '$orderItems.quanity',
          outOfStock: '$items_per_order.outOfStock',
        },
      },
      createdOn: {
        $first: '$createdOn',
      },
    },
  },
];

module.exports = ordersWithItems;
