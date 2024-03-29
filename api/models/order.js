const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Productss',
    required: true,
  },
  quantity: {
    type: Number,
    defaulte: 1,
  },
});

module.exports = mongoose.model('Order', orderSchema);
