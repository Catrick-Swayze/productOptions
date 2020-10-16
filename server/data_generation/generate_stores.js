const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: './csv/Stores.csv',
    header: [
        {id: 'location', title: 'LOCATION'}
    ]
});

const stores = [
    {location: 'Boulder'},
    {location: 'Longmont'},
    {location: 'Superior'},
    {location: 'Westminster'},
    {location: 'Aurora'}
];

csvWriter.writeRecords(stores)
    .then(() => {
        console.log(`Wrote ${stores.length} stores!`);
    });