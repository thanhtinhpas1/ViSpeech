/*
===========================================================================
 EXCLUSIVE ON themeforest.net
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Template Name   : Softoi
 Author          : ThemePaa
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Copyright (c) 2017 - 
===========================================================================
*/

(function ($) {
    "use strict";
    var SOF = {};
    var plugin_track = 'static/plugin/';
    $.fn.exists = function () {
        return this.length > 0;
    };

    /* ---------------------------------------------- /*
     * Pre load
    /* ---------------------------------------------- */
    SOF.PreLoad = function () {
        document.getElementById("loading").style.display = "none";
    }

    /*--------------------
        * Menu Close
    ----------------------*/
    SOF.MenuClose = function () {
        $('.navbar-nav .nav-link').on('click', function () {
            var toggle = $('.navbar-toggler').is(':visible');
            if (toggle) {
                $('.navbar-collapse').collapse('hide');
            }
        });
    }


    /* ---------------------------------------------- /*
     * Header Fixed
    /* ---------------------------------------------- */
    SOF.HeaderFixd = function () {
        var HscrollTop = $(window).scrollTop();
        if (HscrollTop >= 100) {
            $('header').addClass('fixed-header');
        } else {
            $('header').removeClass('fixed-header');
        }
    }

    /*--------------------
        * One Page
    ----------------------*/
    SOF.OnePage = function () {
        $('header a[href*="#"]:not([href="#"]), .got-to a[href*="#"]:not([href="#"])').on('click', function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 70,
                    }, 1000);
                    return false;
                }
            }
        });
    }


    /* ---------------------------------------------- /*
     * Mega Menu
    /* ---------------------------------------------- */

    SOF.MegaMenu = function () {
        var mDropdown = $(".m-dropdown-toggle")
        mDropdown.on("click", function () {
            $(this).parent().toggleClass("open-menu-parent");
            $(this).next('ul').toggleClass("open-menu");
            $(this).toggleClass("open");
        });
    }


    /*--------------------
    * Counter JS
    ----------------------*/
    SOF.Counter = function () {
        var counter = jQuery(".counter");
        var $counter = $('.counter');
        if (counter.length > 0) {
            loadScript(plugin_track + 'counter/jquery.countTo.js', function () {
                $counter.each(function () {
                    var $elem = $(this);
                    $elem.appear(function () {
                        $elem.find('.count').countTo({
                            speed: 2000,
                            refreshInterval: 10
                        });
                    });
                });
            });
        }
    }


    /*--------------------
    * OwlSlider
    ----------------------*/
    SOF.Owl = function () {
        var owlslider = jQuery("div.owl-carousel");
        if (owlslider.length > 0) {
            loadScript(plugin_track + 'owl-carousel/js/owl.carousel.min.js', function () {
                owlslider.each(function () {
                    var $this = $(this),
                        $items = ($this.data('items')) ? $this.data('items') : 1,
                        $loop = ($this.attr('data-loop')) ? $this.data('loop') : true,
                        $navdots = ($this.data('nav-dots')) ? $this.data('nav-dots') : false,
                        $navarrow = ($this.data('nav-arrow')) ? $this.data('nav-arrow') : false,
                        $autoplay = ($this.attr('data-autoplay')) ? $this.data('autoplay') : true,
                        $autospeed = ($this.attr('data-autospeed')) ? $this.data('autospeed') : 5000,
                        $smartspeed = ($this.attr('data-smartspeed')) ? $this.data('smartspeed') : 1000,
                        $autohgt = ($this.data('autoheight')) ? $this.data('autoheight') : false,
                        $CenterSlider = ($this.data('center')) ? $this.data('center') : false,
                        $space = ($this.attr('data-space')) ? $this.data('space') : 30;

                    $(this).owlCarousel({
                        loop: $loop,
                        items: $items,
                        responsive: {
                            0: {items: $this.data('xx-items') ? $this.data('xx-items') : 1},
                            480: {items: $this.data('xs-items') ? $this.data('xs-items') : 1},
                            768: {items: $this.data('sm-items') ? $this.data('sm-items') : 2},
                            980: {items: $this.data('md-items') ? $this.data('md-items') : 3},
                            1200: {items: $items}
                        },
                        dots: $navdots,
                        autoplayTimeout: $autospeed,
                        smartSpeed: $smartspeed,
                        autoHeight: $autohgt,
                        center: $CenterSlider,
                        margin: $space,
                        nav: $navarrow,
                        navText: ["<i class='ti-arrow-left'></i>", "<i class='ti-arrow-right'></i>"],
                        autoplay: $autoplay,
                        autoplayHoverPause: true
                    });
                });
            });
        }
    }

    /* ---------------------------------------------- /*
     * lightbox gallery
    /* ---------------------------------------------- */
    SOF.Gallery = function () {
        if ($(".lightbox-gallery").exists() || $(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()) {
            loadScript(plugin_track + 'magnific/jquery.magnific-popup.min.js', function () {
                if ($(".lightbox-gallery").exists()) {
                    $('.lightbox-gallery').magnificPopup({
                        delegate: '.gallery-link',
                        type: 'image',
                        tLoading: 'Loading image #%curr%...',
                        mainClass: 'mfp-fade',
                        fixedContentPos: true,
                        closeBtnInside: false,
                        gallery: {
                            enabled: true,
                            navigateByImgClick: true,
                            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                        }
                    });
                }
                if ($(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()) {
                    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
                        disableOn: 700,
                        type: 'iframe',
                        mainClass: 'mfp-fade',
                        removalDelay: 160,
                        preloader: false,
                        fixedContentPos: false
                    });
                }
            });
        }
    }


    /*--------------------
        * Tyoe It
    ----------------------*/
    SOF.VideoBG = function () {
        if ($(".video-bg").exists()) {
            loadScript(plugin_track + 'vide/jquery.vide.min.js', function () {
            });
        }
    }

    /*-----------------------
    * Working Contact form
    -------------------------*/
    SOF.ContactForm = function () {
        $(".contactform").on("submit", function () {
            $(".output_message").text("Loading...");

            var form = $(this);
            $.ajax({
                url: form.attr("action"),
                method: form.attr("method"),
                data: form.serialize(),
                success: function (result) {
                    if (result == "success") {
                        $(".contactform").find(".output_message").addClass("success");
                        $(".output_message").text("Message Sent!");
                    } else {
                        $(".contactform").find(".output_message").addClass("error");
                        $(".output_message").text("Error Sending!");
                    }
                }
            });

            return false;
        });
    }


    /* ---------------------------------------------- /*
     * All Functions
    /* ---------------------------------------------- */
    // upload audio
    $('#upload-photo').on('change', () => {
        var file = $('#upload-photo').prop('files')[0]
        var data = new FormData()
        data.append("voice", file, file.name)
        $.ajax({
            method: 'POST',
            url: 'http://localhost:5000',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: (res) => {
                $('#text-recognize').val(res.text)
            },
            error: (err) => {
                $('#text-recognize').val(err)
            }
        })
    })


    /* ---------------------------------------------- /*
     * All Functions
    /* ---------------------------------------------- */
    // loadScript
    var _arr = {};

    function loadScript(scriptName, callback) {
        if (!_arr[scriptName]) {
            _arr[scriptName] = true;
            var body = document.getElementsByTagName('body')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = scriptName;
            // then bind the event to the callback function
            // there are several events for cross browser compatibility
            // script.onreadystatechange = callback;
            script.onload = callback;
            // fire the loading
            body.appendChild(script);
        } else if (callback) {
            callback();
        }
    };


    // Expose globally your audio_context, the recorder instance and audio_stream
    var audio_context;
    var recorder;
    var audio_stream;

    /**
     * Patch the APIs for every browser that supports them and check
     * if getUserMedia is supported on the browser.
     *
     */
    function Initialize() {
        try {
            // Monkeypatch for AudioContext, getUserMedia and URL
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
            window.URL = window.URL || window.webkitURL;

            console.log('Audio context is ready !');
            console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
        } catch (e) {
            alert('No web audio support in this browser!');
        }
    }

    /**
     * Starts the recording process by requesting the access to the microphone.
     * Then, if granted proceed to initialize the library and store the stream.
     *
     * It only stops when the method stopRecording is triggered.
     */
    function startRecording() {

        // Store the instance of AudioContext globally
        if (!audio_context) audio_context = new AudioContext();

        // Access the Microphone using the navigator.getUserMedia method to obtain a stream
        navigator.getUserMedia({audio: true}, function (stream) {
            // Expose the stream to be accessible globally
            audio_stream = stream;
            // Create the MediaStreamSource for the Recorder library
            var input = audio_context.createMediaStreamSource(stream);
            console.log('Media stream succesfully created');

            // Initialize the Recorder Library
            recorder = new Recorder(input);
            console.log('Recorder initialised');

            // Start recording !
            recorder && recorder.record();
            console.log('Recording...');

            // Disable Record button and enable stop button !
            document.getElementById("start-btn").disabled = true;
            document.getElementById("stop-btn").disabled = false;
        }, function (e) {
            console.error('No live audio input: ' + e);
        });
    }

    /**
     * Stops the recording process. The method expects a callback as first
     * argument (function) executed once the AudioBlob is generated and it
     * receives the same Blob as first argument. The second argument is
     * optional and specifies the format to export the blob either wav or mp3
     */
    function stopRecording(callback, AudioFormat) {
        // Stop the recorder instance
        recorder && recorder.stop();
        console.log('Stopped recording.');

        // Stop the getUserMedia Audio Stream !
        audio_stream.getAudioTracks()[0].stop();

        // Disable Stop button and enable Record button !
        document.getElementById("start-btn").disabled = false;
        document.getElementById("stop-btn").disabled = true;

        // Use the Recorder Library to export the recorder Audio as a .wav file
        // The callback providen in the stop recording method receives the blob
        if (typeof (callback) == "function") {

            /**
             * Export the AudioBLOB using the exportWAV method.
             * Note that this method exports too with mp3 if
             * you provide the second argument of the function
             */
            recorder && recorder.exportWAV(function (blob) {
                callback(blob);

                // create WAV download link using audio data blob
                // createDownloadLink();

                // Clear the Recorder to start again !
                recorder.clear();
            }, (AudioFormat || "audio/wav"));
        }
    }

    // Initialize everything once the window loads
    window.onload = function () {
        // Prepare and check if requirements are filled
        Initialize();

        // Handle on start recording button
        document.getElementById("start-btn").addEventListener("click", function () {
            startRecording();
            document.getElementById("stop-btn").classList.remove("d-none")
            document.getElementById('start-btn').classList.add('d-none')
        }, false);

        // Handle on stop recording button
        document.getElementById("stop-btn").addEventListener("click", function () {
            document.getElementById("stop-btn").classList.add("d-none")
            document.getElementById('start-btn').classList.remove('d-none')
            // Use wav format
            var _AudioFormat = "audio/wav";
            // You can use mp3 to using the correct mimetype
            //var AudioFormat = "audio/mpeg";

            stopRecording(function (AudioBLOB) {
                // Note:
                // Use the AudioBLOB for whatever you need, to download
                // directly in the browser, to upload to the server, you name it !

                // In this case we are going to add an Audio item to the list so you
                // can play every stored Audio
                var url = URL.createObjectURL(AudioBLOB);
                // var au = document.createElement('audio');
                // var hf = document.createElement('a');

                // au.controls = true;
                // au.src = url;
                // hf.href = url;
                // Important:
                // Change the format of the file according to the mimetype
                // e.g for audio/wav the extension is .wav
                //     for audio/mpeg (mp3) the extension is .mp3
                // hf.download = new Date().toISOString() + '.wav';
                var data = new FormData()
                data.append("voice", AudioBLOB)
                console.log("Record file have size: " + AudioBLOB.size)
                $.ajax({
                    method: 'POST',
                    url: 'http://localhost:5000',
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: (res) => {
                        $('#text-recognize').val(res.text)
                    },
                    error: (err) => {
                        $('#text-recognize').val(err)
                    }
                })

            }, _AudioFormat);
        }, false);
    };

    // Window on Load
    $(window).on("load", function () {
        SOF.PreLoad();

    });
    // Document on Ready
    $(document).on("ready", function () {
        SOF.VideoBG(),
            SOF.HeaderFixd(),
            SOF.OnePage(),
            SOF.Counter(),
            SOF.MenuClose(),
            SOF.Gallery(),
            SOF.MegaMenu(),
            SOF.ContactForm(),
            SOF.Owl();

    });

    // Document on Scrool
    $(window).on("scroll", function () {
        SOF.HeaderFixd();
    });

    // Window on Resize
    $(window).on("resize", function () {
    });


})(jQuery);