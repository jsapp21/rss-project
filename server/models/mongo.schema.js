const User = {
    "_id": ObjectID,
    "name": String
}

const Item = {
   "_id": ObjectID,
   "name": String,
   "price": Number
}

const Order = {
    userId: User.ObjectID,
    "orderItems": [
        {
          "menuId": Item.ObjectID,
          "price": Number,
          "quanity": Number
        },
        {
            "menuId": Item.ObjectID,
            "price": Number,
            "quanity": Number
        }
    ]
}