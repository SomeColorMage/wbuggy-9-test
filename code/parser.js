/**
 * @property {Number} status HTTP status code that should be returned to the client (within the scope of this project, should be either 200 OK or 400 Bad Request)
 * @property {String} returnJSON JSON formatted string that will be returned to the client
 */
class returnObj {
	constructor() {
		this.status = 200;
		this.returnJSON = '';
	}
}

/**
 * Parses a JSON formatted string and looks for data that matches the requirements
 * 
 * @param {String} input as the JSON parsing is done within the func, this requires a string input instead of a JSON object
 * @returns {returnObj}
 */
function parseJson(input) {
	let result = new returnObj();
	let retObj = new Object();

	try {
		//check to make sure we have a string, and not something else
		if(typeof(input) != 'string')
			throw new Error('Input format is invalid');

		let parsedJSON = JSON.parse(input);

		retObj.response = [];

		//based on the example JSON, we're looking for a key called 'payload' that contains an array
		//if we can't find that, not sure, it's technically not invalid JSON so an empty response might be fine
		if(Array.isArray(parsedJSON.payload)) {
			//from there, check each entry for entries with drm=true and episodeCount>0
			//for ones where both of those exist, create new entry in response with image, slug and title
			parsedJSON.payload.forEach(element => {
				if(
					typeof(element.drm) == 'boolean' && element.drm == true
					&& typeof(element.episodeCount) == 'number' && element.episodeCount > 0
				) {
					let newItem = new Object();

					//all three of these are presented as strings in example, will toString() anyway just to make sure no XSS-like issues crop up
					newItem.image = element.image.showImage.toString();
					newItem.slug = element.slug.toString();
					newItem.title = element.title.toString();

					retObj.response.push(newItem);
				}
			});
		}
	} catch (error) {
		//set return HTTP code to 400 and create a JSON error object
		result.status = 400;
		retObj.error = "Could not decode request: " + error.message;
	}

	//output the return JSON object as a string
	result.returnJSON = JSON.stringify(retObj);

	return result;
}

module.exports.returnObj = returnObj;
module.exports.parseJson = parseJson;