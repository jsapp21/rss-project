const { ObjectId } = require('bson');

lookUpOrders: (id) =>
    mongoService.db
      .collection('orders')
      .aggregate([
        {
          $match: {
            'orderItems.itemId': new ObjectId(id),
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
      ])
      .toArray(),
      