const Cache = require('../models/cache.model')

const cacheController = {
  getSingleValue: (req, res) => {
    const { key } = req.params
    Cache.find({ key }).exec((err, cache) => {
      if(!cache) {
        console.info('Cache miss')
        // TODO: Create cache value for non-existent key, update db with new key and cache value, return the new value
      } else {
        console.info('Cache hit')
        res.status(200).json(cache)
      }
    })
  },

  getAllKeys: (req, res) => {
    Cache.find({}, (err, cache) => {
      if(!err) {
        console.log(cache, "All of the cache")
        const keyList = []
        if(cache.length > 0) {
          cache.forEach(key => {
            keyList.push(key)
          })
          res.status(200).json(key)
          return
        } else {
          res.status(200).json({
            message: 'No key available. Start by creating an entry'
          })
          return
        }
      }
    })
  }
}

module.exports = cacheController
