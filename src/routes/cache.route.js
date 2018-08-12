const express = require('express')
const cacheController = require('../controllers/cache.controller')

const cacheRouter = express.Router();

cacheRouter.get('/', cacheController.getAllKeys)
cacheRouter.get('/:key', cacheController.getSingleValue)
cacheRouter.post('/new', cacheController.createKey)
cacheRouter.put('/:key', cacheController.updateKey)
cacheRouter.delete('/', cacheController.removeAllKeys)
cacheRouter.delete('/:key', cacheController.removeKey)

module.exports = cacheRouter;
