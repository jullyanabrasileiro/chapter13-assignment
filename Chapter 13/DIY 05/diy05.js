// Write a program that reads synchronous from a file named test.txt and
// prints the text to the console
const fs = require('fs');

const filePath = './nodeandnodemon.txt';

function readFileSync() {
    try {
        const data = fs.readFileSync('./nodeandnodemon.txt', 'utf8');
        console.log(data);

    } catch (err) {
        console.error('An error ocurred', err);
    }
}

readFileSync();