const Sequelize = require('sequelize');

const db = new Sequelize(
    'productoptions', 'postgres', '642459986Jw', {
        host: '127.0.0.1',
        port: 5432,
        dialect: 'postgres'
    });

try {
    db.authenticate();
    console.log('database connection successful!');
} catch (error) {
    console.log(`Unable to connect to DB, ${error}`);
}

module.exports = db;