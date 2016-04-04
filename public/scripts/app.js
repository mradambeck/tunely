/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


var $albumsTarget;

var albums = [];

$(document).ready(function() {
  console.log('app.js loaded!');

  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: handleSuccess,
    error: handleError
  });

});

function handleSuccess(json){
  console.log("success: ", json);
  renderAlbum(json);
}

function handleError(xhr, status, errorThrown){
  console.log('api/albums handleError: ', xhr, status, errorThrown);
}

function renderAlbum(albums){
  console.log("renderAlbum: ", albums);
  //capture html for handlebars
  var albumSource = $('#album-template').html();
  //compile handlebars template
  var albumTemplate = Handlebars.compile(albumSource);

  albums.forEach(function (album){
    var html = albumTemplate(album);
    $('#albums').prepend(html);
  });

}
