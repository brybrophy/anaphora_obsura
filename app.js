$('img').hover(function() {
  $(this).toggleClass('rotated');
})

$('img').click(function() {
  $(this).addClass('rotated');
})

$('a').click(function() {
  event.preventDefault();
})
