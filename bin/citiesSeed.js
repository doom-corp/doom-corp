require("dotenv").config();

const mongoose = require('mongoose');
const City = require('../models/City');
const dbURL = process.env.DBURL;
mongoose.connect(dbURL);
City.collection.drop();



const cityData = [
  {
    username: "John Dillinger", 
    cityName: "Murcia", 
    deathToll: 545,
    coordinates : {
      lat: 37.996289, 
      long : -1.130695
    }
   },
   {
    username: "Doctor Colossus", 
    cityName: "Sidney", 
    deathToll: 1205,
    coordinates : {
        lat: -33.868404, 
        long : 151.209391
     }
    },
  {
    username: "Señor Burns", 
    cityName: "Pekín", 
    deathToll: 34000,
    coordinates : {
          lat: 39.908003, 
          long : 116.372697
        }
      },
{
  username: "Oliver Habdo", 
  cityName: "Londres", 
  deathToll: 435,
  coordinates : {
    lat: 51.530015,
    long :  -0.126352
    }
},
  {
    username: "John Dillinger", 
    cityName: "Miami", 
    deathToll: 5213,
    coordinates : {
      lat: 25.770178, 
      long : -80.222252
    }
   },    
   {
    username: "Aleister Crowley", 
    cityName: "Oslo", 
    deathToll: 287,
    coordinates : {
      lat: 59.921667,  
      long : 10.754210
    }
   },
   {
    username: "Lady Spider", 
    cityName: "Paris", 
    deathToll: 36,
    coordinates : {
      lat: 48.875098, 
      long : 2.359417
    }
   },
   {
    username: "Eleanor Graham", 
    cityName: "Berlin", 
    deathToll: 201,
    coordinates : {
      lat: 52.464698,  
      long : 13.362900
    }
   },
   {
    username: "Devahi Patel", 
    cityName: "Bombay", 
    deathToll: 555,
    coordinates : {
      lat: 19.004959,  
      long : 72.831735
    }
   },   
   {
    username: "Devahi Patel", 
    cityName: "Albacete", 
    deathToll: 33,
    coordinates : {
      lat: 38.998464, 
      long : -1.858015
    }
   }          

]