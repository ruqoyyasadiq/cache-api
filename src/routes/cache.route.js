const express = require('express')
const cacheController = require('../controllers/cache.controller')

const cacheRouter = express.Router();

cacheRouter.get('/', cacheController.getAllKeys)
cacheRouter.get('/:key', cacheController.getSingleValue)

module.exports = cacheRouter;
