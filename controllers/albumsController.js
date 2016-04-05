/************
* DATABASE *
************/

var db = require('../models');

/* hard-coded data */
var albums = [];
// albums.push({
//               _id: 132,
//               artistName: 'Nine Inch Nails',
//               name: 'The Downward Spiral',
//               releaseDate: '1994, March 8',
//               genres: [ 'industrial', 'industrial metal' ]
//             });
// albums.push({
//               _id: 133,
//               artistName: 'Metallica',
//               name: 'Metallica',
//               releaseDate: '1991, August 12',
//               genres: [ 'heavy metal' ]
//             });
// albums.push({
//               _id: 134,
//               artistName: 'The Prodigy',
//               name: 'Music for the Jilted Generation',
//               releaseDate: '1994, July 4',
//               genres: [ 'electronica', 'breakbeat hardcore', 'rave', 'jungle' ]
//             });
// albums.push({
//               _id: 135,
//               artistName: 'Johnny Cash',
//               name: 'Unchained',
//               releaseDate: '1996, November 5',
//               genres: [ 'country', 'rock' ]
//             });


// GET /api/albums
function index(req, res) {

  console.log('albumsController.js, /api/albums: ', req.body);
  // res.json(renderedAlbums);
  db.Album.find(function (err, albums){
    if (err) {
      console.log('error: app.get /api/albums :: ', err);
    }
    console.log('albumController.js, albums: ', albums);
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
