$(document).ready(function () {
  $(document).on('click', '#start-tour', function () {
    $('.nav-pills').find('li').removeClass('active');
    $('.nav-pills').find('li').eq(1).addClass('active');
  });

});