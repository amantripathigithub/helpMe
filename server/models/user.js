const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let user_helpme = new Schema({
    email: {
      type: String
    },
    password: {
      type: String
    },
    name: {
      type: String 
    },
  });

  const user_model_helpme = mongoose.model("users_helpme",user_helpme );

  module.exports = user_model_helpme;
  