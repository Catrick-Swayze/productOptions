const fs = require('fs');

const stores = ['Boulder', 'Longmont', 'Superior', 'Westminster', 'Aurora'];

const writer = fs.createWriteStream('./csv/Stores.csv');
writer.write('Id,Location\n');

const writeStores = (writerFunc, callback) => {
    let i = 0;
    const write = () => {
        let ok = true;
        do {
            let store = stores[i];
            let data = `${i},${store}\n`;
            i++;
            if (i === stores.length) {
                writer.write(data, callback);
            } else {
                ok = writer.write(data);
            }
        } while (i < stores.length && ok);
        if (i > 0) {
            writer.once('drain', write);
        }
    }
    write();
};

writeStores(writer, (error, data) => {
    if (error) {
        console.log(`Error: ${error}`);
    } else {
        console.log(`Data generation complete!`);
    }
});

