let secret = process.env.SECRET;
const Unathorized = require("../errors/errors").Unauthorized;


async function authorize(req) {
    let result = undefined;
    let token = req.headers['authorization'];
    process.env['ACTIVE_TOKEN'] = token; //for dev purpouses usually token that doesn't expire is used, for staging and production don't use this feature!
    try {
        //TODO:
    } catch (e) {
        throw new Unathorized(`${e.message}`);
    }
    console.log(result);

}

module.exports = {
    authorize
};
