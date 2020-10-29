require('newrelic');
const express = require('express');
const app = express();
const port = 3002;

const db = require('./database/postgres_index.js');
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.static(path.join(__dirname, '../client/public/dist')));

//get all products data from DB
app.get('/products/:productId', async (req, res) => {
    const data = await db.getProduct(req.params.productId);
    res.send(data);
});

app.get('/loaderio-4081e80814a4a173d1cfb16d7c67d17c', (req, res) => {
    res.sendFile(__dirname + '/loaderio-4081e80814a4a173d1cfb16d7c67d17c.txt');
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});