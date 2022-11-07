const mongoose = require('mongoose')
const product = require('./models/product')
mongoose.connect('mongodb://127.0.0.1:27017/products', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', () => {
  console.log('error')
});
db.once('open', () => {
  console.log("conection succesful")
})

const seedProduct = [
  {
    name: 'banana',
    price: 25,
    category: 'fruit'
  },
  {
    name: 'fish',
    price: 45,
    category: 'meat'
  },
  {
    name: 'spinach',
    price: 30,
    category: 'vagetable'
  },
  {
    name: 'apple',
    price: 35,
    category: 'fruit'
  },
  {
    name: 'pork',
    price: 40,
    category: 'meat'
  },
  {
    name: 'Cabbage',
    price: 35,
    category: 'vagetable'
  }
]

product.insertMany(seedProduct)
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
