const fs = require('fs');
const { performance } = require('perf_hooks');

const colors = [
    ['White', 'https://imgur.com/xvJ98fe.png'],
    ['Blue', 'https://imgur.com/zReIoca.png'],
    ['Green', 'https://imgur.com/SRGlFjx.png'],
    ['Peach', 'https://imgur.com/6dpqKHe.png'],
    ['Red', 'https://imgur.com/y81ZoDc.png'],
    ['Gold', 'https://imgur.com/L7cseNz.png']
  ];

const sizes = ['S', 'M', 'L', 'XL', 'XXL', '2XL'];

const writer = fs.createWriteStream('./csv/Stocks.csv');
writer.write('Color,ColorUrl,Size,Quantity,ProductId,StoreId\n');

let start = performance.now();

const writeStocks = (writerFunc, callback) => {
    let i = 10000000;
    const write = () => {
        let ok = true;
        do {
            i--;
            let data = ``;
            for (let store = 5; store > 1; store--) {
                for (let c = 0; c < colors.length; c++) {
                    for (let s = 0; s < sizes.length; s++) {
                        let quantity = Math.floor(Math.random() * 5);
                        data += `${colors[c][0]},${colors[c][1]},${sizes[s]},${quantity},${i},${store}\n`;
                    }
                }
            }
            if (i === 0) {
                writer.write(data, callback);
            } else {
                ok = writer.write(data);
            }
        } while (i > 1 && ok);
        if (i > 1) {
            writer.once('drain', write);
        }
    }
    write();
};

writeStocks(writer, (error, callback) => {
    if (error) {
        console.log(`Error: ${error}`);
    } else {
        console.log(`Data generation complete!`);
    }
});

let end = performance.now();

const time = end - start;
console.log(time);