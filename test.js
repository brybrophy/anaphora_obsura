var url = 'https://cors-anywhere.herokuapp.com/poetrydb.org/author';

var randomAuthor = function(data) {
  return Math.floor(Math.random() * 129);
}
var $xhl1 = $.getJSON(url, function(data) {
  console.log(data);
  var authors = data.authors
  console.log(authors);

  var $xml2 = $.getJSON(`${url}/${authors[randomAuthor()]}`, function(data) {

    var $randomPoem = $xml2.done(function() {
      console.log(data[Math.floor(Math.random() * data.length)]);
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
