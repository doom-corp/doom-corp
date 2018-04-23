const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: sString,
  password: String,
  role : {
    type: String,
    enum : ['admin', 'scientist', 'executive', 'minion'],
    default : 'minion'
}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
