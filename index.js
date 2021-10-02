const http = require('http');

const hostname = '127.0.0.1';
const port = 80; //instructions gives no specific port so assuming standard HTTP port until proven otherwise

//the following is mostly test code to make sure I've got node and heroku functional, expect most of this to go away
const server = http.createServer();
server.on('request', (request, response) => {
	response.statusCode = 200
	response.setHeader('Content-Type', 'text/plain')
	response.end('Hello World\n')
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`)
});
