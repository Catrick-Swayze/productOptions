const db = require('./index.js');
const Sequelize = require('sequelize');

const Product = db.define('Product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    reviews: {
        type: Sequelize.FLOAT,
        defaultValue: 0
    },
    reviewCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

const Store = db.define('Store', {
    location: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Stock = db.define('Stock', {
    color: {
        type: Sequelize.STRING
    },
    colorUrl: {
        type: Sequelize.STRING
    },
    size: {
        type: Sequelize.STRING
    },
    qty: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

Product.hasMany(Stock);
Store.hasMany(Stock);
Stock.belongsTo(Product);
Stock.belongsTo(Store);


Product.sync();
Stock.sync();
Store.sync();

const models = {Product, Stock, Store};

module.exports = models;