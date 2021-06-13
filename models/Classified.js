const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, default: 0 },
  category: { type: String, default: 'None' },
  subcategory: { type: String, default: 'None' },
  date: { type: Date, default: Date.now },
  MultipleImages: [{ type: String }],
  owner: { type: Types.ObjectId, ref: 'User', required: true },
})

module.exports = model('Classified', schema)
