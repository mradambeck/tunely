/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */



/* hard-coded data! */
var $albumsTarget;
var albumTemplate;
var sampleAlbums = [];

sampleAlbums.push({
             artistName: 'Ladyhawke',
             name: 'Ladyhawke',
             releaseDate: '2008, November 18',
             genres: [ 'new wave', 'indie rock', 'synth pop' ]
           });
sampleAlbums.push({
             artistName: 'The Knife',
             name: 'Silent Shout',
             releaseDate: '2006, February 17',
             genres: [ 'synth pop', 'electronica', 'experimental' ]
           });
sampleAlbums.push({
             artistName: 'Juno Reactor',
             name: 'Shango',
             releaseDate: '2000, October 9',
             genres: [ 'electronic', 'goa trance', 'tribal house' ]
           });
sampleAlbums.push({
             artistName: 'Philip Wesley',
             name: 'Dark Night of the Soul',
             releaseDate: '2008, September 12',
             genres: [ 'piano' ]
           });
/* end of hard-coded data */




$(document).ready(function() {
  console.log('app.js loaded!');

  var albumSource = $('#album-template').html();
  albumTemplate = Handlebars.compile(albumSource);

  $albumsTarget = $('#albums');

  renderAlbums(sampleAlbums);
});


// this function takes a single album and renders it to the page
function renderAlbums(albums) {
  console.log('rendering albums:', albums);

  // empty existing posts from view
  $albumsTarget.empty();

  // pass `allPeople` into the template function
  var albumsHtml = albumTemplate({ albums: sampleAlbums });

  console.log('albumTemplate: ', albumTemplate);
  console.log('albumHtml: ', albumsHtml);
  // append html to the view
  $albumsTarget.append(albumsHtml);

}
