var $j = jQuery.noConflict();

function setProductHeight() {
    $j('.product-preview').each(function () {
        var infoH = $j(this).find('.product-preview__info').outerHeight();
        $j(this).find('.product-preview__image').css({
            'margin-bottom': infoH + 'px'
        })
    });
}

function debouncer(func, timeout) {
    var timeoutID, timeout = timeout || 500;
    return function () {
        var scope = this,
            args = arguments;
        clearTimeout(timeoutID);
        timeoutID = setTimeout(function () {
            func.apply(scope, Array.prototype.slice.call(args));
        }, timeout);
    }
}

// MENU HOVER

jQuery(function ($j) {

    "use strict";

    var windowW = window.innerWidth || $j(window).width();

    function menuIni(windowW) {

        if (windowW > 768) {
            $j('ul.navbar-nav > li').addClass('hovernav');
            $j('ul.navbar-nav > li.hovernav').hover(
                function () {
                    $j(this).addClass("open")
                },
                function () {
                    $j(this).removeClass("open")
                }
            );
            $j('ul.navbar-nav > li li').hover(
                function () {
                    if ($j(this).children('ul.level-menu__dropdown').length) {
                        $j(this).addClass('active');
                        $j(this).children('ul.level-menu__dropdown').show().css({
                            'opacity': 0,
                            'left': $j(this).width()
                        })
                        var off = $j(this).children('ul.level-menu__dropdown').offset();
                        var l = off.left;
                        var w = $j(this).children('ul.level-menu__dropdown').width();
                        var docW = $j(".container").width();
                        var isEntirelyVisible = (l + w <= docW);

                        if (!isEntirelyVisible) {
                            $j(this).children('ul.level-menu__dropdown').show().css({
                                'opacity': 1,
                                'right': $j(this).width(),
                                'left': 'auto'
                            })
                        } else {
                            $j(this).children('ul.level-menu__dropdown').show().css({
                                'opacity': 1,
                                'left': $j(this).width()
                            })
                        }

                    }
                },
                function () {
                    if ($j(this).children('ul.level-menu__dropdown').length) {
                        $j(this).removeClass('active');
                        $j(this).children('ul.level-menu__dropdown').hide().css({
                            'left': 'auto',
                            'right': 'auto'
                        })
                    }
                }
            );
        } else {
            $j('ul.navbar-nav > li').removeClass('hovernav');
            $j('ul.navbar-nav > li li').unbind('mouseenter mouseleave');
            $j('.touch ul.navbar-nav > li > a').click(function (e) {
                e.preventDefault();
            })
            $j('.touch ul.navbar-nav > li a span.caret').click(function () {
                $j(this).parent().parent('li').toggleClass('open');
            });
            $j('.touch ul.navbar-nav > li a span.link-name').click(function () {
                var url = $j(this).parent('a').attr("href");
                window.location = url;
            });

        };

    }

    menuIni(windowW);

    $j('.no-touch .hovernav a').click(function () {
        window.location = this.href;
    });

    var prevW = windowW;

    $j(window).resize(debouncer(function (e) {

        var currentW = window.innerWidth || $j(window).width();
        if (currentW != prevW) {
            // start resize events					
            menuIni(currentW);
            // end resize events		
        }
        prevW = window.innerWidth || $j(window).width();
    }));


});

// Slide menu small Header

jQuery(function ($j) {

    "use strict";

    $j("#openSlidemenu").click(function () {
        $j(".header--small #slidemenu").slideToggle(250, function () {
            $j(".header--small #slidemenu").toggleClass('open')
        });
        return false;
    });

    var prevW = window.innerWidth || $j(window).width();

    $j(window).resize(debouncer(function (e) {
        var currentW = window.innerWidth || $j(window).width();
        if (currentW != prevW) {
            // start resize events	
            if (currentW < 767) {
                $j(".header--small #slidemenu").show().removeClass('open');
            } else {
                $j(".header--small #slidemenu").hide()
            }
            // end resize events		
        }
        prevW = window.innerWidth || $j(window).width();
    }));

});


// Categories menu mobile

jQuery(function ($j) {

    "use strict";

    var windowW = window.innerWidth || $j(window).width();

    $j("#categoriesMenu").click(function () {
        $j(".navbar-nav--vertical").slideToggle(250, function () {
            $j("#categoriesMenu").toggleClass('open');
            $j(".navbar-nav--vertical").toggleClass('open')
        });
        return false;
    });

})

// Slide menu mobile

jQuery(function ($j) {

    "use strict";

    var windowW = window.innerWidth || $j(window).width();

    if (windowW < 768) {
        $j('#slidemenu').css({
            'height': $j(window).height()
        });
    }
    var toggler = '.navbar-toggle';
    var pagewrapper = '#pageContent';
    var footer = '.footer';
    var navigationwrapper = '.navbar-header';
    var menuwidth = '100%';
    var slidewidth = '80%';
    var menuneg = '-100%';

    $j("#slidemenu .slidemenu-close").on("click", function (e) {

        $j('body').removeClass('modal-open');

        if ($j('html').css('direction').toLowerCase() == 'rtl') {
            $j('#slidemenu').stop().animate({
                right: menuneg
            });
        } else {
            $j('#slidemenu').stop().animate({
                left: menuneg
            });
        }
    });

    $j("#navbar").on("click", toggler, function (e) {

        $j('body').addClass('modal-open');

        var selected = $j(this).hasClass('slide-active');


        if ($j('html').css('direction').toLowerCase() == 'rtl') {
            $j('#slidemenu').stop().show().animate({
                right: selected ? menuneg : '0px'
            });
        } else {
            $j('#slidemenu').stop().show().animate({
                left: selected ? menuneg : '0px'
            });
        }

    });

    var windowW = window.innerWidth || $j(window).width();

    var prevW = windowW;


    $j(window).resize(function () {
        var currentW = window.innerWidth || $j(window).width();

        if (currentW != prevW) {
            // start resize events
            if (currentW > 767) {
                $j('#slidemenu').css({
                    'height': ''
                });
                $j('body').removeClass('modal-open');
                $j('#slidemenu').stop().animate({
                    left: menuneg
                });
            } else {
                $j('#slidemenu').css({
                    'height': $j(window).height()
                });
            }

            // end resize events		
        }
        prevW = window.innerWidth || $j(window).width();


    });
});

// 	Vertical Menu

jQuery(function ($j) {

    "use strict";
    var windowW = window.innerWidth || $j(window).width();


    function setMenuSize(winW) {
        var vMenu = $j('.navbar-nav--vertical'),
            vMenuW = vMenu.innerWidth() - 2,
            vMenuH = vMenu.innerHeight() + 2,
            containerW = vMenu.closest('div[class^="container"]').width();
        if (vMenu.length) {
            if (winW > 991) {
                vMenu.children('li').children('.dropdown-menu').css({
                    'margin-left': vMenuW + 'px'
                });
                vMenu.find('.dropdown-menu.megamenu').css({
                    "width": (containerW - vMenuW) + 'px',
                    "min-height": vMenuH + 'px'
                });
            } else {
                vMenu.children('li').children('.dropdown-menu').css({
                    'margin-left': '',
                    'width': ''
                });
            }
        }
    }

    setMenuSize(windowW);

    var prevW = windowW;

    $j(window).resize(debouncer(function (e) {
        var currentW = window.innerWidth || $j(window).width();
        if (currentW != prevW) {
            // start resize events
            setMenuSize(currentW);
            // end resize events		
        }
        prevW = window.innerWidth || $j(window).width();
    }));
});

jQuery(function ($j) {
    "use strict";

    $j("#addClass").click(function () {
        $j('#qnimate').addClass('popup-box-on');
    });

    $j("#close").click(function () {
        $j('#qnimate').removeClass('popup-box-on');
    });

});

jQuery(function ($j) {
    "use strict";

    $j("#consultation").click(function () {
        $j('#qnimate2').addClass('popup-box-on');
    });

    $j("#close2").click(function () {
        $j('#qnimate2').removeClass('popup-box-on');
    });

});

// open menu button small Header

jQuery(function ($j) {

    "use strict";
    $j('#openMenu').on('click', function (e) {

    })

});



// bootstrap minus and plus

jQuery(function ($j) {

    "use strict";

    $j('.btn-number').click(function (e) {
        e.preventDefault();
        var type = $j(this).attr('data-type');
        var input = $j(this).closest('.input-group-qty').find('input.input-qty');
        var currentVal = parseInt(input.val());
        if (!isNaN(currentVal)) {
            if (type == 'minus') {
                if (currentVal > input.attr('min')) {
                    input.val(currentVal - 1).change();
                }
                if (parseInt(input.val()) == input.attr('min')) {
                    $j(this).attr('disabled', true);
                }

            } else if (type == 'plus') {

                if (currentVal < input.attr('max')) {
                    input.val(currentVal + 1).change();
                }
                if (parseInt(input.val()) == input.attr('max')) {
                    $j(this).attr('disabled', true);
                }
            }
        } else {
            input.val(0);
        }
    });
    $j('.input-number').focusin(function () {
        $j(this).data('oldValue', $j(this).val());
    });
    $j('.input-number').change(function () {

        var minValue = parseInt($j(this).attr('min'));
        var maxValue = parseInt($j(this).attr('max'));
        var valueCurrent = parseInt($j(this).val());

        var name = $j(this).attr('name');
        if (valueCurrent >= minValue) {
            $j(this).closest('.input-group-qty').find(".btn-number[data-type='minus']").removeAttr('disabled')
        } else {
            alert('Sorry, the minimum value was reached');
            $j(this).val($j(this).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $j(this).closest('.input-group-qty').find(".btn-number[data-type='plus']").removeAttr('disabled')
        } else {
            alert('Sorry, the maximum value was reached');
            $j(this).val($j(this).data('oldValue'));
        }


    });

});






$j(document).ready(function ($j) {
    $j(" .pro-rate span").click(function () {
        if ($j(this).attr('data-rate') == '1') {
            $j(this).parent(".pro-rate").removeClass("star-1 star-2 star-3 star-4 star-5");
            $j(this).parent(".pro-rate").addClass("star-1");
            document.getElementById("stars").value = "1";
            document.getElementById("tstars").value = "1";

        } else if ($j(this).attr('data-rate') == '2') {
            $j(this).parent(".pro-rate").removeClass("star-1 star-2 star-3 star-4 star-5");
            $j(this).parent(".pro-rate").addClass("star-2");
            document.getElementById("stars").value = "2";
            document.getElementById("tstars").value = "2";

        } else if ($j(this).attr('data-rate') == '3') {
            $j(this).parent(".pro-rate").removeClass("star-1 star-2 star-3 star-4 star-5");
            $j(this).parent(".pro-rate").addClass("star-3");
            document.getElementById("stars").value = "3";
            document.getElementById("tstars").value = "3";

        } else if ($j(this).attr('data-rate') == '4') {
            $j(this).parent(".pro-rate").removeClass("star-1 star-2 star-3 star-4 star-5");
            $j(this).parent(".pro-rate").addClass("star-4");
            document.getElementById("stars").value = "4";
            document.getElementById("tstars").value = "4";

        } else {
            $j(this).parent(".pro-rate").removeClass("star-1 star-2 star-3 star-4 star-5");
            $j(this).parent(".pro-rate").addClass("star-5");
            document.getElementById("stars").value = "5";
            document.getElementById("tstars").value = "5";

        }
    });

    if ($j('.datepicker').length) {
        $j('.datepicker').datepicker();
    }

   

    $j('.btn-number').click(function (e) {
        e.preventDefault();

        fieldName = $j(this).attr('data-field');
        type = $j(this).attr('data-type');
        var input = $j("input[name='" + fieldName + "']");
        var currentVal = parseInt(input.val());
        if (!isNaN(currentVal)) {
            if (type == 'minus') {

                if (currentVal > input.attr('min')) {
                    input.val(currentVal - 1).change();
                }
                if (parseInt(input.val()) == input.attr('min')) {
                    $j(this).attr('disabled', true);
                }

            } else if (type == 'plus') {

                if (currentVal < input.attr('max')) {
                    input.val(currentVal + 1).change();
                }
                if (parseInt(input.val()) == input.attr('max')) {
                    $j(this).attr('disabled', true);
                }

            }
        } else {
            input.val(0);
        }
    });
    $j('.input-number').focusin(function () {
        $j(this).data('oldValue', $j(this).val());
    });
    $j('.input-number').change(function () {

        minValue = parseInt($j(this).attr('min'));
        maxValue = parseInt($j(this).attr('max'));
        valueCurrent = parseInt($j(this).val());

        name = $j(this).attr('name');
        if (valueCurrent >= minValue) {
            $j(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            alert('Sorry, the minimum value was reached');
            $j(this).val($(this).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $j(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            alert('Sorry, the maximum value was reached');
            $j(this).val($(this).data('oldValue'));
        }


    });
    $j(".input-number").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($j.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });


    $j(".scroll-to-target").on('click', function () {
        var target = $j(this).attr('data-target');
        // animate
        $j('html, body').animate({
            scrollTop: $j(target).offset().top
        }, 1000);

    });



    /*
 *    jQuery elevateZoom 3.0.8
 *    Demo's and documentation:
 *	www.elevateweb.co.uk/image-zoom
 *
 *	Copyright (c) 2012 Andrew Eades
 *	www.elevateweb.co.uk
 *
 *	Dual licensed under the GPL and MIT licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 *

/*
 *	jQuery elevateZoom 3.0.3
 *	Demo's and documentation:
 *	www.elevateweb.co.uk/image-zoom
 *
 *	Copyright (c) 2012 Andrew Eades
 *	www.elevateweb.co.uk
 *
 *	Dual licensed under the GPL and MIT licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


    if (typeof Object.create !== 'function') {
        Object.create = function (obj) {
            function F() {};
            F.prototype = obj;
            return new F();
        };
    }

    (function ($j, window, document, undefined) {
        var ElevateZoom = {
            init: function (options, elem) {
                var self = this;

                self.elem = elem;
                self.$elem = $(elem);

                self.imageSrc = self.$elem.data("zoom-image") ? self.$elem.data("zoom-image") : self.$elem.attr("src");

                self.options = $.extend({}, $.fn.elevateZoom.options, options);

                //TINT OVERRIDE SETTINGS
                if (self.options.tint) {
                    self.options.lensColour = "none", //colour of the lens background
                        self.options.lensOpacity = "1" //opacity of the lens
                }
                //INNER OVERRIDE SETTINGS
                if (self.options.zoomType == "inner") {
                    self.options.showLens = false;
                }


                //Remove alt on hover

                self.$elem.parent().removeAttr('title').removeAttr('alt');

                self.zoomImage = self.imageSrc;

                self.refresh(1);



                //Create the image swap from the gallery 
                $j('#' + self.options.gallery + ' a').click(function (e) {

                    //Set a class on the currently active gallery image
                    if (self.options.galleryActiveClass) {
                        $j('#' + self.options.gallery + ' a').removeClass(self.options.galleryActiveClass);
                        $j(this).addClass(self.options.galleryActiveClass);
                    }
                    //stop any link on the a tag from working
                    e.preventDefault();

                    //call the swap image function            
                    if ($j(this).data("zoom-image")) {
                        self.zoomImagePre = $j(this).data("zoom-image")
                    } else {
                        self.zoomImagePre = $j(this).data("image");
                    }
                    self.swaptheimage($j(this).data("image"), self.zoomImagePre);
                    return false;
                });

            },

            refresh: function (length) {
                var self = this;

                setTimeout(function () {
                    self.fetch(self.imageSrc);

                }, length || self.options.refresh);
            },

            fetch: function (imgsrc) {
                //get the image
                var self = this;
                var newImg = new Image();
                newImg.onload = function () {
                    //set the large image dimensions - used to calculte ratio's
                    self.largeWidth = newImg.width;
                    self.largeHeight = newImg.height;
                    //once image is loaded start the calls
                    self.startZoom();
                    self.currentImage = self.imageSrc;
                    //let caller know image has been loaded
                    self.options.onZoomedImageLoaded(self.$elem);
                }
                newImg.src = imgsrc; // this must be done AFTER setting onload

                return;

            },

            startZoom: function () {
                var self = this;
                //get dimensions of the non zoomed image
                self.nzWidth = self.$elem.width();
                self.nzHeight = self.$elem.height();

                //activated elements
                self.isWindowActive = false;
                self.isLensActive = false;
                self.isTintActive = false;
                self.overWindow = false;

                //CrossFade Wrappe
                if (self.options.imageCrossfade) {
                    self.zoomWrap = self.$elem.wrap('<div style="height:' + self.nzHeight + 'px;width:' + self.nzWidth + 'px;" class="zoomWrapper" />');
                    self.$elem.css('position', 'absolute');
                }

                self.zoomLock = 1;
                self.scrollingLock = false;
                self.changeBgSize = false;
                self.currentZoomLevel = self.options.zoomLevel;


                //get offset of the non zoomed image
                self.nzOffset = self.$elem.offset();
                //calculate the width ratio of the large/small image
                self.widthRatio = (self.largeWidth / self.currentZoomLevel) / self.nzWidth;
                self.heightRatio = (self.largeHeight / self.currentZoomLevel) / self.nzHeight;


                //if window zoom        
                if (self.options.zoomType == "window") {
                    self.zoomWindowStyle = "overflow: hidden;" +
                        "background-position: 0px 0px;text-align:center;" +
                        "background-color: " + String(self.options.zoomWindowBgColour) +
                        ";width: " + String(self.options.zoomWindowWidth) + "px;" +
                        "height: " + String(self.options.zoomWindowHeight) +
                        "px;float: left;" +
                        "background-size: " + self.largeWidth / self.currentZoomLevel + "px " + self.largeHeight / self.currentZoomLevel + "px;" +
                        "display: none;z-index:100;" +
                        "border: " + String(self.options.borderSize) +
                        "px solid " + self.options.borderColour +
                        ";background-repeat: no-repeat;" +
                        "position: absolute;";
                }


                //if inner  zoom    
                if (self.options.zoomType == "inner") {
                    //has a border been put on the image? Lets cater for this

                    var borderWidth = self.$elem.css("border-left-width");

                    self.zoomWindowStyle = "overflow: hidden;" +
                        "margin-left: " + String(borderWidth) + ";" +
                        "margin-top: " + String(borderWidth) + ";" +
                        "background-position: 0px 0px;" +
                        "width: " + String(self.nzWidth) + "px;" +
                        "height: " + String(self.nzHeight) + "px;" +
                        "px;float: left;" +
                        "display: none;" +
                        "cursor:" + (self.options.cursor) + ";" +
                        "px solid " + self.options.borderColour +
                        ";background-repeat: no-repeat;" +
                        "position: absolute;";
                }



                //lens style for window zoom
                if (self.options.zoomType == "window") {


                    // adjust images less than the window height

                    if (self.nzHeight < self.options.zoomWindowWidth / self.widthRatio) {
                        lensHeight = self.nzHeight;
                    } else {
                        lensHeight = String((self.options.zoomWindowHeight / self.heightRatio))
                    }
                    if (self.largeWidth < self.options.zoomWindowWidth) {
                        lensWidth = self.nzWidth;
                    } else {
                        lensWidth = (self.options.zoomWindowWidth / self.widthRatio);
                    }


                    self.lensStyle = "background-position: 0px 0px;width: " + String((self.options.zoomWindowWidth) / self.widthRatio) + "px;height: " + String((self.options.zoomWindowHeight) / self.heightRatio) +
                        "px;float: right;display: none;" +
                        "overflow: hidden;" +
                        "z-index: 999;" +
                        "-webkit-transform: translateZ(0);" +
                        "opacity:" + (self.options.lensOpacity) + ";filter: alpha(opacity = " + (self.options.lensOpacity * 100) + "); zoom:1;" +
                        "width:" + lensWidth + "px;" +
                        "height:" + lensHeight + "px;" +
                        "background-color:" + (self.options.lensColour) + ";" +
                        "cursor:" + (self.options.cursor) + ";" +
                        "border: " + (self.options.lensBorderSize) + "px" +
                        " solid " + (self.options.lensBorderColour) + ";background-repeat: no-repeat;position: absolute;";
                }


                //tint style
                self.tintStyle = "display: block;" +
                    "position: absolute;" +
                    "background-color: " + self.options.tintColour + ";" +
                    "filter:alpha(opacity=0);" +
                    "opacity: 0;" +
                    "width: " + self.nzWidth + "px;" +
                    "height: " + self.nzHeight + "px;"

                ;

                //lens style for lens zoom with optional round for modern browsers
                self.lensRound = '';

                if (self.options.zoomType == "lens") {

                    self.lensStyle = "background-position: 0px 0px;" +
                        "float: left;display: none;" +
                        "border: " + String(self.options.borderSize) + "px solid " + self.options.borderColour + ";" +
                        "width:" + String(self.options.lensSize) + "px;" +
                        "height:" + String(self.options.lensSize) + "px;" +
                        "background-repeat: no-repeat;position: absolute;";


                }


                //does not round in all browsers
                if (self.options.lensShape == "round") {
                    self.lensRound = "border-top-left-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;" +
                        "border-top-right-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;" +
                        "border-bottom-left-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;" +
                        "border-bottom-right-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;";

                }

                //create the div's                                                + ""
                //self.zoomContainer = $('<div/>').addClass('zoomContainer').css({"position":"relative", "height":self.nzHeight, "width":self.nzWidth});

                self.zoomContainer = $j('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:' + self.nzOffset.left + 'px;top:' + self.nzOffset.top + 'px;height:' + self.nzHeight + 'px;width:' + self.nzWidth + 'px;"></div>');
                $j('body').append(self.zoomContainer);


                //this will add overflow hidden and contrain the lens on lens mode       
                if (self.options.containLensZoom && self.options.zoomType == "lens") {
                    self.zoomContainer.css("overflow", "hidden");
                }
                if (self.options.zoomType != "inner") {
                    self.zoomLens = $j("<div class='zoomLens' style='" + self.lensStyle + self.lensRound + "'> </div>")
                        .appendTo(self.zoomContainer)
                        .click(function () {
                            self.$elem.trigger('click');
                        });


                    if (self.options.tint) {
                        self.tintContainer = $j('<div/>').addClass('tintContainer');
                        self.zoomTint = $j("<div class='zoomTint' style='" + self.tintStyle + "'></div>");


                        self.zoomLens.wrap(self.tintContainer);


                        self.zoomTintcss = self.zoomLens.after(self.zoomTint);

                        //if tint enabled - set an image to show over the tint

                        self.zoomTintImage = $j('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: ' + self.nzWidth + 'px; height: ' + self.nzHeight + 'px;" src="' + self.imageSrc + '">')
                            .appendTo(self.zoomLens)
                            .click(function () {

                                self.$elem.trigger('click');
                            });

                    }

                }







                //create zoom window 
                if (isNaN(self.options.zoomWindowPosition)) {
                    self.zoomWindow = $j("<div style='z-index:999;left:" + (self.windowOffsetLeft) + "px;top:" + (self.windowOffsetTop) + "px;" + self.zoomWindowStyle + "' class='zoomWindow'> </div>")
                        .appendTo('body')
                        .click(function () {
                            self.$elem.trigger('click');
                        });
                } else {
                    self.zoomWindow = $j("<div style='z-index:999;left:" + (self.windowOffsetLeft) + "px;top:" + (self.windowOffsetTop) + "px;" + self.zoomWindowStyle + "' class='zoomWindow'> </div>")
                        .appendTo(self.zoomContainer)
                        .click(function () {
                            self.$elem.trigger('click');
                        });
                }
                self.zoomWindowContainer = $j('<div/>').addClass('zoomWindowContainer').css("width", self.options.zoomWindowWidth);
                self.zoomWindow.wrap(self.zoomWindowContainer);


                //  self.captionStyle = "text-align: left;background-color: black;color: white;font-weight: bold;padding: 10px;font-family: sans-serif;font-size: 11px";                                                                                                                                                                                                                                          
                // self.zoomCaption = $('<div class="elevatezoom-caption" style="'+self.captionStyle+'display: block; width: 280px;">INSERT ALT TAG</div>').appendTo(self.zoomWindow.parent());

                if (self.options.zoomType == "lens") {
                    self.zoomLens.css({
                        backgroundImage: "url('" + self.imageSrc + "')"
                    });
                }
                if (self.options.zoomType == "window") {
                    self.zoomWindow.css({
                        backgroundImage: "url('" + self.imageSrc + "')"
                    });
                }
                if (self.options.zoomType == "inner") {
                    self.zoomWindow.css({
                        backgroundImage: "url('" + self.imageSrc + "')"
                    });
                }
                /*-------------------END THE ZOOM WINDOW AND LENS----------------------------------*/
                //touch events
                self.$elem.bind('touchmove', function (e) {
                    e.preventDefault();
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    self.setPosition(touch);

                });
                self.zoomContainer.bind('touchmove', function (e) {
                    if (self.options.zoomType == "inner") {
                        self.showHideWindow("show");

                    }
                    e.preventDefault();
                    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    self.setPosition(touch);

                });
                self.zoomContainer.bind('touchend', function (e) {
                    self.showHideWindow("hide");
                    if (self.options.showLens) {
                        self.showHideLens("hide");
                    }
                    if (self.options.tint && self.options.zoomType != "inner") {
                        self.showHideTint("hide");
                    }
                });

                self.$elem.bind('touchend', function (e) {
                    self.showHideWindow("hide");
                    if (self.options.showLens) {
                        self.showHideLens("hide");
                    }
                    if (self.options.tint && self.options.zoomType != "inner") {
                        self.showHideTint("hide");
                    }
                });
                if (self.options.showLens) {
                    self.zoomLens.bind('touchmove', function (e) {

                        e.preventDefault();
                        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                        self.setPosition(touch);
                    });


                    self.zoomLens.bind('touchend', function (e) {
                        self.showHideWindow("hide");
                        if (self.options.showLens) {
                            self.showHideLens("hide");
                        }
                        if (self.options.tint && self.options.zoomType != "inner") {
                            self.showHideTint("hide");
                        }
                    });
                }
                //Needed to work in IE
                self.$elem.bind('mousemove', function (e) {
                    if (self.overWindow == false) {
                        self.setElements("show");
                    }
                    //make sure on orientation change the setposition is not fired
                    if (self.lastX !== e.clientX || self.lastY !== e.clientY) {
                        self.setPosition(e);
                        self.currentLoc = e;
                    }
                    self.lastX = e.clientX;
                    self.lastY = e.clientY;

                });

                self.zoomContainer.bind('mousemove', function (e) {

                    if (self.overWindow == false) {
                        self.setElements("show");
                    }

                    //make sure on orientation change the setposition is not fired 
                    if (self.lastX !== e.clientX || self.lastY !== e.clientY) {
                        self.setPosition(e);
                        self.currentLoc = e;
                    }
                    self.lastX = e.clientX;
                    self.lastY = e.clientY;
                });
                if (self.options.zoomType != "inner") {
                    self.zoomLens.bind('mousemove', function (e) {
                        //make sure on orientation change the setposition is not fired
                        if (self.lastX !== e.clientX || self.lastY !== e.clientY) {
                            self.setPosition(e);
                            self.currentLoc = e;
                        }
                        self.lastX = e.clientX;
                        self.lastY = e.clientY;
                    });
                }
                if (self.options.tint && self.options.zoomType != "inner") {
                    self.zoomTint.bind('mousemove', function (e) {
                        //make sure on orientation change the setposition is not fired
                        if (self.lastX !== e.clientX || self.lastY !== e.clientY) {
                            self.setPosition(e);
                            self.currentLoc = e;
                        }
                        self.lastX = e.clientX;
                        self.lastY = e.clientY;
                    });

                }
                if (self.options.zoomType == "inner") {
                    self.zoomWindow.bind('mousemove', function (e) {
                        //self.overWindow = true;
                        //make sure on orientation change the setposition is not fired
                        if (self.lastX !== e.clientX || self.lastY !== e.clientY) {
                            self.setPosition(e);
                            self.currentLoc = e;
                        }
                        self.lastX = e.clientX;
                        self.lastY = e.clientY;
                    });

                }


                //  lensFadeOut: 500,  zoomTintFadeIn
                self.zoomContainer.add(self.$elem).mouseenter(function () {

                    if (self.overWindow == false) {
                        self.setElements("show");
                    }


                }).mouseleave(function () {
                    if (!self.scrollLock) {
                        self.setElements("hide");
                        self.options.onDestroy(self.$elem);
                    }
                });
                //end ove image





                if (self.options.zoomType != "inner") {
                    self.zoomWindow.mouseenter(function () {
                        self.overWindow = true;
                        self.setElements("hide");
                    }).mouseleave(function () {

                        self.overWindow = false;
                    });
                }
                //end ove image



                //				var delta = parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail);

                //      $(this).empty();    
                //    return false;

                //fix for initial zoom setting
                if (self.options.zoomLevel != 1) {
                    //	self.changeZoomLevel(self.currentZoomLevel);
                }
                //set the min zoomlevel
                if (self.options.minZoomLevel) {
                    self.minZoomLevel = self.options.minZoomLevel;
                } else {
                    self.minZoomLevel = self.options.scrollZoomIncrement * 2;
                }


                if (self.options.scrollZoom) {


                    self.zoomContainer.add(self.$elem).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function (e) {


                        //						in IE there is issue with firing of mouseleave - So check whether still scrolling
                        //						and on mouseleave check if scrolllock          
                        self.scrollLock = true;
                        clearTimeout($.data(this, 'timer'));
                        $j.data(this, 'timer', setTimeout(function () {
                            self.scrollLock = false;
                            //do something
                        }, 250));

                        var theEvent = e.originalEvent.wheelDelta || e.originalEvent.detail * -1


                        //this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
                        //   e.preventDefault();


                        e.stopImmediatePropagation();
                        e.stopPropagation();
                        e.preventDefault();


                        if (theEvent / 120 > 0) {
                            //scrolling up
                            if (self.currentZoomLevel >= self.minZoomLevel) {
                                self.changeZoomLevel(self.currentZoomLevel - self.options.scrollZoomIncrement);
                            }

                        } else {
                            //scrolling down


                            if (self.options.maxZoomLevel) {
                                if (self.currentZoomLevel <= self.options.maxZoomLevel) {
                                    self.changeZoomLevel(parseFloat(self.currentZoomLevel) + self.options.scrollZoomIncrement);
                                }
                            } else {
                                //andy 

                                self.changeZoomLevel(parseFloat(self.currentZoomLevel) + self.options.scrollZoomIncrement);
                            }

                        }
                        return false;
                    });
                }


            },
            setElements: function (type) {
                var self = this;
                if (!self.options.zoomEnabled) {
                    return false;
                }
                if (type == "show") {
                    if (self.isWindowSet) {
                        if (self.options.zoomType == "inner") {
                            self.showHideWindow("show");
                        }
                        if (self.options.zoomType == "window") {
                            self.showHideWindow("show");
                        }
                        if (self.options.showLens) {
                            self.showHideLens("show");
                        }
                        if (self.options.tint && self.options.zoomType != "inner") {
                            self.showHideTint("show");
                        }
                    }
                }

                if (type == "hide") {
                    if (self.options.zoomType == "window") {
                        self.showHideWindow("hide");
                    }
                    if (!self.options.tint) {
                        self.showHideWindow("hide");
                    }
                    if (self.options.showLens) {
                        self.showHideLens("hide");
                    }
                    if (self.options.tint) {
                        self.showHideTint("hide");
                    }
                }
            },
            setPosition: function (e) {

                var self = this;

                if (!self.options.zoomEnabled) {
                    return false;
                }

                //recaclc offset each time in case the image moves
                //this can be caused by other on page elements
                self.nzHeight = self.$elem.height();
                self.nzWidth = self.$elem.width();
                self.nzOffset = self.$elem.offset();

                if (self.options.tint && self.options.zoomType != "inner") {
                    self.zoomTint.css({
                        top: 0
                    });
                    self.zoomTint.css({
                        left: 0
                    });
                }
                //set responsive       
                //will checking if the image needs changing before running this code work faster?
                if (self.options.responsive && !self.options.scrollZoom) {
                    if (self.options.showLens) {
                        if (self.nzHeight < self.options.zoomWindowWidth / self.widthRatio) {
                            lensHeight = self.nzHeight;
                        } else {
                            lensHeight = String((self.options.zoomWindowHeight / self.heightRatio))
                        }
                        if (self.largeWidth < self.options.zoomWindowWidth) {
                            lensWidth = self.nzWidth;
                        } else {
                            lensWidth = (self.options.zoomWindowWidth / self.widthRatio);
                        }
                        self.widthRatio = self.largeWidth / self.nzWidth;
                        self.heightRatio = self.largeHeight / self.nzHeight;
                        if (self.options.zoomType != "lens") {


                            //possibly dont need to keep recalcalculating
                            //if the lens is heigher than the image, then set lens size to image size
                            if (self.nzHeight < self.options.zoomWindowWidth / self.widthRatio) {
                                lensHeight = self.nzHeight;

                            } else {
                                lensHeight = String((self.options.zoomWindowHeight / self.heightRatio))
                            }

                            if (self.nzWidth < self.options.zoomWindowHeight / self.heightRatio) {
                                lensWidth = self.nzWidth;
                            } else {
                                lensWidth = String((self.options.zoomWindowWidth / self.widthRatio));
                            }

                            self.zoomLens.css('width', lensWidth);
                            self.zoomLens.css('height', lensHeight);

                            if (self.options.tint) {
                                self.zoomTintImage.css('width', self.nzWidth);
                                self.zoomTintImage.css('height', self.nzHeight);
                            }

                        }
                        if (self.options.zoomType == "lens") {

                            self.zoomLens.css({
                                width: String(self.options.lensSize) + 'px',
                                height: String(self.options.lensSize) + 'px'
                            })


                        }
                        //end responsive image change
                    }
                }

                //container fix
                self.zoomContainer.css({
                    top: self.nzOffset.top
                });
                self.zoomContainer.css({
                    left: self.nzOffset.left
                });
                self.mouseLeft = parseInt(e.pageX - self.nzOffset.left);
                self.mouseTop = parseInt(e.pageY - self.nzOffset.top);
                //calculate the Location of the Lens

                //calculate the bound regions - but only if zoom window
                if (self.options.zoomType == "window") {
                    self.Etoppos = (self.mouseTop < (self.zoomLens.height() / 2));
                    self.Eboppos = (self.mouseTop > self.nzHeight - (self.zoomLens.height() / 2) - (self.options.lensBorderSize * 2));
                    self.Eloppos = (self.mouseLeft < 0 + ((self.zoomLens.width() / 2)));
                    self.Eroppos = (self.mouseLeft > (self.nzWidth - (self.zoomLens.width() / 2) - (self.options.lensBorderSize * 2)));
                }
                //calculate the bound regions - but only for inner zoom
                if (self.options.zoomType == "inner") {
                    self.Etoppos = (self.mouseTop < ((self.nzHeight / 2) / self.heightRatio));
                    self.Eboppos = (self.mouseTop > (self.nzHeight - ((self.nzHeight / 2) / self.heightRatio)));
                    self.Eloppos = (self.mouseLeft < 0 + (((self.nzWidth / 2) / self.widthRatio)));
                    self.Eroppos = (self.mouseLeft > (self.nzWidth - (self.nzWidth / 2) / self.widthRatio - (self.options.lensBorderSize * 2)));
                }

                // if the mouse position of the slider is one of the outerbounds, then hide  window and lens
                if (self.mouseLeft < 0 || self.mouseTop < 0 || self.mouseLeft > self.nzWidth || self.mouseTop > self.nzHeight) {
                    self.setElements("hide");
                    return;
                }
                //else continue with operations
                else {


                    //lens options
                    if (self.options.showLens) {
                        //		self.showHideLens("show");
                        //set background position of lens
                        self.lensLeftPos = String(Math.floor(self.mouseLeft - self.zoomLens.width() / 2));
                        self.lensTopPos = String(Math.floor(self.mouseTop - self.zoomLens.height() / 2));


                    }
                    //adjust the background position if the mouse is in one of the outer regions 

                    //Top region
                    if (self.Etoppos) {
                        self.lensTopPos = 0;
                    }
                    //Left Region
                    if (self.Eloppos) {
                        self.windowLeftPos = 0;
                        self.lensLeftPos = 0;
                        self.tintpos = 0;
                    }
                    //Set bottom and right region for window mode
                    if (self.options.zoomType == "window") {
                        if (self.Eboppos) {
                            self.lensTopPos = Math.max((self.nzHeight) - self.zoomLens.height() - (self.options.lensBorderSize * 2), 0);
                        }
                        if (self.Eroppos) {
                            self.lensLeftPos = (self.nzWidth - (self.zoomLens.width()) - (self.options.lensBorderSize * 2));
                        }
                    }
                    //Set bottom and right region for inner mode
                    if (self.options.zoomType == "inner") {
                        if (self.Eboppos) {
                            self.lensTopPos = Math.max(((self.nzHeight) - (self.options.lensBorderSize * 2)), 0);
                        }
                        if (self.Eroppos) {
                            self.lensLeftPos = (self.nzWidth - (self.nzWidth) - (self.options.lensBorderSize * 2));
                        }

                    }
                    //if lens zoom
                    if (self.options.zoomType == "lens") {
                        self.windowLeftPos = String(((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomLens.width() / 2) * (-1));
                        self.windowTopPos = String(((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomLens.height() / 2) * (-1));

                        self.zoomLens.css({
                            backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px'
                        });

                        if (self.changeBgSize) {

                            if (self.nzHeight > self.nzWidth) {
                                if (self.options.zoomType == "lens") {
                                    self.zoomLens.css({
                                        "background-size": self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                                    });
                                }

                                self.zoomWindow.css({
                                    "background-size": self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                                });
                            } else {
                                if (self.options.zoomType == "lens") {
                                    self.zoomLens.css({
                                        "background-size": self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvaluewidth + 'px'
                                    });
                                }
                                self.zoomWindow.css({
                                    "background-size": self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvaluewidth + 'px'
                                });
                            }
                            self.changeBgSize = false;
                        }

                        self.setWindowPostition(e);
                    }
                    //if tint zoom   
                    if (self.options.tint && self.options.zoomType != "inner") {
                        self.setTintPosition(e);

                    }
                    //set the css background position 
                    if (self.options.zoomType == "window") {
                        self.setWindowPostition(e);
                    }
                    if (self.options.zoomType == "inner") {
                        self.setWindowPostition(e);
                    }
                    if (self.options.showLens) {

                        if (self.fullwidth && self.options.zoomType != "lens") {
                            self.lensLeftPos = 0;

                        }
                        self.zoomLens.css({
                            left: self.lensLeftPos + 'px',
                            top: self.lensTopPos + 'px'
                        })
                    }

                } //end else



            },
            showHideWindow: function (change) {
                var self = this;
                if (change == "show") {
                    if (!self.isWindowActive) {
                        if (self.options.zoomWindowFadeIn) {
                            self.zoomWindow.stop(true, true, false).fadeIn(self.options.zoomWindowFadeIn);
                        } else {
                            self.zoomWindow.show();
                        }
                        self.isWindowActive = true;
                    }
                }
                if (change == "hide") {
                    if (self.isWindowActive) {
                        if (self.options.zoomWindowFadeOut) {
                            self.zoomWindow.stop(true, true).fadeOut(self.options.zoomWindowFadeOut, function () {
                                if (self.loop) {
                                    //stop moving the zoom window when zoom window is faded out
                                    clearInterval(self.loop);
                                    self.loop = false;
                                }
                            });
                        } else {
                            self.zoomWindow.hide();
                        }
                        self.isWindowActive = false;
                    }
                }
            },
            showHideLens: function (change) {
                var self = this;
                if (change == "show") {
                    if (!self.isLensActive) {
                        if (self.options.lensFadeIn) {
                            self.zoomLens.stop(true, true, false).fadeIn(self.options.lensFadeIn);
                        } else {
                            self.zoomLens.show();
                        }
                        self.isLensActive = true;
                    }
                }
                if (change == "hide") {
                    if (self.isLensActive) {
                        if (self.options.lensFadeOut) {
                            self.zoomLens.stop(true, true).fadeOut(self.options.lensFadeOut);
                        } else {
                            self.zoomLens.hide();
                        }
                        self.isLensActive = false;
                    }
                }
            },
            showHideTint: function (change) {
                var self = this;
                if (change == "show") {
                    if (!self.isTintActive) {

                        if (self.options.zoomTintFadeIn) {
                            self.zoomTint.css({
                                opacity: self.options.tintOpacity
                            }).animate().stop(true, true).fadeIn("slow");
                        } else {
                            self.zoomTint.css({
                                opacity: self.options.tintOpacity
                            }).animate();
                            self.zoomTint.show();


                        }
                        self.isTintActive = true;
                    }
                }
                if (change == "hide") {
                    if (self.isTintActive) {

                        if (self.options.zoomTintFadeOut) {
                            self.zoomTint.stop(true, true).fadeOut(self.options.zoomTintFadeOut);
                        } else {
                            self.zoomTint.hide();
                        }
                        self.isTintActive = false;
                    }
                }
            },
            setLensPostition: function (e) {


            },
            setWindowPostition: function (e) {
                //return obj.slice( 0, count );
                var self = this;

                if (!isNaN(self.options.zoomWindowPosition)) {

                    switch (self.options.zoomWindowPosition) {
                        case 1: //done         
                            self.windowOffsetTop = (self.options.zoomWindowOffety); //DONE - 1
                            self.windowOffsetLeft = (+self.nzWidth); //DONE 1, 2, 3, 4, 16
                            break;
                        case 2:
                            if (self.options.zoomWindowHeight > self.nzHeight) { //positive margin

                                self.windowOffsetTop = ((self.options.zoomWindowHeight / 2) - (self.nzHeight / 2)) * (-1);
                                self.windowOffsetLeft = (self.nzWidth); //DONE 1, 2, 3, 4, 16
                            } else { //negative margin

                            }
                            break;
                        case 3: //done        
                            self.windowOffsetTop = (self.nzHeight - self.zoomWindow.height() - (self.options.borderSize * 2)); //DONE 3,9
                            self.windowOffsetLeft = (self.nzWidth); //DONE 1, 2, 3, 4, 16
                            break;
                        case 4: //done  
                            self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
                            self.windowOffsetLeft = (self.nzWidth); //DONE 1, 2, 3, 4, 16
                            break;
                        case 5: //done  
                            self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
                            self.windowOffsetLeft = (self.nzWidth - self.zoomWindow.width() - (self.options.borderSize * 2)); //DONE - 5,15
                            break;
                        case 6:
                            if (self.options.zoomWindowHeight > self.nzHeight) { //positive margin
                                self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8

                                self.windowOffsetLeft = ((self.options.zoomWindowWidth / 2) - (self.nzWidth / 2) + (self.options.borderSize * 2)) * (-1);
                            } else { //negative margin

                            }


                            break;
                        case 7: //done  
                            self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
                            self.windowOffsetLeft = 0; //DONE 7, 13
                            break;
                        case 8: //done  
                            self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
                            self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1); //DONE 8,9,10,11,12
                            break;
                        case 9: //done  
                            self.windowOffsetTop = (self.nzHeight - self.zoomWindow.height() - (self.options.borderSize * 2)); //DONE 3,9
                            self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1); //DONE 8,9,10,11,12
                            break;
                        case 10:
                            if (self.options.zoomWindowHeight > self.nzHeight) { //positive margin

                                self.windowOffsetTop = ((self.options.zoomWindowHeight / 2) - (self.nzHeight / 2)) * (-1);
                                self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1); //DONE 8,9,10,11,12
                            } else { //negative margin

                            }
                            break;
                        case 11:
                            self.windowOffsetTop = (self.options.zoomWindowOffety);
                            self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1); //DONE 8,9,10,11,12
                            break;
                        case 12: //done  
                            self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1); //DONE 12,13,14,15,16
                            self.windowOffsetLeft = (self.zoomWindow.width() + (self.options.borderSize * 2)) * (-1); //DONE 8,9,10,11,12
                            break;
                        case 13: //done  
                            self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1); //DONE 12,13,14,15,16
                            self.windowOffsetLeft = (0); //DONE 7, 13
                            break;
                        case 14:
                            if (self.options.zoomWindowHeight > self.nzHeight) { //positive margin
                                self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1); //DONE 12,13,14,15,16

                                self.windowOffsetLeft = ((self.options.zoomWindowWidth / 2) - (self.nzWidth / 2) + (self.options.borderSize * 2)) * (-1);
                            } else { //negative margin

                            }

                            break;
                        case 15: //done   
                            self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1); //DONE 12,13,14,15,16
                            self.windowOffsetLeft = (self.nzWidth - self.zoomWindow.width() - (self.options.borderSize * 2)); //DONE - 5,15
                            break;
                        case 16: //done  
                            self.windowOffsetTop = (self.zoomWindow.height() + (self.options.borderSize * 2)) * (-1); //DONE 12,13,14,15,16
                            self.windowOffsetLeft = (self.nzWidth); //DONE 1, 2, 3, 4, 16
                            break;
                        default: //done  
                            self.windowOffsetTop = (self.options.zoomWindowOffety); //DONE - 1
                            self.windowOffsetLeft = (self.nzWidth); //DONE 1, 2, 3, 4, 16
                    }
                } //end isNAN
                else {
                    //WE CAN POSITION IN A CLASS - ASSUME THAT ANY STRING PASSED IS
                    self.externalContainer = $('#' + self.options.zoomWindowPosition);
                    self.externalContainerWidth = self.externalContainer.width();
                    self.externalContainerHeight = self.externalContainer.height();
                    self.externalContainerOffset = self.externalContainer.offset();

                    self.windowOffsetTop = self.externalContainerOffset.top; //DONE - 1
                    self.windowOffsetLeft = self.externalContainerOffset.left; //DONE 1, 2, 3, 4, 16

                }
                self.isWindowSet = true;
                self.windowOffsetTop = self.windowOffsetTop + self.options.zoomWindowOffety;
                self.windowOffsetLeft = self.windowOffsetLeft + self.options.zoomWindowOffetx;

                self.zoomWindow.css({
                    top: self.windowOffsetTop
                });
                self.zoomWindow.css({
                    left: self.windowOffsetLeft
                });

                if (self.options.zoomType == "inner") {
                    self.zoomWindow.css({
                        top: 0
                    });
                    self.zoomWindow.css({
                        left: 0
                    });

                }


                self.windowLeftPos = String(((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * (-1));
                self.windowTopPos = String(((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * (-1));
                if (self.Etoppos) {
                    self.windowTopPos = 0;
                }
                if (self.Eloppos) {
                    self.windowLeftPos = 0;
                }
                if (self.Eboppos) {
                    self.windowTopPos = (self.largeHeight / self.currentZoomLevel - self.zoomWindow.height()) * (-1);
                }
                if (self.Eroppos) {
                    self.windowLeftPos = ((self.largeWidth / self.currentZoomLevel - self.zoomWindow.width()) * (-1));
                }

                //stops micro movements
                if (self.fullheight) {
                    self.windowTopPos = 0;

                }
                if (self.fullwidth) {
                    self.windowLeftPos = 0;

                }
                //set the css background position 


                if (self.options.zoomType == "window" || self.options.zoomType == "inner") {

                    if (self.zoomLock == 1) {
                        //overrides for images not zoomable
                        if (self.widthRatio <= 1) {

                            self.windowLeftPos = 0;
                        }
                        if (self.heightRatio <= 1) {
                            self.windowTopPos = 0;
                        }
                    }
                    // adjust images less than the window height

                    if (self.options.zoomType == "window") {
                        if (self.largeHeight < self.options.zoomWindowHeight) {

                            self.windowTopPos = 0;
                        }
                        if (self.largeWidth < self.options.zoomWindowWidth) {
                            self.windowLeftPos = 0;
                        }
                    }

                    //set the zoomwindow background position
                    if (self.options.easing) {

                        //     if(self.changeZoom){
                        //           clearInterval(self.loop);
                        //           self.changeZoom = false;
                        //           self.loop = false;

                        //            }
                        //set the pos to 0 if not set
                        if (!self.xp) {
                            self.xp = 0;
                        }
                        if (!self.yp) {
                            self.yp = 0;
                        }
                        //if loop not already started, then run it 
                        if (!self.loop) {
                            self.loop = setInterval(function () {
                                //using zeno's paradox    

                                self.xp += (self.windowLeftPos - self.xp) / self.options.easingAmount;
                                self.yp += (self.windowTopPos - self.yp) / self.options.easingAmount;
                                if (self.scrollingLock) {


                                    clearInterval(self.loop);
                                    self.xp = self.windowLeftPos;
                                    self.yp = self.windowTopPos

                                    self.xp = ((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * (-1);
                                    self.yp = (((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * (-1));

                                    if (self.changeBgSize) {
                                        if (self.nzHeight > self.nzWidth) {
                                            if (self.options.zoomType == "lens") {
                                                self.zoomLens.css({
                                                    "background-size": self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                                                });
                                            }
                                            self.zoomWindow.css({
                                                "background-size": self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                                            });
                                        } else {
                                            if (self.options.zoomType != "lens") {
                                                self.zoomLens.css({
                                                    "background-size": self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                                                });
                                            }
                                            self.zoomWindow.css({
                                                "background-size": self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvaluewidth + 'px'
                                            });

                                        }

                                        /*
             if(!self.bgxp){self.bgxp = self.largeWidth/self.newvalue;}
						if(!self.bgyp){self.bgyp = self.largeHeight/self.newvalue ;}  
                 if (!self.bgloop){   
                 	self.bgloop = setInterval(function(){   

                 self.bgxp += (self.largeWidth/self.newvalue  - self.bgxp) / self.options.easingAmount; 
								self.bgyp += (self.largeHeight/self.newvalue  - self.bgyp) / self.options.easingAmount;

           self.zoomWindow.css({ "background-size": self.bgxp + 'px ' + self.bgyp + 'px' });


                  }, 16);

                 }
										 */
                                        self.changeBgSize = false;
                                    }

                                    self.zoomWindow.css({
                                        backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px'
                                    });
                                    self.scrollingLock = false;
                                    self.loop = false;

                                } else if (Math.round(Math.abs(self.xp - self.windowLeftPos) + Math.abs(self.yp - self.windowTopPos)) < 1) {
                                    //stops micro movements
                                    clearInterval(self.loop);
                                    self.zoomWindow.css({
                                        backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px'
                                    });
                                    self.loop = false;
                                } else {
                                    if (self.changeBgSize) {
                                        if (self.nzHeight > self.nzWidth) {
                                            if (self.options.zoomType == "lens") {
                                                self.zoomLens.css({
                                                    "background-size": self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                                                });
                                            }
                                            self.zoomWindow.css({
                                                "background-size": self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                                            });
                                        } else {
                                            if (self.options.zoomType != "lens") {
                                                self.zoomLens.css({
                                                    "background-size": self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvaluewidth + 'px'
                                                });
                                            }
                                            self.zoomWindow.css({
                                                "background-size": self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvaluewidth + 'px'
                                            });
                                        }
                                        self.changeBgSize = false;
                                    }

                                    self.zoomWindow.css({
                                        backgroundPosition: self.xp + 'px ' + self.yp + 'px'
                                    });
                                }
                            }, 16);
                        }
                    } else {
                        if (self.changeBgSize) {
                            if (self.nzHeight > self.nzWidth) {
                                if (self.options.zoomType == "lens") {
                                    self.zoomLens.css({
                                        "background-size": self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                                    });
                                }

                                self.zoomWindow.css({
                                    "background-size": self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                                });
                            } else {
                                if (self.options.zoomType == "lens") {
                                    self.zoomLens.css({
                                        "background-size": self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvaluewidth + 'px'
                                    });
                                }
                                if ((self.largeHeight / self.newvaluewidth) < self.options.zoomWindowHeight) {

                                    self.zoomWindow.css({
                                        "background-size": self.largeWidth / self.newvaluewidth + 'px ' + self.largeHeight / self.newvaluewidth + 'px'
                                    });
                                } else {

                                    self.zoomWindow.css({
                                        "background-size": self.largeWidth / self.newvalueheight + 'px ' + self.largeHeight / self.newvalueheight + 'px'
                                    });
                                }

                            }
                            self.changeBgSize = false;
                        }

                        self.zoomWindow.css({
                            backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px'
                        });
                    }
                }
            },
            setTintPosition: function (e) {
                var self = this;
                self.nzOffset = self.$elem.offset();
                self.tintpos = String(((e.pageX - self.nzOffset.left) - (self.zoomLens.width() / 2)) * (-1));
                self.tintposy = String(((e.pageY - self.nzOffset.top) - self.zoomLens.height() / 2) * (-1));
                if (self.Etoppos) {
                    self.tintposy = 0;
                }
                if (self.Eloppos) {
                    self.tintpos = 0;
                }
                if (self.Eboppos) {
                    self.tintposy = (self.nzHeight - self.zoomLens.height() - (self.options.lensBorderSize * 2)) * (-1);
                }
                if (self.Eroppos) {
                    self.tintpos = ((self.nzWidth - self.zoomLens.width() - (self.options.lensBorderSize * 2)) * (-1));
                }
                if (self.options.tint) {
                    //stops micro movements
                    if (self.fullheight) {
                        self.tintposy = 0;

                    }
                    if (self.fullwidth) {
                        self.tintpos = 0;

                    }
                    self.zoomTintImage.css({
                        'left': self.tintpos + 'px'
                    });
                    self.zoomTintImage.css({
                        'top': self.tintposy + 'px'
                    });
                }
            },

            swaptheimage: function (smallimage, largeimage) {
                var self = this;
                var newImg = new Image();

                if (self.options.loadingIcon) {
                    self.spinner = $j('<div style="background: url(\'' + self.options.loadingIcon + '\') no-repeat center;height:' + self.nzHeight + 'px;width:' + self.nzWidth + 'px;z-index: 2000;position: absolute; background-position: center center;"></div>');
                    self.$elem.after(self.spinner);
                }

                self.options.onImageSwap(self.$elem);

                newImg.onload = function () {
                    self.largeWidth = newImg.width;
                    self.largeHeight = newImg.height;
                    self.zoomImage = largeimage;
                    self.zoomWindow.css({
                        "background-size": self.largeWidth + 'px ' + self.largeHeight + 'px'
                    });
                    self.swapAction(smallimage, largeimage);
                    return;
                }
                newImg.src = largeimage; // this must be done AFTER setting onload

            },
            swapAction: function (smallimage, largeimage) {


                var self = this;

                var newImg2 = new Image();
                newImg2.onload = function () {
                    //re-calculate values
                    self.nzHeight = newImg2.height;
                    self.nzWidth = newImg2.width;
                    self.options.onImageSwapComplete(self.$elem);

                    self.doneCallback();
                    return;
                }
                newImg2.src = smallimage;

                //reset the zoomlevel to that initially set in options
                self.currentZoomLevel = self.options.zoomLevel;
                self.options.maxZoomLevel = false;

                //swaps the main image
                //self.$elem.attr("src",smallimage);
                //swaps the zoom image     
                if (self.options.zoomType == "lens") {
                    self.zoomLens.css({
                        backgroundImage: "url('" + largeimage + "')"
                    });
                }
                if (self.options.zoomType == "window") {
                    self.zoomWindow.css({
                        backgroundImage: "url('" + largeimage + "')"
                    });
                }
                if (self.options.zoomType == "inner") {
                    self.zoomWindow.css({
                        backgroundImage: "url('" + largeimage + "')"
                    });
                }



                self.currentImage = largeimage;

                if (self.options.imageCrossfade) {
                    var oldImg = self.$elem;
                    var newImg = oldImg.clone();
                    self.$elem.attr("src", smallimage)
                    self.$elem.after(newImg);
                    newImg.stop(true).fadeOut(self.options.imageCrossfade, function () {
                        $(this).remove();
                    });

                    //       				if(self.options.zoomType == "inner"){
                    //remove any attributes on the cloned image so we can resize later
                    self.$elem.width("auto").removeAttr("width");
                    self.$elem.height("auto").removeAttr("height");
                    //   }

                    oldImg.fadeIn(self.options.imageCrossfade);

                    if (self.options.tint && self.options.zoomType != "inner") {

                        var oldImgTint = self.zoomTintImage;
                        var newImgTint = oldImgTint.clone();
                        self.zoomTintImage.attr("src", largeimage)
                        self.zoomTintImage.after(newImgTint);
                        newImgTint.stop(true).fadeOut(self.options.imageCrossfade, function () {
                            $(this).remove();
                        });



                        oldImgTint.fadeIn(self.options.imageCrossfade);


                        //self.zoomTintImage.attr("width",elem.data("image"));

                        //resize the tint window
                        self.zoomTint.css({
                            height: self.$elem.height()
                        });
                        self.zoomTint.css({
                            width: self.$elem.width()
                        });
                    }

                    self.zoomContainer.css("height", self.$elem.height());
                    self.zoomContainer.css("width", self.$elem.width());

                    if (self.options.zoomType == "inner") {
                        if (!self.options.constrainType) {
                            self.zoomWrap.parent().css("height", self.$elem.height());
                            self.zoomWrap.parent().css("width", self.$elem.width());

                            self.zoomWindow.css("height", self.$elem.height());
                            self.zoomWindow.css("width", self.$elem.width());
                        }
                    }

                    if (self.options.imageCrossfade) {
                        self.zoomWrap.css("height", self.$elem.height());
                        self.zoomWrap.css("width", self.$elem.width());
                    }
                } else {
                    self.$elem.attr("src", smallimage);
                    if (self.options.tint) {
                        self.zoomTintImage.attr("src", largeimage);
                        //self.zoomTintImage.attr("width",elem.data("image"));
                        self.zoomTintImage.attr("height", self.$elem.height());
                        //self.zoomTintImage.attr('src') = elem.data("image");
                        self.zoomTintImage.css({
                            height: self.$elem.height()
                        });
                        self.zoomTint.css({
                            height: self.$elem.height()
                        });

                    }
                    self.zoomContainer.css("height", self.$elem.height());
                    self.zoomContainer.css("width", self.$elem.width());

                    if (self.options.imageCrossfade) {
                        self.zoomWrap.css("height", self.$elem.height());
                        self.zoomWrap.css("width", self.$elem.width());
                    }
                }
                if (self.options.constrainType) {

                    //This will contrain the image proportions
                    if (self.options.constrainType == "height") {

                        self.zoomContainer.css("height", self.options.constrainSize);
                        self.zoomContainer.css("width", "auto");

                        if (self.options.imageCrossfade) {
                            self.zoomWrap.css("height", self.options.constrainSize);
                            self.zoomWrap.css("width", "auto");
                            self.constwidth = self.zoomWrap.width();


                        } else {
                            self.$elem.css("height", self.options.constrainSize);
                            self.$elem.css("width", "auto");
                            self.constwidth = self.$elem.width();
                        }

                        if (self.options.zoomType == "inner") {

                            self.zoomWrap.parent().css("height", self.options.constrainSize);
                            self.zoomWrap.parent().css("width", self.constwidth);
                            self.zoomWindow.css("height", self.options.constrainSize);
                            self.zoomWindow.css("width", self.constwidth);
                        }
                        if (self.options.tint) {
                            self.tintContainer.css("height", self.options.constrainSize);
                            self.tintContainer.css("width", self.constwidth);
                            self.zoomTint.css("height", self.options.constrainSize);
                            self.zoomTint.css("width", self.constwidth);
                            self.zoomTintImage.css("height", self.options.constrainSize);
                            self.zoomTintImage.css("width", self.constwidth);
                        }

                    }
                    if (self.options.constrainType == "width") {
                        self.zoomContainer.css("height", "auto");
                        self.zoomContainer.css("width", self.options.constrainSize);

                        if (self.options.imageCrossfade) {
                            self.zoomWrap.css("height", "auto");
                            self.zoomWrap.css("width", self.options.constrainSize);
                            self.constheight = self.zoomWrap.height();
                        } else {
                            self.$elem.css("height", "auto");
                            self.$elem.css("width", self.options.constrainSize);
                            self.constheight = self.$elem.height();
                        }
                        if (self.options.zoomType == "inner") {
                            self.zoomWrap.parent().css("height", self.constheight);
                            self.zoomWrap.parent().css("width", self.options.constrainSize);
                            self.zoomWindow.css("height", self.constheight);
                            self.zoomWindow.css("width", self.options.constrainSize);
                        }
                        if (self.options.tint) {
                            self.tintContainer.css("height", self.constheight);
                            self.tintContainer.css("width", self.options.constrainSize);
                            self.zoomTint.css("height", self.constheight);
                            self.zoomTint.css("width", self.options.constrainSize);
                            self.zoomTintImage.css("height", self.constheight);
                            self.zoomTintImage.css("width", self.options.constrainSize);
                        }

                    }


                }

            },
            doneCallback: function () {

                var self = this;
                if (self.options.loadingIcon) {
                    self.spinner.hide();
                }

                self.nzOffset = self.$elem.offset();
                self.nzWidth = self.$elem.width();
                self.nzHeight = self.$elem.height();

                // reset the zoomlevel back to default
                self.currentZoomLevel = self.options.zoomLevel;

                //ratio of the large to small image
                self.widthRatio = self.largeWidth / self.nzWidth;
                self.heightRatio = self.largeHeight / self.nzHeight;

                //NEED TO ADD THE LENS SIZE FOR ROUND
                // adjust images less than the window height
                if (self.options.zoomType == "window") {

                    if (self.nzHeight < self.options.zoomWindowWidth / self.widthRatio) {
                        lensHeight = self.nzHeight;

                    } else {
                        lensHeight = String((self.options.zoomWindowHeight / self.heightRatio))
                    }

                    if (self.options.zoomWindowWidth < self.options.zoomWindowWidth) {
                        lensWidth = self.nzWidth;
                    } else {
                        lensWidth = (self.options.zoomWindowWidth / self.widthRatio);
                    }


                    if (self.zoomLens) {

                        self.zoomLens.css('width', lensWidth);
                        self.zoomLens.css('height', lensHeight);


                    }
                }
            },
            getCurrentImage: function () {
                var self = this;
                return self.zoomImage;
            },
            getGalleryList: function () {
                var self = this;
                //loop through the gallery options and set them in list for fancybox
                self.gallerylist = [];
                if (self.options.gallery) {


                    $j('#' + self.options.gallery + ' a').each(function () {

                        var img_src = '';
                        if ($j(this).data("zoom-image")) {
                            img_src = $j(this).data("zoom-image");
                        } else if ($j(this).data("image")) {
                            img_src = $j(this).data("image");
                        }
                        //put the current image at the start
                        if (img_src == self.zoomImage) {
                            self.gallerylist.unshift({
                                href: '' + img_src + '',
                                title: $(this).find('img').attr("title")
                            });
                        } else {
                            self.gallerylist.push({
                                href: '' + img_src + '',
                                title: $j(this).find('img').attr("title")
                            });
                        }


                    });
                }
                //if no gallery - return current image
                else {
                    self.gallerylist.push({
                        href: '' + self.zoomImage + '',
                        title: $(this).find('img').attr("title")
                    });
                }
                return self.gallerylist;

            },
            changeZoomLevel: function (value) {
                var self = this;

                //flag a zoom, so can adjust the easing during setPosition     
                self.scrollingLock = true;

                //round to two decimal places
                self.newvalue = parseFloat(value).toFixed(2);
                newvalue = parseFloat(value).toFixed(2);




                //maxwidth & Maxheight of the image
                maxheightnewvalue = self.largeHeight / ((self.options.zoomWindowHeight / self.nzHeight) * self.nzHeight);
                maxwidthtnewvalue = self.largeWidth / ((self.options.zoomWindowWidth / self.nzWidth) * self.nzWidth);




                //calculate new heightratio
                if (self.options.zoomType != "inner") {
                    if (maxheightnewvalue <= newvalue) {
                        self.heightRatio = (self.largeHeight / maxheightnewvalue) / self.nzHeight;
                        self.newvalueheight = maxheightnewvalue;
                        self.fullheight = true;

                    } else {
                        self.heightRatio = (self.largeHeight / newvalue) / self.nzHeight;
                        self.newvalueheight = newvalue;
                        self.fullheight = false;

                    }


                    //					calculate new width ratio

                    if (maxwidthtnewvalue <= newvalue) {
                        self.widthRatio = (self.largeWidth / maxwidthtnewvalue) / self.nzWidth;
                        self.newvaluewidth = maxwidthtnewvalue;
                        self.fullwidth = true;

                    } else {
                        self.widthRatio = (self.largeWidth / newvalue) / self.nzWidth;
                        self.newvaluewidth = newvalue;
                        self.fullwidth = false;

                    }
                    if (self.options.zoomType == "lens") {
                        if (maxheightnewvalue <= newvalue) {
                            self.fullwidth = true;
                            self.newvaluewidth = maxheightnewvalue;

                        } else {
                            self.widthRatio = (self.largeWidth / newvalue) / self.nzWidth;
                            self.newvaluewidth = newvalue;

                            self.fullwidth = false;
                        }
                    }
                }



                if (self.options.zoomType == "inner") {
                    maxheightnewvalue = parseFloat(self.largeHeight / self.nzHeight).toFixed(2);
                    maxwidthtnewvalue = parseFloat(self.largeWidth / self.nzWidth).toFixed(2);
                    if (newvalue > maxheightnewvalue) {
                        newvalue = maxheightnewvalue;
                    }
                    if (newvalue > maxwidthtnewvalue) {
                        newvalue = maxwidthtnewvalue;
                    }


                    if (maxheightnewvalue <= newvalue) {


                        self.heightRatio = (self.largeHeight / newvalue) / self.nzHeight;
                        if (newvalue > maxheightnewvalue) {
                            self.newvalueheight = maxheightnewvalue;
                        } else {
                            self.newvalueheight = newvalue;
                        }
                        self.fullheight = true;


                    } else {



                        self.heightRatio = (self.largeHeight / newvalue) / self.nzHeight;

                        if (newvalue > maxheightnewvalue) {

                            self.newvalueheight = maxheightnewvalue;
                        } else {
                            self.newvalueheight = newvalue;
                        }
                        self.fullheight = false;
                    }




                    if (maxwidthtnewvalue <= newvalue) {

                        self.widthRatio = (self.largeWidth / newvalue) / self.nzWidth;
                        if (newvalue > maxwidthtnewvalue) {

                            self.newvaluewidth = maxwidthtnewvalue;
                        } else {
                            self.newvaluewidth = newvalue;
                        }

                        self.fullwidth = true;


                    } else {

                        self.widthRatio = (self.largeWidth / newvalue) / self.nzWidth;
                        self.newvaluewidth = newvalue;
                        self.fullwidth = false;
                    }


                } //end inner
                scrcontinue = false;

                if (self.options.zoomType == "inner") {

                    if (self.nzWidth >= self.nzHeight) {
                        if (self.newvaluewidth <= maxwidthtnewvalue) {
                            scrcontinue = true;
                        } else {

                            scrcontinue = false;
                            self.fullheight = true;
                            self.fullwidth = true;
                        }
                    }
                    if (self.nzHeight > self.nzWidth) {
                        if (self.newvaluewidth <= maxwidthtnewvalue) {
                            scrcontinue = true;
                        } else {
                            scrcontinue = false;

                            self.fullheight = true;
                            self.fullwidth = true;
                        }
                    }
                }

                if (self.options.zoomType != "inner") {
                    scrcontinue = true;
                }

                if (scrcontinue) {



                    self.zoomLock = 0;
                    self.changeZoom = true;

                    //if lens height is less than image height


                    if (((self.options.zoomWindowHeight) / self.heightRatio) <= self.nzHeight) {


                        self.currentZoomLevel = self.newvalueheight;
                        if (self.options.zoomType != "lens" && self.options.zoomType != "inner") {
                            self.changeBgSize = true;

                            self.zoomLens.css({
                                height: String((self.options.zoomWindowHeight) / self.heightRatio) + 'px'
                            })
                        }
                        if (self.options.zoomType == "lens" || self.options.zoomType == "inner") {
                            self.changeBgSize = true;
                        }


                    }




                    if ((self.options.zoomWindowWidth / self.widthRatio) <= self.nzWidth) {



                        if (self.options.zoomType != "inner") {
                            if (self.newvaluewidth > self.newvalueheight) {
                                self.currentZoomLevel = self.newvaluewidth;

                            }
                        }

                        if (self.options.zoomType != "lens" && self.options.zoomType != "inner") {
                            self.changeBgSize = true;

                            self.zoomLens.css({
                                width: String((self.options.zoomWindowWidth) / self.widthRatio) + 'px'
                            })
                        }
                        if (self.options.zoomType == "lens" || self.options.zoomType == "inner") {
                            self.changeBgSize = true;
                        }

                    }
                    if (self.options.zoomType == "inner") {
                        self.changeBgSize = true;

                        if (self.nzWidth > self.nzHeight) {
                            self.currentZoomLevel = self.newvaluewidth;
                        }
                        if (self.nzHeight > self.nzWidth) {
                            self.currentZoomLevel = self.newvaluewidth;
                        }
                    }

                } //under

                //sets the boundry change, called in setWindowPos
                self.setPosition(self.currentLoc);
                //
            },
            closeAll: function () {
                if (self.zoomWindow) {
                    self.zoomWindow.hide();
                }
                if (self.zoomLens) {
                    self.zoomLens.hide();
                }
                if (self.zoomTint) {
                    self.zoomTint.hide();
                }
            },
            changeState: function (value) {
                var self = this;
                if (value == 'enable') {
                    self.options.zoomEnabled = true;
                }
                if (value == 'disable') {
                    self.options.zoomEnabled = false;
                }

            }

        };




        $j.fn.elevateZoom = function (options) {
            return this.each(function () {
                var elevate = Object.create(ElevateZoom);

                elevate.init(options, this);

                $j.data(this, 'elevateZoom', elevate);

            });
        };

        $j.fn.elevateZoom.options = {
            zoomActivation: "hover", // Can also be click (PLACEHOLDER FOR NEXT VERSION)
            zoomEnabled: true, //false disables zoomwindow from showing
            preloading: 1, //by default, load all the images, if 0, then only load images after activated (PLACEHOLDER FOR NEXT VERSION)
            zoomLevel: 1, //default zoom level of image
            scrollZoom: false, //allow zoom on mousewheel, true to activate
            scrollZoomIncrement: 0.1, //steps of the scrollzoom
            minZoomLevel: false,
            maxZoomLevel: false,
            easing: false,
            easingAmount: 12,
            lensSize: 200,
            zoomWindowWidth: 400,
            zoomWindowHeight: 400,
            zoomWindowOffetx: 0,
            zoomWindowOffety: 0,
            zoomWindowPosition: 1,
            zoomWindowBgColour: "#fff",
            lensFadeIn: false,
            lensFadeOut: false,
            debug: false,
            zoomWindowFadeIn: false,
            zoomWindowFadeOut: false,
            zoomWindowAlwaysShow: false,
            zoomTintFadeIn: false,
            zoomTintFadeOut: false,
            borderSize: 4,
            showLens: true,
            borderColour: "#888",
            lensBorderSize: 1,
            lensBorderColour: "#000",
            lensShape: "square", //can be "round"
            zoomType: "window", //window is default,  also "lens" available -
            containLensZoom: false,
            lensColour: "white", //colour of the lens background
            lensOpacity: 0.4, //opacity of the lens
            lenszoom: false,
            tint: false, //enable the tinting
            tintColour: "#333", //default tint color, can be anything, red, #ccc, rgb(0,0,0)
            tintOpacity: 0.4, //opacity of the tint
            gallery: false,
            galleryActiveClass: "zoomGalleryActive",
            imageCrossfade: false,
            constrainType: false, //width or height
            constrainSize: false, //in pixels the dimensions you want to constrain on
            loadingIcon: false, //http://www.example.com/spinner.gif
            cursor: "default", // user should set to what they want the cursor as, if they have set a click function
            responsive: true,
            onComplete: $.noop,
            onDestroy: function () {},
            onZoomedImageLoaded: function () {},
            onImageSwap: $.noop,
            onImageSwapComplete: $.noop
        };

    })(jQuery, window, document);

});
