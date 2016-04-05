////////////////////
// CLIENT-SIDE JS //
////////////////////

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


  $('#newAlbumForm').on('submit', function(event) {
    event.preventDefault();
    var formData = $(this).serialize();
    console.log('app.js - new album serialized', formData);

    $.ajax({
      method: 'POST',
      url: '/api/albums',
      data: formData,
      success: newAlbumSuccess,
      error: newAlbumError
    });

    // $.post('/api/albums', formData, function(album){
    //   console.log('app.js - album after POST: ', album);
    //   renderAlbum(album);
    // });
    $(this).trigger("reset");
  });

});

// form submit handlers

function newAlbumSuccess(data){
  console.log('newAlbumSuccess', data);
  renderOneAlbum(data);
}

function newAlbumError(err){
  console.log('newAlbumError', err);
}

// ajax GET api/albums handlers

function handleSuccess(json){
  // console.log("success: ", json);
  renderAlbum(json);
}

function handleError(xhr, status, errorThrown){
  console.log('api/albums handleError: ', xhr, status, errorThrown);
}

// FOR POST ONLY NEED IT FOR ONE ALBUM - REMOVE FOREACH.

function renderOneAlbum(album){
  console.log('app.js, renderOneAlbum: ', album);

  // handlebars template
  var oneAlbumSource = $('#album-template').html();
  var oneAlbumTemplate = Handlebars.compile(oneAlbumSource);

  //prepend album
  var html = oneAlbumTemplate(album);
  $('#albums').prepend(html);

}

function renderAlbum(albums){
  // console.log("renderAlbum: ", albums);
  //capture html for handlebars
  var albumSource = $('#album-template').html();
  //compile handlebars template
  var albumTemplate = Handlebars.compile(albumSource);

  console.log(albums);
  albums.forEach(function (album){
    var html = albumTemplate(album);
    $('#albums').prepend(html);
  });

}
