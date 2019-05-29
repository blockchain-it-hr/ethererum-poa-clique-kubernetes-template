const BadRequest = require("../errors/errors").BadRequest;

function clearOutput(result) {
    let parsedResult = [];
    result.forEach((instance) => {
        parsedNestedResult = [];
        instance.forEach((element) => {
            parsedNestedResult.push(JSON.parse(element.other));
        });
        parsedResult.push(parsedNestedResult);
    });
    let clearedParsedArray = [];
    parsedResult.forEach((array) => {
        if (array.length) {
            clearedParsedArray.push(array);
        }
    });
    return clearedParsedArray;
}

async function clearOutputAsync(result) {
    let parsedResult = [];
    await asyncForEach(result, async (instance) => {
        parsedNestedResult = [];
        await asyncForEach(instance, async (element) => {
            parsedNestedResult.push(JSON.parse(element.other));
        });
        parsedResult.push(parsedNestedResult);
    });
    let clearedParsedArray = [];
    await asyncForEach(parsedResult, async (array) => {
        if (array.length) {
            clearedParsedArray.push(array);
        }
    });
    return clearedParsedArray;
}

function clearSimpleOutput(result) {
    let parsedResult = [];
    result.forEach((instance) => {
        parsedResult.push(JSON.parse(instance.other));
    });
    return parsedResult;
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

function validateBody(body) {
    if (body.requestId === undefined) {
        throw new BadRequest("requestId cannot be undefined")
    }
    if (body.ticketId === undefined) {
        throw new BadRequest("ticketId cannot be undefined")
    }
    if (body.requestor === undefined) {
        throw new BadRequest("requestor cannot be undefined")
    }
    if (body.requestee === undefined) {
        throw new BadRequest("requestee cannot be undefined")
    }
    if (body.timestamp === undefined) {
        throw new BadRequest("timestamp cannot be undefined")
    }
    if (body.currentAppUser === undefined) {
        throw new BadRequest("currentAppUser cannot be undefined")
    }

}

module.exports = {
    clearOutput,
    clearSimpleOutput,
    validateBody,
    asyncForEach,
    clearOutputAsync
};