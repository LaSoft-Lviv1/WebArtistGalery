$(function () {
  $('[data-tooltip="tooltip"]').tooltip()
})

$('[data-target="#modal-fullsize-img"]').on('click', function(){

    var title = $('.selected-image').attr("title");
    var imgSrc = $('.selected-image').attr("src");
    $('#modal-fullsize-img-title').text(title);
    $('.modal-body').html('<img class="img-responsive-height" src="'+ imgSrc + '" alt="' + title + '">');
})

function centerModal() {
    $(this).css('display', 'block');
    var $dialog = $(this).find(".modal-dialog");
    var vertOffset = ($(window).height() - $dialog.height()) / 2;
    // Center modal vertically in window
    $dialog.css("margin-top", vertOffset);
}

$('.modal').on('show.bs.modal', centerModal);
$(window).on("resize", function () {
    $('.modal:visible').each(centerModal);
});