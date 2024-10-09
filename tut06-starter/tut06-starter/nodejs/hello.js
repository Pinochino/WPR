const http = require('http');
const url = require('url'); // Dùng để phân tích URL
const port = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true); 
    const pathname = parsedUrl.pathname; 
    const query = parsedUrl.query; 

    if (req.method === 'GET' && pathname === '/hello/Hello') {
        // Lấy phần tên từ query string (?name=)
        const name = query.name;

        if (name) {
            // Tạo thông điệp "Hello [name]"
            const message = `Hello ${decodeURIComponent(name)}`;

            // Trả phản hồi
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(message);
        } else {
            // Nếu không có tham số name, trả về lỗi
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Name query parameter is missing');
        }
    } else {
        // Nếu đường dẫn không hợp lệ, trả về lỗi 404
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(port, () => console.log(`Server listening on port ${port}!`));
