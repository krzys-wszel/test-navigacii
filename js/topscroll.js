$(document).ready(() => {
    let windw = $(window);

    let navigation = $('.navigation');
    let navigationButton = $('.navigation-button');

    navigationButton.click(e => {
       if (navigation.hasClass('active')) {
           navigation.removeClass('active');
           navigationButton.text('☰');
       } else {
           navigation.addClass('active');
           navigationButton.text('×');
       }
    });

    let topScroll = $('.top-scroll');
    topScroll.click(e => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    });

    let showScrollTop = () => {
        if (windw.scrollTop() > 300) {
            topScroll.addClass('active');
        } else {
            topScroll.removeClass('active');
        }
    };

    showScrollTop();
    windw.scroll(e => {
        showScrollTop();
    });
});