const http = require('http');

const server_myName = function(req, res) {
    res.write('Jullyana Brasileiro');
    res.end();
}

const server = http.createServer(server_myName);

server.listen(3000, () => {
    console.log('Sever is running at port 3000');
});