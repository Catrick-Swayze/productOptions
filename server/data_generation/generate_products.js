const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const faker = require('faker');

const csvWriter = createCsvWriter({
    path: './csv/Products.csv',
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'price', title: 'PRICE'},
        {id: 'reviews', title: 'REVIEWS'},
        {id: 'reviewCount', title: 'REVIEWCOUNT'}
    ]
});

const products = [];

let entries = 50;

while (entries > 0) {
    let product = {
        name: faker.commerce.product(),
        price: (faker.commerce.price() % 40 + 10),
        reviews: parseFloat(((Math.random() * 2) + 3).toFixed(2)),
        reviewCount: Math.floor(Math.random() * 35)
    }

    products.push(product);
    entries--;
}

csvWriter.writeRecords(products)
    .then(() => {
        console.log(`Wrote ${products.length} products!`);
    });