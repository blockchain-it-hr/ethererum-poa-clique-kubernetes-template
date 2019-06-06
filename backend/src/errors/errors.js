const axios = require("axios");
const {responseModel} = require('../models');
const loggingEndpoint = process.env.LOGGING_ENDPOINT;

class ContractTransactionCreationFailed extends Error {

    constructor(message) {
        super();
        this.message = message;
        this.code = 404;
        this.type = "ContractTransactionCreationFailed";
    }
}

class UserNotFound extends Error {

    constructor(message) {
        super();
        this.message = message;
        this.code = 404;
        this.type = "UserNotFound";
    }
}

class BadRequest extends Error {

    constructor(message) {
        super();
        this.message = message;
        this.type = "BadRequest";
        this.code = 400;
    }
}

class Unauthorized extends Error {

    constructor(message) {
        super();
        this.message = message;
        this.type = "Unauthorized";
        this.code = 401;
    }
}

async function ErrorHandler(err) {
    let response;
    let errMessage = typeof err === 'string' ? err : err.message;
    if (err.type === 'BadRequest') {
        response = responseModel.badRequest("Create failed", null, errMessage);
    } else if (err.type === 'ContractTransactionCreationFailed') {
        response = responseModel.notFound("Asset Not Found", null, errMessage);
    } else if (err.type === 'UserNotFound') {
        response = responseModel.notFound("User Not Found", null, errMessage);
    } else if (err.type === 'Unauthorized') {
        response = responseModel.unauthorized("Unauthorized", null, errMessage);
    } else {
        response = responseModel.failResponse("Failed response", null, errMessage);
    }

    //Log error to server
    let axiosResponse = undefined;
    try {
        axiosResponse = await axios({
            method: 'post',
            url: loggingEndpoint,
            data: response,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${process.env.ACTIVE_TOKEN}`
            },
        });
    } catch (error) {
        console.log(error);
    }

    return response;
}

module.exports = {
    AssetNotFound: ContractTransactionCreationFailed,
    UserNotFound,
    BadRequest,
    Unauthorized,
    ErrorHandler
};