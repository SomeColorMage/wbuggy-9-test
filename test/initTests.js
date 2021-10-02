const assert = require('assert');
const returnObj = require('../code/parser').returnObj;
const parseJson = require('../code/parser').parseJson;

describe('initialisation', function() {
	it('returnObj exists and can be created', function() {
		assert.doesNotThrow(function() {
			let testObj = new returnObj();
		});
	});

	it('returnObj.status is initialised', function() {
		let testObj = new returnObj();
		assert.strictEqual(testObj.status, 200);
	});

	it('returnObj.returnJSON is undefined', function() {
		let testObj = new returnObj();
		assert.strictEqual(testObj.returnJSON, undefined);
	});

	it('parseJson exists', function() {
		assert(parseJson);
	});
});