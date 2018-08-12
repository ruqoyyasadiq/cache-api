const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cacheSchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: String,
    required: true,
  },
  ttl: {
    type: Number,
    default: 1440,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true
  }
})

const Cache = mongoose.model('Cache', cacheSchema)

// Before saving, check if total entries is equal to max entries, if it is fetch all entries with sort in desc, delete oldest value and pass control to next value

cacheSchema.prependListener('save', (next) => {
  Cache.count({}, (err, count) => {
    const maxCacheEntries = process.env.MAX_CACHE_ENTRIES
    if(count > maxCacheEntries) {
      Cache.find({}, {}, { sort: { 'created_at': -1 } }, (err, result) => {
        // Add logic to remove oldest value before moving to next
      })
    }
    next
  })
})
module.exports = Cache;