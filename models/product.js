const mongoose = require('mongoose')
const categoryData = require('../public/category')
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
    enum: categoryData
  }
})

const products = mongoose.model('product', productSchma)
module.exports = products