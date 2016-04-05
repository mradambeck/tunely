////////////////////
// CLIENT-SIDE JS //
////////////////////

var $albumsTarget;
var $songModal;
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

  // opens modal
  $('#albums').on('click', '.add-song', function(click){
    $songModal = $('#songModal');
    // grab Album._id
    var currentAlbumId = $(this).closest('.album').data('album-id');
    console.log('app.js, .add-song click');
    console.log(currentAlbumId);

    // open modal (thnx bootstrpz!)
    $songModal.modal();
    // add Album._id as html attribute to modal
    $songModal.attr('data-album-id', currentAlbumId);
  });

  // call this when the button on the modal is clicked
  $('button#saveSong.btn.btn-primary').on('click', function handleNewSongSubmit(e) {
    console.log('#saveSong button clicked');
    e.preventDefault();

    // get data from modal fields

    var formData = $('.modal-input').serialize();
    console.log('app.js, formData: ', formData);

    // get album ID
    var currentAlbumId = $(this).closest('#songModal').data('album-id');
    // create path to post to
    var songSubmitUrl = '/api/albums/' + currentAlbumId + '/songs';
    console.log('app.js, songSubmitUrl: ', songSubmitUrl);

    // POST to SERVER
    $.ajax({
      method: 'POST',
      url: songSubmitUrl,
      data: formData,
      success: newSongSuccess,
      error: newSongError
    });

    // clear form
    $('.modal-input').val('');
    // close modal
    $('#songModal').modal('hide');
    // update the correct album to show the new song
  });

});

// new song submit handlers
function newSongSuccess(data){
  console.log('app.js, newSongSuccess: ',data);
}
function newSongError(data){
  console.log('app.js, newSongError: ',data);
}

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
  renderAlbum(json);
}
function handleError(xhr, status, errorThrown){
  console.log('api/albums handleError: ', xhr, status, errorThrown);
}

// Render a single album (when adding)
function renderOneAlbum(album){
  console.log('app.js, renderOneAlbum: ', album);

  // handlebars template
  var oneAlbumSource = $('#album-template').html();
  var oneAlbumTemplate = Handlebars.compile(oneAlbumSource);

  //prepend album
  var html = oneAlbumTemplate(album);
  $('#albums').prepend(html);

}

// Render all albums on load
function renderAlbum(albums){
  // console.log("renderAlbum: ", albums);
  //capture html for handlebars
  var albumSource = $('#album-template').html();
  // compile handlebars template
  var albumTemplate = Handlebars.compile(albumSource);
  // render albums to page
  albums.forEach(function (album){
    var html = albumTemplate(album);
    $('#albums').prepend(html);
  });

}
