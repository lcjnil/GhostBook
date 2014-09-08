var app = {
  column: 3,
  formatWidth: function() {
    if ($('#isotope-content').length) {
      var contentWidth = $('#isotope-content').width();

      var columnPadding = 20;
      //设置分栏个数

      //$('body').is('.home-template')
      if (1) {
        if (contentWidth <= 488) {
          column = 1;
        } else if (contentWidth <= 900) {
          column = 2;
        } else if (contentWidth <=1200) {
          column = 3;
        } else if (contentWidth >= 1200) {
          column = 4;
        }
      }

      var itemWidth = Math.floor((contentWidth - (columnPadding * (column + 1)))/column);
      $('.post-item').each(function() {
        $(this).css({"width": itemWidth + "px"});
      });
    }
  },
  isotopeSetup: function() {
    if ($('#isotope-content').length) {
      $container = $('#isotope-content');
      $container.isotope({
        itemSelector: '.post-item',
        layoutMode: 'masonry',
        resizable: false,
        animationOptions: {
          duration: 400,
          easing: 'swing',
          queue: false
        },
        masonry: {
          lauout: 'vertical',
          liquid: true,
          cols: column
        }
      });
    }
  },
  reloadIsotope: function() {
    app.formatWidth();
    $('#isotope-content').isotope();
  },
  infiniteScrollSetup: function() {
    $container = $('#isotope-content');
    $container.infinitescroll({
      navSelector: '.pagination',
      nextSelector: '.pagination a',
      itemSelector: '#isotope-content .post-item',
      maxPage: app.getMaxPage(),
    }, function(newElement) {
      $container.isotope('insert', newElement);
      app.reloadIsotope();
    });
  },
  getMaxPage: function() {
    var maxpage = $(".page-number").text().replace('Page 1 of ', '');
    return maxpage;
  },
  init: function() {
    app.formatWidth();
    app.isotopeSetup();
    app.infiniteScrollSetup();
  }
};

$(document).ready(function() {
  app.init();
});
$(window).on("debouncedresize", function( event ) {
  app.reloadIsotope();
});
$(window).load(function(){
  app.reloadIsotope();
});
$(window).resize(function () {
  app.reloadIsotope();
});