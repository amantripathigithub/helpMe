const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let user_location = new Schema({
    email: {
      type: String
    },
    longitude:{
        type : Number
    },
    
    latitude:{
        type : Number
    },
    
  });

  const user_model_location = mongoose.model("users_helpme_location",user_location );

  module.exports = user_model_location;
  