$(document).ready(function () {
  $(document).on('click', '#start-tour', function () {
    $('.nav-pills').find('li').removeClass('active');
    $('.nav-pills').find('li').eq(1).addClass('active');
  });

  $('a[data-toggle="tab"]').on('show', function () {
    if ($(window).scrollTop())
      $('html, body').animate({scrollTop:0}, 'fast');
  });
});