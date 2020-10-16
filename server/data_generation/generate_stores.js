const fs = require('fs');

const stores = ['Boulder', 'Longmont', 'Superior', 'Westminster', 'Aurora'];

const writer = fs.createWriteStream('./csv/Stores.csv');
writer.write('Location\n');

const writeStores = (writerFunc, callback) => {
    let i = stores.length;
    const write = () => {
        let ok = true;
        do {
            i--;
            let store = stores[i];
            let data = `${store}\n`;
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

writeStores(writer, (error, data) => {
    if (error) {
        console.log(`Error: ${error}`);
    } else {
        console.log(`Data generation complete!`);
    }
});

