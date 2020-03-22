/* eslint-disable */

/*========================================================================
EXCLUSIVE ON themeforest.net
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Template Name   : MOXO
Author          : mital_04
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Copyright (c) 2018 - mital_04
========================================================================*/
  

(function($){
    "use strict"
    var MOXO = {};

    /*--------------------
      * Pre Load
    ----------------------*/
    MOXO.WebLoad = function(){
      document.getElementById("loading").style.display = "none"; 
    }

    /*--------------------
        * Header Class
    ----------------------*/
    MOXO.HeaderSticky = function(){
        $(".navbar-toggler").on("click", function(a) {
            a.preventDefault(), $(".header").addClass("fixed-header")
        });
    }

    /*--------------------
        * Menu Close
    ----------------------*/
    MOXO.MenuClose = function(){
      $('.navbar-nav .nav-link').on('click', function() {
       var toggle = $('.navbar-toggler').is(':visible');
       if (toggle) {
         $('.navbar-collapse').collapse('hide');
       }
      });
    }

    /*--------------------
        * Smooth Scroll
    ----------------------*/
    MOXO.HeaderScroll = function(){
        $('.header a[href*="#"]:not([href="#"])').on('click', function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
              var target = $(this.hash);
                  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                  if (target.length) {
                    $('html,body').animate({
                      scrollTop: target.offset().top - 65,
                      }, 1000);
                      return false;
                  }
            }
        });
    }

    /*--------------------
        * Header Fixed
    ----------------------*/
    MOXO.HeaderFixed = function(){
        if ($(window).scrollTop() >= 60) {
           $('.header').addClass('fixed-header');
        }
        else {
           $('.header').removeClass('fixed-header');
        }
    }

     /* ---------------------------------------------- /*
      * accordion
    /* ---------------------------------------------- */
    MOXO.Accordion = function() {
      $('.accordion').each(function (i, elem) {
            var $elem = $(this),
               $acpanel = $elem.find(".moxo-group > .moxo-des"),
               $acsnav =  $elem.find(".moxo-group > .moxo-heading");
              $acpanel.hide().first().slideDown("easeOutExpo");
              $acsnav.first().parent().addClass("moxo-active");
              $acsnav.on('click', function () {
                if(!$(this).parent().hasClass("moxo-active")){
                  var $this = $(this).next(".moxo-des");
                  $acsnav.parent().removeClass("moxo-active");
                  $(this).parent().addClass("moxo-active");
                  $acpanel.not($this).slideUp("easeInExpo");
                  $(this).next().slideDown("easeOutExpo");
                }else{
                   $(this).parent().removeClass("moxo-active");
                   $(this).next().slideUp("easeInExpo");
                }
                return false;
            });
        });
    }

    /*--------------------
    * Counter JS
    ----------------------*/
    var a = 0;
    MOXO.Counter = function(){
      var oTop = $('.counter-box').offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop) {
          $('.count').each(function () {
                $(this).prop('Counter',0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 4000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
          a = 1;
        }
    }

    /*--------------------
        * Owl
    ----------------------*/
    MOXO.ClientSlider = function(){
      var testimonials_slider = $('#client-slider-single');
        testimonials_slider.owlCarousel({
            auto:true,
            loop: true,
            margin: 0,
            nav:false,
            responsive: {
              0: {
                items: 1
              },
              768: {
                items: 1
              },
              991: {
                items: 1
              },
              1140: {
                items: 2
              }
            }
        });
    }

  
    
    // Window on Load
    // $(window).on("load", function(){
      MOXO.WebLoad();
    // });

    // $(document).on("ready", function(){
        MOXO.HeaderFixed(),
        MOXO.Accordion(),
        MOXO.ClientSlider(),
        MOXO.MenuClose(),
        MOXO.Counter(),
        MOXO.HeaderScroll(),
        MOXO.HeaderSticky();
    // });

    $(window).on("scroll", function(){
        MOXO.Counter(),
        MOXO.HeaderFixed();
    });

})(jQuery);


