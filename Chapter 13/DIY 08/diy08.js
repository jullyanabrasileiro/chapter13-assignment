//Create a program in node that writes asynchronously to a file named test.txt with your full name.

const fs = require('fs/promises');

async function writeNameAsync() {
    try {
        await fs.writeFile('test.txt', 'Jullyana Brasileiro');
        console.log('File written successfully with Async function');
    } catch (error) {
        console.error('An error occurred while writing the file.', err);
    }
}

writeNameAsync();