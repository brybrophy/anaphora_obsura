$('.logo').hover(function() {
  $(this).toggleClass('rotated');
})

$('.logo').click(function() {
  $(this).toggleClass('rotated');
  $(this).toggleClass('rotated');

})

$('section').click(function() {
  $(this).fadeOut(2000);
  $('nav').delay(1500).animate({opacity: 1.0}, 2000);
})
