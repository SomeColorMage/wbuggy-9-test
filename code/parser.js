//there's two elements to this... the return must indicate if the parse passed or failed, and it must contain the new JSON string to send back
class returnObj {
    constructor() {
        this.status = 200;
        this.returnJSON = undefined;
    }
}

//input should be the string from the POST request
function parseJson(input) {
    let result = new returnObj();
    let returnString = '';

    try {
        let parsedJSON = JSON.parse(input);

        //based on the example JSON, we're looking for a key called 'payload'
        //if we can't find that, not sure, it's technically not invalid JSON so an empty response might be fine
        //from there, check each entry for entries with drm=true and episodeCount>0
        //for ones where both of those exist, copy down image, slug and title (as a string to prevent XSS issues, just in case)
        //then form the response JSON
    } catch (error) {
        //process this then return
        result.status = 400;

        returnString = '{ "error": "Could not decode request: ' + error.message + '"';
    }

    result.returnJSON = JSON.stringify(returnString);

    return result;
}

module.exports.returnObj = returnObj;
module.exports.parseJson = parseJson;