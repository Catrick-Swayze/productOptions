const fs = require('fs');
const faker = require('faker');
const { performance } = require('perf_hooks');

const writer = fs.createWriteStream('./csv/Products.csv');
writer.write('Name,Price,Reviews,ReviewCount\n');

let start = performance.now();

const writeProducts = (writerFunc, callback) => {
    //refactor to 10M upon success
    let i = 10000000;
    const write = () => {
        let ok = true;
        do {
            i--;
            let name = faker.commerce.product();
            let price = (faker.commerce.price() % 40 + 10);
            let reviews = parseFloat(((Math.random() * 2) + 3).toFixed(2));
            let reviewsCount = Math.floor(Math.random() * 35);
            const data = `${name},${price},${reviews},${reviewsCount}\n`;
            if (i === 0) {
                writer.write(data, callback);
            } else {
                ok = writer.write(data);
            }
        } while (i > 0 && ok);
        if (i > 0) {
            writer.once('drain', write);
        }
    }
    write();
};

writeProducts(writer, (error, callback) => {
    if (error) {
        console.log(`Error: ${error}`);
    } else {
        console.log(`Data generation complete!`);
    }
});

let end = performance.now();

let time = end - start;
console.log(time);