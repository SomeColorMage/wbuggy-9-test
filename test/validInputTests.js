const assert = require('assert');
//const returnObj = require('../code/parser').returnObj;
const parseJson = require('../code/parser').parseJson;

describe('valid inputs should succeed', function() {
	it('no payload but otherwise correctly formed', function() {
		let input = '{ "example": "no payload" }';
		let result = parseJson(input);
		assert.strictEqual(result.status, 200);
	});

	it('bad payload', function() {
		let input = '{ "payload": "not a valid payload" }';
		let result = parseJson(input);
		assert.strictEqual(result.status, 200);
	});

	it('empty payload', function() {
		let input = '{ "payload": [] }';
		let result = parseJson(input);
		assert.strictEqual(result.status, 200);
	});

	it('payload that only contains invalid entries', function() {
		let input = '{ "payload": [ { "slug": "show/seapatrol", "title": "Sea Patrol", "tvChannel": "Channel 9" } ] }';
		let result = parseJson(input);
		assert.strictEqual(result.status, 200);
	});

	it('payload that only contains valid entries', function() {
		let input = '{ "payload": [ { "drm": true, "episodeCount": 3, "image": { "showImage": "http://mybeautifulcatchupservice.com/img/shows/16KidsandCounting1280.jpg" }, "slug": "show/16kidsandcounting", "title": "16 Kids and Counting" } ] }';
		let result = parseJson(input);
		assert.strictEqual(result.status, 200);
	});

	it('payload that contains valid and invalid entries', function() {
		let input = '{ "payload": [ { "slug": "show/seapatrol", "title": "Sea Patrol", "tvChannel": "Channel 9" }, { "drm": true, "episodeCount": 3, "image": { "showImage": "http://mybeautifulcatchupservice.com/img/shows/16KidsandCounting1280.jpg" }, "slug": "show/16kidsandcounting", "title": "16 Kids and Counting" } ] }';
		let result = parseJson(input);
		assert.strictEqual(result.status, 200);
	});
});

describe('valid inputs should have appropriate response', function() {
	it('no payload returns empty response', function() {
		let input = '{ "example": "no payload" }';
		let result = parseJson(input);
		let resultObj = JSON.parse(result.returnJSON);
		assert.strictEqual(resultObj.response.length, 0);
	});

	it('bad payload returns empty response', function() {
		let input = '{ "payload": "not a valid payload" }';
		let result = parseJson(input);
		let resultObj = JSON.parse(result.returnJSON);
		assert.strictEqual(resultObj.response.length, 0);
	});

	it('empty payload returns empty response', function() {
		let input = '{ "payload": [] }';
		let result = parseJson(input);
		let resultObj = JSON.parse(result.returnJSON);
		assert.strictEqual(resultObj.response.length, 0);
	});

	it('payload with only invalid entries returns empty response', function() {
		let input = '{ "payload": [ { "slug": "show/seapatrol", "title": "Sea Patrol", "tvChannel": "Channel 9" } ] }';
		let result = parseJson(input);
		let resultObj = JSON.parse(result.returnJSON);
		assert.strictEqual(resultObj.response.length, 0);
	});

	describe('payload with valid entries', function() {
		let input = '{ "payload": [ { "drm": true, "episodeCount": 3, "image": { "showImage": "http://mybeautifulcatchupservice.com/img/shows/16KidsandCounting1280.jpg" }, "slug": "show/16kidsandcounting", "title": "16 Kids and Counting" } ] }';
		let result, resultObj;

		before(function() {
			result = parseJson(input);
			resultObj = JSON.parse(result.returnJSON);
		});

		it('returns response with entries', function() {
			assert.strictEqual(resultObj.response.length, 1);
		});

		it('entry has correct image', function() {
			assert.strictEqual(resultObj.response[0].image, "http://mybeautifulcatchupservice.com/img/shows/16KidsandCounting1280.jpg");
		});

		it('entry has correct slug', function() {
			assert.strictEqual(resultObj.response[0].slug, "show/16kidsandcounting");
		});

		it('entry has correct title', function() {
			assert.strictEqual(resultObj.response[0].title, "16 Kids and Counting");
		});
	});

	describe('payload with both valid and invalid entries', function() {
		let input = '{ "payload": [ { "slug": "show/seapatrol", "title": "Sea Patrol", "tvChannel": "Channel 9" }, { "drm": true, "episodeCount": 3, "image": { "showImage": "http://mybeautifulcatchupservice.com/img/shows/16KidsandCounting1280.jpg" }, "slug": "show/16kidsandcounting", "title": "16 Kids and Counting" } ] }';
		let result, resultObj;

		before(function() {
			result = parseJson(input);
			resultObj = JSON.parse(result.returnJSON);
		});

		it('returns response with correct number of entries', function() {
			assert.strictEqual(resultObj.response.length, 1);
		});

		it('entry has correct image', function() {
			assert.strictEqual(resultObj.response[0].image, "http://mybeautifulcatchupservice.com/img/shows/16KidsandCounting1280.jpg");
		});

		it('entry has correct slug', function() {
			assert.strictEqual(resultObj.response[0].slug, "show/16kidsandcounting");
		});

		it('entry has correct title', function() {
			assert.strictEqual(resultObj.response[0].title, "16 Kids and Counting");
		});
	});

});