const assert = require('assert');
//const returnObj = require('../code/parser').returnObj;
const parseJson = require('../code/parser').parseJson;

describe('non-string types should fail', function() {
	it('object', function() {
		let result = parseJson(Object());
		assert.strictEqual(result.status, 400);
	});
	
	it('function', function() {
		let result = parseJson(function(){});
		assert.strictEqual(result.status, 400);
	});
	
	it('boolean', function() {
		let result = parseJson(true);
		assert.strictEqual(result.status, 400);
	});
	
	it('number', function() {
		let result = parseJson(0);
		assert.strictEqual(result.status, 400);
	});

	it('pre-parsed JSON', function() {
		let result = parseJson(JSON.parse('{ "exampleJSON" : "this was parsed too early" }'));
		assert.strictEqual(result.status, 400);
	})
});

describe('should reject invalid JSON', function() {
	it("string that isn't JSON", function() {
		let result = parseJson('not JSON');
		assert.strictEqual(result.status, 400);
	});

	it('malformed JSON', function() {
		let result = parseJson('{ "error" : } "JSON should not look like this"');
		assert.strictEqual(result.status, 400);
	});

	it('incomplete JSON', function() {
		let result = parseJson('{ "error" : "this is missing an end brace"');
		assert.strictEqual(result.status, 400);
	});
});