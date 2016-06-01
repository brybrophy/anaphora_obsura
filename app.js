

$('.logo').hover(function() {
  $(this).toggleClass('rotated');
})

$('.logo').click(function() {
  $(this).toggleClass('rotated');
  $(this).toggleClass('rotated');

})

$('.landing').click(function() {
  $(this).fadeOut(2000);
  $('.poem').css('display', 'block');
  $('nav, .poem, footer').delay(1500).animate({opacity: 1.0}, 2000);

})

$('.arrow').on('click', function() {
  $('.arrow').addClass('.active');
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
  var id = photo.id;
  var serverId = photo.server;
  var farm = photo.farm;
  var secret = photo.secret;

  var galleryUrl = `https://farm${farm}.staticflickr.com/${serverId}/${id}_${secret}_b.jpg`;

  $('body').addClass('image');
  $('.image').css('background-image', 'url(' + galleryUrl + ')')
}

var url = 'https://cors-anywhere.herokuapp.com/poetrydb.org/author';

var randomAuthor = function(data) {
  return Math.floor(Math.random() * 129);
}
var $xhl1 = $.getJSON(url, function(data) {
  var authors = data.authors

  var $xml2 = $.getJSON(`${url}/${authors[randomAuthor()]}`, function(data) {

    var $randomPoem = $xml2.done(function() {
      var poem = data[Math.floor(Math.random() * data.length)];
      var author = poem.author;
      var title = poem.title;
      var lines = poem.lines;

      $('.poem').append(`<h4>${title}</h4><h4>${author}</h4>`);

      lines.forEach(function(line) {
        $('.poem').append(`<p>${line}</p>`);
      })

    })




  });
});
