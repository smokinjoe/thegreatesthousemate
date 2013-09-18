var testimonials;

$(document).ready(function () {
  $(document).on('click', '#start-tour', function () {
    $('.nav-pills').find('li').removeClass('active');
    $('.nav-pills').find('li').eq(1).addClass('active');
  });

  $('a[data-toggle="tab"]').on('show', function () {
    if ($(window).scrollTop())
      $('html, body').animate({scrollTop:0}, 'fast');
  });

  loadTesties();

  $('#another-testi').click(function (e) {
    e.preventDefault();
    triggerNewTesti();
  });

  $("#contact form").on('submit', function (e) {
    e.preventDefault();

    var _name = $("#inputName").val();
    var _email = $("#inputEmail").val();

    $.ajax({
      type: "POST",
      url: "joemail.php",
      dataType: 'json',
      data: {
        name : _name,
        email : _email
      },
      success: function(response) {
        if (response.result) {
          $('form').fadeOut(function () {
            $("#contact").find('.well').html('<div class="text-center"><h3 class="">Talk soon!</h3><img src="assets/img/whoa-joe.jpg" height="190"></div>');
            $("#contact").delay(5000).slideUp(function () {
              $('a[href="#contact"]').hide();
              $('a[href="#interests').tab('show');
            });
          });
        }
        else {
          $("#contact").find('.control-group').addClass('error');
        }
      }
    });
  });
});


function loadTesties() {
  $.getJSON('assets/js/testimonials.json', function(data) {
    testimonials = data;
    triggerNewTesti();
    $('a[href="#home"]').on('show', function () {
      triggerNewTesti();
    });
  });
}

function triggerNewTesti() {
  var _person = randomize(0, testimonials.length - 1);
  var _quote = randomize(0, testimonials[_person].testimonials.length - 1);

  $('blockquote').find('p').text(testimonials[_person].testimonials[_quote]);
  $('blockquote').find('small').text(testimonials[_person].name);
  $('blockquote').show();
}

function randomize(min, max) {
  var random = Math.floor((Math.random() * ((max + 1) - min)) + min);
  return random;
}