const { Client } = require('pg');
const { performance } = require('perf_hooks');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    password: '642459986Jw',
    database: 'productoptions'
});

client.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Database connected!`);
    }
});

//get request
const getProduct = (id) => {
    let query = `SELECT * FROM products WHERE id = ${id};`;
    let start = performance.now();
    client.query(query)
        .then((response) => {
            let end = performance.now();
            console.log(`Query time:`, end - start);
        })
        .catch((error) => {
            console.log(error);
        })
};

//post request
const postProduct = (id, name, price, reviews, reviewCount) => {
    let query = `INSERT INTO products (id, name, price, reviews, reviewcount) VALUES (${id}, '${name}', ${price}, ${reviews}, ${reviewCount});`;
    let start = performance.now();
    client.query(query)
        .then((response) => {
            let end = performance.now();
            console.log(`POST query time:`, end - start);
        })
        .catch((error) => {
            console.log(error);
        })
};

//delete request
const deleteProduct = (id) => {
    let query = `DELETE FROM products WHERE id=${id};`;
    let start = performance.now();
    client.query(query)
        .then((response) => {
            let end = performance.now();
            console.log(`DELETE query time:`, end - start);
        })
        .catch((error) => {
            console.log(error);
        })
};

//update request
const updateProduct = (id, name, price, reviews, reviewCount) => {
    let query = `UPDATE products SET name='${name}', price=${price}, reviews=${reviews}, reviewcount=${reviewCount} WHERE id=${id};`;
    let start = performance.now();
    client.query(query)
        .then((response) => {
            let end = performance.now();
            console.log(`UPDATE query time:`, end - start);
        })
        .catch((error) => {
            console.log(error);
        })
};

module.exports = {
    getProduct,
    postProduct,
    deleteProduct,
    updateProduct
}

getProduct(1);
postProduct(10000003, 'testing123', 4.99, 3.5, 20);
updateProduct(10000003, 'testing', 5.99, 2.5, 10);
deleteProduct(10000003);