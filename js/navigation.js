"use strict";

var navigation = {
    $navTrigger: document.querySelector('.nav__trigger'),
    $nav: document.querySelector('.nav'),
    $navItems: document.querySelectorAll('.nav__item a'),
    $main: document.querySelector('.main'),
    transitionEnd: 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
    isOpeningNav: false,
    init: function init() {
        var self = this;
        self.$main.style.overflow = 'auto';
        self.$main.style.height = 'auto';
        window.addEventListener('scroll', function (e) {
            if (window.scrollY == 0 && self.isOpeningNav) {
                self.isOpeningNav = false; // Add a small delay

                setTimeout(function () {
                    self.openNavigation();
                }, 150);
            }
        });
        self.$navTrigger.addEventListener('click', function (e) {
            e.preventDefault();

            if (!self.$navTrigger.classList.contains('is-active')) {
                if (window.scrollY !== 0) {
                    // Scroll to top
                    window.scroll({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                    self.isOpeningNav = true;
                } else {
                    self.openNavigation();
                }
            } else {
                self.closeNavigation();
            }
        });
        self.$navItems.forEach(function (navLink) {
            navLink.addEventListener('click', function (e) {
                e.preventDefault();

                self.$navItems.forEach(function (el) {
                    el.classList.remove('is-active');
                });

                this.classList.add('is-active');

                self.transitionPage();
            });
        });
    },
    openNavigation: function openNavigation() {
        var self = this;

        self.$navTrigger.classList.add('is-active');

        document.body.classList.add('is-froze');

        if (self.$main.style.removeProperty) {
            self.$main.style.removeProperty('overflow');
            self.$main.style.removeProperty('height');
        } else {
            self.$main.style.removeAttribute('overflow');
            self.$main.style.removeAttribute('height');
        } // .main active


        self.$main.classList.add('is-active');
    },
    closeNavigation: function closeNavigation() {
        var self = this;
        self.$navTrigger.classList.remove('is-active');

        self.$main.classList.remove('is-active');
        self.$main.addEventListener('transitionend', function (e) {
            if (e.propertyName == 'transform' && !self.$navTrigger.classList.contains('is-active')) {

                self.$main.style.overflow = 'auto';
                self.$main.style.height = 'auto';

                document.body.classList.remove('is-froze');
            }
        });

        if (document.documentElement.classList.contains('no-csstransitions')) {

            self.$main.classList.remove('is-active');

            document.body.classList.remove('is-froze');
        }
    },
    transitionPage: function transitionPage() {
        var self = this;

        self.$main.classList.add('is-transition-out');
        self.$main.addEventListener('transitionend', function (e) {
            if (e.propertyName == 'clip-path') {
                if (self.$main.classList.contains('is-transition-in')) {
                    self.$main.classList.remove('is-transition-in');
                    self.$main.classList.remove('is-transition-out');
                    self.closeNavigation();
                }

                if (self.$main.classList.contains('is-transition-out')) {
                    self.$main.classList.remove('is-transition-out');
                    setTimeout(function () {
                        self.$main.classList.add('is-transition-in');
                    }, 500);
                }
            }
        });
    }
};
navigation.init();
