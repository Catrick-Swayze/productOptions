const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: './csv/Stocks.csv',
    header: [
        {id: 'color', title: 'COLOR'},
        {id: 'colorUrl', title: 'COLORURL'},
        {id: 'size', title: 'SIZE'},
        {id: 'qty', title: 'QTY'}
    ]
});

const colors = [
    ['White', 'https://imgur.com/xvJ98fe.png'],
    ['Blue', 'https://imgur.com/zReIoca.png'],
    ['Green', 'https://imgur.com/SRGlFjx.png'],
    ['Peach', 'https://imgur.com/6dpqKHe.png'],
    ['Red', 'https://imgur.com/y81ZoDc.png'],
    ['Gold', 'https://imgur.com/L7cseNz.png']
  ];

const sizes = ['S', 'M', 'L', 'XL', 'XXL', '2XL'];

const stocks = [];

let entries = 10;

while (entries > 0) {
    for (let i = 0; i < colors.length; i++) {
        for (let j = 0; j < sizes.length; j++) {
            let quantity = Math.floor(Math.random() * 5);
            let stock = {
                color: colors[i][0],
                colorUrl: colors[i][1],
                size: sizes[j],
                qty: quantity
            }
            stocks.push(stock);
        }
    }
    entries--;
}

csvWriter.writeRecords(stocks)
    .then(() => {
        console.log(`Wrote ${stocks.length} stocks!`);
    });