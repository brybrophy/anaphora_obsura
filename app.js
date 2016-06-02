

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

var $xhr = $.ajax({
  method: "GET",
  url: "https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&gallery_id=72157666569424964&api_key=c1cc42b0a06a4e8d5b83d306ee92c0eb&format=json",
  dataType: "jsonp"
});



var jsonFlickrApi = function(data) {
  var photos = data.photos.photo;
  var photo = photos[Math.floor(Math.random() * photos.length)];
  var id = photo.id;
  var serverId = photo.server;
  var farm = photo.farm;
  var secret = photo.secret;
  var galleryUrl = `https://farm${farm}.staticflickr.com/${serverId}/${id}_${secret}_b.jpg`;

  $('body').addClass('image');
  $('.image').css('background-image', 'url(' + galleryUrl + ')');

  $('.dot').off('click');

  $('.dot').on('click', function() {
    $('.active').removeClass('active');
    $(this).addClass('active');
    jsonFlickrApi(data);
    newPoem();
    console.log(data);
  });

  $(document).off('keydown');
  $(document).on('keydown', function(event) {
    if (event.keyCode === 39) {
      console.log('left');
      jsonFlickrApi(data);
      newPoem();
    }
  });
}

var url = 'https://cors-anywhere.herokuapp.com/poetrydb.org/author';

var randomAuthor = function(data) {
  return Math.floor(Math.random() * 129);
}

var getPoem = function() {
  var $xhr1 = $.getJSON(url, function(data) {
    var authors = data.authors
    $('.poem').append(`<h4 class="load">loading poem...</h4>`);
    var $xhr2 = $.getJSON(`${url}/${authors[randomAuthor()]}`, function(data) {

      var $randomPoem = $xhr2.done(function() {
        var poem = data[Math.floor(Math.random() * data.length)];
        var author = poem.author;
        var title = poem.title;
        var lines = poem.lines;
        $('.poem').empty();
        $('.poem').append(`<h4>${title}</h4><h4>${author}</h4>`);

        lines.forEach(function(line) {
          $('.poem').append(`<p>${line}</p>`);
        })
      })
    });
  });
};
getPoem();

var newPoem = function() {
  $('.poem').empty();
  $('.poem').append(`<h4 class="load">loading poem...</h4>`);
  $('.load').animate({opacity: 1}, 1000);
  getPoem();
}

$(".button-collapse").sideNav();
