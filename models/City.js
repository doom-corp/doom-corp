const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const citySchema = new Schema(
  {
  username: String, //Who ordered the attack
  cityName: String, //Which city it was
  deathToll: Number,
  coordinates : {
    lat: Number,
    long : Number
  }
},
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }

);

const City  = mongoose.model('City', citySchema);
module.exports = City;