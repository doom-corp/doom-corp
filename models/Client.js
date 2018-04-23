const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const clientSchema = new Schema({
  username: String,
  password: String,
  occupation: String,
})

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;