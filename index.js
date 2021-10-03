const http = require('http');
const parseJson = require('./code/parser').parseJson;

http.createServer((request, response) => {
	if(request.method === 'POST') {
		let body = [];
		request.on('error', (err) => {
			//something's gone wrong, so let's try to send back an error in the desired error format
			let errorObj = new Object();
			errorObj.error = "Could not decode request: " + err.message;

			response.statusCode = 400;
			response.setHeader('Content-Type', 'application/json');
			response.write(JSON.stringify(errorObj));
			response.end();
		}).on('data', (chunk) => {
			body.push(chunk);
		}).on('end', () => {
			//turn the buffer into a string
			body = Buffer.concat(body).toString();

			//now read the string...
			let responseData = parseJson(body);

			//...and transmit the result back
			response.statusCode = responseData.status;
			response.setHeader('Content-Type', 'application/json');
			response.write(responseData.returnJSON);
			response.end();
		});
	} else {
		//POST requests only, ignore everything else
		let errorObj = new Object();
		errorObj.error = "Could not decode request: POST requests only";

		response.statusCode = 400;
		response.setHeader('Content-Type', 'application/json');
		response.write(JSON.stringify(errorObj));
		response.end();
	}
}).listen(80);
