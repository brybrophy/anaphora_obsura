$('.logo').hover(function() {
  $(this).toggleClass('rotated');
})

$('.logo').click(function() {
  $(this).toggleClass('rotated');
  $(this).toggleClass('rotated');

})

$('.landing').click(function() {
  $(this).fadeOut(2000);
  $('nav').delay(1500).animate({opacity: 1.0}, 2000);
  $('.leftCol, .rightCol').delay(2500).css({display: "inline"}).animate({opacity: 1.0}, 2500);
})

var $xml = $.ajax({
  method: "GET",
  url: "https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&gallery_id=72157666569424964&api_key=c1cc42b0a06a4e8d5b83d306ee92c0eb&format=json",
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

  var galleryUrl = `https://farm${farm}.staticflickr.com/${serverId}/${id}_${secret}_b.jpg`;

  $('body').addClass('image');
  $('.image').css('background-image', 'url(' + galleryUrl + ')')
}
