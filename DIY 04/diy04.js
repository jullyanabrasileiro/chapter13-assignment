// Build a server on port 3000 that responds to the user in the following way:
// 1. For the url ‘/params’ - return all parameters
// 2. For every other request responds with “I don’t know how to
// respond to that”

const http = require('http');

http.createServer(server_params = function({ url: path }, res) {
    res.setHeader('Content-Type', 'text/html');

    if (path === "/params") {
        res.write("all the parameters");
    } else {
        res.write("I dont know how to respond that");
    }
    res.end();
}).listen(3000, () => {
    console.log('Sever is running at port 3000 - DIY04');
});