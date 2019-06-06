let express = require('express');
const clearOutputAsync = require("../services/helpers").clearOutputAsync;
const validateBody = require("../services/helpers").validateBody;
const authorize = require("./authorize").authorize;
const clearOutput = require("../services/helpers").clearOutput;
const  clearSimpleOutput = require("../services/helpers").clearSimpleOutput;
const { performance } = require('perf_hooks');
let router = express.Router();

const {assetCtrl} = require('../controllers');
const {userCtrl} = require('../controllers');
const {responseModel} = require('../models');
const {ErrorHandler} = require('../errors/errors');


router.get('/apply', async (req, res) => {
    try {
        await authorize(req);
        let {mnemonic, privatekey, walletaddress} = await userCtrl.getWalletForUser(req.body);
        let start = performance.now();
        let result = await assetCtrl.apply(mnemonic, privatekey, walletaddress);
        let end = performance.now();
        let response = responseModel.successResponse(`Query All Assets for user ${req.body.username}`, result, (end - start));
        res.status(response.code).send(response);
    } catch (err) {
        console.error(`Query all assets for user ${req.body.username} failed with error: ${err}`);
        let response = await ErrorHandler(err);
        res.status(response.code).send(response);
    }
});


router.get('/getID', async (req, res) => {
    try {
        await authorize(req);
        let {mnemonic, privatekey, walletaddress} = await userCtrl.getWalletForUser(req.body);
        let start = performance.now();
        let result = await assetCtrl.getApplicationID(mnemonic, privatekey, walletaddress);
        let end = performance.now();
        let response = responseModel.successResponse(`Query All Assets for user ${req.body.username}`, result, (end - start));
        res.status(response.code).send(response);
    } catch (err) {
        console.error(`Query all assets for user ${req.body.username} failed with error: ${err}`);
        let response = await ErrorHandler(err);
        res.status(response.code).send(response);
    }
});

//--------------------------------------------------
/**
 * URL: (GET) http://localhost:3000/api/asset/
 */
router.get('/', async (req, res) => {
    try {
        await authorize(req);
        let {mnemonic, privatekey, walletaddress} = await userCtrl.getWalletForUser(req.body);
        let start = performance.now();
        let result = await assetCtrl.getAll(mnemonic, privatekey, walletaddress, req.body);
        let end = performance.now();
        let response = responseModel.successResponse(`Query All Assets for user ${req.body.username}`, result, (end - start));
        res.status(response.code).send(response);
    } catch (err) {
        console.error(`Query all assets for user ${req.body.username} failed with error: ${err}`);
        let response = await ErrorHandler(err);
        res.status(response.code).send(response);
    }
});

/**
 * URL: (GET) http://localhost:3000/api/asset/data
 */
router.get('/data', async (req, res) => {
    try {
        await authorize(req);
        let {mnemonic, privatekey, walletaddress} = await userCtrl.getWalletForUser(req.body);
        let start = performance.now();
        let result = await assetCtrl.getAllInstancesData(mnemonic, privatekey, walletaddress, req.body);
        let end = performance.now();
        let response = responseModel.successResponse(`Query All Asset data for user ${req.body.username}`, clearOutput(result), (end - start));
        res.status(response.code).send(response);
    } catch (err) {
        console.error(`Query all assets for user ${req.body.username} failed with error: ${err}`);
        let response = await ErrorHandler(err);
        res.status(response.code).send(response);
    }
});

/**
 * URL: (GET) http://localhost:3000/api/asset/data/async
 */
router.get('/data/async', async (req, res) => {
    try {
        await authorize(req);
        let {mnemonic, privatekey, walletaddress} = await userCtrl.getWalletForUser(req.body);
        let start = performance.now();
        let result = await assetCtrl.getAllInstancesDataAsync(mnemonic, privatekey, walletaddress, req.body);
        let end = performance.now();
        let response = responseModel.successResponse(`Query All Asset data for user ${req.body.username}`, await clearOutputAsync(result), (end - start));
        res.status(response.code).send(response);
    } catch (err) {
        console.error(`Query all assets for user ${req.body.username} failed with error: ${err}`);
        let response = await ErrorHandler(err);
        res.status(response.code).send(response);
    }
});

/**
 * URL: (GET) http://localhost:3000/api/asset/params?params
 */
router.get('/params', async (req, res) => {
    try {
        await authorize(req);
        let {mnemonic, privatekey, walletaddress} = await userCtrl.getWalletForUser(req.body);
        let start = performance.now();
        let result = await assetCtrl.getByParams(mnemonic, privatekey, walletaddress, req.query);
        let end = performance.now();
        let response = responseModel.successResponse(`Query Asset by params for user ${req.body.username}`, clearOutput(result), (end - start));
        res.status(response.code).send(response);
    } catch (err) {
        console.error(`Query all asset data for user ${req.body.username} failed with error: ${err}`);
        let response = await ErrorHandler(err);
        res.status(response.code).send(response);
    }
});

/**
 * URL: (GET) http://localhost:3000/api/asset/:id
 */
router.get('/:id', async (req, res) => {
    try {
        await authorize(req);
        let {mnemonic, privatekey, walletaddress} = await userCtrl.getWalletForUser(req.body);
        let start = performance.now();
        let result = await assetCtrl.getById(mnemonic, privatekey, walletaddress, req.params.id);
        let end = performance.now();
        let response = responseModel.successResponse(`Query Asset by id for user ${req.body.username}`, clearSimpleOutput(result), (end - start));
        res.status(response.code).send(response);
    } catch (err) {
        console.error(`Query all asset data for user ${req.body.username} failed with error: ${err}`);
        let response = await ErrorHandler(err);
        res.status(response.code).send(response);
    }
});


/**
 * URL: (POST) http://localhost:3000/api/asset/
 */
router.post('/', async (req, res) => {
    try {
        authorize(req);
        validateBody(req.body);
        let {mnemonic, privatekey, walletaddress} = await userCtrl.getWalletForUser(req.body);
        let start = performance.now();
        let result = await assetCtrl.create(mnemonic, privatekey, walletaddress, req.body);
        let end = performance.now();
        let response = responseModel.successResponse(`Create assets for user ${req.body.currentAppUser} successful`, result, (end - start));
        res.status(response.code).send(response);
    } catch (err) {
        console.error(`Create assets for user ${req.body.username} failed with error: ${err}`);
        let response = await ErrorHandler(err);
        res.status(response.code).send(response);
    }
});

/**
 * URL: (POST) http://localhost:3000/api/asset/
 */
router.post('/sync', async (req, res) => {
    try {
        await authorize(req);
        validateBody(req.body);
        let {mnemonic, privatekey, walletaddress} = await userCtrl.getWalletForUser(req.body);
        let start = performance.now();
        let result = await assetCtrl.createSync(mnemonic, privatekey, walletaddress, req.body);
        let end = performance.now();
        let response = responseModel.successResponse(`Create assets for user ${req.body.currentAppUser} successful`, result, (end - start));
        res.status(response.code).send(response);
    } catch (err) {
        console.error(`Create assets for user ${req.body.username} failed with error: ${err}`);
        let response = await ErrorHandler(err);
        res.status(response.code).send(response);
    }
});

/**
 * URL: (PUT) http://localhost:3000/api/asset/:id
 */
router.put('/:id', async (req, res) => {
    try {
        await authorize(req);
        validateBody(req.body);
        let {mnemonic, privatekey, walletaddress} = await userCtrl.getWalletForUser(req.body);
        let start = performance.now();
        let result = await assetCtrl.update(mnemonic, privatekey, walletaddress, req.params.id, req.body);
        let end = performance.now();
        let response = responseModel.successResponse(`Create assets for user ${req.body.username} successful`, JSON.parse(result), (end - start));
        res.status(response.code).send(response);
    } catch (err) {
        console.error(`Create assets for user ${req.body.username} failed with error: ${err}`);
        let response = await ErrorHandler(err);
        res.status(response.code).send(response);
    }
});


module.exports = router;