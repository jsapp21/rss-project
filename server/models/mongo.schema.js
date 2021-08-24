const User = {
    "_id": ObjectID,
    "name": String
}

const Item = {
   "_id": ObjectID,
   "userId": User.ObjectID,
   "name": String,
   "price": Number
}

const Order = {
    "_id": ObjectID,
    "userId": User.ObjectID,
    "orderItems": [
        {
          "menuId": Item.ObjectID,
          "price": Number,
          "quanity": Number,
        },
        {
            "menuId": Item.ObjectID,
            "price": Number,
            "quanity": Number
        }
    ],
    "createdOn": new Date()
}