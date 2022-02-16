"use strict"
$(function() {

    let btnModal = $('.btn-modal'),
        //close = $('.modal__close, .modal .btn--city');
        close = $('.modal__close, .modal .btn--city, .modal');
    
    $('.modal__dialog').on('click', function(e) {
        e.stopPropagation();
    });

    btnModal.click(function () {
        let modal = $(this).data('modal');
        $('#' + modal).addClass('active');
        $('#' + modal).find('.modal__dialog').addClass('active');
    });

    close.on('click', function (e) {
        e.preventDefault();
        $('.modal, .modal__dialog').removeClass('active');
    });

    $('.modal__list__link').each(function(i) {
        $(this).on('click', function(e) {
            e.stopPropagation();
            $('.modal .modal__list--city .modal__list__link').parent().removeClass('active');
            $(this).parent().addClass('active');
        });
    });

    $('.modal .btn--city').each(function(i) {
        $(this).on('click', function() {
            $('.btn-modal--city span').text($('.modal__list__item.active .modal__list__link').eq(i).text());
            return false;
        });
    });


});

