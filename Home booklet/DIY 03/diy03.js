// Build a server on port 3000 that responds to the user in the following
// way:
// 1. For the url ‘/firstname’ - return “Miki”
// const http = require('http');

const http = require('http');

http.createServer(server_names = function({ url: path }, res) {
    res.setHeader('Content-Type', 'text/html');

    if (path === "/firstname") {
        res.write("Miki")
    } else if (path === "/firstname") {
        res.write("Mimi")
    } else {
        res.write("I don't know how to respond to that");
    }
    res.end();
 }
)

server.listen(3000, () => {
    console.log('Sever is running at port 3000 - DIY03');
});