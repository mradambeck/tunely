var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tunely");

// import models:

module.exports.Song = require("./song.js");
module.exports.Album = require("./album.js");
