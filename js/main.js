(function($) {
    "use strict";

    /*=============================================
        =    		 Preloader			      =
    =============================================*/
    function preloader() {
        $('#preloader').delay(0).fadeOut();
    };

    $(window).on('load', function() {
        preloader();
        aosAnimation();
        wowanimation();
    });

    // Menu bottom line active
    function menu_bottom_line_active() {
        var off = $('#mobile-menu .show').offset(),
            left = off.left,
            right = $(window).width() - left - $('#mobile-menu .show').width() + $('#mobile-menu .show').width();

        $('<style>.navbar-wrap ul li.show a::after{width:' + right + 'px;}</style>').appendTo("head");
    }

    menu_bottom_line_active();

    // Menu bottom line
    function menu_bottom_line() {

        $("#mobile-menu li").mouseover(function() {

            if ($("#mobile-menu li").hasClass("active")) {
                $(this).removeClass('active');
            }

            $(this).addClass('active');

            var off = $('#mobile-menu .active').offset(),
                left = off.left,
                right = $(window).width() - left - $('#mobile-menu .active').width() + $('#mobile-menu .active').width();

            $('<style>.navbar-wrap ul li.active a::after,.navbar-wrap ul li:hover > a::after{width:' + right + 'px;}</style>').appendTo("head");
        });

        $("#mobile-menu li").mouseleave(function() {
            $(this).removeClass('active');
        });

    }

    menu_bottom_line();




    /*=============================================
        =    		Mobile Menu			      =
    =============================================*/
    $('#mobile-menu').meanmenu({
        meanMenuContainer: '.mobile-menu',
        meanScreenWidth: "992"
    });


    /*=============================================
        =     Menu sticky & Scroll to top      =
    =============================================*/
    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();
        if (scroll < 245) {
            $(".header-sticky").removeClass("sticky");
        } else {
            $(".header-sticky").addClass("sticky");
        }
    });



    /*=============================================
        =    		 Main Slider		      =
    =============================================*/
    function mainSlider() {
        var BasicSlider = $('.slider-active');
        BasicSlider.on('init', function(e, slick) {
            var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        });
        BasicSlider.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
            var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
            doAnimations($animatingElements);
        });
        BasicSlider.slick({
            autoplay: false,
            autoplaySpeed: 10000,
            dots: false,
            fade: true,
            arrows: false,
            responsive: [
                { breakpoint: 767, settings: { dots: false, arrows: false } }
            ]
        });

        function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function() {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay
                });
                $this.addClass($animationType).one(animationEndEvents, function() {
                    $this.removeClass($animationType);
                });
            });
        }
    }
    mainSlider();



    /*=============================================
        =    		Magnific Popup		      =
    =============================================*/
    $('.popup-image').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });
    $('.popup-video').magnificPopup({
        type: 'iframe'
    });


    /*=============================================
        =    		Isotope	Active  	      =
    =============================================*/
    $('.grid').imagesLoaded(function() {
        var $grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-item',
            }
        });
        // filter items on button click
        $('.portfolio-menu').on('click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
        });
    });

    //for menu active class
    $('.portfolio-menu button').on('click', function(event) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
    });


    /*=============================================
        =    		 Aos Active  	         =
    =============================================*/
    function aosAnimation() {
        AOS.init({
            duration: 1000,
            mirror: true
        });
    }


    /*=============================================
        =    		 Countdown  	         =
    =============================================*/
    $('[data-countdown]').each(function() {
        var $this = $(this),
            finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function(event) {
            $this.html(event.strftime('<div class="time-count"><span>%D</span>Days</div>'));
        });
    });


    /*=============================================
        =    		 Scroll Up  	         =
    =============================================*/
    $.scrollUp({
        scrollName: 'scrollUp',
        topDistance: '300',
        topSpeed: 300,
        animation: 'fade',
        animationInSpeed: 200,
        animationOutSpeed: 200,
        scrollText: '<i class="icofont icofont-long-arrow-up"></i>',
        activeOverlay: false,
    });

    /*=============================================
        =    		 Wow Active  	         =
    =============================================*/
    function wowanimation() {
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: false,
            live: true
        });
        wow.init();
    }


})(jQuery);