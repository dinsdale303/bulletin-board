const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, required: true },
    nickname: { type: String, required: true },
    subId: { type: String, required: true },
    subFrom: { type: String, required: true },
  },
  { timestamps: { created: 'created_at', updated: 'updated_at' } }
);

module.exports = mongoose.model('User', userSchema);
