"use strict"
$(function() {
    // main menu mobil
    $('.button-menu').click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).toggleClass('active');
        $('.catalog-owerlay').addClass('open-owerlay');
        $('.mobil-nav').toggleClass('open');
    });

    $('.close-menu, .mobil-nav, body').click(function() {
        $('.button-menu').removeClass('active');
        $('.mobil-nav').removeClass('open');
    });

    // mobil sub menu show
    let btnMenu = $('.mobil-nav .btn-sub');
    btnMenu.on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      btnMenu.not(this).next().slideUp();
      $(this).next().slideToggle();
      $(this).toggleClass('active');
      btnMenu.not(this).removeClass('active');
    });

    // scroll
    $('.scroll').jScrollPane();

    // catalog desctop
    $('.btn-catalog--desctop').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault;
            $('.catalog-dropdown').toggleClass('catalog-show');
            $(this).toggleClass('active');
            $('.catalog-owerlay').addClass('open-owerlay');
            return false;
        });
    });

    // catalog mobil
    $('.btn-catalog--mobil').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault;
            $('.mobil-catalog').toggleClass('catalog-show');
            $(this).toggleClass('active');
            $('.catalog-owerlay').addClass('open-owerlay');
            return false;
        });
    });
    
    let btnSub = $('.catalog-menu__item');
    // click sub menu open
/*     btnSub.on('click', function(e) {
        e.preventDefault;
        btnSub.not(this).find('.sub-menu--catalog').removeClass('open');
        btnSub.not(this).parent().next('.sub-menu--catalog').removeClass('open');
        $(this).find('.sub-menu--catalog').addClass('open');
        $(this).parent().find('.sub-menu--catalog').addClass('open');
        $(this).removeClass('active');
        $(this).parent().toggleClass('active');
        return false;
    }); */

    // hover sub menu open
    btnSub.hover(function () {
        let modal = $(this).data('sub');
        $('.sub-menu--catalog').removeClass('open');
        $('.catalog-menu__item').removeClass('active');
        $(this).addClass('active');
        $('#' + modal).addClass('open');
    });

    // mobil sub menu open
    let btnSubMobil = $('.mobil-catalog .catalog-menu__btn');
    btnSubMobil.on('click', function(e) {
        e.preventDefault;
        e.stopPropagation();
        btnSubMobil.not(this).parent().next('.sub-menu--catalog').removeClass('open');
        $(this).parent().next('.sub-menu--catalog').toggleClass('open');
        $(this).parent().toggleClass('active');
        return false;
    });

    $('.catalog-owerlay, .catalog-dropdown__close, .mobil-nav').on('click', function() {
        $('.catalog-owerlay').removeClass('open-owerlay');
        $('.sub-menu--catalog').removeClass('open');
        $('.catalog-menu__item').removeClass('active');
        $('.catalog-dropdown, .mobil-catalog').removeClass('catalog-show');
    });

});