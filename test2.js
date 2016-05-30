
var galleriesObj = {
  shadesOfPastel: 72157666222357401,
  rainbow: 72157668201916531,
  greenThumb: 72157666259558636,
  theMagicMoment: 72157664581405925
}

var galleriesArr = [72157666222357401, 72157668201916531, 72157666259558636]

var randomGallery = galleriesArr[Math.floor(Math.random() * galleriesArr.length)];
console.log(randomGallery);

var $xml = $.ajax({
  method: "GET",
  url: "https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&gallery_id=72157666222357401&api_key=c1cc42b0a06a4e8d5b83d306ee92c0eb&format=json",
  dataType: "jsonp"
});



var jsonFlickrApi = function(data) {
  // console.log(data);

  var photos = data.photos.photo;
  var photo = photos[Math.floor(Math.random() * photos.length)];
  console.log(photo);
  var id = photo.id;
  console.log(id);
  var serverId = photo.server;
  console.log(serverId);
  var farm = photo.farm;
  console.log(farm);
  var secret = photo.secret;
  console.log(secret);

  $('body').append(`<img src="https://farm${farm}.staticflickr.com/${serverId}/${id}_${secret}_b.jpg">`);
}
