var testimonials = [];

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

  $(".tab-navigation").on('click', function () {
    var _index = $(this).data('index');
    $('#tab-nav li:eq(' + _index + ') a').tab('show')
  });

  $("#contact-joe").on('submit', function (e) {
    e.preventDefault();

    $("#contact-joe").find('button[type="submit"]').attr('disabled','disabled').addClass('disabled');

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
              $('div[data-index="3"]').hide();
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
    for (var i = 0; i < data.length; i += 1) {
      for (var j = 0; j < data[i].testimonials.length; j += 1) {
        var _tmp = {
          "name" : data[i].name,
          "body" : data[i].testimonials[j]
        };
        testimonials.push(_tmp);
      }
    }

    triggerNewTesti();
    $('a[href="#home"]').on('show', function () {
      triggerNewTesti();
    });
  });
}

function triggerNewTesti() {
  var _index = randomize(0, testimonials.length - 1);

  $('blockquote').find('p').text(testimonials[_index].body);
  $('blockquote').find('small').text(testimonials[_index].name);
  $('blockquote').show();
}

function randomize(min, max) {
  var random = Math.floor((Math.random() * ((max + 1) - min)) + min);
  return random;
}