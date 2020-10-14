const express = require('express');
const app = express();
const port = 3002;
const faker = require('faker');

const db = require('./database/models');
const data = require('./data/testData.js');
const path = require('path');
const { QueryTypes } = require('sequelize');
const sequelize = require('./database/index.js');
const cors = require('cors');

app.use(cors());

app.use(express.static(path.join(__dirname, '../client/public/dist')))


// getting all products data from DB
app.get('/products', async (req, res) => {
    try {		
      const data = await db.Product.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']}
      })
      res.send(data);
    } catch (e) {
    console.error(e)
    } 
})

// getting a specific product's data from the DB
app.get('/products/:productId', async (req, res) => {
  const data = await db.Product.findAll({
    where: {
      id: req.params.productId
    },
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
    res.send(data[0]);
  })

// store a specific product's data into the DB
app.post('/products/:productId', async (req, res) => {
  const data = await db.Product.findOrCreate({
    where: {
      id: req.params.productId,
      name: faker.commerce.product(),
      price: (faker.commerce.price() % 40 + 10),
      reviews: parseFloat(((Math.random() * 2) + 3).toFixed(2)),
      reviewCount: Math.floor(Math.random() * 35)
    },
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
    res.send(data[0]);
    res.end();
})

// update a specific product's data on the DB
app.put('/products/:productId', async (req, res) => {
  const data = await db.Product.upsert({
    id: req.params.productId,
    name: faker.commerce.product(),
    price: (faker.commerce.price() % 40 + 10),
    reviews: parseFloat(((Math.random() * 2) + 3).toFixed(2)),
    reviewCount: Math.floor(Math.random() * 35)
  })
    res.send(data[0]);
    res.end();
})

// delete a specific product's data from the DB
app.delete('/products/:productId', async (req, res) => {
  const data = await db.Product.destroy({
    where: {
      id: req.params.productId
    },
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
    res.end();
})


// get all available stock using raw SQL query with inner joins
app.get('/stock', async (req, res) => {
  try {

  const stocks = await sequelize.query("\
  SELECT Stocks.id, Products.name, Stores.location, Stocks.color, \
  Stocks.size, Stocks.qty, Products.id as productId \
  FROM Stocks INNER JOIN Stores ON Stores.id = Stocks.storeId \
  INNER JOIN Products ON Stocks.productId = Products.id",
  {type: QueryTypes.SELECT});

    await res.send(stocks);
  } catch (e) {
    console.log(e);
  }

  })

  // get a specific product's stock using raw SQL query with inner joins
app.get('/stock/:productId', async (req, res) => {

  const stocks = await sequelize.query(`\
  SELECT Stocks.id, Products.name, Stores.location, Stocks.color, \
  Stocks.colorUrl, Stocks.size, Stocks.qty, Products.id as productId \
  FROM Stocks INNER JOIN Stores ON Stores.id = Stocks.storeId \
  INNER JOIN Products ON Stocks.productId = Products.id \
  WHERE Stocks.productId = ${[req.params.productId]}`,
  {type: QueryTypes.SELECT});

    await res.send(stocks);
  })

  // getting all Stores data from DB
app.get('/stores', async (req, res) => {
  const data = await db.Store.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
    res.send(data);
  })

  // get a store's data
app.get('/stores/:storeId', async (req, res) => {
  const data = await db.Store.findAll({
    where: {
      id: req.params.storeId
    },
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
    res.send(data[0]);
  })

  app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });
