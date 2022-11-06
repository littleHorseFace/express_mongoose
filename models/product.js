const mongoose = require('mongoose')

const productSchma = mongoose.Schema({
  name : {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true,
    min: 0
  },
  category: {
    type: String,
    enum: ['vagetable', 'fruit', 'meat']
  }
})

const products = mongoose.model('product', productSchma)
module.exports = products