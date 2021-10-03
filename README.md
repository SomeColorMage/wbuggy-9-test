# wbuggy-9-test

## Prerequisites
This program uses [Node.js](https://nodejs.org/en/). Testing requires [Mocha](https://mochajs.org/), this is included as a dev dependency in the package.json

## Usage
To install locally:

    npm install

This program is a server application and just needs to be deployed anywhere that it can listen to the correct port. Test deployment was done via [Heroku](https://www.heroku.com/home).

To operate, submit a POST request to the server.

To run tests:

    npm run test

## Components
### index.js
Contains the server code. Sets up a listener on the port set by Heroku (defaults to 80 if not provided), which will relay requests to the JSON parser, and then respond based on the return value from the parser.

### code/parser.js
Contains the JSON parser.

#### class returnObj
Format of data returned from the parser.

##### status
Number representing the HTTP status code the server should respond with. Should be 200 for a valid request and 400 for an invalid one.

##### returnJSON
JSON formatted string for the server to respond with.

#### parseJson(input)
Parses a JSON formatted string and looks for data that matches the requirements. input is a string, parsing is done within the functions so a pre-parsed JSON object won't be recognised. Returns a returnObj with the required information.

### test
Test folder. Contains three test files.

#### initTests.js
Tests that check that returnObj and parseJson() initialise correctly.

#### invalidInputTests.js
Tests that check that parseJson() handles invalid inputs (both incorrect data type and malformed JSON) correctly.

#### validInputTests.js
Tests that check that parseJson() returns correctly formatted data.