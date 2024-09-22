const http = require('http');

const server = http.createServer();
server.on('request', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello World</h1>');
})

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on ${port}`);
})