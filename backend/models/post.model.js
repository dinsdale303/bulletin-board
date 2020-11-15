const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  author: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true },
  outline: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  price: { type: Number },
  phone: { type: String },
  location: { type: String },
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

module.exports = mongoose.model('Post', postSchema);
