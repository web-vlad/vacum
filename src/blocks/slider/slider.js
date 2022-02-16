"use strict"
$(function() {

    // slider banner
    $('.slider-banner').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        //fade: true,
        //variableWidth: true,
        speed: 2000,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        rows: 0
    });

    $(".tabs li").click(function() {
		$(".tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".tab-content").removeClass('open'); //Hide all tab content
		let activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		$(activeTab).addClass('open'); //Fade in the active content
		return false;
	});
 

    // slider product
    $('.slider-product--1').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 1500,
        autoplay: false,
        autoplaySpeed: 2000,
        dots: false,
        rows: 0,
        appendArrows: $('.slider-nav--1'),
        prevArrow: '<button id="prev1" type="button" class="slick-arrow slick-prev"></button>',
        nextArrow: '<button id="next1" type="button" class="slick-arrow slick-next"></button>',
        responsive: [
            {
                breakpoint: 1201,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 511,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
    $('.slider-product--2').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 1500,
        autoplay: false,
        autoplaySpeed: 2000,
        dots: false,
        rows: 0,
        appendArrows: $('.slider-nav--2'),
        prevArrow: '<button id="prev2" type="button" class="slick-arrow slick-prev"></button>',
        nextArrow: '<button id="next2" type="button" class="slick-arrow slick-next"></button>',
        responsive: [
            {
                breakpoint: 1201,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 511,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
    $('.slider-product--3').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 1500,
        autoplay: false,
        autoplaySpeed: 2000,
        dots: false,
        rows: 0,
        appendArrows: $('.slider-nav--3'),
        prevArrow: '<button id="prev3" type="button" class="slick-arrow slick-prev"></button>',
        nextArrow: '<button id="next3" type="button" class="slick-arrow slick-next"></button>',
        responsive: [
            {
                breakpoint: 1201,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 511,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
    $('.slider-product--4').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 1500,
        autoplay: false,
        autoplaySpeed: 2000,
        dots: false,
        rows: 0,
        appendArrows: $('.slider-nav--4'),
        prevArrow: '<button id="prev4" type="button" class="slick-arrow slick-prev"></button>',
        nextArrow: '<button id="next4" type="button" class="slick-arrow slick-next"></button>',
        responsive: [
            {
                breakpoint: 1201,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 511,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // slider news
    $('.slider-news').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 2000,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        rows: 0,
        responsive: [
            {
                breakpoint: 1201,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 511,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // slider card product
    // slider card big
    $('.slider-card').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 0,
        fade: true,
        speed: 1000,
        arrows: false,
        asNavFor: '.card-nav'
    });
    // slider nav for card big
    $('.card-nav').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        rows: 0,
        asNavFor: '.slider-card',
        dots: false,
        //centerMode: true,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 794,
                settings: {
                    slidesToShow: 4,
                    vertical: true
                    //verticalSwiping: true
                }
            },
            {
                breakpoint: 576,
                settings: {
                    vertical: true,
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 575,
                settings: {
                    vertical: false,
                    slidesToShow: 4
                }
            }
        ]
    });

    // zoom product
    var isTouchSupported = 'ontouchstart' in window;

    $('.xzoom, .xzoom-gallery').xzoom();
    
    if (isTouchSupported) {
        //If touch device
        $('.xzoom').each(function() {
           var xzoom = $(this).data('xzoom');
           xzoom.eventunbind();
        });


        $('.xzoom').each(function() {
            var xzoom = $(this).data('xzoom');
            $(this).hammer().on("tap", function(event) {
                event.pageX = event.gesture.center.pageX;
                event.pageY = event.gesture.center.pageY;
                var s = 1, ls;

                xzoom.eventmove = function(element) {
                    element.hammer().on('drag', function(event) {
                        event.pageX = event.gesture.center.pageX;
                        event.pageY = event.gesture.center.pageY;
                        xzoom.movezoom(event);
                        event.gesture.preventDefault();
                    });
                }

                var counter = 0;
                xzoom.eventclick = function(element) {
                    element.hammer().on('tap', function() {
                        counter++;
                        if (counter == 1) setTimeout(openmagnific,300);
                            event.gesture.preventDefault();
                    });
                }

                    function openmagnific() {
                        if (counter == 2) {
                            xzoom.closezoom();
                            var gallery = xzoom.gallery().cgallery;
                            var i, images = new Array();
                            for (i in gallery) {
                                images[i] = {src: gallery[i]};
                            }
                            $.magnificPopup.open({items: images, type:'image', gallery: {enabled: true}});
                        } else {
                            xzoom.closezoom();
                        }
                        counter = 0;
                    }
                    xzoom.openzoom(event);
                });
            });

        } else {
        //If not touch device

       //Integration with fancybox plugin

       //Integration with magnific popup plugin
       $('#xzoom-magnific').bind('click', function(event) {
            var xzoom = $(this).data('xzoom');
            xzoom.closezoom();
            var gallery = xzoom.gallery().cgallery;
            var i, images = new Array();
            for (i in gallery) {
                images[i] = {src: gallery[i]};
            }
            $.magnificPopup.open({items: images, type:'image', gallery: {enabled: true}});
            event.preventDefault();
        });
    }

    // if thumbs item > 1
    /*    let imgThumbs = $('.xzoom-thumbs .item-thumbs');
    if (imgThumbs.length > 1) {
        console.log(imgThumbs.length);
        imgThumbs.parent().addClass('active');
    } else {
            imgThumbs.parent().removeClass('active');
    } */

    // product characteristic show
    let listInfoItem = $('.list-info').hasClass('list-info--hide');
    let allCharacteristic = $('.all-characteristic');
    allCharacteristic.on('click', function(e) {
        e.preventDefault();
        if(listInfoItem) {
            console.log('Свернуть');
            $(this).toggleClass('active');
            $('.list-info .list-info__item:nth-child(6) ~ .list-info__item').toggleClass('show');
            if($(this).hasClass('active')) {
                $(this).find('span').text('Свернуть');
            } else {
                $(this).find('span').text('Все характеристики');
            }
        }
        return false;
    });

    // desktop show tab anchor
    $('.info-help__tab--desktop').on("click", function(e){
        var anchor = $(this);
        $('html, body').stop().animate({
           scrollTop: $(anchor.attr('href')).offset().top-100
        }, 1000);
        $('.tabs--product li').removeClass('active');
        $('.tabs--product li:eq(2)').toggleClass('active');
        $(".tab-content").removeClass('open');
        $('.tab-content--delivery').toggleClass('open');
        e.preventDefault();
     });

    // products tab mobil show
/*     let btnProductShow = $('.tab-content .tab-content__button');
    btnProductShow.on('click', function(event) {
        event.preventDefault();
        btnProductShow.not(this).next().slideUp();
        $(this).next().slideToggle();
        $(this).toggleClass('active');
        btnProductShow.not(this).removeClass('active');
    }); */

    let btnProductShow = $('.tab-content .tab-content__button');
    btnProductShow.on('click', function(event) {
        event.preventDefault();
        //btnProductShow.not(this).next().slideUp();
        btnProductShow.not(this).next().removeClass('open');
        $(this).next().toggleClass('open');
        $(this).toggleClass('active');
        btnProductShow.not(this).removeClass('active');
    });


     // desktop show tab anchor
    $('.info-help__tab--mobil').on("click", function(e){
        var anchorMobil = $(this);
        $('html, body').stop().animate({
           scrollTop: $(anchorMobil.attr('href')).offset().top-10
        }, 1000);
        $('.tab-content--delivery .tab-content__wrapp').toggleClass('open');
        e.preventDefault();
     });


    // scroll aside widget consult
/*     let blockScroll = $('.widget--consult');
    let counter = 0;
    $(window).scroll(function () {
        if ($(this).scrollTop() > 950) {
            blockScroll.addClass('fixed');
        } else {
            blockScroll.removeClass('fixed');
        }
    });  */
    
        //var top = $('.widget--consult').offset().top - parseFloat($('.widget--consult').css('marginTop').replace(/auto/, 0));
        var top = $('.widget--consult').offset().top - parseFloat($('.widget--consult').css('marginTop').replace(/auto/, 0));
        var footTop = $('.footer').offset().top - parseFloat($('.footer').css('marginTop').replace(/auto/, 0));

        var maxY = footTop - $('.widget--consult').outerHeight();

        $(window).scroll(function(evt) {
            var y = $(this).scrollTop();
            if (y >= top - $('.d-lg-block').height() ) {
                if (y < maxY - 100) {
                    $('.widget--consult').addClass('fixed').removeAttr('style');
                } else {
                    $('.widget--consult').removeClass('fixed').css({
                        position: 'absolute',
                        //top: (maxY - top) + 'px'
                        bottom: '0'
                    });
                }
            } else {
                $('.widget--consult').removeClass('fixed');
            }
        });
 
});