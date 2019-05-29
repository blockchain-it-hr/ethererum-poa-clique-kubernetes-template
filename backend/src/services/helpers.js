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
    if (body.id === undefined) {
        throw new BadRequest("Id cannot be undefined")
    }
    if (body.other === undefined) {
        throw new BadRequest("Other cannot be undefined")
    }
}

module.exports = {
    clearOutput,
    clearSimpleOutput,
    validateBody,
    asyncForEach,
    clearOutputAsync
};