$(function () {
    $('ul.nav li.dropdown').hover(function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(200);
    }, function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(200);
    });

    var $animation_elements = $('.animation-element');
    var $window = $(window);

    function check_if_in_view() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($animation_elements, function () {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
                $element.addClass('in-view');
            } else {
                $element.removeClass('in-view');
            }
        });
    }
    $(window).on('beforeunload', function() {
        $(window).scrollTop(0);
    });

    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');

    $('.bttop').on('click', function () {
        $('html,body').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
    $window.scroll(function () {
        if ($(this).scrollTop() > 1000) {
            $('.nut').fadeIn();
        } else {
            $('.nut').fadeOut();
        }
    });
     $('#btn-dangki').on('click', function () {
        $('.bs-example-modal-lg').modal('show');
        $('#myTabs a[href="#profile"]').tab('show');
    })

    $('#btn-dangki2').on('click', function () {
        $('.bs-example-modal-lg').modal('show');
        $('#myTabs a[href="#profile"]').tab('show');
    })

    $('#btn-dangnhap').on('click', function () {
        $('.bs-example-modal-lg').modal('show');
        $('#myTabs a[href="#home"]').tab('show');
    })

    $('.counter').each(function () {
        var $this = $(this),
            countTo = $this.attr('data-count');

        $({countNum: $this.text()}).animate({
                countNum: countTo
            },

            {
                duration: 1200,
                // easing: 'linear',
                step: function () {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                    $this.text(this.countNum);
                    //alert('finished');
                }

            });
    });
});
	
