// Slidebox Script

$(function() {
  var slidebox = $('#slidebox');
  if (slidebox.length > 0) {
    $(window).scroll(function(){
        var distanceTop = $('#last').offset().top - $(window).height();
        if  ($(window).scrollTop() > distanceTop)
            slidebox.animate({'right':'0px'},300);
        else
            slidebox.stop(true).animate({'right':'-700px'},100);
    });
    $('#slidebox .close').on('click',function(){
        $(this).parent().remove();
    });
  }
});
