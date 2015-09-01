$(function () {
  $('[data-tooltip="tooltip"]').tooltip()
})

$('[data-target="#modal-fullsize-img"]').on('click', function(){

    var title = $('.selected-image').attr("title");
    var imgSrc = $('.selected-image').attr("src");
    $('#modal-fullsize-img-title').text(title);
    $('.modal-body').html('<img src="'+ imgSrc + '" alt="' + title + '">');
})
// $('#myModal').on('show.bs.modal', function () {
// $('.modal-content').css('height',$( window ).height()*0.8);
// });