const {Product, Stock, Store} = require('./models.js');
const faker = require('faker');

(async function() {
    const stores = ['boulder', 'longmont', 'superior', 'westminister', 'aurora'];
    const products = [
    `Men's Standard Fit French Terry Hoodie Sweatshirt - Goodfellow & Co™`,
    `Men's Standard Fit Hoodie Sweatshirt - Goodfellow & Co™`,
    `Hanes Men's Ultimate Cotton Sweatshirt`,
    `Hanes Men's EcoSmart Fleece Pullover Hooded Sweatshirt`,
    `Men's Regular Fit Fleece Pullover Hoodie - Goodfellow & Co™ Black`,
    `Hanes Men's Ultimate Cotton Pullover Hooded Sweatshirt`
    ];
    // can make colors an array of arrays, each one having colors for the
    // corresponding product from the outer product loop
    const colors = [
        ['White', 'https://imgur.com/xvJ98fe.png'],
        ['Blue', 'https://imgur.com/zReIoca.png'],
        ['Green', 'https://imgur.com/SRGlFjx.png'],
        ['Peach', 'https://imgur.com/6dpqKHe.png'],
        ['Red', 'https://imgur.com/y81ZoDc.png'],
        ['Gold', 'https://imgur.com/L7cseNz.png']
    ];
    const sizes = ['S', 'M', 'L', 'XL', 'XXL', '2XL'];

    //scale to 10M later
    try {
        for (var st = 0; st < stores.length; st++) {
            var fakeStore = await Store.findOne({ where: {location: stores[st]} });
            // adjust max p to change number of products
            for (var p = 0; p < 10; p++) {
                const fakeProduct = await Product.create({
                name: faker.commerce.product(),
                price: (faker.commerce.price() % 40 + 10),
                reviews: parseFloat(((Math.random() * 2) + 3).toFixed(2)),
                reviewCount: Math.floor(Math.random() * 35)
                })
        
                // var numOfColors = Math.ceil(Math.random() * 5);
                for (var c = 0; c < colors.length; c++) {
                // using the same sizes array used at the top
                for (var s = 0; s < sizes.length; s++) {
        
                    var quantity = Math.floor(Math.random() * 5);
                    const fakeStock = await Stock.create({
                    color: colors[c][0],
                    colorUrl: colors[c][1],
                    size: sizes[s],
                    qty: quantity
                    })
                    await fakeStock.setStore(fakeStore);
                    await fakeStock.setProduct(fakeProduct);
                }
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
})();