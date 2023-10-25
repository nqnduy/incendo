const SCRIPT = {
    home: () => {
        const whyDoTab = () => {
            const $tab = $('.whyDo__detail-tab-item');
            const $content = $('.whyDo__detail-content-item')
            $([$tab[0], $content[0]]).addClass('active');

            $tab.on('click', function () {
                let index = $(this).index();
                $([$tab[index], $content[index]]).addClass('active').siblings().removeClass('active');
            })
        }

        const whyDoAccordion = () => {
            const $accordion = $('.whyDo__detail-tab-item');
            const $accordion_content = $('.whyDo__detail-tab-inner.accordion-content');

            $accordion_content.hide();
            $accordion.on('click', function (e) {
                let currentContent = $(this).find($accordion_content);

                currentContent.slideToggle();
                $(this).toggleClass("active");

                $accordion_content.not(currentContent).slideUp();
				$accordion.not($(this)).removeClass("active");
            })
        }

        if ($(window).width() > 767) {
            whyDoTab();
        }
        else {
            whyDoAccordion();
        }
    },
    contact: () => { },
    blog: () => {}
}

const main = () => {
    const pageName = $("main > [name-space]").attr("name-space");

    const HEADER = {
        toggleNav: () => {
            const $hamburger = $('.header__hamburger');
            const $header = $('.header');
            const $menu = $('.header__nav.ver-mb')
            const $menu_link = $('.header__nav-item');

            let offsetTopMenu = $menu.get(0).getBoundingClientRect().top;
            $menu.slideUp(() => {
                $header.addClass('active-border');
                $menu.css({ 'margin-top': offsetTopMenu - ($header.outerHeight() - parseFloat($header.css('padding-bottom'))) - 1 });
                gsap.set($menu_link, { autoAlpha: 0, x: 10 });
            });

            $hamburger.on('click', function (e) {
                e.preventDefault();
                const isTransDone = (condition) => {
                    if (condition) $hamburger.removeClass('pe-none')
                    else $hamburger.addClass('pe-none');
                };

                if ($header.hasClass('nav-active')) {
                    isTransDone(false);
                    $header.removeClass('nav-active');
                    gsap.to($menu_link, { autoAlpha: 0, x: 10, stagger: 0.03 });
                    setTimeout(() => $menu.slideUp(() => isTransDone(true)), 300);
                }
                else {
                    isTransDone(false);
                    $header.addClass('nav-active');
                    $menu.slideDown(() => {
                        gsap.to($menu_link, { autoAlpha: 1, x: 0, stagger: 0.03, onComplete: () => isTransDone(true) });
                    });
                }
            })
        },
        updateCurrentPage: () => {
            const update = () => {
                let { pathname, hash } = window.location;
                $('.header__nav-item a').each((_, item) => {
                    if ($(item).attr('href') === pathname) {
                        $(item).parent().addClass('current');
                    }
                    else if ($(item).attr('href').slice(1) === hash) {
                        $(item).parent().addClass('current');
                    }
                })
            }
            update();
            $('.header__nav-item').on('click', function () {
                $('.header__nav-item').removeClass('current');
                requestAnimationFrame(() => update())
            })
        }
    }
    HEADER.updateCurrentPage();
    if ($(window).width() <= 767) {
        HEADER.toggleNav();
    }

    if (pageName) {
        console.log(pageName)
		SCRIPT[pageName]();
	}
}

window.onload = main;

