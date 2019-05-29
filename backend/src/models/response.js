function Response() {
    this.code = 200;
    this.success = true;
    this.message = "";
    this.elapsedTime = 0;
    this.data = {};
    this.err = "";
}

function successResponse(message, data, time) {
    let res = new Response();
    res.code = 200;
    res.success = true;
    res.message = message;
    res.elapsedTime = time;
    res.data = data;
    return res;
}

function failResponse(message, data, err) {
    let res = new Response();
    res.code = 500;
    res.success = false;
    res.message = message;
    res.data = data;
    res.err = err;
    return res;
}

function badRequest(message, data, err){
    let res = new Response();
    res.code = 400;
    res.success = false;
    res.message = message;
    res.data = data;
    res.err = err;
    return res;
}

function unauthorized(message, data, err){
    let res = new Response();
    res.code = 401;
    res.success = false;
    res.message = message;
    res.data = data;
    res.err = err;
    return res;
}

function notFound(message, data, err) {
    let res = new Response();
    res.code = 404;
    res.success = false;
    res.message = message;
    res.data = data;
    res.err = err;
    return res;
}

module.exports = {
    successResponse,
    failResponse,
    notFound,
    badRequest,
    unauthorized
};