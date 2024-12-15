// Create a program in node that writes synchronously to a file named test.txt with your full name

const fs = require('fs');

function writeNameSync() {
    try {
        fs.writeFileSync('test.txt', 'Jullyana Brasileiro');
        console.log('File written successfully with Sync function');
    } catch (err) {
        console.error('An error occurred while writing the file.', err);
    }
}

writeNameSync();