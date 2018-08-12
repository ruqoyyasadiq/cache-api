const Cache = require('../models/cache.model')
const utils = require('../utils')

const { generateRandomData } = utils

const cacheController = {
  // Fecth Data for Single key
  getSingleValue: (req, res) => {
    const { key } = req.params
    Cache.findOne({ key }).exec((err, cache) => {
      if(!cache) {
        console.info('Cache miss')
        const body = { value: generateRandomData(), ttl: 60 }
        const cache = new Cache({ key, ...body })
        cache.save((err, data) => {
          // TODO: check if key already exists and instead return conflict error
          if (err) {
            res.status(500).send({
              error: err,
              message: "An error occured whilst fetching data"
            })
            return
          }
          res.status(201).json({ result: data.value })
          return
        })
      } else {
        console.info('Cache hit')
        res.status(200).json({ data: cache.value })
      }
    })
  },

  // Fetch all cache entries
  getAllKeys: (req, res) => {
    Cache.find({}).select('key -_id').exec((err, result) => {
      if(err) {
        res.status(500).json({
          error: err,
          message: "An error occured whilst fetching data"
        })
        return
      }
      if(result.length > 0) {
        res.status(200).json({ result })
        return
      } else {
        res.status(200).json({
          message: 'No cached value available. Start by creating an entry.'
        })
      }
    })
  },

  // Create a new cache entry
  createKey: (req, res) => {
    const { body } = req
    body.value = body.value || generateRandomData()
    const cache = new Cache(body)
    cache.save((err, data) => {
      // TODO: check if key already exists and instead return conflict error
      if (err) {
        res.status(500).send({
          error: err,
          message: "An error occured whilst creating data"
        })
        return
      }
      res.status(201).json({ cache: data })
      return
    })
  },

  // update existing cache entry
  updateKey: (req, res) => {
    const { key } = req.params
    const { body } = req.body
    Cache.findByIdAndUpdate({ key }, { body }, (err, result) => {
      if (err) {
        res.status(500).json({
          error: err,
          message: "An error occured whilst fetching data"
        })
        return
      }
      if (!result) {
        res.status(404).json({
          message: 'No entry exists for given key'
        })
      } else {
        res.status(200).json(result)
      }
      return
    })

  },

  // Delete a single cache entry
  removeKey: (req, res) => {
    const { key } = req.params
    Cache.findOneAndDelete({ key }, (err) => {
      if (err) {
        res.status(500).json({ error: err })
        return
      }
      res.status(200).json({ message: "Entry has been deleted." })
    })
  },

  // Delete all cache entries
  removeAllKeys: (req, res) => {
    Cache.deleteMany({}, (err) => {
      if (err) {
        res.status(500).json({ error: err })
        return
      }
      res.status(200).json({ message: "All Entries have been deleted." })
    })
  }
}

module.exports = cacheController
