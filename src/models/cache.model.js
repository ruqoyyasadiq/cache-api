import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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
    required: true
  },
  created_on: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const Cache = mongoose.model('Cache', cacheSchema);
export default Cache;