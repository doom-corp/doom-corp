const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const clientSchema = new Schema({
  username: String,
  password: String,
  occupation: String,
  needs: String,
  budget: number
})

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;