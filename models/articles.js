var mongoose = require("mongoose");


var Schema = mongoose.Schema;


var UserSchema = new Schema({

   title: {
      type: String,
      trim: true,
      unique: true
   },

   link: {
      type: String,
      trim: true
   },

   summary: {
      type: String,
      trim: true
   },

   image: {
      type: String,
      trim: true
   },

   comments: {
      type: Array,
      trim: true
   }

});


var articles = mongoose.model("Articles", UserSchema);


module.exports = articles;
