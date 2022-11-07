const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverRide = require('method-override')
const models = require('./models/product')
const categoryData = require('./public/category')
mongoose.connect('mongodb://127.0.0.1:27017/products', { useNewUrlParser: true, useUnifiedTopology: true })


const db = mongoose.connection;
db.on('error', () => {
  console.log('error')
});
db.once('open', () => {
  console.log("conection succesful")
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(methodOverRide('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/products', async (req, res) => {
  const categoryClass = req.query.category
  console.log(categoryClass)
  if (categoryClass) {
    const products = await models.find({ category: categoryClass, All : category})
    res.render('./products/index', { products })
  } else {
    const products = await models.find({})
    res.render('./products/index', { products , All: All})
  }


})

app.get('/products/new', (req, res) => {
  res.render('./products/new')
})

app.get('/products/:id/adit', async (req, res) => {
  const { id } = req.params
  console.log(id)
  const aditProduct = await models.findById(id)
  res.render('./products/adit', { aditProduct, categoryData })
})

app.get('/products/:id', async (req, res) => {
  const { id } = req.params
  const showProduct = await models.findById(id)
  res.render('./products/show', { showProduct })
})

app.post('/products/new', (req, res) => {
  const productNew = req.body
  const model = new models(productNew)
  model.save()
  res.redirect(`/products/${model._id}`)
})
//加 async 是為了要讓 資料庫尋找資料時 可以使用await去賦予變數的值 不然會出現錯誤
app.put('/products/:id', async (req, res) => {
  const newProduct = req.body
  const id = req.params.id
  const aditProduct = await models.findByIdAndUpdate(id, newProduct, { runValidators: true, new: true })
  res.redirect(`/products/${aditProduct._id}`)
})

app.delete('/products/:id', async (req, res) => {
  const id = req.params.id
  await models.findByIdAndDelete(id)
  res.redirect('/products')
})

app.listen(3000, () => {
  console.log('we are connection')
})