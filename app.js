$('.logo').hover(function() {
  'use strict';
  $('.logo').toggleClass('rotated');
});

$('.logo').click(function() {
  'use strict';
  $('.logo').toggleClass('rotated');
  $('.logo').toggleClass('rotated');
});

$('.landing').click(function() {
  'use strict';
  $('.landing').fadeOut(1000);
  $('.poem').css('display', 'block');
  $('nav, .poem, footer').delay(1000).animate({ opacity: 1.0 }, 1500);
});

$('.poem').append('<h4 class="load">Press the white circle below</h4>');

var stateCount = 0;
var states = [];
var state = {};
var bodyObj = $('body').prop('style');
var saveState = function() {
  'use strict';
  state = {
    image: bodyObj.backgroundImage,
    poem: $('.poem').html()
  };
  states.push(state);
};

var url = 'https://cors-anywhere.herokuapp.com/poetrydb.org/author';
var randomAuthor = function() {
  'use strict';

  return Math.floor(Math.random() * 129);
};

var getPoem = function() {
  'use strict';
  $.getJSON(url, function(data) {
    var authors = data.authors;
    var $xhr2 = $.getJSON(url + '/' + authors[randomAuthor()], function(data) {
      $xhr2.done(function() {
        var poem = data[Math.floor(Math.random() * data.length)];
        var author = poem.author;
        var title = poem.title;
        var lines = poem.lines;

        $('.poem').empty();
        $('.poem').append('<h4>' + title + '</h4><h4>' + author + '</h4>');

        lines.forEach(function(line) {
          $('.poem').append('<p>' + line + '</p>');
        });
        saveState();
        stateCount += 1;
      });
    });
  });
};

var newPoem = function() {
  'use strict';

  $('.poem').empty();
  $('.poem').append('<h4 class="load">loading poem...</h4>');
  $('.load').animate({ opacity: 1 }, 1000);
  getPoem();
};

$.ajax({
  method: 'GET',
  url: 'https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&gallery_id=72157666569424964&api_key=c1cc42b0a06a4e8d5b83d306ee92c0eb&format=json',
  dataType: 'jsonp'
});

var jsonFlickrApi = function(data) {
  'use strict';
  var photos = data.photos.photo;
  var photo = photos[Math.floor(Math.random() * photos.length)];
  var id = photo.id;
  var serverId = photo.server;
  var farm = photo.farm;
  var secret = photo.secret;
  var galleryUrl = 'https://farm' + farm + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '_b.jpg';

  $('body').addClass('image');
  $('.image').css('background-image', 'url(' + galleryUrl + ')');

  $('.dot').off('click');

  $('.dot').on('click', function() {
    $('.active').removeClass('active');
    $('.dot').addClass('active');
    jsonFlickrApi(data);
    newPoem();
  });

  $(document).off('keydown');
  $(document).on('keydown', function(event) {
    if (event.keyCode === 39) {
      jsonFlickrApi(data);
      newPoem();
    }
    if (event.keyCode === 38) {
      $('#minus').text('-');
      $('#plus').text(null);
      $('.poem').animate({ opacity: 1 }, 500);
      $('footer .center').css('bottom', '50px');
    }
    if (event.keyCode === 40) {
      $('#minus').text(null);
      $('#plus').text('+');
      $('.poem').animate({ opacity: 0 }, 500);
      $('footer .center').css('bottom', '70px');
    }
    if (event.keyCode === 37) {
      $('.image').css('background-image', states[states.length - 2].image);
      $('.poem').html(states[states.length - 2].poem);
      states.pop();
    }
  });
};

$('.button-collapse').sideNav();

$('.share').click(function() {
  'use strict';

  window.open($(window).attr('href'), 'title', 'width=590, height=600');

  return false;
});

$('#minus').click(function() {
  'use strict';

  $('#minus').text(null);
  $('#plus').text('+');
  $('.poem').animate({ opacity: 0 }, 500);
  $('footer .center').css('bottom', '70px');
});

$('#plus').click(function() {
  'use strict';

  $('#minus').text('-');
  $('#plus').text(null);
  $('.poem').animate({ opacity: 1 }, 500);
  $('footer .center').css('bottom', '50px');
});
