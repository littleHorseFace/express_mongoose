const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const models = require('./models/product')
mongoose.connect('mongodb://localhost:27017/newProduct', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', () => {
  console.log('error')
});
db.once('open', () => {
  console.log("conection succesful")
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/products', async (req, res) => {
  const products = await models.find({})
  res.render('./products/index', { products })
})

app.get('/products/:id', async (req, res) => {
  const { id } = req.params
  const showProduct = await models.findById(id)
  res.render('./products/show', { showProduct })
})
app.listen(3000, () => {
  console.log('we are connection')
})