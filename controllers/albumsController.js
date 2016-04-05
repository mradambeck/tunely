/************
* DATABASE *
************/

var db = require('../models');

/* hard-coded data */
var albums = [];



// GET /api/albums
function index(req, res) {

  // console.log('albumsController.js, /api/albums: ', req.body);
  // res.json(renderedAlbums);
  db.Album.find(function (err, albums){
    if (err) {
      console.log('error: app.get /api/albums :: ', err);
    }
    res.json(albums);
  });

}

function create(req, res) {

  // SPLIT GENRES INTO AN ARRAY
  var genres = req.body.genres.split(',').map(function(item) {
    return item.trim();
  });
  req.body.genres = genres;

  var newAlbum = new db.Album(req.body);
  newAlbum.save(function handleDBSave(err, data){
    if (err){
      console.log('handleDBSave err: ', err);
    }
    res.json(data);
  });
}


function show(req, res) {
  // FILL ME IN !
}

function destroy(req, res) {
  // FILL ME IN !
}

function update(req, res) {
  // FILL ME IN !
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
