// Write a program that reads synchronous from a file named test.txt and
// prints the text to the console
const fs = require('fs');

const filePath = './nodeandnodemon.txt';

fs.readFile('nodeandnodemon.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('Content of the file:');
    console.log(data);
})
