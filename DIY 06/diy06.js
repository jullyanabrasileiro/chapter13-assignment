// Write a program that reads asynchronous from a file called test.txt and prints the text to the console

const fs = require('fs/promises');

async function readFileAsync() {
    try {
        const data = await fs.readFile('syncAndAsync.txt', 'utf8');
        console.log(data);

    } catch (err) {
        console.error('An error ocurred', err);
    }
}

readFileAsync();