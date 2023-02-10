var $ = jQuery;

/* all scripts */
$(window).bind('load', function () {
    $('.js-header-burger').on('click', function () {
        $('.header').toggleClass('is-active');
    });

    $('.faq__trigger').on('click', function () {
        $(this).parent().parent().toggleClass('is-active');
    });

    $('.about-screenshots__slider').find('.owl-carousel').owlCarousel({
        autoplay: true,
        dots: true,
        center: true,
        items: 1,
        loop: true,
        nav: false,
    });

    $('.js-scroll_to').click(function () {
        var link = $(this).attr('data-link');
        var scroll_to = $('*[data-scroll="' + link + '"]');

        if (scroll_to.length) {
            $('body, html').animate({
                scrollTop: scroll_to.offset().top - 68
            }, 700);
        } else {
            console.log('link not exist: ' + link);
        }

        $('.header').removeClass('is-active');
    });


    // copy btn
    new ClipboardJS('.js-copy');

    $('.js-copy').on('click', function () {
        $(this).find('.js-tooltip').addClass('is-active');

        setTimeout(function (){
            $('.js-tooltip').removeClass('is-active');
        },1000)
    })

    /* form */
    $(function () {
        var contactForm = $('.js-contacts-form');
        var fieldName = $('.field-name');
        var fieldEmail = $('.field-email');
        var fieldText = $('.field-text');
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        fieldEmail.on('input', function () {
            fieldEmail.removeClass('not-valid');

            if (re.test(String(fieldEmail.val()).toLowerCase()) !== true) {
                fieldEmail.addClass('not-valid');
            }
        });

        fieldName.on('input', function () {
            fieldName.removeClass('not-valid');

            if (fieldName.val().length < 3 || !isNaN(fieldName.val())) {
                fieldName.addClass('not-valid');
            }
        });

        fieldText.on('input', function () {
            fieldText.removeClass('not-valid');

            if (fieldText.val().length < 3) {
                fieldText.addClass('not-valid');
            }
        });

        $('.js-btn-submit').on('click', function (e) {
            e.preventDefault()

            var validateVal = false;
            var validName = true;
            var validEmail = true;
            var validText = true;

            if (!validateVal) {
                $('.js-form-error').addClass('is-active');

                setTimeout(function () {
                    $('.js-form-error').removeClass('is-active');
                }, 2000)
            }

            if (fieldName.val().length < 3 || !isNaN(fieldName.val())) {
                fieldName.addClass('not-valid');
                validName = false;
            }

            if (fieldText.val().length < 3) {
                fieldText.addClass('not-valid');
                validText = false;
            }

            if (re.test(String(fieldEmail.val()).toLowerCase()) !== true) {
                fieldEmail.addClass('not-valid');
                validEmail = false;
            }
            if (validName && validText && validEmail) {
                validateVal = true
            }

            if (validateVal) {
                $('.js-form-error').removeClass('is-active');

                $.ajax({
                    url: contactForm.attr('action') + "?ajax=true",
                    type: contactForm.attr('method'),
                    data: contactForm.serialize(),
                    success: function (response) {
                        console.log(response);
                        console.log('success')
                    }
                });

                $('.js-form-success').addClass('is-active');

                setTimeout(function () {
                    $('.js-form-success').removeClass('is-active');
                }, 2000);

                // clear value
                fieldName.val('');
                fieldEmail.val('')
                fieldText.val('')
            }
        })
    });
});

