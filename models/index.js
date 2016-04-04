var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tunely");

// import models:

module.exports.Album = require("./album.js");
