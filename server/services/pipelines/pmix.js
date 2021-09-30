const pmix = [
  {
    $match: {
      canceled: false,
    },
  },
  {
    $unwind: {
      path: '$orderItems',
    },
  },
  {
    $lookup: {
      from: 'menus',
      localField: 'menuId',
      foreignField: '_id',
      as: 'menu',
    },
  },
  {
    $unwind: {
      path: '$menu',
    },
  },
  {
    $group: {
      _id: '$orderItems.name',
      menu: {
        $first: '$menu.name',
      },
      avgPrice: {
        $avg: '$orderItems.price',
      },
      itemCount: {
        $sum: '$orderItems.quantity',
      },
    },
  },
];
