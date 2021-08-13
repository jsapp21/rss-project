const mongoose = require("mongoose");

const Menu = mongoose.model('Menu', {
  item: {
    type: String
  },
  price: {
    type: Number
  }
});

module.exports = Menu