webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports) {

/*!
 * remark (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
(function (window, document, $) {
  'use strict';

  $.configs.set('tour', {
    steps: [{
      element: "#toggleMenubar",
      position: "right",
      intro: "Offcanvas Menu <p class='content'>It is nice custom navigation for desktop users and a seek off-canvas menu for tablet and mobile users</p>"
    }, {
      element: "#toggleFullscreen",
      intro: "Full Screen <p class='content'>Click this button you can view the admin template in full screen</p>"
    }, {
      element: "#toggleChat",
      position: 'left',
      intro: "Quick Conversations <p class='content'>This is a sidebar dialog box for user conversations list, you can even create a quick conversation with other users</p>"
    }],
    skipLabel: "<i class='wb-close'></i>",
    doneLabel: "<i class='wb-close'></i>",
    nextLabel: "Next <i class='wb-chevron-right-mini'></i>",
    prevLabel: "<i class='wb-chevron-left-mini'></i>Prev",
    showBullets: false
  });
})(window, document, $);

/***/ }),
/* 10 */
/***/ (function(module, exports) {

/*!
 * remark (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
(function (window, document, $) {
  'use strict';

  $.site.menu = {
    speed: 250,
    accordion: true, // A setting that changes the collapsible behavior to expandable instead of the default accordion style

    init: function init() {
      this.$instance = $('.site-menu');

      if (this.$instance.length === 0) {
        return;
      }

      this.bind();
    },

    bind: function bind() {
      var self = this;

      this.$instance.on('mouseenter.site.menu', '.site-menu-item', function () {
        var $item = $(this);
        if ($.site.menubar.folded === true && $item.is('.has-sub') && $item.parent('.site-menu').length > 0) {
          var $sub = $item.children('.site-menu-sub');
          self.position($item, $sub);
        }

        $item.addClass('hover');
      }).on('mouseleave.site.menu', '.site-menu-item', function () {
        var $item = $(this);
        if ($.site.menubar.folded === true && $item.is('.has-sub') && $item.parent('.site-menu').length > 0) {
          $item.children('.site-menu-sub').css("max-height", "");
        }

        $item.removeClass('hover');
      }).on('deactive.site.menu', '.site-menu-item.active', function (e) {
        var $item = $(this);

        $item.removeClass('active');

        e.stopPropagation();
      }).on('active.site.menu', '.site-menu-item', function (e) {
        var $item = $(this);

        $item.addClass('active');

        e.stopPropagation();
      }).on('open.site.menu', '.site-menu-item', function (e) {
        var $item = $(this);

        self.expand($item, function () {
          $item.addClass('open');
        });

        if (self.accordion) {
          $item.siblings('.open').trigger('close.site.menu');
        }

        e.stopPropagation();
      }).on('close.site.menu', '.site-menu-item.open', function (e) {
        var $item = $(this);

        self.collapse($item, function () {
          $item.removeClass('open');
        });

        e.stopPropagation();
      }).on('click.site.menu ', '.site-menu-item', function (e) {
        if ($(this).is('.has-sub') && $(e.target).closest('.site-menu-item').is(this)) {
          if ($(this).is('.open')) {
            $(this).trigger('close.site.menu');
          } else {
            $(this).trigger('open.site.menu');
          }
        } else {
          if (!$(this).is('.active')) {
            $(this).siblings('.active').trigger('deactive.site.menu');
            $(this).trigger('active.site.menu');
          }
        }

        e.stopPropagation();
      }).on('tap.site.menu', '> .site-menu-item > a', function () {
        var link = $(this).attr('href');

        if (link) {
          window.location = link;
        }
      }).on('touchend.site.menu', '> .site-menu-item > a', function (e) {
        var $item = $(this).parent('.site-menu-item');

        if ($.site.menubar.folded === true) {
          if ($item.is('.has-sub') && $item.parent('.site-menu').length > 0) {
            $item.siblings('.hover').removeClass('hover');

            if ($item.is('.hover')) {
              $item.removeClass('hover');
            } else {
              $item.addClass('hover');
            }
          }
        }
      }).on('scroll.site.menu', '.site-menu-sub', function (e) {
        e.stopPropagation();
      });
    },

    collapse: function collapse($item, callback) {
      var self = this;
      var $sub = $item.children('.site-menu-sub');

      $sub.show().slideUp(this.speed, function () {
        $(this).css('display', '');

        $(this).find('> .site-menu-item').removeClass('is-shown');

        if (callback) {
          callback();
        }

        self.$instance.trigger('collapsed.site.menu');
      });
    },

    expand: function expand($item, callback) {
      var self = this;
      var $sub = $item.children('.site-menu-sub');
      var $children = $sub.children('.site-menu-item').addClass('is-hidden');

      $sub.hide().slideDown(this.speed, function () {
        $(this).css('display', '');

        if (callback) {
          callback();
        }

        self.$instance.trigger('expanded.site.menu');
      });

      setTimeout(function () {
        $children.addClass('is-shown');
        $children.removeClass('is-hidden');
      }, 0);
    },

    refresh: function refresh() {
      this.$instance.find('.open').filter(':not(.active)').removeClass('open');
    },

    position: function position($item, $dropdown) {
      var offsetTop = $item.position().top,
          dropdownHeight = $dropdown.outerHeight(),
          menubarHeight = $.site.menubar.$instance.outerHeight(),
          itemHeight = $item.find("> a").outerHeight();

      $dropdown.removeClass('site-menu-sub-up').css('max-height', "");

      //if (offsetTop + dropdownHeight > menubarHeight) {
      if (offsetTop > menubarHeight / 2) {
        $dropdown.addClass('site-menu-sub-up');

        if ($.site.menubar.foldAlt) {
          offsetTop = offsetTop - itemHeight;
        }
        //if(dropdownHeight > offsetTop + itemHeight) {
        $dropdown.css('max-height', offsetTop + itemHeight);
        //}
      } else {
        if ($.site.menubar.foldAlt) {
          offsetTop = offsetTop + itemHeight;
        }
        $dropdown.removeClass('site-menu-sub-up');
        $dropdown.css('max-height', menubarHeight - offsetTop);
      }
      //}
    }
  };
})(window, document, jQuery);

/***/ }),
/* 11 */
/***/ (function(module, exports) {

/*!
 * remark (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
(function (window, document, $) {
  'use strict';

  var $body = $('body'),
      $html = $('html');

  $.site.menubar = {
    opened: null,
    folded: null,
    top: false,
    foldAlt: false,
    $instance: null,
    auto: true,

    init: function init() {
      $html.removeClass('css-menubar').addClass('js-menubar');

      this.$instance = $(".site-menubar");

      if (this.$instance.length === 0) {
        return;
      }

      var self = this;

      if ($body.is('.site-menubar-top')) {
        this.top = true;
      }

      if ($body.is('.site-menubar-fold-alt')) {
        this.foldAlt = true;
      }

      if ($body.data('autoMenubar') === false || $body.is('.site-menubar-keep')) {
        if ($body.hasClass('site-menubar-fold')) {
          this.auto = 'fold';
        } else if ($body.hasClass('site-menubar-unfold')) {
          this.auto = 'unfold';
        }
      }

      this.$instance.on('changed.site.menubar', function () {
        self.update();
      });

      this.change();
    },

    change: function change() {
      var breakpoint = Breakpoints.current();
      if (this.auto !== true) {
        switch (this.auto) {
          case 'fold':
            this.reset();
            if (breakpoint.name == 'xs') {
              this.hide();
            } else {
              this.fold();
            }
            return;
          case 'unfold':
            this.reset();
            if (breakpoint.name == 'xs') {
              this.hide();
            } else {
              this.unfold();
            }
            return;
        }
      }

      this.reset();

      if (breakpoint) {
        switch (breakpoint.name) {
          case 'lg':
            this.unfold();
            break;
          case 'md':
          case 'sm':
            this.fold();
            break;
          case 'xs':
            this.hide();
            break;
        }
      }
    },

    animate: function animate(doing, callback) {
      var self = this;
      $body.addClass('site-menubar-changing');

      doing.call(self);
      this.$instance.trigger('changing.site.menubar');

      setTimeout(function () {
        callback.call(self);
        $body.removeClass('site-menubar-changing');

        self.$instance.trigger('changed.site.menubar');
      }, 500);
    },

    reset: function reset() {
      this.opened = null;
      this.folded = null;
      $body.removeClass('site-menubar-hide site-menubar-open site-menubar-fold site-menubar-unfold');
      $html.removeClass('disable-scrolling');
    },

    open: function open() {
      if (this.opened !== true) {
        this.animate(function () {
          $body.removeClass('site-menubar-hide').addClass('site-menubar-open site-menubar-unfold');
          this.opened = true;

          $html.addClass('disable-scrolling');
        }, function () {
          this.scrollable.enable();
        });
      }
    },

    hide: function hide() {
      this.hoverscroll.disable();

      if (this.opened !== false) {
        this.animate(function () {

          $html.removeClass('disable-scrolling');
          $body.removeClass('site-menubar-open').addClass('site-menubar-hide site-menubar-unfold');
          this.opened = false;
        }, function () {
          this.scrollable.enable();
        });
      }
    },

    unfold: function unfold() {
      this.hoverscroll.disable();

      if (this.folded !== false) {
        this.animate(function () {
          $body.removeClass('site-menubar-fold').addClass('site-menubar-unfold');
          this.folded = false;
        }, function () {
          this.scrollable.enable();

          if (this.folded !== null) {
            $.site.resize();
          }
        });
      }
    },

    fold: function fold() {
      this.scrollable.disable();

      if (this.folded !== true) {
        this.animate(function () {

          $body.removeClass('site-menubar-unfold').addClass('site-menubar-fold');
          this.folded = true;
        }, function () {
          this.hoverscroll.enable();

          if (this.folded !== null) {
            $.site.resize();
          }
        });
      }
    },

    toggle: function toggle() {
      var breakpoint = Breakpoints.current();
      var folded = this.folded;
      var opened = this.opened;

      switch (breakpoint.name) {
        case 'lg':
          if (folded === null || folded === false) {
            this.fold();
          } else {
            this.unfold();
          }
          break;
        case 'md':
        case 'sm':
          if (folded === null || folded === true) {
            this.unfold();
          } else {
            this.fold();
          }
          break;
        case 'xs':
          if (opened === null || opened === false) {
            this.open();
          } else {
            this.hide();
          }
          break;
      }
    },

    update: function update() {
      this.scrollable.update();
      this.hoverscroll.update();
    },

    scrollable: {
      api: null,
      native: false,
      init: function init() {
        // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //   this.native = true;
        //   $body.addClass('site-menubar-native');
        //   return;
        // }

        if ($body.is('.site-menubar-native')) {
          this.native = true;
          return;
        }

        this.api = $.site.menubar.$instance.children('.site-menubar-body').asScrollable({
          namespace: 'scrollable',
          skin: 'scrollable-inverse',
          direction: 'vertical',
          contentSelector: '>',
          containerSelector: '>'
        }).data('asScrollable');
      },

      update: function update() {
        if (this.api) {
          this.api.update();
        }
      },

      enable: function enable() {
        if (this.native) {
          return;
        }
        if (!this.api) {
          this.init();
        }
        if (this.api) {
          this.api.enable();
        }
      },

      disable: function disable() {
        if (this.api) {
          this.api.disable();
        }
      }
    },

    hoverscroll: {
      api: null,

      init: function init() {
        this.api = $.site.menubar.$instance.children('.site-menubar-body').asHoverScroll({
          namespace: 'hoverscorll',
          direction: 'vertical',
          list: '.site-menu',
          item: '> li',
          exception: '.site-menu-sub',
          fixed: false,
          boundary: 100,
          onEnter: function onEnter() {
            //$(this).siblings().removeClass('hover');
            //$(this).addClass('hover');
          },
          onLeave: function onLeave() {
            //$(this).removeClass('hover');
          }
        }).data('asHoverScroll');
      },

      update: function update() {
        if (this.api) {
          this.api.update();
        }
      },

      enable: function enable() {
        if (!this.api) {
          this.init();
        }
        if (this.api) {
          this.api.enable();
        }
      },

      disable: function disable() {
        if (this.api) {
          this.api.disable();
        }
      }
    }
  };
})(window, document, jQuery);

/***/ }),
/* 12 */
/***/ (function(module, exports) {

/*!
 * remark (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
(function (window, document, $) {
  'use strict';

  $.site.sidebar = {
    init: function init() {
      if (typeof $.slidePanel === 'undefined') return;

      $(document).on('click', '[data-toggle="site-sidebar"]', function () {
        var $this = $(this);

        var direction = 'right';
        if ($('body').hasClass('site-menubar-flipped')) {
          direction = 'left';
        }

        var defaults = $.components.getDefaults("slidePanel");
        var options = $.extend({}, defaults, {
          direction: direction,
          skin: 'site-sidebar',
          dragTolerance: 80,
          template: function template(options) {
            return '<div class="' + options.classes.base + ' ' + options.classes.base + '-' + options.direction + '">' + '<div class="' + options.classes.content + ' site-sidebar-content"></div>' + '<div class="slidePanel-handler"></div>' + '</div>';
          },
          afterLoad: function afterLoad() {
            var self = this;
            this.$panel.find('.tab-pane').asScrollable({
              namespace: 'scrollable',
              contentSelector: "> div",
              containerSelector: "> div"
            });

            $.components.init('switchery', self.$panel);

            this.$panel.on('shown.bs.tab', function () {
              self.$panel.find(".tab-pane.active").asScrollable('update');
            });
          },
          beforeShow: function beforeShow() {
            if (!$this.hasClass('active')) {
              $this.addClass('active');
            }
          },
          afterHide: function afterHide() {
            if ($this.hasClass('active')) {
              $this.removeClass('active');
            }
          }
        });

        if ($this.hasClass('active')) {
          $.slidePanel.hide();
        } else {
          var url = $this.data('url');
          if (!url) {
            url = $this.attr('href');
            url = url && url.replace(/.*(?=#[^\s]*$)/, '');
          }

          $.slidePanel.show({
            url: url
          }, options);
        }
      });

      $(document).on('click', '[data-toggle="show-chat"]', function () {
        $('#conversation').addClass('active');
      });

      $(document).on('click', '[data-toggle="close-chat"]', function () {
        $('#conversation').removeClass('active');
      });
    }
  };
})(window, document, jQuery);

/***/ }),
/* 13 */
/***/ (function(module, exports) {

/*!
 * remark (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
(function (window, document, $) {
  'use strict';

  var $body = $(document.body);

  // configs setup
  // =============
  $.configs.set('site', {
    fontFamily: "Noto Sans, sans-serif",
    primaryColor: "blue",
    assets: "../assets"
  });

  window.Site = $.site.extend({
    run: function run(next) {
      // polyfill
      this.polyfillIEWidth();

      // Menubar setup
      // =============
      if (typeof $.site.menu !== 'undefined') {
        $.site.menu.init();
      }

      if (typeof $.site.menubar !== 'undefined') {
        $(".site-menubar").on('changing.site.menubar', function () {
          $('[data-toggle="menubar"]').each(function () {
            var $this = $(this);
            var $hamburger = $(this).find('.hamburger');

            function toggle($el) {
              $el.toggleClass('hided', !$.site.menubar.opened);
              $el.toggleClass('unfolded', !$.site.menubar.folded);
            }
            if ($hamburger.length > 0) {
              toggle($hamburger);
            } else {
              toggle($this);
            }
          });

          $.site.menu.refresh();
        });

        $(document).on('click', '[data-toggle="collapse"]', function (e) {
          var $trigger = $(e.target);
          if (!$trigger.is('[data-toggle="collapse"]')) {
            $trigger = $trigger.parents('[data-toggle="collapse"]');
          }
          var href;
          var target = $trigger.attr('data-target') || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '');
          var $target = $(target);
          if ($target.hasClass('navbar-search-overlap')) {
            $target.find('input').focus();

            e.preventDefault();
          } else if ($target.attr('id') === 'site-navbar-collapse') {
            var isOpen = !$trigger.hasClass('collapsed');
            $body.addClass('site-navbar-collapsing');

            $body.toggleClass('site-navbar-collapse-show', isOpen);

            setTimeout(function () {
              $body.removeClass('site-navbar-collapsing');
            }, 350);

            if (isOpen) {
              $.site.menubar.scrollable.update();
            }
          }
        });

        $(document).on('click', '[data-toggle="menubar"]', function () {
          $.site.menubar.toggle();

          return false;
        });

        $.site.menubar.init();

        Breakpoints.on('change', function () {
          $.site.menubar.change();
        });
      }

      // Gridmenu setup
      // ==============
      if (typeof $.site.gridmenu !== 'undefined') {
        $.site.gridmenu.init();
      }

      // Sidebar setup
      // =============
      if (typeof $.site.sidebar !== 'undefined') {
        $.site.sidebar.init();
      }

      // Tooltip setup
      // =============
      $(document).tooltip({
        selector: '[data-tooltip=true]',
        container: 'body'
      });

      $('[data-toggle="tooltip"]').tooltip();
      $('[data-toggle="popover"]').popover();

      // Fullscreen
      // ==========
      if (typeof screenfull !== 'undefined') {
        $(document).on('click', '[data-toggle="fullscreen"]', function () {
          if (screenfull.enabled) {
            screenfull.toggle();
          }

          return false;
        });

        if (screenfull.enabled) {
          document.addEventListener(screenfull.raw.fullscreenchange, function () {
            $('[data-toggle="fullscreen"]').toggleClass('active', screenfull.isFullscreen);
          });
        }
      }

      // Dropdown menu setup
      // ===================
      $body.on('click', '.dropdown-menu-media', function (e) {
        e.stopPropagation();
      });

      // Page Animate setup
      // ==================
      if (typeof $.animsition !== 'undefined') {
        this.loadAnimate(function () {
          $('.animsition').css({
            "animation-duration": '0s'
          });
          next();
        });
      } else {
        next();
      }

      // Mega navbar setup
      // =================
      $(document).on('click', '.navbar-mega .dropdown-menu', function (e) {
        e.stopPropagation();
      });

      $(document).on('show.bs.dropdown', function (e) {
        var $target = $(e.target);
        var $trigger = e.relatedTarget ? $(e.relatedTarget) : $target.children('[data-toggle="dropdown"]');

        var animation = $trigger.data('animation');
        if (animation) {
          var $menu = $target.children('.dropdown-menu');
          $menu.addClass('animation-' + animation);

          $menu.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $menu.removeClass('animation-' + animation);
          });
        }
      });

      $(document).on('shown.bs.dropdown', function (e) {
        var $target = $(e.target);
        var $menu = $target.find('.dropdown-menu-media > .list-group');

        if ($menu.length > 0) {
          var api = $menu.data('asScrollable');
          if (api) {
            api.update();
          } else {
            var defaults = $.components.getDefaults("scrollable");
            $menu.asScrollable(defaults);
          }
        }
      });

      // Page Aside Scrollable
      // =====================

      var pageAsideScroll = $('[data-plugin="pageAsideScroll"]');

      if (pageAsideScroll.length > 0) {
        pageAsideScroll.asScrollable({
          namespace: "scrollable",
          contentSelector: "> [data-role='content']",
          containerSelector: "> [data-role='container']"
        });

        var pageAside = $(".page-aside");
        var scrollable = pageAsideScroll.data('asScrollable');

        if (scrollable) {
          if ($body.is('.page-aside-fixed') || $body.is('.page-aside-scroll')) {
            $(".page-aside").on("transitionend", function () {
              scrollable.update();
            });
          }

          Breakpoints.on('change', function () {
            var current = Breakpoints.current().name;

            if (!$body.is('.page-aside-fixed') && !$body.is('.page-aside-scroll')) {
              if (current === 'xs') {
                scrollable.enable();
                pageAside.on("transitionend", function () {
                  scrollable.update();
                });
              } else {
                pageAside.off("transitionend");
                scrollable.disable();
              }
            }
          });

          $(document).on('click.pageAsideScroll', '.page-aside-switch', function () {
            var isOpen = pageAside.hasClass('open');

            if (isOpen) {
              pageAside.removeClass('open');
            } else {
              scrollable.update();
              pageAside.addClass('open');
            }
          });

          $(document).on('click.pageAsideScroll', '[data-toggle="collapse"]', function (e) {
            var $trigger = $(e.target);
            if (!$trigger.is('[data-toggle="collapse"]')) {
              $trigger = $trigger.parents('[data-toggle="collapse"]');
            }
            var href;
            var target = $trigger.attr('data-target') || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '');
            var $target = $(target);

            if ($target.attr('id') === 'site-navbar-collapse') {
              scrollable.update();
            }
          });
        }
      }

      // Init Loaded Components
      // ======================
      $.components.init();

      this.startTour();
    },

    polyfillIEWidth: function polyfillIEWidth() {
      if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement('style');
        msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'));
        document.querySelector('head').appendChild(msViewportStyle);
      }
    },

    loadAnimate: function loadAnimate(callback) {
      return $.components.call("animsition", document, callback);
    },

    startTour: function startTour(flag) {
      if (typeof this.tour === 'undefined') {
        if (typeof introJs === 'undefined') {
          return;
        }

        var tourOptions = $.configs.get('tour'),
            self = this;
        flag = $('body').css('overflow');
        this.tour = introJs();

        this.tour.onbeforechange(function () {
          $('body').css('overflow', 'hidden');
        });

        this.tour.oncomplete(function () {
          $('body').css('overflow', flag);
        });

        this.tour.onexit(function () {
          $('body').css('overflow', flag);
        });

        this.tour.setOptions(tourOptions);
        $('.site-tour-trigger').on('click', function () {
          self.tour.start();
        });
      }
      // if (window.localStorage && window.localStorage.getItem('startTour') && (flag !== true)) {
      //   return;
      // } else {
      //   this.tour.start();
      //   window.localStorage.setItem('startTour', true);
      // }
    }
  });
})(window, document, jQuery);

/***/ }),
/* 14 */
/***/ (function(module, exports) {

/*!
 * remark (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
$.components.register("scrollable", {
  mode: "init",
  defaults: {
    namespace: "scrollable",
    contentSelector: "> [data-role='content']",
    containerSelector: "> [data-role='container']"
  },
  init: function init(context) {
    if (!$.fn.asScrollable) return;
    var defaults = $.components.getDefaults("scrollable");

    $('[data-plugin="scrollable"]', context).each(function () {
      var options = $.extend({}, defaults, $(this).data());

      $(this).asScrollable(options);
    });
  }
});

/***/ }),
/* 15 */
/***/ (function(module, exports) {

/*!
 * remark (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
$.components.register("slidePanel", {
  mode: "manual",
  defaults: {
    closeSelector: '.slidePanel-close',
    mouseDragHandler: '.slidePanel-handler',
    loading: {
      template: function template(options) {
        return '<div class="' + options.classes.loading + '">' + '<div class="loader loader-default"></div>' + '</div>';
      },
      showCallback: function showCallback(options) {
        this.$el.addClass(options.classes.loading + '-show');
      },
      hideCallback: function hideCallback(options) {
        this.$el.removeClass(options.classes.loading + '-show');
      }
    }
  }
});

/***/ }),
/* 16 */
/***/ (function(module, exports) {

/*!
 * remark (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
$.components.register("switchery", {
  mode: "init",
  defaults: {
    color: $.colors("primary", 600)
  },
  init: function init(context) {
    if (typeof Switchery === "undefined") return;

    var defaults = $.components.getDefaults("switchery");

    $('[data-plugin="switchery"]', context).each(function () {
      var options = $.extend({}, defaults, $(this).data());

      new Switchery(this, options);
    });
  }
});

/***/ }),
/* 17 */
/***/ (function(module, exports) {

/*!
 * remark (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
(function (window, document, $) {
  "use strict";

  $.configs.colors = {
    "red": {
      "100": "#ffeaea",
      "200": "#fad3d3",
      "300": "#fab4b4",
      "400": "#fa9898",
      "500": "#fa7a7a",
      "600": "#f96868",
      "700": "#e9595b",
      "800": "#d6494b"
    },
    "pink": {
      "100": "#fce4ec",
      "200": "#ffccde",
      "300": "#fba9c6",
      "400": "#fb8db4",
      "500": "#f978a6",
      "600": "#f96197",
      "700": "#f44c87",
      "800": "#e53b75"
    },
    "purple": {
      "100": "#f6f2ff",
      "200": "#e3dbf4",
      "300": "#d2c5ec",
      "400": "#bba7e4",
      "500": "#a58add",
      "600": "#926dde",
      "700": "#7c51d1",
      "800": "#6d45bc"
    },
    "indigo": {
      "100": "#edeff9",
      "200": "#dadef5",
      "300": "#bcc5f4",
      "400": "#9daaf3",
      "500": "#8897ec",
      "600": "#677ae4",
      "700": "#5166d6",
      "800": "#465bd4"
    },
    "blue": {
      "100": "#e8f1f8",
      "200": "#d5e4f1",
      "300": "#bcd8f1",
      "400": "#a2caee",
      "500": "#89bceb",
      "600": "#62a8ea",
      "700": "#4e97d9",
      "800": "#3583ca"
    },
    "cyan": {
      "100": "#ecf9fa",
      "200": "#d3eff2",
      "300": "#baeaef",
      "400": "#9ae1e9",
      "500": "#77d6e1",
      "600": "#57c7d4",
      "700": "#47b8c6",
      "800": "#37a9b7"
    },
    "teal": {
      "100": "#ecfdfc",
      "200": "#cdf4f1",
      "300": "#99e1da",
      "400": "#79d1c9",
      "500": "#56bfb5",
      "600": "#3aa99e",
      "700": "#269b8f",
      "800": "#178d81"
    },
    "green": {
      "100": "#e7faf2",
      "200": "#bfedd8",
      "300": "#9fe5c5",
      "400": "#7dd3ae",
      "500": "#5cd29d",
      "600": "#46be8a",
      "700": "#36ab7a",
      "800": "#279566"
    },
    "light-green": {
      "100": "#f1f7ea",
      "200": "#e0ecd1",
      "300": "#cadfb1",
      "400": "#bad896",
      "500": "#acd57c",
      "600": "#9ece67",
      "700": "#83b944",
      "800": "#70a532"
    },
    "yellow": {
      "100": "#fffae7",
      "200": "#f9eec1",
      "300": "#f6e7a9",
      "400": "#f8e59b",
      "500": "#f7e083",
      "600": "#f7da64",
      "700": "#f9cd48",
      "800": "#fbc02d"
    },
    "orange": {
      "100": "#fff3e6",
      "200": "#ffddb9",
      "300": "#fbce9d",
      "400": "#f6be80",
      "500": "#f4b066",
      "600": "#f2a654",
      "700": "#ec9940",
      "800": "#e98f2e"
    },
    "brown": {
      "100": "#fae6df",
      "200": "#e2bdaf",
      "300": "#d3aa9c",
      "400": "#b98e7e",
      "500": "#a17768",
      "600": "#8d6658",
      "700": "#7d5b4f",
      "800": "#715146"
    },
    "grey": {
      "100": "#fafafa",
      "200": "#eeeeee",
      "300": "#e0e0e0",
      "400": "#bdbdbd",
      "500": "#9e9e9e",
      "600": "#757575",
      "700": "#616161",
      "800": "#424242"
    },
    "blue-grey": {
      "100": "#f3f7f9",
      "200": "#e4eaec",
      "300": "#ccd5db",
      "400": "#a3afb7",
      "500": "#76838f",
      "600": "#526069",
      "700": "#37474f",
      "800": "#263238"
    }
  };
})(window, document, $);

/***/ }),
/* 18 */
/***/ (function(module, exports) {

/*!
 * remark (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
(function (window, document, $) {
  'use strict';

  var $doc = $(document);

  // Site
  // ====
  $.site = $.site || {};

  $.extend($.site, {
    _queue: {
      prepare: [],
      run: [],
      complete: []
    },

    run: function run() {
      var self = this;

      this.dequeue('prepare', function () {
        self.trigger('before.run', self);
      });

      this.dequeue('run', function () {
        self.dequeue('complete', function () {
          self.trigger('after.run', self);
        });
      });
    },

    dequeue: function dequeue(name, done) {
      var self = this,
          queue = this.getQueue(name),
          fn = queue.shift(),
          next = function next() {
        self.dequeue(name, done);
      };

      if (fn) {
        fn.call(this, next);
      } else if ($.isFunction(done)) {
        done.call(this);
      }
    },

    getQueue: function getQueue(name) {
      if (!$.isArray(this._queue[name])) {
        this._queue[name] = [];
      }

      return this._queue[name];
    },

    extend: function extend(obj) {
      $.each(this._queue, function (name, queue) {
        if ($.isFunction(obj[name])) {
          queue.push(obj[name]);

          delete obj[name];
        }
      });

      $.extend(this, obj);

      return this;
    },

    trigger: function trigger(name, data, $el) {
      if (typeof name === 'undefined') return;
      if (typeof $el === 'undefined') $el = $doc;

      $el.trigger(name + '.site', data);
    },

    throttle: function throttle(func, wait) {
      var _now = Date.now || function () {
        return new Date().getTime();
      };
      var context, args, result;
      var timeout = null;
      var previous = 0;

      var later = function later() {
        previous = _now();
        timeout = null;
        result = func.apply(context, args);
        context = args = null;
      };

      return function () {
        var now = _now();
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
          clearTimeout(timeout);
          timeout = null;
          previous = now;
          result = func.apply(context, args);
          context = args = null;
        } else if (!timeout) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    },

    resize: function resize() {
      if (document.createEvent) {
        var ev = document.createEvent('Event');
        ev.initEvent('resize', true, true);
        window.dispatchEvent(ev);
      } else {
        element = document.documentElement;
        var event = document.createEventObject();
        element.fireEvent("onresize", event);
      }
    }
  });

  // Configs
  // =======
  $.configs = $.configs || {};

  $.extend($.configs, {
    data: {},
    get: function get(name) {
      var callback = function callback(data, name) {
        return data[name];
      };

      var data = this.data;

      for (var i = 0; i < arguments.length; i++) {
        name = arguments[i];

        data = callback(data, name);
      }

      return data;
    },

    set: function set(name, value) {
      this.data[name] = value;
    },

    extend: function extend(name, options) {
      var value = this.get(name);
      return $.extend(true, value, options);
    }
  });

  // Colors
  // ======
  $.colors = function (name, level) {
    if (name === 'primary') {
      name = $.configs.get('site', 'primaryColor');
      if (!name) {
        name = 'red';
      }
    }

    if (typeof $.configs.colors === 'undefined') {
      return null;
    }

    if (typeof $.configs.colors[name] !== 'undefined') {
      if (level && typeof $.configs.colors[name][level] !== 'undefined') {
        return $.configs.colors[name][level];
      }

      if (typeof level === 'undefined') {
        return $.configs.colors[name];
      }
    }

    return null;
  };

  // Components
  // ==========
  $.components = $.components || {};

  $.extend($.components, {
    _components: {},

    register: function register(name, obj) {
      this._components[name] = obj;
    },

    init: function init(name, context, args) {
      var self = this;

      if (typeof name === 'undefined') {
        $.each(this._components, function (name) {
          self.init(name);
        });
      } else {
        context = context || document;
        args = args || [];

        var obj = this.get(name);

        if (obj) {
          switch (obj.mode) {
            case 'default':
              return this._initDefault(name, context);
            case 'init':
              return this._initComponent(name, obj, context, args);
            case 'api':
              return this._initApi(name, obj, args);
            default:
              this._initApi(name, obj, context, args);
              this._initComponent(name, obj, context, args);
              return;
          }
        }
      }
    },

    /* init alternative, but only or init mode */
    call: function call(name, context) {
      var args = Array.prototype.slice.call(arguments, 2);
      var obj = this.get(name);

      context = context || document;

      return this._initComponent(name, obj, context, args);
    },

    _initDefault: function _initDefault(name, context) {
      if (!$.fn[name]) return;

      var defaults = this.getDefaults(name);

      $('[data-plugin=' + name + ']', context).each(function () {
        var $this = $(this),
            options = $.extend(true, {}, defaults, $this.data());

        $this[name](options);
      });
    },

    _initComponent: function _initComponent(name, obj, context, args) {
      if ($.isFunction(obj.init)) {
        obj.init.apply(obj, [context].concat(args));
      }
    },

    _initApi: function _initApi(name, obj, args) {
      if (typeof obj.apiCalled === 'undefined' && $.isFunction(obj.api)) {
        obj.api.apply(obj, args);

        obj.apiCalled = true;
      }
    },

    getDefaults: function getDefaults(name) {
      var component = this.get(name);

      if (component && typeof component.defaults !== "undefined") {
        return component.defaults;
      } else {
        return {};
      }
    },

    get: function get(name, property) {
      if (typeof this._components[name] !== "undefined") {
        if (typeof property !== "undefined") {
          return this._components[name][property];
        } else {
          return this._components[name];
        }
      } else {
        console.warn('component:' + component + ' script is not loaded.');

        return undefined;
      }
    }
  });
})(window, document, jQuery);

/***/ }),
/* 19 */
/***/ (function(module, exports) {

/*! jQuery asHoverScroll - v0.2.3 - 2015-12-17
* https://github.com/amazingSurge/jquery-asHoverScroll
* Copyright (c) 2015 amazingSurge; Licensed GPL */
(function ($) {
    "use strict";

    var pluginName = 'asHoverScroll';
    var instanceId = 0;

    var Plugin = $[pluginName] = function (element, options) {
        this.element = element;
        this.$element = $(element);

        this.options = $.extend({}, Plugin.defaults, options, this.$element.data());
        this.$list = $(this.options.list, this.$element);

        this.classes = {
            disabled: this.options.namespace + '-disabled'
        };

        if (this.options.direction === 'vertical') {
            this.attributes = {
                page: 'pageY',
                axis: 'Y',
                position: 'top',
                length: 'height',
                offset: 'offsetTop',
                client: 'clientY',
                clientLength: 'clientHeight'
            };
        } else if (this.options.direction === 'horizontal') {
            this.attributes = {
                page: 'pageX',
                axis: 'X',
                position: 'left',
                length: 'width',
                offset: 'offsetLeft',
                client: 'clientX',
                clientLength: 'clientWidth'
            };
        }

        // Current state information.
        this._states = {};

        // Current state information for the touch operation.
        this._scroll = {
            time: null,
            pointer: null
        };

        this.instanceId = ++instanceId;

        this._trigger('init');
        this.init();
    };

    Plugin.defaults = {
        namespace: pluginName,
        list: '> ul',
        item: '> li',
        exception: null,

        direction: 'vertical',
        fixed: false,

        mouseMove: true,
        touchScroll: true,
        pointerScroll: true,

        useCssTransforms: true,
        useCssTransforms3d: true,
        boundary: 10,

        throttle: 20,

        onEnter: function onEnter() {
            $(this).siblings().removeClass('is-active');
            $(this).addClass('is-active');
        },
        onLeave: function onLeave() {
            $(this).removeClass('is-active');
        }
    };

    /**
     * Css features detect
     **/
    var support = {};
    Plugin.support = support;
    (function (support) {
        /**
         * Borrowed from Owl carousel
         **/
        var style = $('<support>').get(0).style,
            prefixes = ['webkit', 'Moz', 'O', 'ms'],
            events = {
            transition: {
                end: {
                    WebkitTransition: 'webkitTransitionEnd',
                    MozTransition: 'transitionend',
                    OTransition: 'oTransitionEnd',
                    transition: 'transitionend'
                }
            },
            animation: {
                end: {
                    WebkitAnimation: 'webkitAnimationEnd',
                    MozAnimation: 'animationend',
                    OAnimation: 'oAnimationEnd',
                    animation: 'animationend'
                }
            }
        },
            tests = {
            csstransforms: function csstransforms() {
                return !!test('transform');
            },
            csstransforms3d: function csstransforms3d() {
                return !!test('perspective');
            },
            csstransitions: function csstransitions() {
                return !!test('transition');
            },
            cssanimations: function cssanimations() {
                return !!test('animation');
            }
        };

        function test(property, prefixed) {
            var result = false,
                upper = property.charAt(0).toUpperCase() + property.slice(1);
            $.each((property + ' ' + prefixes.join(upper + ' ') + upper).split(' '), function (i, property) {
                if (style[property] !== undefined) {
                    result = prefixed ? property : true;
                    return false;
                }
            });

            return result;
        }

        function prefixed(property) {
            return test(property, true);
        }

        if (tests.csstransitions()) {
            /* jshint -W053 */
            support.transition = new String(prefixed('transition'));
            support.transition.end = events.transition.end[support.transition];
        }

        if (tests.cssanimations()) {
            /* jshint -W053 */
            support.animation = new String(prefixed('animation'));
            support.animation.end = events.animation.end[support.animation];
        }

        if (tests.csstransforms()) {
            /* jshint -W053 */
            support.transform = new String(prefixed('transform'));
            support.transform3d = tests.csstransforms3d();
        }

        if ('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch) {
            support.touch = true;
        } else {
            support.touch = false;
        }

        if (window.PointerEvent || window.MSPointerEvent) {
            support.pointer = true;
        } else {
            support.pointer = false;
        }

        support.convertMatrixToArray = function (value) {
            if (value && value.substr(0, 6) == "matrix") {
                return value.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, '').split(/, +/);
            }
            return false;
        };

        support.prefixPointerEvent = function (pointerEvent) {
            return window.MSPointerEvent ? 'MSPointer' + pointerEvent.charAt(9).toUpperCase() + pointerEvent.substr(10) : pointerEvent;
        };
    })(support);

    Plugin.prototype = {
        constructor: Plugin,
        init: function init() {
            this.initPosition();

            // init length data
            this.updateLength();

            this.bindEvents();
        },

        bindEvents: function bindEvents() {
            var self = this,
                enterEvents = ['enter'],
                leaveEvents = [];

            if (this.options.mouseMove) {
                this.$element.on(this.eventName('mousemove'), $.proxy(this.onMove, this));
                enterEvents.push('mouseenter');
                leaveEvents.push('mouseleave');
            }

            if (this.options.touchScroll && support.touch) {
                this.$element.on(this.eventName('touchstart'), $.proxy(this.onScrollStart, this));
                this.$element.on(this.eventName('touchcancel'), $.proxy(this.onScrollEnd, this));
            }

            if (this.options.pointerScroll && support.pointer) {
                this.$element.on(this.eventName(support.prefixPointerEvent('pointerdown')), $.proxy(this.onScrollStart, this));
                this.$element.on(this.eventName(support.prefixPointerEvent('pointercancel')), $.proxy(this.onScrollEnd, this));
            }

            this.$list.on(this.eventName(enterEvents.join(' ')), this.options.item, function () {
                if (!self.is('scrolling')) {
                    self.options.onEnter.call(this);
                }
            });
            this.$list.on(this.eventName(leaveEvents.join(' ')), this.options.item, function () {
                if (!self.is('scrolling')) {
                    self.options.onLeave.call(this);
                }
            });

            $(window).on(this.eventNameWithId('orientationchange'), function () {
                self.update.call(self);
            });
            $(window).on(this.eventNameWithId('resize'), this.throttle(function () {
                self.update.call(self);
            }, this.options.throttle));
        },

        unbindEvents: function unbindEvents() {
            this.$element.off(this.eventName());
            this.$list.off(this.eventName());
            $(window).off(this.eventNameWithId());
        },

        /**
         * Handles `touchstart` and `mousedown` events.
         */
        onScrollStart: function onScrollStart(event) {
            var self = this;

            if (event.which === 3) {
                return;
            }

            if ($(event.target).closest(this.options.exception).length > 0) {
                return;
            }

            this._scroll.time = new Date().getTime();
            this._scroll.pointer = this.pointer(event);
            this._scroll.start = this.getPosition();
            this._scroll.moved = false;

            var callback = function callback() {
                self.enter('scrolling');
                self._trigger('scroll');
            };

            if (this.options.touchScroll && support.touch) {
                $(document).on(self.eventName('touchend'), $.proxy(this.onScrollEnd, this));

                $(document).one(self.eventName('touchmove'), $.proxy(function () {
                    $(document).on(self.eventName('touchmove'), $.proxy(this.onScrollMove, this));

                    callback();
                }, this));
            }

            if (this.options.pointerScroll && support.pointer) {
                $(document).on(self.eventName(support.prefixPointerEvent('pointerup')), $.proxy(this.onScrollEnd, this));

                $(document).one(self.eventName(support.prefixPointerEvent('pointermove')), $.proxy(function () {
                    $(document).on(self.eventName(support.prefixPointerEvent('pointermove')), $.proxy(this.onScrollMove, this));

                    callback();
                }, this));
            }

            $(document).on(self.eventName('blur'), $.proxy(this.onScrollEnd, this));

            event.preventDefault();
        },

        /**
         * Handles the `touchmove` and `mousemove` events.
         */
        onScrollMove: function onScrollMove(event) {
            this._scroll.updated = this.pointer(event);
            var distance = this.distance(this._scroll.pointer, this._scroll.updated);

            if (Math.abs(this._scroll.pointer.x - this._scroll.updated.x) > 10 || Math.abs(this._scroll.pointer.y - this._scroll.updated.y) > 10) {
                this._scroll.moved = true;
            }

            if (!this.is('scrolling')) {
                return;
            }

            event.preventDefault();
            var postion = this._scroll.start + distance;

            if (this.canScroll()) {
                if (postion > 0) {
                    postion = 0;
                } else if (postion < this.containerLength - this.listLength) {
                    postion = this.containerLength - this.listLength;
                }
                this.updatePosition(postion);
            }
        },

        /**
         * Handles the `touchend` and `mouseup` events.
         */
        onScrollEnd: function onScrollEnd(event) {
            var self = this;
            if (this.options.touchScroll && support.touch) {
                $(document).off(this.eventName('touchmove touchend'));
            }

            if (this.options.pointerScroll && support.pointer) {
                $(document).off(this.eventName(support.prefixPointerEvent('pointerup')));
            }

            $(document).off(this.eventName('blur'));

            if (!this._scroll.moved) {
                $(event.target).trigger('tap');
            }

            if (!this.is('scrolling')) {
                return;
            }

            // touch will trigger mousemove event after 300ms delay. So we need avoid it
            setTimeout(function () {
                self.leave('scrolling');
                self._trigger('scrolled');
            }, 500);
        },

        /**
         * Gets unified pointer coordinates from event.
         * @returns {Object} - Contains `x` and `y` coordinates of current pointer position.
         */
        pointer: function pointer(event) {
            var result = {
                x: null,
                y: null
            };

            event = this.getEvent(event);

            if (event.pageX && !this.options.fixed) {
                result.x = event.pageX;
                result.y = event.pageY;
            } else {
                result.x = event.clientX;
                result.y = event.clientY;
            }

            return result;
        },

        getEvent: function getEvent(event) {
            event = event.originalEvent || event || window.event;

            event = event.touches && event.touches.length ? event.touches[0] : event.changedTouches && event.changedTouches.length ? event.changedTouches[0] : event;

            return event;
        },

        /**
         * Gets the distance of two pointer.
         */
        distance: function distance(first, second) {
            if (this.options.direction === 'vertical') {
                return second.y - first.y;
            } else {
                return second.x - first.x;
            }
        },

        onMove: function onMove(event) {
            event = this.getEvent(event);

            if (this.is('scrolling')) {
                return;
            }

            if (this.isMatchScroll(event)) {
                var pointer, distance, offset;
                if (event[this.attributes.page] && !this.options.fixed) {
                    pointer = event[this.attributes.page];
                } else {
                    pointer = event[this.attributes.client];
                }

                offset = pointer - this.element[this.attributes.offset];

                if (offset < this.options.boundary) {
                    distance = 0;
                } else {
                    distance = (offset - this.options.boundary) * this.multiplier;

                    if (distance > this.listLength - this.containerLength) {
                        distance = this.listLength - this.containerLength;
                    }
                }

                this.updatePosition(-distance);
            }
        },

        isMatchScroll: function isMatchScroll(event) {
            if (!this.is('disabled') && this.canScroll()) {
                if (this.options.exception) {
                    if ($(event.target).closest(this.options.exception).length === 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return true;
            }
            return false;
        },

        canScroll: function canScroll() {
            return this.listLength > this.containerLength;
        },

        getContainerLength: function getContainerLength() {
            return this.element[this.attributes.clientLength];
        },

        getListhLength: function getListhLength() {
            return this.$list[0][this.attributes.clientLength];
        },

        updateLength: function updateLength() {
            this.containerLength = this.getContainerLength();
            this.listLength = this.getListhLength();
            this.multiplier = (this.listLength - this.containerLength) / (this.containerLength - 2 * this.options.boundary);
        },

        initPosition: function initPosition() {
            var style = this.makePositionStyle(0);
            this.$list.css(style);
        },

        getPosition: function getPosition() {
            var value;

            if (this.options.useCssTransforms && support.transform) {
                if (this.options.useCssTransforms3d && support.transform3d) {
                    value = support.convertMatrixToArray(this.$list.css(support.transform));
                } else {
                    value = support.convertMatrixToArray(this.$list.css(support.transform));
                }
                if (!value) {
                    return 0;
                }

                if (this.attributes.axis === 'X') {
                    value = value[12] || value[4];
                } else {
                    value = value[13] || value[5];
                }
            } else {
                value = this.$list.css(this.attributes.position);
            }

            return parseFloat(value.replace('px', ''));
        },

        makePositionStyle: function makePositionStyle(value) {
            var property,
                x = '0px',
                y = '0px';

            if (this.options.useCssTransforms && support.transform) {
                if (this.attributes.axis === 'X') {
                    x = value + 'px';
                } else {
                    y = value + 'px';
                }

                property = support.transform.toString();

                if (this.options.useCssTransforms3d && support.transform3d) {
                    value = "translate3d(" + x + "," + y + ",0px)";
                } else {
                    value = "translate(" + x + "," + y + ")";
                }
            } else {
                property = this.attributes.position;
            }
            var temp = {};
            temp[property] = value;

            return temp;
        },

        updatePosition: function updatePosition(value) {
            var style = this.makePositionStyle(value);
            this.$list.css(style);
        },

        update: function update() {
            if (!this.is('disabled')) {
                this.updateLength();

                if (!this.canScroll()) {
                    this.initPosition();
                }
            }
        },

        eventName: function eventName(events) {
            if (typeof events !== 'string' || events === '') {
                return '.' + pluginName;
            }
            events = events.split(' ');

            var length = events.length;
            for (var i = 0; i < length; i++) {
                events[i] = events[i] + '.' + pluginName;
            }
            return events.join(' ');
        },

        eventNameWithId: function eventNameWithId(events) {
            if (typeof events !== 'string' || events === '') {
                return this.options.namespace + '-' + this.instanceId;
            }

            events = events.split(' ');
            var length = events.length;
            for (var i = 0; i < length; i++) {
                events[i] = events[i] + '.' + this.options.namespace + '-' + this.instanceId;
            }
            return events.join(' ');
        },

        _trigger: function _trigger(eventType) {
            var method_arguments = Array.prototype.slice.call(arguments, 1),
                data = [this].concat(method_arguments);

            // event
            this.$element.trigger(pluginName + '::' + eventType, data);

            // callback
            eventType = eventType.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toUpperCase() + word.substring(1);
            });
            var onFunction = 'on' + eventType;
            if (typeof this.options[onFunction] === 'function') {
                this.options[onFunction].apply(this, method_arguments);
            }
        },

        /**
         * Checks whether the carousel is in a specific state or not.
         */
        is: function is(state) {
            return this._states[state] && this._states[state] > 0;
        },

        /**
         * Enters a state.
         */
        enter: function enter(state) {
            if (this._states[state] === undefined) {
                this._states[state] = 0;
            }

            this._states[state]++;
        },

        /**
         * Leaves a state.
         */
        leave: function leave(state) {
            this._states[state]--;
        },

        /**
         * _throttle
         * @description Borrowed from Underscore.js
         */
        throttle: function throttle(func, wait) {
            var _now = Date.now || function () {
                return new Date().getTime();
            };
            var context, args, result;
            var timeout = null;
            var previous = 0;
            var later = function later() {
                previous = _now();
                timeout = null;
                result = func.apply(context, args);
                context = args = null;
            };
            return function () {
                var now = _now();
                var remaining = wait - (now - previous);
                context = this;
                args = arguments;
                if (remaining <= 0) {
                    clearTimeout(timeout);
                    timeout = null;
                    previous = now;
                    result = func.apply(context, args);
                    context = args = null;
                } else if (!timeout) {
                    timeout = setTimeout(later, remaining);
                }
                return result;
            };
        },

        enable: function enable() {
            if (this.is('disabled')) {
                this.leave('disabled');

                this.$element.removeClass(this.classes.disabled);

                this.bindEvents();
            }
        },

        disable: function disable() {
            if (!this.is('disabled')) {
                this.enter('disabled');

                this.initPosition();
                this.$element.addClass(this.classes.disabled);

                this.unbindEvents();
            }
        },

        destory: function destory() {
            this.$element.removeClass(this.classes.disabled);
            this.unbindEvents();
            this.$element.data(pluginName, null);
            this._trigger('destory');
        }
    };

    $.fn[pluginName] = function (options) {
        if (typeof options === 'string') {
            var method = options;
            var method_arguments = Array.prototype.slice.call(arguments, 1);

            if (/^\_/.test(method)) {
                return false;
            } else if (/^(get)/.test(method)) {
                var api = this.first().data(pluginName);
                if (api && typeof api[method] === 'function') {
                    return api[method].apply(api, method_arguments);
                }
            } else {
                return this.each(function () {
                    var api = $.data(this, pluginName);
                    if (api && typeof api[method] === 'function') {
                        api[method].apply(api, method_arguments);
                    }
                });
            }
        } else {
            return this.each(function () {
                if (!$.data(this, pluginName)) {
                    $.data(this, pluginName, new Plugin(this, options));
                }
            });
        }
    };
})(jQuery);

/***/ }),
/* 20 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! jQuery asScroll - v0.1.1 - 2015-05-11
* https://github.com/amazingSurge/jquery-asScroll
* Copyright (c) 2015 amazingSurge; Licensed GPL */
(function (window, document, $, undefined) {
    'use strict';
    // Constructor
    //

    var instanceId = 0;
    var getTime = function getTime() {
        if (typeof window.performance !== 'undefined' && window.performance.now) {
            return window.performance.now();
        } else {
            return Date.now();
        }
    };

    var isPercentage = function isPercentage(n) {
        return typeof n === 'string' && n.indexOf('%') !== -1;
    };

    var convertPercentageToFloat = function convertPercentageToFloat(n) {
        return parseFloat(n.slice(0, -1) / 100, 10);
    };

    var requestAnimFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    }();

    var cancelAnimationFrame = function () {
        return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function (id) {
            window.clearTimeout(id);
        };
    }();

    var easingBezier = function easingBezier(mX1, mY1, mX2, mY2) {
        function a(aA1, aA2) {
            return 1.0 - 3.0 * aA2 + 3.0 * aA1;
        }

        function b(aA1, aA2) {
            return 3.0 * aA2 - 6.0 * aA1;
        }

        function c(aA1) {
            return 3.0 * aA1;
        }

        // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
        function calcBezier(aT, aA1, aA2) {
            return ((a(aA1, aA2) * aT + b(aA1, aA2)) * aT + c(aA1)) * aT;
        }

        // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
        function getSlope(aT, aA1, aA2) {
            return 3.0 * a(aA1, aA2) * aT * aT + 2.0 * b(aA1, aA2) * aT + c(aA1);
        }

        function getTForX(aX) {
            // Newton raphson iteration
            var aGuessT = aX;
            for (var i = 0; i < 4; ++i) {
                var currentSlope = getSlope(aGuessT, mX1, mX2);
                if (currentSlope === 0.0) {
                    return aGuessT;
                }
                var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
                aGuessT -= currentX / currentSlope;
            }
            return aGuessT;
        }

        if (mX1 === mY1 && mX2 === mY2) {
            return {
                css: 'linear',
                fn: function fn(aX) {
                    return aX;
                }
            };
        } else {
            return {
                css: 'cubic-bezier(' + mX1 + ',' + mY1 + ',' + mX2 + ',' + mY2 + ')',
                fn: function fn(aX) {
                    return calcBezier(getTForX(aX), mY1, mY2);
                }
            };
        }
    };

    var AsScroll = function AsScroll(element, options) {

        this.element = element;
        this.$element = $(element);
        this.options = $.extend(true, {}, AsScroll.defaults, options);

        if (this.options.containerSelector) {
            this.$container = $(this.options.containerSelector);
        } else {
            this.$container = this.$element.is(document.body) ? $(window) : this.$element.parent();
        }
        if (this.$container.length !== 1) {
            return;
        }

        this.namespace = this.options.namespace;
        this.attributes = {
            vertical: {
                axis: 'Y',
                overflow: 'overflow-y',

                scroll: 'scrollTop',
                scrollLength: 'scrollHeight',
                pageOffset: 'pageYOffset',

                ffPadding: 'padding-right',

                length: 'height',
                clientLength: 'clientHeight',
                offsetLength: 'offsetHeight',
                offset: 'top',

                crossOffset: 'left',
                crossLength: 'width',
                crossClientLength: 'clientWidth',
                crossOffsetLength: 'offsetWidth'
            },
            horizontal: {
                axis: 'X',
                overflow: 'overflow-x',

                scroll: 'scrollLeft',
                scrollLength: 'scrollWidth',
                pageOffset: 'pageXOffset',

                ffPadding: 'padding-bottom',

                length: 'width',
                clientLength: 'clientWidth',
                offsetLength: 'offsetWidth',
                offset: 'left',

                crossOffset: 'top',
                crossLength: 'height',
                crossClientLength: 'clientHeight',
                crossOffsetLength: 'offsetHeight'
            }
        };

        this.classes = {};
        this.easing = AsScroll.easing[this.options.easing] || AsScroll.easing.ease;
        this.duration = this.options.duration;

        this._frameId = null;
        this._states = {};
        this.instanceId = ++instanceId;

        this.vertical = false;
        this.horizontal = false;

        this.init();
    };

    $.extend(AsScroll.easing = {}, {
        'ease': easingBezier(0.25, 0.1, 0.25, 1.0),
        'linear': easingBezier(0.00, 0.0, 1.00, 1.0),
        'ease-in': easingBezier(0.42, 0.0, 1.00, 1.0),
        'ease-out': easingBezier(0.00, 0.0, 0.58, 1.0),
        'ease-in-out': easingBezier(0.42, 0.0, 0.58, 1.0)
    });

    AsScroll.prototype = {
        constructor: AsScroll,

        getActiveTarget: function getActiveTarget(direction) {
            if (!this[direction]) {
                return;
            }

            var offset = this.getOffset(direction),
                attributes = this.attributes[direction],
                activeTarget = null,
                containerLength = this.getContainerLength(direction);

            $.each(this.lists, function (target, obj) {
                var targetOffset = obj.offset[attributes.offset],
                    length = obj.$el[attributes.length]();

                if (targetOffset === offset) {
                    activeTarget = target;
                    return false;
                } else if (targetOffset > offset && targetOffset < offset + containerLength) {
                    activeTarget = target;
                    return false;
                } else if (targetOffset < offset && targetOffset + length > offset) {
                    activeTarget = target;
                    return true;
                } else if (targetOffset > offset + containerLength) {
                    return false;
                }
            });

            return activeTarget;
        },

        init: function init() {
            var self = this;

            this.$targets = this.$element.find('[data-scroll-target]');
            this.lists = {};

            if (this.getScrollLength('vertical') > 0) {
                this.vertical = true;
            }

            if (this.getScrollLength('horizontal') > 0) {
                this.horizontal = true;
            }

            this.$targets.each(function () {
                var $target = $(this);

                self.lists[$target.data('scrollTarget')] = {
                    $el: $target,
                    offset: $target.offset()
                };
            });

            this.bindEvents();
        },

        bindEvents: function bindEvents() {
            var self = this;

            $(window).on(this.eventNameWithId('resize'), function () {
                if ($(window).width() < self.options.mobile.width) {
                    self.duration = self.options.duration;
                    self.easing = AsScroll.easing[self.options.easing] || AsScroll.easing.ease;
                }
            });

            $(window).on(this.eventNameWithId('orientationchange'), function () {
                if ($(window).width() < self.options.mobile.width) {
                    self.duration = self.options.duration;
                    self.easing = AsScroll.easing[self.options.easing] || AsScroll.easing.ease;
                }
            });

            if (!this.horizontal && !this.vertical) {
                return;
            }

            this.$container.on(this.eventName('scroll'), function () {
                if (self.vertical) {
                    self.trigger(self.eventName('active'), ['vertical', self.getActiveTarget('vertical')]);
                }
                if (self.horizontal) {
                    self.trigger(self.eventName('active'), ['horizontal', self.getActiveTarget('horizontal')]);
                }
            });
        },

        eventName: function eventName(events) {
            if (typeof events !== 'string' || events === '') {
                return '.' + this.options.namespace;
            }

            events = events.split(' ');
            var length = events.length;
            for (var i = 0; i < length; i++) {
                events[i] = events[i] + '.' + this.options.namespace;
            }
            return events.join(' ');
        },

        eventNameWithId: function eventNameWithId(events) {
            if (typeof events !== 'string' || events === '') {
                return this.options.namespace + '-' + this.instanceId;
            }

            events = events.split(' ');
            var length = events.length;
            for (var i = 0; i < length; i++) {
                events[i] = events[i] + '.' + this.options.namespace + '-' + this.instanceId;
            }
            return events.join(' ');
        },
        trigger: function trigger(eventType) {
            var method_arguments = Array.prototype.slice.call(arguments, 1),
                data = [this].concat(method_arguments);

            // event
            this.$element.trigger('AsScroll::' + eventType, data);

            // callback
            eventType = eventType.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toUpperCase() + word.substring(1);
            });
            var onFunction = 'on' + eventType;

            if (typeof this.options[onFunction] === 'function') {
                this.options[onFunction].apply(this, method_arguments);
            }
        },

        /**
         * Checks whether the carousel is in a specific state or not.
         */
        is: function is(state) {
            return this._states[state] && this._states[state] > 0;
        },
        /**
         * Enters a state.
         */
        enter: function enter(state) {
            if (this._states[state] === undefined) {
                this._states[state] = 0;
            }

            this._states[state]++;
        },

        /**
         * Leaves a state.
         */
        leave: function leave(state) {
            this._states[state]--;
        },

        getOffset: function getOffset(direction) {
            var attributes = this.attributes[direction],
                element = this.$element[0];

            return element[attributes.pageOffset] || element[attributes.scroll];
        },

        getPercentOffset: function getPercentOffset(direction) {
            return this.getOffset(direction) / this.getScrollLength(direction);
        },

        getContainerLength: function getContainerLength(direction) {
            return this.$container[0] === window ? this.$container[this.attributes[direction].length]() : this.$container[0][this.attributes[direction].clientLength];
        },

        getScrollLength: function getScrollLength(direction) {
            var scrollLength = this.$element[0][this.attributes[direction].scrollLength];
            return scrollLength - this.getContainerLength(direction);
        },

        scrollToTarget: function scrollToTarget(direction, target, trigger, sync) {
            if (typeof this.lists[target] === 'undefined') {
                return;
            }
            target = this.lists[target];

            var attributes = this.attributes[direction],
                offset = target.offset[attributes.offset];

            this.scrollTo(direction, offset, trigger, sync);
        },

        scrollTo: function scrollTo(direction, value, trigger, sync) {
            var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

            if (type === "string") {
                if (isPercentage(value)) {
                    value = convertPercentageToFloat(value) * this.getScrollLength(direction);
                }

                value = parseFloat(value);
                type = "number";
            }

            if (type !== "number") {
                return;
            }
            this.move(direction, value, trigger, sync);
        },

        scrollBy: function scrollBy(direction, value, trigger, sync) {
            var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

            if (type === "string") {
                if (isPercentage(value)) {
                    value = convertPercentageToFloat(value) * this.getScrollLength(direction);
                }

                value = parseFloat(value);
                type = "number";
            }

            if (type !== "number") {
                return;
            }

            this.move(direction, this.getOffset(direction) + value, trigger, sync);
        },

        move: function move(direction, value, trigger, sync) {
            if (!this[direction] || typeof value !== "number") {
                return;
            }

            var self = this;

            this.enter('moving');

            if (value < 0) {
                value = 0;
            } else if (value > this.getScrollLength(direction)) {
                value = this.getScrollLength(direction);
            }

            var attributes = this.attributes[direction];

            var callback = function callback() {
                self.leave('moving');
            };

            if (sync) {

                this.$element[0][attributes.scroll] = value;

                if (trigger !== false) {
                    this.trigger('change', value / this.getScrollLength(direction));
                }
                callback();
            } else {
                self.enter('animating');
                var startTime = getTime();
                var start = self.getOffset(direction);
                var end = value;

                var run = function run(time) {
                    var percent = (time - startTime) / self.duration;

                    if (percent > 1) {
                        percent = 1;
                    }

                    percent = self.easing.fn(percent);

                    var current = parseFloat(start + percent * (end - start), 10);

                    self.$element[0][attributes.scroll] = current;

                    if (trigger !== false) {
                        self.trigger('change', value / self.getScrollLength(direction));
                    }

                    if (percent === 1) {
                        cancelAnimationFrame(self._frameId);
                        self._frameId = null;

                        self.leave('animating');
                        callback();
                    } else {
                        self._frameId = requestAnimFrame(run);
                    }
                };

                self._frameId = requestAnimFrame(run);
            }
        },
        scrollXto: function scrollXto(value, trigger, sync) {
            return this.scrollTo('horizontal', value, trigger, sync);
        },

        scrollYto: function scrollYto(value, trigger, sync) {
            return this.scrollTo('vertical', value, trigger, sync);
        },

        scrollXby: function scrollXby(value, trigger, sync) {
            return this.scrollBy('horizontal', value, trigger, sync);
        },

        scrollYby: function scrollYby(value, trigger, sync) {
            return this.scrollBy('vertical', value, trigger, sync);
        },

        scrollXToTarget: function scrollXToTarget(target, trigger, sync) {
            return this.scrollToTarget('horizontal', target, trigger, sync);
        },

        scrollYToTarget: function scrollYToTarget(target, trigger, sync) {
            return this.scrollToTarget('vertical', target, trigger, sync);
        }
    };

    AsScroll.defaults = {
        duration: 800,
        easing: 'ease',
        namespace: 'asScroll',
        offsetTop: 50,
        mobile: {
            width: 768,
            duration: 500,
            easing: 'ease'
        }
    };

    $.fn.asScroll = function (options) {
        if (typeof options === 'string') {
            var method = options;
            var method_arguments = Array.prototype.slice.call(arguments, 1);

            return this.each(function () {
                var api = $.data(this, 'asScroll');

                if (api && typeof api[method] === 'function') {
                    api[method].apply(api, method_arguments);
                }
            });
        } else {
            return this.each(function () {
                var api = $.data(this, 'asScroll');
                if (!api) {
                    api = new AsScroll(this, options);
                    $.data(this, 'asScroll', api);
                }
            });
        }
    };
})(window, document, jQuery);

/***/ }),
/* 21 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! jQuery asScrollable - v0.3.1 - 2015-06-15
* https://github.com/amazingSurge/jquery-asScrollable
* Copyright (c) 2015 amazingSurge; Licensed GPL */
(function (window, document, $, undefined) {
    "use strict";

    var pluginName = 'asScrollbar';

    /**
     * Animation Frame
     **/
    if (!Date.now) {
        Date.now = function () {
            return new Date().getTime();
        };
    }

    function getTime() {
        if (typeof window.performance !== 'undefined' && window.performance.now) {
            return window.performance.now();
        } else {
            return Date.now();
        }
    }

    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame'];
    }
    if (/iP(ad|hone|od).*OS (6|7|8)/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function (callback) {
            var now = getTime();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function () {
                callback(lastTime = nextTime);
            }, nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }

    /**
     * Helper functions
     **/
    function isPercentage(n) {
        return typeof n === 'string' && n.indexOf('%') != -1;
    }

    function convertPercentageToFloat(n) {
        return parseFloat(n.slice(0, -1) / 100, 10);
    }

    function convertMatrixToArray(value) {
        if (value && value.substr(0, 6) == "matrix") {
            return value.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, '').split(/, +/);
        }
        return false;
    }

    /**
     * Plugin constructor
     **/
    var Plugin = $[pluginName] = function (options, bar) {
        this.$bar = $(bar);

        options = this.options = $.extend({}, Plugin.defaults, options || {}, this.$bar.data('options') || {});

        bar.direction = this.options.direction;

        this.classes = {
            directionClass: options.namespace + '-' + options.direction,
            barClass: options.barClass ? options.barClass : options.namespace,
            handleClass: options.handleClass ? options.handleClass : options.namespace + '-handle'
        };

        if (this.options.direction === 'vertical') {
            this.attributes = {
                axis: 'Y',
                position: 'top',
                length: 'height',
                clientLength: 'clientHeight'
            };
        } else if (this.options.direction === 'horizontal') {
            this.attributes = {
                axis: 'X',
                position: 'left',
                length: 'width',
                clientLength: 'clientWidth'
            };
        }

        // Current state information.
        this._states = {};

        // Current state information for the drag operation.
        this._drag = {
            time: null,
            pointer: null
        };

        // Current timeout
        this._frameId = null;

        // Current handle position
        this.handlePosition = 0;

        this.easing = Plugin.easing[this.options.easing] || Plugin.easing.ease;

        this.init();
    };

    Plugin.defaults = {
        namespace: 'asScrollbar',

        skin: null,
        handleSelector: null,
        handleTemplate: '<div class="{{handle}}"></div>',

        barClass: null,
        handleClass: null,

        disabledClass: 'is-disabled',
        draggingClass: 'is-dragging',
        hoveringClass: 'is-hovering',

        direction: 'vertical',

        barLength: null,
        handleLength: null,

        minHandleLength: 30,
        maxHandleLength: null,

        mouseDrag: true,
        touchDrag: true,
        pointerDrag: true,
        clickMove: true,
        clickMoveStep: 0.3, // 0 - 1
        mousewheel: true,
        mousewheelSpeed: 50,

        keyboard: true,

        useCssTransforms3d: true,
        useCssTransforms: true,
        useCssTransitions: true,

        duration: '500',
        easing: 'ease' // linear, ease-in, ease-out, ease-in-out
    };

    /**
     * Css features detect
     **/
    var support = {};
    Plugin.support = support;
    (function (support) {
        /**
         * Borrowed from Owl carousel
         **/
        var style = $('<support>').get(0).style,
            prefixes = ['webkit', 'Moz', 'O', 'ms'],
            events = {
            transition: {
                end: {
                    WebkitTransition: 'webkitTransitionEnd',
                    MozTransition: 'transitionend',
                    OTransition: 'oTransitionEnd',
                    transition: 'transitionend'
                }
            },
            animation: {
                end: {
                    WebkitAnimation: 'webkitAnimationEnd',
                    MozAnimation: 'animationend',
                    OAnimation: 'oAnimationEnd',
                    animation: 'animationend'
                }
            }
        },
            tests = {
            csstransforms: function csstransforms() {
                return !!test('transform');
            },
            csstransforms3d: function csstransforms3d() {
                return !!test('perspective');
            },
            csstransitions: function csstransitions() {
                return !!test('transition');
            },
            cssanimations: function cssanimations() {
                return !!test('animation');
            }
        };

        function test(property, prefixed) {
            var result = false,
                upper = property.charAt(0).toUpperCase() + property.slice(1);

            if (style[property] !== undefined) {
                result = property;
            }
            if (!result) {
                $.each(prefixes, function (i, prefix) {
                    if (style[prefix + upper] !== undefined) {
                        result = '-' + prefix.toLowerCase() + '-' + upper;
                        return false;
                    }
                });
            }

            if (prefixed) {
                return result;
            }
            if (result) {
                return true;
            } else {
                return false;
            }
        }

        function prefixed(property) {
            return test(property, true);
        }

        if (tests.csstransitions()) {
            /* jshint -W053 */
            support.transition = new String(prefixed('transition'));
            support.transition.end = events.transition.end[support.transition];
        }

        if (tests.cssanimations()) {
            /* jshint -W053 */
            support.animation = new String(prefixed('animation'));
            support.animation.end = events.animation.end[support.animation];
        }

        if (tests.csstransforms()) {
            /* jshint -W053 */
            support.transform = new String(prefixed('transform'));
            support.transform3d = tests.csstransforms3d();
        }

        if ('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch) {
            support.touch = true;
        } else {
            support.touch = false;
        }

        if (window.PointerEvent || window.MSPointerEvent) {
            support.pointer = true;
        } else {
            support.pointer = false;
        }

        support.prefixPointerEvent = function (pointerEvent) {
            return window.MSPointerEvent ? 'MSPointer' + pointerEvent.charAt(9).toUpperCase() + pointerEvent.substr(10) : pointerEvent;
        };
    })(support);

    var easingBezier = function easingBezier(mX1, mY1, mX2, mY2) {
        function a(aA1, aA2) {
            return 1.0 - 3.0 * aA2 + 3.0 * aA1;
        }

        function b(aA1, aA2) {
            return 3.0 * aA2 - 6.0 * aA1;
        }

        function c(aA1) {
            return 3.0 * aA1;
        }

        // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
        function calcBezier(aT, aA1, aA2) {
            return ((a(aA1, aA2) * aT + b(aA1, aA2)) * aT + c(aA1)) * aT;
        }

        // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
        function getSlope(aT, aA1, aA2) {
            return 3.0 * a(aA1, aA2) * aT * aT + 2.0 * b(aA1, aA2) * aT + c(aA1);
        }

        function getTForX(aX) {
            // Newton raphson iteration
            var aGuessT = aX;
            for (var i = 0; i < 4; ++i) {
                var currentSlope = getSlope(aGuessT, mX1, mX2);
                if (currentSlope === 0.0) return aGuessT;
                var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
                aGuessT -= currentX / currentSlope;
            }
            return aGuessT;
        }

        if (mX1 === mY1 && mX2 === mY2) {
            return {
                css: 'linear',
                fn: function fn(aX) {
                    return aX;
                }
            };
        } else {
            return {
                css: 'cubic-bezier(' + mX1 + ',' + mY1 + ',' + mX2 + ',' + mY2 + ')',
                fn: function fn(aX) {
                    return calcBezier(getTForX(aX), mY1, mY2);
                }
            };
        }
    };

    $.extend(Plugin.easing = {}, {
        'ease': easingBezier(0.25, 0.1, 0.25, 1.0),
        'linear': easingBezier(0.00, 0.0, 1.00, 1.0),
        'ease-in': easingBezier(0.42, 0.0, 1.00, 1.0),
        'ease-out': easingBezier(0.00, 0.0, 0.58, 1.0),
        'ease-in-out': easingBezier(0.42, 0.0, 0.58, 1.0)
    });

    Plugin.prototype = {
        constructor: Plugin,
        init: function init() {
            var options = this.options;

            this.$handle = this.$bar.find(this.options.handleSelector);
            if (this.$handle.length === 0) {
                this.$handle = $(options.handleTemplate.replace(/\{\{handle\}\}/g, this.classes.handleClass)).appendTo(this.$bar);
            } else {
                this.$handle.addClass(this.classes.handleClass);
            }

            this.$bar.addClass(this.classes.barClass).addClass(this.classes.directionClass).attr('draggable', false);

            if (options.skin) {
                this.$bar.addClass(options.skin);
            }
            if (options.barLength !== null) {
                this.setBarLength(options.barLength);
            }

            if (options.handleLength !== null) {
                this.setHandleLength(options.handleLength);
            }

            this.updateLength();

            this.bindEvents();
        },

        trigger: function trigger(eventType) {
            var method_arguments = Array.prototype.slice.call(arguments, 1),
                data = [this].concat(method_arguments);

            // event
            this.$bar.trigger(pluginName + '::' + eventType, data);

            // callback
            eventType = eventType.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toUpperCase() + word.substring(1);
            });
            var onFunction = 'on' + eventType;

            if (typeof this.options[onFunction] === 'function') {
                this.options[onFunction].apply(this, method_arguments);
            }
        },

        /**
         * Checks whether the carousel is in a specific state or not.
         */
        is: function is(state) {
            return this._states[state] && this._states[state] > 0;
        },

        /**
         * Enters a state.
         */
        enter: function enter(state) {
            if (this._states[state] === undefined) {
                this._states[state] = 0;
            }

            this._states[state]++;
        },

        /**
         * Leaves a state.
         */
        leave: function leave(state) {
            this._states[state]--;
        },

        eventName: function eventName(events) {
            if (typeof events !== 'string' || events === '') {
                return '.' + this.options.namespace;
            }
            events = events.split(' ');

            var length = events.length;
            for (var i = 0; i < length; i++) {
                events[i] = events[i] + '.' + this.options.namespace;
            }
            return events.join(' ');
        },

        bindEvents: function bindEvents() {
            var self = this;

            if (this.options.mouseDrag) {
                this.$handle.on(this.eventName('mousedown'), $.proxy(this.onDragStart, this));
                this.$handle.on(this.eventName('dragstart selectstart'), function () {
                    return false;
                });
            }

            if (this.options.touchDrag && support.touch) {
                this.$handle.on(this.eventName('touchstart'), $.proxy(this.onDragStart, this));
                this.$handle.on(this.eventName('touchcancel'), $.proxy(this.onDragEnd, this));
            }

            if (this.options.pointerDrag && support.pointer) {
                this.$handle.on(this.eventName(support.prefixPointerEvent('pointerdown')), $.proxy(this.onDragStart, this));
                this.$handle.on(this.eventName(support.prefixPointerEvent('pointercancel')), $.proxy(this.onDragEnd, this));
            }

            if (this.options.clickMove) {
                this.$bar.on(this.eventName('mousedown'), $.proxy(this.onClick, this));
            }

            if (this.options.mousewheel) {
                this.$bar.on(this.eventName('mousewheel'), function (e, delta) {
                    var offset = self.getHandlePosition();
                    if (offset <= 0 && delta > 0) {
                        return true;
                    } else if (offset >= self.barLength && delta < 0) {
                        return true;
                    } else {
                        offset = offset - self.options.mousewheelSpeed * delta;

                        self.move(offset, true);
                        return false;
                    }
                });
            }

            this.$bar.on(this.eventName('mouseenter'), function () {
                self.$bar.addClass(self.options.hoveringClass);
                self.enter('hovering');
                self.trigger('hover');
            });

            this.$bar.on(this.eventName('mouseleave'), function () {
                self.$bar.removeClass(self.options.hoveringClass);

                if (!self.is('hovering')) {
                    return;
                }
                self.leave('hovering');
                self.trigger('hovered');
            });

            if (this.options.keyboard) {
                $(document).on(this.eventName('keydown'), function (e) {
                    if (e.isDefaultPrevented && e.isDefaultPrevented()) {
                        return;
                    }

                    if (!self.is('hovering')) {
                        return;
                    }
                    var activeElement = document.activeElement;
                    // go deeper if element is a webcomponent
                    while (activeElement.shadowRoot) {
                        activeElement = activeElement.shadowRoot.activeElement;
                    }
                    if ($(activeElement).is(":input,select,option,[contenteditable]")) {
                        return;
                    }
                    var by = 0,
                        to = null;
                    switch (e.which) {
                        case 37: // left
                        case 63232:
                            by = -30;
                            break;
                        case 38: // up
                        case 63233:
                            by = -30;
                            break;
                        case 39: // right
                        case 63234:
                            by = 30;
                            break;
                        case 40: // down
                        case 63235:
                            by = 30;
                            break;
                        case 33: // page up
                        case 63276:
                            by = -90;
                            break;
                        case 32: // space bar
                        case 34: // page down
                        case 63277:
                            by = -90;
                            break;
                        case 35: // end
                        case 63275:
                            to = '100%';
                            break;
                        case 36: // home
                        case 63273:
                            to = 0;
                            break;
                        default:
                            return;
                    }

                    if (by || to !== null) {
                        if (by) {
                            self.moveBy(by, true);
                        } else if (to !== null) {
                            self.moveTo(to, true);
                        }
                        e.preventDefault();
                    }
                });
            }
        },

        onClick: function onClick(event) {
            if (event.which === 3) {
                return;
            }

            if (event.target === this.$handle[0]) {
                return;
            }

            this._drag.time = new Date().getTime();
            this._drag.pointer = this.pointer(event);

            var offset = this.$handle.offset(),
                distance = this.distance({
                x: offset.left,
                y: offset.top
            }, this._drag.pointer),
                factor = 1;

            if (distance > 0) {
                distance -= this.handleLength;
            } else {
                distance = Math.abs(distance);
                factor = -1;
            }

            if (distance > this.barLength * this.options.clickMoveStep) {
                distance = this.barLength * this.options.clickMoveStep;
            }
            this.moveBy(factor * distance, true);
        },

        /**
         * Handles `touchstart` and `mousedown` events.
         */
        onDragStart: function onDragStart(event) {
            var self = this;

            if (event.which === 3) {
                return;
            }

            // this.$bar.toggleClass(this.options.draggingClass, event.type === 'mousedown');
            this.$bar.addClass(this.options.draggingClass);

            this._drag.time = new Date().getTime();
            this._drag.pointer = this.pointer(event);

            var callback = function callback() {
                self.enter('dragging');
                self.trigger('drag');
            };

            if (this.options.mouseDrag) {
                $(document).on(self.eventName('mouseup'), $.proxy(this.onDragEnd, this));

                $(document).one(self.eventName('mousemove'), $.proxy(function () {
                    $(document).on(self.eventName('mousemove'), $.proxy(this.onDragMove, this));

                    callback();
                }, this));
            }

            if (this.options.touchDrag && support.touch) {
                $(document).on(self.eventName('touchend'), $.proxy(this.onDragEnd, this));

                $(document).one(self.eventName('touchmove'), $.proxy(function () {
                    $(document).on(self.eventName('touchmove'), $.proxy(this.onDragMove, this));

                    callback();
                }, this));
            }

            if (this.options.pointerDrag && support.pointer) {
                $(document).on(self.eventName(support.prefixPointerEvent('pointerup')), $.proxy(this.onDragEnd, this));

                $(document).one(self.eventName(support.prefixPointerEvent('pointermove')), $.proxy(function () {
                    $(document).on(self.eventName(support.prefixPointerEvent('pointermove')), $.proxy(this.onDragMove, this));

                    callback();
                }, this));
            }

            $(document).on(self.eventName('blur'), $.proxy(this.onDragEnd, this));
        },

        /**
         * Handles the `touchmove` and `mousemove` events.
         */
        onDragMove: function onDragMove(event) {
            var distance = this.distance(this._drag.pointer, this.pointer(event));

            if (!this.is('dragging')) {
                return;
            }

            event.preventDefault();
            this.moveBy(distance, true);
        },

        /**
         * Handles the `touchend` and `mouseup` events.
         */
        onDragEnd: function onDragEnd() {
            $(document).off(this.eventName('mousemove mouseup touchmove touchend pointermove pointerup MSPointerMove MSPointerUp blur'));

            this.$bar.removeClass(this.options.draggingClass);
            this.handlePosition = this.getHandlePosition();

            if (!this.is('dragging')) {
                return;
            }

            this.leave('dragging');
            this.trigger('dragged');
        },

        /**
         * Gets unified pointer coordinates from event.
         * @returns {Object} - Contains `x` and `y` coordinates of current pointer position.
         */
        pointer: function pointer(event) {
            var result = {
                x: null,
                y: null
            };

            event = event.originalEvent || event || window.event;

            event = event.touches && event.touches.length ? event.touches[0] : event.changedTouches && event.changedTouches.length ? event.changedTouches[0] : event;

            if (event.pageX) {
                result.x = event.pageX;
                result.y = event.pageY;
            } else {
                result.x = event.clientX;
                result.y = event.clientY;
            }

            return result;
        },

        /**
         * Gets the distance of two pointer.
         */
        distance: function distance(first, second) {
            if (this.options.direction === 'vertical') {
                return second.y - first.y;
            } else {
                return second.x - first.x;
            }
        },

        setBarLength: function setBarLength(length, update) {
            if (typeof length !== 'undefined') {
                this.$bar.css(this.attributes.length, length);
            }
            if (update !== false) {
                this.updateLength();
            }
        },

        setHandleLength: function setHandleLength(length, update) {
            if (typeof length !== 'undefined') {
                if (length < this.options.minHandleLength) {
                    length = this.options.minHandleLength;
                } else if (this.options.maxHandleLength && length > this.options.maxHandleLength) {
                    length = this.options.maxHandleLength;
                }
                this.$handle.css(this.attributes.length, length);

                if (update !== false) {
                    this.updateLength(length);
                }
            }
        },

        updateLength: function updateLength(length, barLength) {
            if (typeof length !== 'undefined') {
                this.handleLength = length;
            } else {
                this.handleLength = this.getHandleLenght();
            }
            if (typeof barLength !== 'undefined') {
                this.barLength = barLength;
            } else {
                this.barLength = this.getBarLength();
            }
        },

        getBarLength: function getBarLength() {
            return this.$bar[0][this.attributes.clientLength];
        },

        getHandleLenght: function getHandleLenght() {
            return this.$handle[0][this.attributes.clientLength];
        },

        getHandlePosition: function getHandlePosition() {
            var value;

            if (this.options.useCssTransforms && support.transform) {
                value = convertMatrixToArray(this.$handle.css(support.transform));

                if (!value) {
                    return 0;
                }

                if (this.attributes.axis === 'X') {
                    value = value[12] || value[4];
                } else {
                    value = value[13] || value[5];
                }
            } else {
                value = this.$handle.css(this.attributes.position);
            }

            return parseFloat(value.replace('px', ''));
        },

        makeHandlePositionStyle: function makeHandlePositionStyle(value) {
            var property,
                x = '0',
                y = '0';

            if (this.options.useCssTransforms && support.transform) {
                if (this.attributes.axis === 'X') {
                    x = value + 'px';
                } else {
                    y = value + 'px';
                }

                property = support.transform.toString();

                if (this.options.useCssTransforms3d && support.transform3d) {
                    value = "translate3d(" + x + "," + y + ",0)";
                } else {
                    value = "translate(" + x + "," + y + ")";
                }
            } else {
                property = this.attributes.position;
            }
            var temp = {};
            temp[property] = value;

            return temp;
        },

        setHandlePosition: function setHandlePosition(value) {
            var style = this.makeHandlePositionStyle(value);
            this.$handle.css(style);

            if (!this.is('dragging')) {
                this.handlePosition = parseFloat(value);
            }
        },

        moveTo: function moveTo(value, trigger, sync) {
            var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

            if (type === "string") {
                if (isPercentage(value)) {
                    value = convertPercentageToFloat(value) * (this.barLength - this.handleLength);
                }

                value = parseFloat(value);
                type = "number";
            }

            if (type !== "number") {
                return;
            }

            this.move(value, trigger, sync);
        },

        moveBy: function moveBy(value, trigger, sync) {
            var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

            if (type === "string") {
                if (isPercentage(value)) {
                    value = convertPercentageToFloat(value) * (this.barLength - this.handleLength);
                }

                value = parseFloat(value);
                type = "number";
            }

            if (type !== "number") {
                return;
            }

            this.move(this.handlePosition + value, trigger, sync);
        },

        move: function move(value, trigger, sync) {
            if (typeof value !== "number" || this.is('disabled')) {
                return;
            }

            if (value < 0) {
                value = 0;
            } else if (value + this.handleLength > this.barLength) {
                value = this.barLength - this.handleLength;
            }

            if (!this.is('dragging') && sync !== true) {
                this.doMove(value, this.options.duration, this.options.easing, trigger);
            } else {
                this.setHandlePosition(value);

                if (trigger) {
                    this.trigger('change', value / (this.barLength - this.handleLength));
                }
            }
        },

        doMove: function doMove(value, duration, easing, trigger) {
            this.enter('moving');
            duration = duration ? duration : this.options.duration;
            easing = easing ? easing : this.options.easing;

            var self = this,
                style = this.makeHandlePositionStyle(value);
            for (var property in style) {
                break;
            }

            if (this.options.useCssTransitions && support.transition) {
                self.enter('transition');
                this.prepareTransition(property, duration, easing);

                this.$handle.one(support.transition.end, function () {
                    self.$handle.css(support.transition, '');

                    if (trigger) {
                        self.trigger('change', value / (self.barLength - self.handleLength));
                    }
                    self.leave('transition');
                    self.leave('moving');
                });

                self.setHandlePosition(value);
            } else {
                self.enter('animating');

                var startTime = getTime();
                var start = self.getHandlePosition();
                var end = value;

                var run = function run(time) {
                    var percent = (time - startTime) / self.options.duration;

                    if (percent > 1) {
                        percent = 1;
                    }

                    percent = self.easing.fn(percent);

                    var current = parseFloat(start + percent * (end - start), 10);
                    self.setHandlePosition(current);

                    if (trigger) {
                        self.trigger('change', current / (self.barLength - self.handleLength));
                    }

                    if (percent === 1) {
                        window.cancelAnimationFrame(self._frameId);
                        self._frameId = null;

                        self.leave('animating');
                        self.leave('moving');
                    } else {
                        self._frameId = window.requestAnimationFrame(run);
                    }
                };

                self._frameId = window.requestAnimationFrame(run);
            }
        },

        prepareTransition: function prepareTransition(property, duration, easing, delay) {
            var temp = [];
            if (property) {
                temp.push(property);
            }
            if (duration) {
                if ($.isNumeric(duration)) {
                    duration = duration + 'ms';
                }
                temp.push(duration);
            }
            if (easing) {
                temp.push(easing);
            } else {
                temp.push(this.easing.css);
            }
            if (delay) {
                temp.push(delay);
            }
            this.$handle.css(support.transition, temp.join(' '));
        },

        enable: function enable() {
            this._states.disabled = 0;

            this.$bar.removeClass(this.options.disabledClass);
        },

        disable: function disable() {
            this._states.disabled = 1;

            this.$bar.addClass(this.options.disabledClass);
        },

        destory: function destory() {
            this.$bar.on(this.eventName());
        }
    };

    $.fn[pluginName] = function (options) {
        if (typeof options === 'string') {
            var args = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
                var instance = $(this).data(pluginName);
                if (!instance) {
                    return false;
                }
                if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                    return false;
                }
                // apply method
                instance[options].apply(instance, args);
            });
        } else {
            return this.each(function () {
                if (!$(this).data(pluginName)) {
                    $(this).data(pluginName, new Plugin(options, this));
                }
            });
        }
    };
})(window, document, jQuery, undefined);

(function (window, document, $, Scrollbar, undefined) {
    "use strict";

    var pluginName = 'asScrollable';
    var instanceId = 0;

    /**
     * Helper functions
     **/
    function getTime() {
        if (typeof window.performance !== 'undefined' && window.performance.now) {
            return window.performance.now();
        } else {
            return Date.now();
        }
    }

    function isPercentage(n) {
        return typeof n === 'string' && n.indexOf('%') != -1;
    }

    function conventToPercentage(n) {
        if (n < 0) {
            n = 0;
        } else if (n > 1) {
            n = 1;
        }
        return parseFloat(n).toFixed(4) * 100 + '%';
    }

    function convertPercentageToFloat(n) {
        return parseFloat(n.slice(0, -1) / 100, 10);
    }

    var isFFLionScrollbar = function () {
        var isOSXFF, ua, version;
        ua = window.navigator.userAgent;
        isOSXFF = /(?=.+Mac OS X)(?=.+Firefox)/.test(ua);
        if (!isOSXFF) {
            return false;
        }
        version = /Firefox\/\d{2}\./.exec(ua);
        if (version) {
            version = version[0].replace(/\D+/g, '');
        }
        return isOSXFF && +version > 23;
    }();

    var Plugin = $[pluginName] = function (options, element) {
        this.$element = $(element);
        options = this.options = $.extend({}, Plugin.defaults, options || {}, this.$element.data('options') || {});

        this.classes = {
            wrap: options.namespace,
            content: options.namespace + '-content',
            container: options.namespace + '-container',
            bar: options.namespace + '-bar',
            barHide: options.namespace + '-bar-hide',
            skin: options.skin
        };

        this.attributes = {
            vertical: {
                axis: 'Y',
                overflow: 'overflow-y',

                scroll: 'scrollTop',
                scrollLength: 'scrollHeight',
                pageOffset: 'pageYOffset',

                ffPadding: 'padding-right',

                length: 'height',
                clientLength: 'clientHeight',
                offset: 'offsetHeight',

                crossLength: 'width',
                crossClientLength: 'clientWidth',
                crossOffset: 'offsetWidth'
            },
            horizontal: {
                axis: 'X',
                overflow: 'overflow-x',

                scroll: 'scrollLeft',
                scrollLength: 'scrollWidth',
                pageOffset: 'pageXOffset',

                ffPadding: 'padding-bottom',

                length: 'width',
                clientLength: 'clientWidth',
                offset: 'offsetWidth',

                crossLength: 'height',
                crossClientLength: 'clientHeight',
                crossOffset: 'offsetHeight'
            }
        };

        // Current state information.
        this._states = {};

        // Supported direction
        this.horizontal = null;
        this.vertical = null;

        this.$bar = null;

        // Current timeout
        this._frameId = null;
        this._timeoutId = null;

        this.instanceId = ++instanceId;

        this.easing = Scrollbar.easing[this.options.easing] || Scrollbar.easing.ease;

        var position = this.$element.css('position');
        if (this.options.containerSelector) {
            this.$container = this.$element.find(this.options.containerSelector);
            this.$wrap = this.$element;

            if (position == 'static') {
                this.$wrap.css('position', 'relative');
            }
        } else {
            this.$container = this.$element.wrap('<div>');
            this.$wrap = this.$container.parent();
            this.$wrap.height(this.$element.height());

            if (position !== 'static') {
                this.$wrap.css('position', position);
            } else {
                this.$wrap.css('position', 'relative');
            }
        }

        if (this.options.contentSelector) {
            this.$content = this.$container.find(this.options.contentSelector);
        } else {
            this.$content = this.$container.wrap('<div>');
            this.$container = this.$content.parent();
        }

        this.init();
    };

    Plugin.defaults = {
        namespace: pluginName,

        skin: null,

        contentSelector: null,
        containerSelector: null,

        enabledClass: 'is-enabled',
        disabledClass: 'is-disabled',

        draggingClass: 'is-dragging',
        hoveringClass: 'is-hovering',
        scrollingClass: 'is-scrolling',

        direction: 'vertical', // vertical, horizontal, both, auto

        showOnHover: true,
        showOnBarHover: false,

        duration: 500,
        easing: 'ease-in', // linear, ease, ease-in, ease-out, ease-in-out

        responsive: true,
        throttle: 20,

        scrollbar: {}
    };

    Plugin.prototype = {
        constructor: Plugin,

        init: function init() {
            switch (this.options.direction) {
                case 'vertical':
                    this.vertical = true;
                    break;
                case 'horizontal':
                    this.horizontal = true;
                    break;
                case 'both':
                    this.horizontal = true;
                    this.vertical = true;
                    break;
                case 'auto':
                    var overflowX = this.$element.css('overflow-x'),
                        overflowY = this.$element.css('overflow-y');

                    if (overflowX === 'scroll' || overflowX === 'auto') {
                        this.horizontal = true;
                    }
                    if (overflowY === 'scroll' || overflowY === 'auto') {
                        this.vertical = true;
                    }
                    break;
            }

            if (!this.vertical && !this.horizontal) {
                return;
            }

            this.$wrap.addClass(this.classes.wrap);
            this.$container.addClass(this.classes.container);
            this.$content.addClass(this.classes.content);

            if (this.options.skin) {
                this.$wrap.addClass(this.classes.skin);
            }

            this.$wrap.addClass(this.options.enabledClass);

            if (this.vertical) {
                this.$wrap.addClass(this.classes.wrap + '-vertical');
                this.initLayout('vertical');
                this.createBar('vertical');
            }

            if (this.horizontal) {
                this.$wrap.addClass(this.classes.wrap + '-horizontal');
                this.initLayout('horizontal');
                this.createBar('horizontal');
            }

            this.bindEvents();
        },

        bindEvents: function bindEvents() {
            var self = this;
            var options = this.options;

            if (options.responsive) {
                $(window).on(this.eventNameWithId('orientationchange'), function () {
                    self.update.call(self);
                });
                $(window).on(this.eventNameWithId('resize'), this.throttle(function () {
                    self.update.call(self);
                }, options.throttle));
            }

            if (!this.horizontal && !this.vertical) {
                return;
            }

            this.$wrap.on(this.eventName('mouseenter'), function () {
                self.$wrap.addClass(self.options.hoveringClass);
                self.enter('hovering');
                self.trigger('hover');
            });

            this.$wrap.on(this.eventName('mouseleave'), function () {
                self.$wrap.removeClass(self.options.hoveringClass);

                if (!self.is('hovering')) {
                    return;
                }
                self.leave('hovering');
                self.trigger('hovered');
            });

            if (options.showOnHover) {
                if (options.showOnBarHover) {
                    this.$bar.on('asScrollbar::hover', function () {
                        self.showBar(this.direction);
                    }).on('asScrollbar::hovered', function () {
                        self.hideBar(this.direction);
                    });
                } else {
                    this.$element.on(pluginName + '::hover', $.proxy(this.showBar, this));
                    this.$element.on(pluginName + '::hovered', $.proxy(this.hideBar, this));
                }
            }

            this.$container.on(this.eventName('scroll'), function () {
                if (self.horizontal) {
                    var oldLeft = self.offsetLeft;
                    self.offsetLeft = self.getOffset('horizontal');

                    if (oldLeft !== self.offsetLeft) {
                        self.trigger('scroll', self.getPercentOffset('horizontal'), 'horizontal');

                        if (self.offsetLeft === 0) {
                            self.trigger('scrolltop', 'horizontal');
                        }
                        if (self.offsetLeft === self.getScrollLength('horizontal')) {
                            self.trigger('scrollend', 'horizontal');
                        }
                    }
                }

                if (self.vertical) {
                    var oldTop = self.offsetTop;

                    self.offsetTop = self.getOffset('vertical');

                    if (oldTop !== self.offsetTop) {
                        self.trigger('scroll', self.getPercentOffset('vertical'), 'vertical');

                        if (self.offsetTop === 0) {
                            self.trigger('scrolltop', 'vertical');
                        }
                        if (self.offsetTop === self.getScrollLength('vertical')) {
                            self.trigger('scrollend', 'vertical');
                        }
                    }
                }
            });

            this.$element.on(pluginName + '::scroll', function (e, api, value, direction) {
                if (!self.is('scrolling')) {
                    self.enter('scrolling');
                    self.$wrap.addClass(self.options.scrollingClass);
                }
                var bar = api.getBarApi(direction);

                bar.moveTo(conventToPercentage(value), false, true);

                clearTimeout(self._timeoutId);
                self._timeoutId = setTimeout(function () {
                    self.$wrap.removeClass(self.options.scrollingClass);
                    self.leave('scrolling');
                }, 200);
            });

            this.$bar.on('asScrollbar::change', function (e, api, value) {
                self.scrollTo(this.direction, conventToPercentage(value), false, true);
            });

            this.$bar.on('asScrollbar::drag', function () {
                self.$wrap.addClass(self.options.draggingClass);
            }).on('asScrollbar::dragged', function () {
                self.$wrap.removeClass(self.options.draggingClass);
            });
        },

        unbindEvents: function unbindEvents() {
            this.$wrap.off(this.eventName());
            this.$element.off(pluginName + '::scroll').off(pluginName + '::hover').off(pluginName + '::hovered');
            this.$container.off(this.eventName());
            $(window).off(this.eventNameWithId());
        },

        initLayout: function initLayout(direction) {
            if (direction === 'vertical') {
                this.$container.css('height', this.$wrap.height());
            }
            var attributes = this.attributes[direction],
                container = this.$container[0];

            // this.$container.css(attributes.overflow, 'scroll');

            var scrollbarWidth = this.getBrowserScrollbarWidth(direction),
                parentLength = container.parentNode[attributes.crossClientLength];

            this.$content.css(attributes.crossLength, parentLength + 'px');
            this.$container.css(attributes.crossLength, scrollbarWidth + parentLength + 'px');

            if (scrollbarWidth === 0 && isFFLionScrollbar) {
                this.$container.css(attributes.ffPadding, 16);
            }
        },

        createBar: function createBar(direction) {
            var options = $.extend(this.options.scrollbar, {
                namespace: this.classes.bar,
                direction: direction,
                useCssTransitions: false,
                keyboard: false
                //mousewheel: false
            });
            var $bar = $('<div>');
            $bar.asScrollbar(options);

            if (this.options.showOnHover) {
                $bar.addClass(this.classes.barHide);
            }

            $bar.appendTo(this.$wrap);

            this['$' + direction] = $bar;

            if (this.$bar === null) {
                this.$bar = $bar;
            } else {
                this.$bar = this.$bar.add($bar);
            }

            this.updateBarHandle(direction);
        },

        trigger: function trigger(eventType) {
            var method_arguments = Array.prototype.slice.call(arguments, 1),
                data = [this].concat(method_arguments);

            // event
            this.$element.trigger(pluginName + '::' + eventType, data);

            // callback
            eventType = eventType.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toUpperCase() + word.substring(1);
            });
            var onFunction = 'on' + eventType;

            if (typeof this.options[onFunction] === 'function') {
                this.options[onFunction].apply(this, method_arguments);
            }
        },

        /**
         * Checks whether the carousel is in a specific state or not.
         */
        is: function is(state) {
            return this._states[state] && this._states[state] > 0;
        },

        /**
         * Enters a state.
         */
        enter: function enter(state) {
            if (this._states[state] === undefined) {
                this._states[state] = 0;
            }

            this._states[state]++;
        },

        /**
         * Leaves a state.
         */
        leave: function leave(state) {
            this._states[state]--;
        },

        eventName: function eventName(events) {
            if (typeof events !== 'string' || events === '') {
                return '.' + this.options.namespace;
            }

            events = events.split(' ');
            var length = events.length;
            for (var i = 0; i < length; i++) {
                events[i] = events[i] + '.' + this.options.namespace;
            }
            return events.join(' ');
        },

        eventNameWithId: function eventNameWithId(events) {
            if (typeof events !== 'string' || events === '') {
                return this.options.namespace + '-' + this.instanceId;
            }

            events = events.split(' ');
            var length = events.length;
            for (var i = 0; i < length; i++) {
                events[i] = events[i] + '.' + this.options.namespace + '-' + this.instanceId;
            }
            return events.join(' ');
        },

        /**
         * _throttle
         * @description Borrowed from Underscore.js
         */
        throttle: function throttle(func, wait) {
            var _now = Date.now || function () {
                return new Date().getTime();
            };
            var context, args, result;
            var timeout = null;
            var previous = 0;
            var later = function later() {
                previous = _now();
                timeout = null;
                result = func.apply(context, args);
                context = args = null;
            };
            return function () {
                var now = _now();
                var remaining = wait - (now - previous);
                context = this;
                args = arguments;
                if (remaining <= 0) {
                    clearTimeout(timeout);
                    timeout = null;
                    previous = now;
                    result = func.apply(context, args);
                    context = args = null;
                } else if (!timeout) {
                    timeout = setTimeout(later, remaining);
                }
                return result;
            };
        },

        getBrowserScrollbarWidth: function getBrowserScrollbarWidth(direction) {
            var attributes = this.attributes[direction],
                outer,
                outerStyle;
            if (attributes.scrollbarWidth) {
                return attributes.scrollbarWidth;
            }
            outer = document.createElement('div');
            outerStyle = outer.style;
            outerStyle.position = 'absolute';
            outerStyle.width = '100px';
            outerStyle.height = '100px';
            outerStyle.overflow = 'scroll';
            outerStyle.top = '-9999px';
            document.body.appendChild(outer);
            attributes.scrollbarWidth = outer[attributes.offset] - outer[attributes.clientLength];
            document.body.removeChild(outer);
            return attributes.scrollbarWidth;
        },

        getOffset: function getOffset(direction) {
            var attributes = this.attributes[direction],
                container = this.$container[0];

            return container[attributes.pageOffset] || container[attributes.scroll];
        },

        getPercentOffset: function getPercentOffset(direction) {
            return this.getOffset(direction) / this.getScrollLength(direction);
        },

        getContainerLength: function getContainerLength(direction) {
            return this.$container[0][this.attributes[direction].clientLength];
        },

        getScrollLength: function getScrollLength(direction) {
            var scrollLength = this.$content[0][this.attributes[direction].scrollLength];
            return scrollLength - this.getContainerLength(direction);
        },

        scrollTo: function scrollTo(direction, value, trigger, sync) {
            var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

            if (type === "string") {
                if (isPercentage(value)) {
                    value = convertPercentageToFloat(value) * this.getScrollLength(direction);
                }

                value = parseFloat(value);
                type = "number";
            }

            if (type !== "number") {
                return;
            }

            this.move(direction, value, trigger, sync);
        },

        scrollBy: function scrollBy(direction, value, trigger, sync) {
            var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

            if (type === "string") {
                if (isPercentage(value)) {
                    value = convertPercentageToFloat(value) * this.getScrollLength(direction);
                }

                value = parseFloat(value);
                type = "number";
            }

            if (type !== "number") {
                return;
            }

            this.move(direction, this.getOffset(direction) + value, trigger, sync);
        },

        move: function move(direction, value, trigger, sync) {
            if (this[direction] !== true || typeof value !== "number") {
                return;
            }
            var self = this;

            this.enter('moving');

            if (value < 0) {
                value = 0;
            } else if (value > this.getScrollLength(direction)) {
                value = this.getScrollLength(direction);
            }

            var attributes = this.attributes[direction];

            var callback = function callback() {
                self.leave('moving');
            };

            if (sync) {
                this.$container[0][attributes.scroll] = value;

                if (trigger !== false) {
                    this.trigger('change', value / this.getScrollLength(direction));
                }
                callback();
            } else {
                self.enter('animating');
                var startTime = getTime();
                var start = self.getOffset(direction);
                var end = value;

                var run = function run(time) {
                    var percent = (time - startTime) / self.options.duration;

                    if (percent > 1) {
                        percent = 1;
                    }

                    percent = self.easing.fn(percent);

                    var current = parseFloat(start + percent * (end - start), 10);
                    self.$container[0][attributes.scroll] = current;

                    if (trigger !== false) {
                        self.trigger('change', value / self.getScrollLength(direction));
                    }

                    if (percent === 1) {
                        window.cancelAnimationFrame(self._frameId);
                        self._frameId = null;

                        self.leave('animating');
                        callback();
                    } else {
                        self._frameId = window.requestAnimationFrame(run);
                    }
                };

                self._frameId = window.requestAnimationFrame(run);
            }
        },

        scrollXto: function scrollXto(value, trigger, sync) {
            return this.scrollTo('horizontal', value, trigger, sync);
        },

        scrollYto: function scrollYto(value, trigger, sync) {
            return this.scrollTo('vertical', value, trigger, sync);
        },

        scrollXby: function scrollXby(value, trigger, sync) {
            return this.scrollBy('horizontal', value, trigger, sync);
        },

        scrollYby: function scrollYby(value, trigger, sync) {
            return this.scrollBy('vertical', value, trigger, sync);
        },

        getBar: function getBar(direction) {
            if (direction && this['$' + direction]) {
                return this['$' + direction];
            } else {
                return this.$bar;
            }
        },

        getBarApi: function getBarApi(direction) {
            return this.getBar(direction).data('asScrollbar');
        },

        getBarX: function getBarX() {
            return this.getBar('horizontal');
        },

        getBarY: function getBarY() {
            return this.getBar('vertical');
        },

        showBar: function showBar(direction) {
            this.getBar(direction).removeClass(this.classes.barHide);
        },

        hideBar: function hideBar(direction) {
            this.getBar(direction).addClass(this.classes.barHide);
        },

        updateBarHandle: function updateBarHandle(direction) {
            var api = this.getBarApi(direction);

            var scrollLength = this.getScrollLength(direction),
                containerLength = this.getContainerLength(direction);

            if (scrollLength > 0) {
                if (api.is('disabled')) {
                    api.enable();
                }
                api.setHandleLength(api.getBarLength() * containerLength / (scrollLength + containerLength), true);
            } else {
                api.disable();
            }
        },

        disable: function disable() {
            if (!this.is('disabled')) {
                this.enter('disabled');
                this.$wrap.addClass(this.options.disabledClass).removeClass(this.options.enabledClass);

                this.unbindEvents();
                this.unStyle();
            }
        },

        enable: function enable() {
            if (this.is('disabled')) {
                this.leave('disabled');
                this.$wrap.addClass(this.options.enabledClass).removeClass(this.options.disabledClass);

                this.bindEvents();
                this.update();
            }
        },

        update: function update() {
            if (this.is('disabled')) {
                return;
            }
            if (this.vertical) {
                this.initLayout('vertical');
                this.updateBarHandle('vertical');
            }
            if (this.horizontal) {
                this.initLayout('horizontal');
                this.updateBarHandle('horizontal');
            }
        },
        unStyle: function unStyle() {
            if (this.horizontal) {
                this.$container.css({
                    'height': '',
                    'padding-bottom': ''
                });
                this.$content.css({
                    'height': ''
                });
            }
            if (this.vertical) {
                this.$container.css({
                    'width': '',
                    'height': '',
                    'padding-right': ''
                });
                this.$content.css({
                    'width': ''
                });
            }
            if (!this.options.containerSelector) {
                this.$wrap.css({
                    'height': ''
                });
            }
        },

        destory: function destory() {
            this.$wrap.removeClass(this.classes.wrap + '-vertical').removeClass(this.classes.wrap + '-horizontal').removeClass(this.classes.wrap).removeClass(this.options.enabledClass).removeClass(this.classes.disabledClass);
            this.unStyle();

            if (this.$bar) {
                this.$bar.remove();
            }

            this.unbindEvents();

            if (this.options.containerSelector) {
                this.$container.removeClass(this.classes.container);
            } else {
                this.$container.unwrap();
            }
            if (!this.options.contentSelector) {
                this.$content.unwrap();
            }
            this.$content.removeClass(this.classes.content);
            this.$element.data(pluginName, null);
        }
    };

    $.fn[pluginName] = function (options) {
        if (typeof options === 'string') {
            var method = options;
            var method_arguments = Array.prototype.slice.call(arguments, 1);

            if (/^\_/.test(method)) {
                return false;
            } else if (/^(get)/.test(method)) {
                var api = this.first().data(pluginName);
                if (api && typeof api[method] === 'function') {
                    return api[method].apply(api, method_arguments);
                }
            } else {
                return this.each(function () {
                    var api = $.data(this, pluginName);
                    if (api && typeof api[method] === 'function') {
                        api[method].apply(api, method_arguments);
                    }
                });
            }
        } else {
            return this.each(function () {
                if (!$(this).data(pluginName)) {
                    $(this).data(pluginName, new Plugin(options, this));
                } else {
                    $(this).data(pluginName).update();
                }
            });
        }
        return this;
    };
})(window, document, jQuery, function ($) {
    "use strict";

    if ($.asScrollbar === undefined) {
        // console.info('lost dependency lib of $.asScrollbar , please load it first !');
        return false;
    } else {
        return $.asScrollbar;
    }
}(jQuery));

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Intro.js v1.1.1
 * https://github.com/usablica/intro.js
 * MIT licensed
 *
 * Copyright (C) 2013 usabli.ca - A weekend project by Afshin Mehrabani (@afshinmeh)
 */

(function (root, factory) {
  if (( false ? 'undefined' : _typeof(exports)) === 'object') {
    // CommonJS
    factory(exports);
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    // Browser globals
    factory(root);
  }
})(this, function (exports) {
  //Default config/variables
  var VERSION = '1.1.1';

  /**
   * IntroJs main class
   *
   * @class IntroJs
   */
  function IntroJs(obj) {
    this._targetElement = obj;

    this._options = {
      /* Next button label in tooltip box */
      nextLabel: 'Next &rarr;',
      /* Previous button label in tooltip box */
      prevLabel: '&larr; Back',
      /* Skip button label in tooltip box */
      skipLabel: 'Skip',
      /* Done button label in tooltip box */
      doneLabel: 'Done',
      /* Default tooltip box position */
      tooltipPosition: 'bottom',
      /* Next CSS class for tooltip boxes */
      tooltipClass: '',
      /* CSS class that is added to the helperLayer */
      highlightClass: '',
      /* Close introduction when pressing Escape button? */
      exitOnEsc: true,
      /* Close introduction when clicking on overlay layer? */
      exitOnOverlayClick: true,
      /* Show step numbers in introduction? */
      showStepNumbers: true,
      /* Let user use keyboard to navigate the tour? */
      keyboardNavigation: true,
      /* Show tour control buttons? */
      showButtons: true,
      /* Show tour bullets? */
      showBullets: true,
      /* Show tour progress? */
      showProgress: false,
      /* Scroll to highlighted element? */
      scrollToElement: true,
      /* Set the overlay opacity */
      overlayOpacity: 0.8,
      /* Precedence of positions, when auto is enabled */
      positionPrecedence: ["bottom", "top", "right", "left"],
      /* Disable an interaction with element? */
      disableInteraction: false
    };
  }

  /**
   * Initiate a new introduction/guide from an element in the page
   *
   * @api private
   * @method _introForElement
   * @param {Object} targetElm
   * @returns {Boolean} Success or not?
   */
  function _introForElement(targetElm) {
    var introItems = [],
        self = this;

    if (this._options.steps) {
      //use steps passed programmatically
      for (var i = 0, stepsLength = this._options.steps.length; i < stepsLength; i++) {
        var currentItem = _cloneObject(this._options.steps[i]);
        //set the step
        currentItem.step = introItems.length + 1;
        //use querySelector function only when developer used CSS selector
        if (typeof currentItem.element === 'string') {
          //grab the element with given selector from the page
          currentItem.element = document.querySelector(currentItem.element);
        }

        //intro without element
        if (typeof currentItem.element === 'undefined' || currentItem.element == null) {
          var floatingElementQuery = document.querySelector(".introjsFloatingElement");

          if (floatingElementQuery == null) {
            floatingElementQuery = document.createElement('div');
            floatingElementQuery.className = 'introjsFloatingElement';

            document.body.appendChild(floatingElementQuery);
          }

          currentItem.element = floatingElementQuery;
          currentItem.position = 'floating';
        }

        if (currentItem.element != null) {
          introItems.push(currentItem);
        }
      }
    } else {
      //use steps from data-* annotations
      var allIntroSteps = targetElm.querySelectorAll('*[data-intro]');
      //if there's no element to intro
      if (allIntroSteps.length < 1) {
        return false;
      }

      //first add intro items with data-step
      for (var i = 0, elmsLength = allIntroSteps.length; i < elmsLength; i++) {
        var currentElement = allIntroSteps[i];
        var step = parseInt(currentElement.getAttribute('data-step'), 10);

        if (step > 0) {
          introItems[step - 1] = {
            element: currentElement,
            intro: currentElement.getAttribute('data-intro'),
            step: parseInt(currentElement.getAttribute('data-step'), 10),
            tooltipClass: currentElement.getAttribute('data-tooltipClass'),
            highlightClass: currentElement.getAttribute('data-highlightClass'),
            position: currentElement.getAttribute('data-position') || this._options.tooltipPosition
          };
        }
      }

      //next add intro items without data-step
      //todo: we need a cleanup here, two loops are redundant
      var nextStep = 0;
      for (var i = 0, elmsLength = allIntroSteps.length; i < elmsLength; i++) {
        var currentElement = allIntroSteps[i];

        if (currentElement.getAttribute('data-step') == null) {

          while (true) {
            if (typeof introItems[nextStep] == 'undefined') {
              break;
            } else {
              nextStep++;
            }
          }

          introItems[nextStep] = {
            element: currentElement,
            intro: currentElement.getAttribute('data-intro'),
            step: nextStep + 1,
            tooltipClass: currentElement.getAttribute('data-tooltipClass'),
            highlightClass: currentElement.getAttribute('data-highlightClass'),
            position: currentElement.getAttribute('data-position') || this._options.tooltipPosition
          };
        }
      }
    }

    //removing undefined/null elements
    var tempIntroItems = [];
    for (var z = 0; z < introItems.length; z++) {
      introItems[z] && tempIntroItems.push(introItems[z]); // copy non-empty values to the end of the array
    }

    introItems = tempIntroItems;

    //Ok, sort all items with given steps
    introItems.sort(function (a, b) {
      return a.step - b.step;
    });

    //set it to the introJs object
    self._introItems = introItems;

    //add overlay layer to the page
    if (_addOverlayLayer.call(self, targetElm)) {
      //then, start the show
      _nextStep.call(self);

      var skipButton = targetElm.querySelector('.introjs-skipbutton'),
          nextStepButton = targetElm.querySelector('.introjs-nextbutton');

      self._onKeyDown = function (e) {
        if (e.keyCode === 27 && self._options.exitOnEsc == true) {
          //escape key pressed, exit the intro
          //check if exit callback is defined
          if (self._introExitCallback != undefined) {
            self._introExitCallback.call(self);
          }
          _exitIntro.call(self, targetElm);
        } else if (e.keyCode === 37) {
          //left arrow
          _previousStep.call(self);
        } else if (e.keyCode === 39) {
          //right arrow
          _nextStep.call(self);
        } else if (e.keyCode === 13) {
          //srcElement === ie
          var target = e.target || e.srcElement;
          if (target && target.className.indexOf('introjs-prevbutton') > 0) {
            //user hit enter while focusing on previous button
            _previousStep.call(self);
          } else if (target && target.className.indexOf('introjs-skipbutton') > 0) {
            //user hit enter while focusing on skip button
            if (self._introItems.length - 1 == self._currentStep && typeof self._introCompleteCallback === 'function') {
              self._introCompleteCallback.call(self);
            }
            //check if any callback is defined
            if (self._introExitCallback != undefined) {
              self._introExitCallback.call(self);
            }
            _exitIntro.call(self, targetElm);
          } else {
            //default behavior for responding to enter
            _nextStep.call(self);
          }

          //prevent default behaviour on hitting Enter, to prevent steps being skipped in some browsers
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnValue = false;
          }
        }
      };

      self._onResize = function (e) {
        _setHelperLayerPosition.call(self, document.querySelector('.introjs-helperLayer'));
        _setHelperLayerPosition.call(self, document.querySelector('.introjs-tooltipReferenceLayer'));
      };

      if (window.addEventListener) {
        if (this._options.keyboardNavigation) {
          window.addEventListener('keydown', self._onKeyDown, true);
        }
        //for window resize
        window.addEventListener('resize', self._onResize, true);
      } else if (document.attachEvent) {
        //IE
        if (this._options.keyboardNavigation) {
          document.attachEvent('onkeydown', self._onKeyDown);
        }
        //for window resize
        document.attachEvent('onresize', self._onResize);
      }
    }
    return false;
  }

  /*
    * makes a copy of the object
    * @api private
    * @method _cloneObject
   */
  function _cloneObject(object) {
    if (object == null || (typeof object === 'undefined' ? 'undefined' : _typeof(object)) != 'object' || typeof object.nodeType != 'undefined') {
      return object;
    }
    var temp = {};
    for (var key in object) {
      if (typeof jQuery != 'undefined' && object[key] instanceof jQuery) {
        temp[key] = object[key];
      } else {
        temp[key] = _cloneObject(object[key]);
      }
    }
    return temp;
  }
  /**
   * Go to specific step of introduction
   *
   * @api private
   * @method _goToStep
   */
  function _goToStep(step) {
    //because steps starts with zero
    this._currentStep = step - 2;
    if (typeof this._introItems !== 'undefined') {
      _nextStep.call(this);
    }
  }

  /**
   * Go to next step on intro
   *
   * @api private
   * @method _nextStep
   */
  function _nextStep() {
    this._direction = 'forward';

    if (typeof this._currentStep === 'undefined') {
      this._currentStep = 0;
    } else {
      ++this._currentStep;
    }

    if (this._introItems.length <= this._currentStep) {
      //end of the intro
      //check if any callback is defined
      if (typeof this._introCompleteCallback === 'function') {
        this._introCompleteCallback.call(this);
      }
      _exitIntro.call(this, this._targetElement);
      return;
    }

    var nextStep = this._introItems[this._currentStep];
    if (typeof this._introBeforeChangeCallback !== 'undefined') {
      this._introBeforeChangeCallback.call(this, nextStep.element);
    }

    _showElement.call(this, nextStep);
  }

  /**
   * Go to previous step on intro
   *
   * @api private
   * @method _nextStep
   */
  function _previousStep() {
    this._direction = 'backward';

    if (this._currentStep === 0) {
      return false;
    }

    var nextStep = this._introItems[--this._currentStep];
    if (typeof this._introBeforeChangeCallback !== 'undefined') {
      this._introBeforeChangeCallback.call(this, nextStep.element);
    }

    _showElement.call(this, nextStep);
  }

  /**
   * Exit from intro
   *
   * @api private
   * @method _exitIntro
   * @param {Object} targetElement
   */
  function _exitIntro(targetElement) {
    //remove overlay layer from the page
    var overlayLayer = targetElement.querySelector('.introjs-overlay');

    //return if intro already completed or skipped
    if (overlayLayer == null) {
      return;
    }

    //for fade-out animation
    overlayLayer.style.opacity = 0;
    setTimeout(function () {
      if (overlayLayer.parentNode) {
        overlayLayer.parentNode.removeChild(overlayLayer);
      }
    }, 500);

    //remove all helper layers
    var helperLayer = targetElement.querySelector('.introjs-helperLayer');
    if (helperLayer) {
      helperLayer.parentNode.removeChild(helperLayer);
    }

    var referenceLayer = targetElement.querySelector('.introjs-tooltipReferenceLayer');
    if (referenceLayer) {
      referenceLayer.parentNode.removeChild(referenceLayer);
    }
    //remove disableInteractionLayer
    var disableInteractionLayer = targetElement.querySelector('.introjs-disableInteraction');
    if (disableInteractionLayer) {
      disableInteractionLayer.parentNode.removeChild(disableInteractionLayer);
    }

    //remove intro floating element
    var floatingElement = document.querySelector('.introjsFloatingElement');
    if (floatingElement) {
      floatingElement.parentNode.removeChild(floatingElement);
    }

    //remove `introjs-showElement` class from the element
    var showElement = document.querySelector('.introjs-showElement');
    if (showElement) {
      showElement.className = showElement.className.replace(/introjs-[a-zA-Z]+/g, '').replace(/^\s+|\s+$/g, ''); // This is a manual trim.
    }

    //remove `introjs-fixParent` class from the elements
    var fixParents = document.querySelectorAll('.introjs-fixParent');
    if (fixParents && fixParents.length > 0) {
      for (var i = fixParents.length - 1; i >= 0; i--) {
        fixParents[i].className = fixParents[i].className.replace(/introjs-fixParent/g, '').replace(/^\s+|\s+$/g, '');
      }
    }

    //clean listeners
    if (window.removeEventListener) {
      window.removeEventListener('keydown', this._onKeyDown, true);
    } else if (document.detachEvent) {
      //IE
      document.detachEvent('onkeydown', this._onKeyDown);
    }

    //set the step to zero
    this._currentStep = undefined;
  }

  /**
   * Render tooltip box in the page
   *
   * @api private
   * @method _placeTooltip
   * @param {HTMLElement} targetElement
   * @param {HTMLElement} tooltipLayer
   * @param {HTMLElement} arrowLayer
   * @param {HTMLElement} helperNumberLayer
   */
  function _placeTooltip(targetElement, tooltipLayer, arrowLayer, helperNumberLayer) {
    var tooltipCssClass = '',
        currentStepObj,
        tooltipOffset,
        targetOffset,
        windowSize,
        currentTooltipPosition;

    //reset the old style
    tooltipLayer.style.top = null;
    tooltipLayer.style.right = null;
    tooltipLayer.style.bottom = null;
    tooltipLayer.style.left = null;
    tooltipLayer.style.marginLeft = null;
    tooltipLayer.style.marginTop = null;

    arrowLayer.style.display = 'inherit';

    if (typeof helperNumberLayer != 'undefined' && helperNumberLayer != null) {
      helperNumberLayer.style.top = null;
      helperNumberLayer.style.left = null;
    }

    //prevent error when `this._currentStep` is undefined
    if (!this._introItems[this._currentStep]) return;

    //if we have a custom css class for each step
    currentStepObj = this._introItems[this._currentStep];
    if (typeof currentStepObj.tooltipClass === 'string') {
      tooltipCssClass = currentStepObj.tooltipClass;
    } else {
      tooltipCssClass = this._options.tooltipClass;
    }

    tooltipLayer.className = ('introjs-tooltip ' + tooltipCssClass).replace(/^\s+|\s+$/g, '');

    currentTooltipPosition = this._introItems[this._currentStep].position;
    if (currentTooltipPosition == "auto" || this._options.tooltipPosition == "auto") {
      if (currentTooltipPosition != "floating") {
        // Floating is always valid, no point in calculating
        currentTooltipPosition = _determineAutoPosition.call(this, targetElement, tooltipLayer, currentTooltipPosition);
      }
    }
    targetOffset = _getOffset(targetElement);
    tooltipOffset = _getOffset(tooltipLayer);
    windowSize = _getWinSize();
    switch (currentTooltipPosition) {
      case 'top':
        arrowLayer.className = 'introjs-arrow bottom';

        var tooltipLayerStyleLeft = 15;
        _checkRight(targetOffset, tooltipLayerStyleLeft, tooltipOffset, windowSize, tooltipLayer);
        tooltipLayer.style.bottom = targetOffset.height + 20 + 'px';
        break;
      case 'right':
        tooltipLayer.style.left = targetOffset.width + 20 + 'px';
        if (targetOffset.top + tooltipOffset.height > windowSize.height) {
          // In this case, right would have fallen below the bottom of the screen.
          // Modify so that the bottom of the tooltip connects with the target
          arrowLayer.className = "introjs-arrow left-bottom";
          tooltipLayer.style.top = "-" + (tooltipOffset.height - targetOffset.height - 20) + "px";
        } else {
          arrowLayer.className = 'introjs-arrow left';
        }
        break;
      case 'left':
        if (this._options.showStepNumbers == true) {
          tooltipLayer.style.top = '15px';
        }

        if (targetOffset.top + tooltipOffset.height > windowSize.height) {
          // In this case, left would have fallen below the bottom of the screen.
          // Modify so that the bottom of the tooltip connects with the target
          tooltipLayer.style.top = "-" + (tooltipOffset.height - targetOffset.height - 20) + "px";
          arrowLayer.className = 'introjs-arrow right-bottom';
        } else {
          arrowLayer.className = 'introjs-arrow right';
        }
        tooltipLayer.style.right = targetOffset.width + 20 + 'px';

        break;
      case 'floating':
        arrowLayer.style.display = 'none';

        //we have to adjust the top and left of layer manually for intro items without element
        tooltipLayer.style.left = '50%';
        tooltipLayer.style.top = '50%';
        tooltipLayer.style.marginLeft = '-' + tooltipOffset.width / 2 + 'px';
        tooltipLayer.style.marginTop = '-' + tooltipOffset.height / 2 + 'px';

        if (typeof helperNumberLayer != 'undefined' && helperNumberLayer != null) {
          helperNumberLayer.style.left = '-' + (tooltipOffset.width / 2 + 18) + 'px';
          helperNumberLayer.style.top = '-' + (tooltipOffset.height / 2 + 18) + 'px';
        }

        break;
      case 'bottom-right-aligned':
        arrowLayer.className = 'introjs-arrow top-right';

        var tooltipLayerStyleRight = 0;
        _checkLeft(targetOffset, tooltipLayerStyleRight, tooltipOffset, tooltipLayer);
        tooltipLayer.style.top = targetOffset.height + 20 + 'px';
        break;

      case 'bottom-middle-aligned':
        arrowLayer.className = 'introjs-arrow top-middle';

        var tooltipLayerStyleLeftRight = targetOffset.width / 2 - tooltipOffset.width / 2;
        if (_checkLeft(targetOffset, tooltipLayerStyleLeftRight, tooltipOffset, tooltipLayer)) {
          tooltipLayer.style.right = null;
          _checkRight(targetOffset, tooltipLayerStyleLeftRight, tooltipOffset, windowSize, tooltipLayer);
        }
        tooltipLayer.style.top = targetOffset.height + 20 + 'px';
        break;

      case 'bottom-left-aligned':
      // Bottom-left-aligned is the same as the default bottom
      case 'bottom':
      // Bottom going to follow the default behavior
      default:
        arrowLayer.className = 'introjs-arrow top';

        var tooltipLayerStyleLeft = 0;
        _checkRight(targetOffset, tooltipLayerStyleLeft, tooltipOffset, windowSize, tooltipLayer);
        tooltipLayer.style.top = targetOffset.height + 20 + 'px';
        break;
    }
  }

  /**
   * Set tooltip left so it doesn't go off the right side of the window
   *
   * @return boolean true, if tooltipLayerStyleLeft is ok.  false, otherwise.
   */
  function _checkRight(targetOffset, tooltipLayerStyleLeft, tooltipOffset, windowSize, tooltipLayer) {
    if (targetOffset.left + tooltipLayerStyleLeft + tooltipOffset.width > windowSize.width) {
      // off the right side of the window
      tooltipLayer.style.left = windowSize.width - tooltipOffset.width - targetOffset.left + 'px';
      return false;
    }
    tooltipLayer.style.left = tooltipLayerStyleLeft + 'px';
    return true;
  }

  /**
   * Set tooltip right so it doesn't go off the left side of the window
   *
   * @return boolean true, if tooltipLayerStyleRight is ok.  false, otherwise.
   */
  function _checkLeft(targetOffset, tooltipLayerStyleRight, tooltipOffset, tooltipLayer) {
    if (targetOffset.left + targetOffset.width - tooltipLayerStyleRight - tooltipOffset.width < 0) {
      // off the left side of the window
      tooltipLayer.style.left = -targetOffset.left + 'px';
      return false;
    }
    tooltipLayer.style.right = tooltipLayerStyleRight + 'px';
    return true;
  }

  /**
   * Determines the position of the tooltip based on the position precedence and availability
   * of screen space.
   *
   * @param {Object} targetElement
   * @param {Object} tooltipLayer
   * @param {Object} desiredTooltipPosition
   *
   */
  function _determineAutoPosition(targetElement, tooltipLayer, desiredTooltipPosition) {

    // Take a clone of position precedence. These will be the available
    var possiblePositions = this._options.positionPrecedence.slice();

    var windowSize = _getWinSize();
    var tooltipHeight = _getOffset(tooltipLayer).height + 10;
    var tooltipWidth = _getOffset(tooltipLayer).width + 20;
    var targetOffset = _getOffset(targetElement);

    // If we check all the possible areas, and there are no valid places for the tooltip, the element
    // must take up most of the screen real estate. Show the tooltip floating in the middle of the screen.
    var calculatedPosition = "floating";

    // Check if the width of the tooltip + the starting point would spill off the right side of the screen
    // If no, neither bottom or top are valid
    if (targetOffset.left + tooltipWidth > windowSize.width || targetOffset.left + targetOffset.width / 2 - tooltipWidth < 0) {
      _removeEntry(possiblePositions, "bottom");
      _removeEntry(possiblePositions, "top");
    } else {
      // Check for space below
      if (targetOffset.height + targetOffset.top + tooltipHeight > windowSize.height) {
        _removeEntry(possiblePositions, "bottom");
      }

      // Check for space above
      if (targetOffset.top - tooltipHeight < 0) {
        _removeEntry(possiblePositions, "top");
      }
    }

    // Check for space to the right
    if (targetOffset.width + targetOffset.left + tooltipWidth > windowSize.width) {
      _removeEntry(possiblePositions, "right");
    }

    // Check for space to the left
    if (targetOffset.left - tooltipWidth < 0) {
      _removeEntry(possiblePositions, "left");
    }

    // At this point, our array only has positions that are valid. Pick the first one, as it remains in order
    if (possiblePositions.length > 0) {
      calculatedPosition = possiblePositions[0];
    }

    // If the requested position is in the list, replace our calculated choice with that
    if (desiredTooltipPosition && desiredTooltipPosition != "auto") {
      if (possiblePositions.indexOf(desiredTooltipPosition) > -1) {
        calculatedPosition = desiredTooltipPosition;
      }
    }

    return calculatedPosition;
  }

  /**
   * Remove an entry from a string array if it's there, does nothing if it isn't there.
   *
   * @param {Array} stringArray
   * @param {String} stringToRemove
   */
  function _removeEntry(stringArray, stringToRemove) {
    if (stringArray.indexOf(stringToRemove) > -1) {
      stringArray.splice(stringArray.indexOf(stringToRemove), 1);
    }
  }

  /**
   * Update the position of the helper layer on the screen
   *
   * @api private
   * @method _setHelperLayerPosition
   * @param {Object} helperLayer
   */
  function _setHelperLayerPosition(helperLayer) {
    if (helperLayer) {
      //prevent error when `this._currentStep` in undefined
      if (!this._introItems[this._currentStep]) return;

      var currentElement = this._introItems[this._currentStep],
          elementPosition = _getOffset(currentElement.element),
          widthHeightPadding = 10;

      if (currentElement.position == 'floating') {
        widthHeightPadding = 0;
      }

      //set new position to helper layer
      helperLayer.setAttribute('style', 'width: ' + (elementPosition.width + widthHeightPadding) + 'px; ' + 'height:' + (elementPosition.height + widthHeightPadding) + 'px; ' + 'top:' + (elementPosition.top - 5) + 'px;' + 'left: ' + (elementPosition.left - 5) + 'px;');
    }
  }

  /**
   * Add disableinteraction layer and adjust the size and position of the layer
   *
   * @api private
   * @method _disableInteraction
   */
  function _disableInteraction() {
    var disableInteractionLayer = document.querySelector('.introjs-disableInteraction');
    if (disableInteractionLayer === null) {
      disableInteractionLayer = document.createElement('div');
      disableInteractionLayer.className = 'introjs-disableInteraction';
      this._targetElement.appendChild(disableInteractionLayer);
    }

    _setHelperLayerPosition.call(this, disableInteractionLayer);
  }

  /**
   * Show an element on the page
   *
   * @api private
   * @method _showElement
   * @param {Object} targetElement
   */
  function _showElement(targetElement) {

    if (typeof this._introChangeCallback !== 'undefined') {
      this._introChangeCallback.call(this, targetElement.element);
    }

    var self = this,
        oldHelperLayer = document.querySelector('.introjs-helperLayer'),
        oldReferenceLayer = document.querySelector('.introjs-tooltipReferenceLayer'),
        highlightClass = 'introjs-helperLayer',
        elementPosition = _getOffset(targetElement.element);

    //check for a current step highlight class
    if (typeof targetElement.highlightClass === 'string') {
      highlightClass += ' ' + targetElement.highlightClass;
    }
    //check for options highlight class
    if (typeof this._options.highlightClass === 'string') {
      highlightClass += ' ' + this._options.highlightClass;
    }

    if (oldHelperLayer != null) {
      var oldHelperNumberLayer = oldReferenceLayer.querySelector('.introjs-helperNumberLayer'),
          oldtooltipLayer = oldReferenceLayer.querySelector('.introjs-tooltiptext'),
          oldArrowLayer = oldReferenceLayer.querySelector('.introjs-arrow'),
          oldtooltipContainer = oldReferenceLayer.querySelector('.introjs-tooltip'),
          skipTooltipButton = oldReferenceLayer.querySelector('.introjs-skipbutton'),
          prevTooltipButton = oldReferenceLayer.querySelector('.introjs-prevbutton'),
          nextTooltipButton = oldReferenceLayer.querySelector('.introjs-nextbutton');

      //update or reset the helper highlight class
      oldHelperLayer.className = highlightClass;
      //hide the tooltip
      oldtooltipContainer.style.opacity = 0;
      oldtooltipContainer.style.display = "none";

      if (oldHelperNumberLayer != null) {
        var lastIntroItem = this._introItems[targetElement.step - 2 >= 0 ? targetElement.step - 2 : 0];

        if (lastIntroItem != null && this._direction == 'forward' && lastIntroItem.position == 'floating' || this._direction == 'backward' && targetElement.position == 'floating') {
          oldHelperNumberLayer.style.opacity = 0;
        }
      }

      //set new position to helper layer
      _setHelperLayerPosition.call(self, oldHelperLayer);
      _setHelperLayerPosition.call(self, oldReferenceLayer);

      //remove `introjs-fixParent` class from the elements
      var fixParents = document.querySelectorAll('.introjs-fixParent');
      if (fixParents && fixParents.length > 0) {
        for (var i = fixParents.length - 1; i >= 0; i--) {
          fixParents[i].className = fixParents[i].className.replace(/introjs-fixParent/g, '').replace(/^\s+|\s+$/g, '');
        };
      }

      //remove old classes
      var oldShowElement = document.querySelector('.introjs-showElement');
      oldShowElement.className = oldShowElement.className.replace(/introjs-[a-zA-Z]+/g, '').replace(/^\s+|\s+$/g, '');

      //we should wait until the CSS3 transition is competed (it's 0.3 sec) to prevent incorrect `height` and `width` calculation
      if (self._lastShowElementTimer) {
        clearTimeout(self._lastShowElementTimer);
      }
      self._lastShowElementTimer = setTimeout(function () {
        //set current step to the label
        if (oldHelperNumberLayer != null) {
          oldHelperNumberLayer.innerHTML = targetElement.step;
        }
        //set current tooltip text
        oldtooltipLayer.innerHTML = targetElement.intro;
        //set the tooltip position
        oldtooltipContainer.style.display = "block";
        _placeTooltip.call(self, targetElement.element, oldtooltipContainer, oldArrowLayer, oldHelperNumberLayer);

        //change active bullet
        oldReferenceLayer.querySelector('.introjs-bullets li > a.active').className = '';
        oldReferenceLayer.querySelector('.introjs-bullets li > a[data-stepnumber="' + targetElement.step + '"]').className = 'active';

        oldReferenceLayer.querySelector('.introjs-progress .introjs-progressbar').setAttribute('style', 'width:' + _getProgress.call(self) + '%;');

        //show the tooltip
        oldtooltipContainer.style.opacity = 1;
        if (oldHelperNumberLayer) oldHelperNumberLayer.style.opacity = 1;

        //reset button focus
        if (nextTooltipButton.tabIndex === -1) {
          //tabindex of -1 means we are at the end of the tour - focus on skip / done
          skipTooltipButton.focus();
        } else {
          //still in the tour, focus on next
          nextTooltipButton.focus();
        }
      }, 350);
    } else {
      var helperLayer = document.createElement('div'),
          referenceLayer = document.createElement('div'),
          arrowLayer = document.createElement('div'),
          tooltipLayer = document.createElement('div'),
          tooltipTextLayer = document.createElement('div'),
          bulletsLayer = document.createElement('div'),
          progressLayer = document.createElement('div'),
          buttonsLayer = document.createElement('div');

      helperLayer.className = highlightClass;
      referenceLayer.className = 'introjs-tooltipReferenceLayer';

      //set new position to helper layer
      _setHelperLayerPosition.call(self, helperLayer);
      _setHelperLayerPosition.call(self, referenceLayer);

      //add helper layer to target element
      this._targetElement.appendChild(helperLayer);
      this._targetElement.appendChild(referenceLayer);

      arrowLayer.className = 'introjs-arrow';

      tooltipTextLayer.className = 'introjs-tooltiptext';
      tooltipTextLayer.innerHTML = targetElement.intro;

      bulletsLayer.className = 'introjs-bullets';

      if (this._options.showBullets === false) {
        bulletsLayer.style.display = 'none';
      }

      var ulContainer = document.createElement('ul');

      for (var i = 0, stepsLength = this._introItems.length; i < stepsLength; i++) {
        var innerLi = document.createElement('li');
        var anchorLink = document.createElement('a');

        anchorLink.onclick = function () {
          self.goToStep(this.getAttribute('data-stepnumber'));
        };

        if (i === targetElement.step - 1) anchorLink.className = 'active';

        anchorLink.href = 'javascript:void(0);';
        anchorLink.innerHTML = "&nbsp;";
        anchorLink.setAttribute('data-stepnumber', this._introItems[i].step);

        innerLi.appendChild(anchorLink);
        ulContainer.appendChild(innerLi);
      }

      bulletsLayer.appendChild(ulContainer);

      progressLayer.className = 'introjs-progress';

      if (this._options.showProgress === false) {
        progressLayer.style.display = 'none';
      }
      var progressBar = document.createElement('div');
      progressBar.className = 'introjs-progressbar';
      progressBar.setAttribute('style', 'width:' + _getProgress.call(this) + '%;');

      progressLayer.appendChild(progressBar);

      buttonsLayer.className = 'introjs-tooltipbuttons';
      if (this._options.showButtons === false) {
        buttonsLayer.style.display = 'none';
      }

      tooltipLayer.className = 'introjs-tooltip';
      tooltipLayer.appendChild(tooltipTextLayer);
      tooltipLayer.appendChild(bulletsLayer);
      tooltipLayer.appendChild(progressLayer);

      //add helper layer number
      if (this._options.showStepNumbers == true) {
        var helperNumberLayer = document.createElement('span');
        helperNumberLayer.className = 'introjs-helperNumberLayer';
        helperNumberLayer.innerHTML = targetElement.step;
        referenceLayer.appendChild(helperNumberLayer);
      }

      tooltipLayer.appendChild(arrowLayer);
      referenceLayer.appendChild(tooltipLayer);

      //next button
      var nextTooltipButton = document.createElement('a');

      nextTooltipButton.onclick = function () {
        if (self._introItems.length - 1 != self._currentStep) {
          _nextStep.call(self);
        }
      };

      nextTooltipButton.href = 'javascript:void(0);';
      nextTooltipButton.innerHTML = this._options.nextLabel;

      //previous button
      var prevTooltipButton = document.createElement('a');

      prevTooltipButton.onclick = function () {
        if (self._currentStep != 0) {
          _previousStep.call(self);
        }
      };

      prevTooltipButton.href = 'javascript:void(0);';
      prevTooltipButton.innerHTML = this._options.prevLabel;

      //skip button
      var skipTooltipButton = document.createElement('a');
      skipTooltipButton.className = 'introjs-button introjs-skipbutton';
      skipTooltipButton.href = 'javascript:void(0);';
      skipTooltipButton.innerHTML = this._options.skipLabel;

      skipTooltipButton.onclick = function () {
        if (self._introItems.length - 1 == self._currentStep && typeof self._introCompleteCallback === 'function') {
          self._introCompleteCallback.call(self);
        }

        if (self._introItems.length - 1 != self._currentStep && typeof self._introExitCallback === 'function') {
          self._introExitCallback.call(self);
        }

        _exitIntro.call(self, self._targetElement);
      };

      buttonsLayer.appendChild(skipTooltipButton);

      //in order to prevent displaying next/previous button always
      if (this._introItems.length > 1) {
        buttonsLayer.appendChild(prevTooltipButton);
        buttonsLayer.appendChild(nextTooltipButton);
      }

      tooltipLayer.appendChild(buttonsLayer);

      //set proper position
      _placeTooltip.call(self, targetElement.element, tooltipLayer, arrowLayer, helperNumberLayer);
    }

    //disable interaction
    if (this._options.disableInteraction === true) {
      _disableInteraction.call(self);
    }

    prevTooltipButton.removeAttribute('tabIndex');
    nextTooltipButton.removeAttribute('tabIndex');

    if (this._currentStep == 0 && this._introItems.length > 1) {
      prevTooltipButton.className = 'introjs-button introjs-prevbutton introjs-disabled';
      prevTooltipButton.tabIndex = '-1';
      nextTooltipButton.className = 'introjs-button introjs-nextbutton';
      skipTooltipButton.innerHTML = this._options.skipLabel;
    } else if (this._introItems.length - 1 == this._currentStep || this._introItems.length == 1) {
      skipTooltipButton.innerHTML = this._options.doneLabel;
      prevTooltipButton.className = 'introjs-button introjs-prevbutton';
      nextTooltipButton.className = 'introjs-button introjs-nextbutton introjs-disabled';
      nextTooltipButton.tabIndex = '-1';
    } else {
      prevTooltipButton.className = 'introjs-button introjs-prevbutton';
      nextTooltipButton.className = 'introjs-button introjs-nextbutton';
      skipTooltipButton.innerHTML = this._options.skipLabel;
    }

    //Set focus on "next" button, so that hitting Enter always moves you onto the next step
    nextTooltipButton.focus();

    //add target element position style
    targetElement.element.className += ' introjs-showElement';

    var currentElementPosition = _getPropValue(targetElement.element, 'position');
    if (currentElementPosition !== 'absolute' && currentElementPosition !== 'relative') {
      //change to new intro item
      targetElement.element.className += ' introjs-relativePosition';
    }

    var parentElm = targetElement.element.parentNode;
    while (parentElm != null) {
      if (parentElm.tagName.toLowerCase() === 'body') break;

      //fix The Stacking Contenxt problem.
      //More detail: https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context
      var zIndex = _getPropValue(parentElm, 'z-index');
      var opacity = parseFloat(_getPropValue(parentElm, 'opacity'));
      var transform = _getPropValue(parentElm, 'transform') || _getPropValue(parentElm, '-webkit-transform') || _getPropValue(parentElm, '-moz-transform') || _getPropValue(parentElm, '-ms-transform') || _getPropValue(parentElm, '-o-transform');
      if (/[0-9]+/.test(zIndex) || opacity < 1 || transform !== 'none' && transform !== undefined) {
        parentElm.className += ' introjs-fixParent';
      }

      parentElm = parentElm.parentNode;
    }

    if (!_elementInViewport(targetElement.element) && this._options.scrollToElement === true) {
      var rect = targetElement.element.getBoundingClientRect(),
          winHeight = _getWinSize().height,
          top = rect.bottom - (rect.bottom - rect.top),
          bottom = rect.bottom - winHeight;

      //Scroll up
      if (top < 0 || targetElement.element.clientHeight > winHeight) {
        window.scrollBy(0, top - 30); // 30px padding from edge to look nice

        //Scroll down
      } else {
        window.scrollBy(0, bottom + 100); // 70px + 30px padding from edge to look nice
      }
    }

    if (typeof this._introAfterChangeCallback !== 'undefined') {
      this._introAfterChangeCallback.call(this, targetElement.element);
    }
  }

  /**
   * Get an element CSS property on the page
   * Thanks to JavaScript Kit: http://www.javascriptkit.com/dhtmltutors/dhtmlcascade4.shtml
   *
   * @api private
   * @method _getPropValue
   * @param {Object} element
   * @param {String} propName
   * @returns Element's property value
   */
  function _getPropValue(element, propName) {
    var propValue = '';
    if (element.currentStyle) {
      //IE
      propValue = element.currentStyle[propName];
    } else if (document.defaultView && document.defaultView.getComputedStyle) {
      //Others
      propValue = document.defaultView.getComputedStyle(element, null).getPropertyValue(propName);
    }

    //Prevent exception in IE
    if (propValue && propValue.toLowerCase) {
      return propValue.toLowerCase();
    } else {
      return propValue;
    }
  }

  /**
   * Provides a cross-browser way to get the screen dimensions
   * via: http://stackoverflow.com/questions/5864467/internet-explorer-innerheight
   *
   * @api private
   * @method _getWinSize
   * @returns {Object} width and height attributes
   */
  function _getWinSize() {
    if (window.innerWidth != undefined) {
      return { width: window.innerWidth, height: window.innerHeight };
    } else {
      var D = document.documentElement;
      return { width: D.clientWidth, height: D.clientHeight };
    }
  }

  /**
   * Add overlay layer to the page
   * http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
   *
   * @api private
   * @method _elementInViewport
   * @param {Object} el
   */
  function _elementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return rect.top >= 0 && rect.left >= 0 && rect.bottom + 80 <= window.innerHeight && // add 80 to get the text right
    rect.right <= window.innerWidth;
  }

  /**
   * Add overlay layer to the page
   *
   * @api private
   * @method _addOverlayLayer
   * @param {Object} targetElm
   */
  function _addOverlayLayer(targetElm) {
    var overlayLayer = document.createElement('div'),
        styleText = '',
        self = this;

    //set css class name
    overlayLayer.className = 'introjs-overlay';

    //check if the target element is body, we should calculate the size of overlay layer in a better way
    if (targetElm.tagName.toLowerCase() === 'body') {
      styleText += 'top: 0;bottom: 0; left: 0;right: 0;position: fixed;';
      overlayLayer.setAttribute('style', styleText);
    } else {
      //set overlay layer position
      var elementPosition = _getOffset(targetElm);
      if (elementPosition) {
        styleText += 'width: ' + elementPosition.width + 'px; height:' + elementPosition.height + 'px; top:' + elementPosition.top + 'px;left: ' + elementPosition.left + 'px;';
        overlayLayer.setAttribute('style', styleText);
      }
    }

    targetElm.appendChild(overlayLayer);

    overlayLayer.onclick = function () {
      if (self._options.exitOnOverlayClick == true) {

        //check if any callback is defined
        if (self._introExitCallback != undefined) {
          self._introExitCallback.call(self);
        }
        _exitIntro.call(self, targetElm);
      }
    };

    setTimeout(function () {
      styleText += 'opacity: ' + self._options.overlayOpacity.toString() + ';';
      overlayLayer.setAttribute('style', styleText);
    }, 10);

    return true;
  }

  /**
   * Get an element position on the page
   * Thanks to `meouw`: http://stackoverflow.com/a/442474/375966
   *
   * @api private
   * @method _getOffset
   * @param {Object} element
   * @returns Element's position info
   */
  function _getOffset(element) {
    var elementPosition = {};

    //set width
    elementPosition.width = element.offsetWidth;

    //set height
    elementPosition.height = element.offsetHeight;

    //calculate element top and left
    var _x = 0;
    var _y = 0;
    while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
      _x += element.offsetLeft;
      _y += element.offsetTop;
      element = element.offsetParent;
    }
    //set top
    elementPosition.top = _y;
    //set left
    elementPosition.left = _x;

    return elementPosition;
  }

  /**
   * Gets the current progress percentage
   *
   * @api private
   * @method _getProgress
   * @returns current progress percentage
   */
  function _getProgress() {
    // Steps are 0 indexed
    var currentStep = parseInt(this._currentStep + 1, 10);
    return currentStep / this._introItems.length * 100;
  }

  /**
   * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
   * via: http://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
   *
   * @param obj1
   * @param obj2
   * @returns obj3 a new object based on obj1 and obj2
   */
  function _mergeOptions(obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) {
      obj3[attrname] = obj1[attrname];
    }
    for (var attrname in obj2) {
      obj3[attrname] = obj2[attrname];
    }
    return obj3;
  }

  var introJs = function introJs(targetElm) {
    if ((typeof targetElm === 'undefined' ? 'undefined' : _typeof(targetElm)) === 'object') {
      //Ok, create a new instance
      return new IntroJs(targetElm);
    } else if (typeof targetElm === 'string') {
      //select the target element with query selector
      var targetElement = document.querySelector(targetElm);

      if (targetElement) {
        return new IntroJs(targetElement);
      } else {
        throw new Error('There is no element with given selector.');
      }
    } else {
      return new IntroJs(document.body);
    }
  };

  /**
   * Current IntroJs version
   *
   * @property version
   * @type String
   */
  introJs.version = VERSION;

  //Prototype
  introJs.fn = IntroJs.prototype = {
    clone: function clone() {
      return new IntroJs(this);
    },
    setOption: function setOption(option, value) {
      this._options[option] = value;
      return this;
    },
    setOptions: function setOptions(options) {
      this._options = _mergeOptions(this._options, options);
      return this;
    },
    start: function start() {
      _introForElement.call(this, this._targetElement);
      return this;
    },
    goToStep: function goToStep(step) {
      _goToStep.call(this, step);
      return this;
    },
    nextStep: function nextStep() {
      _nextStep.call(this);
      return this;
    },
    previousStep: function previousStep() {
      _previousStep.call(this);
      return this;
    },
    exit: function exit() {
      _exitIntro.call(this, this._targetElement);
      return this;
    },
    refresh: function refresh() {
      _setHelperLayerPosition.call(this, document.querySelector('.introjs-helperLayer'));
      _setHelperLayerPosition.call(this, document.querySelector('.introjs-tooltipReferenceLayer'));
      return this;
    },
    onbeforechange: function onbeforechange(providedCallback) {
      if (typeof providedCallback === 'function') {
        this._introBeforeChangeCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onbeforechange was not a function');
      }
      return this;
    },
    onchange: function onchange(providedCallback) {
      if (typeof providedCallback === 'function') {
        this._introChangeCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onchange was not a function.');
      }
      return this;
    },
    onafterchange: function onafterchange(providedCallback) {
      if (typeof providedCallback === 'function') {
        this._introAfterChangeCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onafterchange was not a function');
      }
      return this;
    },
    oncomplete: function oncomplete(providedCallback) {
      if (typeof providedCallback === 'function') {
        this._introCompleteCallback = providedCallback;
      } else {
        throw new Error('Provided callback for oncomplete was not a function.');
      }
      return this;
    },
    onexit: function onexit(providedCallback) {
      if (typeof providedCallback === 'function') {
        this._introExitCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onexit was not a function.');
      }
      return this;
    }
  };

  exports.introJs = introJs;
  return introJs;
});

/***/ }),
/* 23 */
/***/ (function(module, exports) {

/*!
* screenfull
* v3.0.0 - 2015-11-24
* (c) Sindre Sorhus; MIT License
*/
(function () {
	'use strict';

	var isCommonjs = typeof module !== 'undefined' && module.exports;
	var keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;

	var fn = function () {
		var val;
		var valLength;

		var fnMap = [['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'],
		// new WebKit
		['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'],
		// old WebKit (Safari 5.1)
		['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'], ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'], ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']];

		var i = 0;
		var l = fnMap.length;
		var ret = {};

		for (; i < l; i++) {
			val = fnMap[i];
			if (val && val[1] in document) {
				for (i = 0, valLength = val.length; i < valLength; i++) {
					ret[fnMap[0][i]] = val[i];
				}
				return ret;
			}
		}

		return false;
	}();

	var screenfull = {
		request: function request(elem) {
			var request = fn.requestFullscreen;

			elem = elem || document.documentElement;

			// Work around Safari 5.1 bug: reports support for
			// keyboard in fullscreen even though it doesn't.
			// Browser sniffing, since the alternative with
			// setTimeout is even worse.
			if (/5\.1[\.\d]* Safari/.test(navigator.userAgent)) {
				elem[request]();
			} else {
				elem[request](keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT);
			}
		},
		exit: function exit() {
			document[fn.exitFullscreen]();
		},
		toggle: function toggle(elem) {
			if (this.isFullscreen) {
				this.exit();
			} else {
				this.request(elem);
			}
		},
		raw: fn
	};

	if (!fn) {
		if (isCommonjs) {
			module.exports = false;
		} else {
			window.screenfull = false;
		}

		return;
	}

	Object.defineProperties(screenfull, {
		isFullscreen: {
			get: function get() {
				return Boolean(document[fn.fullscreenElement]);
			}
		},
		element: {
			enumerable: true,
			get: function get() {
				return document[fn.fullscreenElement];
			}
		},
		enabled: {
			enumerable: true,
			get: function get() {
				// Coerce to boolean in case of old WebKit
				return Boolean(document[fn.fullscreenEnabled]);
			}
		}
	});

	if (isCommonjs) {
		module.exports = screenfull;
	} else {
		window.screenfull = screenfull;
	}
})();

/***/ }),
/* 24 */
/***/ (function(module, exports) {

/*! jQuery slidePanel - v0.2.2 - 2015-10-14
 * https://github.com/amazingSurge/jquery-slidePanel
 * Copyright (c) 2015 amazingSurge; Licensed GPL */
(function ($, document, window, undefined) {
    "use strict";

    var SlidePanel = $.slidePanel = function () {
        SlidePanel.show.apply(this, arguments);
    };

    if (!Date.now) {
        Date.now = function () {
            return new Date().getTime();
        };
    }

    function getTime() {
        if (typeof window.performance !== 'undefined' && window.performance.now) {
            return window.performance.now();
        } else {
            return Date.now();
        }
    }

    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame'];
    }
    if (/iP(ad|hone|od).*OS (6|7|8)/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function (callback) {
            var now = getTime();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function () {
                callback(lastTime = nextTime);
            }, nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }

    var Support = function () {
        var style = $('<support>').get(0).style,
            prefixes = ['webkit', 'Moz', 'O', 'ms'],
            events = {
            transition: {
                end: {
                    WebkitTransition: 'webkitTransitionEnd',
                    MozTransition: 'transitionend',
                    OTransition: 'oTransitionEnd',
                    transition: 'transitionend'
                }
            },
            animation: {
                end: {
                    WebkitAnimation: 'webkitAnimationEnd',
                    MozAnimation: 'animationend',
                    OAnimation: 'oAnimationEnd',
                    animation: 'animationend'
                }
            }
        },
            tests = {
            csstransforms: function csstransforms() {
                return !!test('transform');
            },
            csstransforms3d: function csstransforms3d() {
                return !!test('perspective');
            },
            csstransitions: function csstransitions() {
                return !!test('transition');
            },
            cssanimations: function cssanimations() {
                return !!test('animation');
            }
        };

        function test(property, prefixed) {
            var result = false,
                upper = property.charAt(0).toUpperCase() + property.slice(1);

            if (style[property] !== undefined) {
                result = property;
            }
            if (!result) {
                $.each(prefixes, function (i, prefix) {
                    if (style[prefix + upper] !== undefined) {
                        result = '-' + prefix.toLowerCase() + '-' + upper;
                        return false;
                    }
                });
            }

            if (prefixed) {
                return result;
            }
            if (result) {
                return true;
            } else {
                return false;
            }
        }

        function prefixed(property) {
            return test(property, true);
        }
        var support = {};
        if (tests.csstransitions()) {
            /* jshint -W053 */
            support.transition = new String(prefixed('transition'));
            support.transition.end = events.transition.end[support.transition];
        }

        if (tests.cssanimations()) {
            /* jshint -W053 */
            support.animation = new String(prefixed('animation'));
            support.animation.end = events.animation.end[support.animation];
        }

        if (tests.csstransforms()) {
            /* jshint -W053 */
            support.transform = new String(prefixed('transform'));
            support.transform3d = tests.csstransforms3d();
        }

        if ('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch) {
            support.touch = true;
        } else {
            support.touch = false;
        }

        if (window.PointerEvent || window.MSPointerEvent) {
            support.pointer = true;
        } else {
            support.pointer = false;
        }

        support.prefixPointerEvent = function (pointerEvent) {
            return window.MSPointerEvent ? 'MSPointer' + pointerEvent.charAt(9).toUpperCase() + pointerEvent.substr(10) : pointerEvent;
        };

        return support;
    }();

    function isPercentage(n) {
        return typeof n === 'string' && n.indexOf('%') != -1;
    }

    function isPx(n) {
        return typeof n === 'string' && n.indexOf('px') != -1;
    }

    function convertMatrixToArray(value) {
        if (value && value.substr(0, 6) == "matrix") {
            return value.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, '').split(/, +/);
        }
        return false;
    }

    function getHashCode(object) {
        if (typeof object !== 'string') {
            object = JSON.stringify(object);
        }

        var hash = 0,
            i,
            chr,
            len;
        if (object.length === 0) return hash;
        for (i = 0, len = object.length; i < len; i++) {
            chr = object.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0; // Convert to 32bit integer
        }

        return hash;
    }

    function easingBezier(mX1, mY1, mX2, mY2) {
        function a(aA1, aA2) {
            return 1.0 - 3.0 * aA2 + 3.0 * aA1;
        }

        function b(aA1, aA2) {
            return 3.0 * aA2 - 6.0 * aA1;
        }

        function c(aA1) {
            return 3.0 * aA1;
        }

        // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
        function calcBezier(aT, aA1, aA2) {
            return ((a(aA1, aA2) * aT + b(aA1, aA2)) * aT + c(aA1)) * aT;
        }

        // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
        function getSlope(aT, aA1, aA2) {
            return 3.0 * a(aA1, aA2) * aT * aT + 2.0 * b(aA1, aA2) * aT + c(aA1);
        }

        function getTForX(aX) {
            // Newton raphson iteration
            var aGuessT = aX;
            for (var i = 0; i < 4; ++i) {
                var currentSlope = getSlope(aGuessT, mX1, mX2);
                if (currentSlope === 0.0) return aGuessT;
                var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
                aGuessT -= currentX / currentSlope;
            }
            return aGuessT;
        }

        if (mX1 === mY1 && mX2 === mY2) {
            return {
                css: 'linear',
                fn: function fn(aX) {
                    return aX;
                }
            };
        } else {
            return {
                css: 'cubic-bezier(' + mX1 + ',' + mY1 + ',' + mX2 + ',' + mY2 + ')',
                fn: function fn(aX) {
                    return calcBezier(getTForX(aX), mY1, mY2);
                }
            };
        }
    }

    var Easings = {
        'ease': easingBezier(0.25, 0.1, 0.25, 1.0),
        'linear': easingBezier(0.00, 0.0, 1.00, 1.0),
        'ease-in': easingBezier(0.42, 0.0, 1.00, 1.0),
        'ease-out': easingBezier(0.00, 0.0, 0.58, 1.0),
        'ease-in-out': easingBezier(0.42, 0.0, 0.58, 1.0)
    };

    SlidePanel.options = {
        skin: null,

        classes: {
            base: 'slidePanel',
            show: 'slidePanel-show',
            loading: 'slidePanel-loading',
            content: 'slidePanel-content',
            dragging: 'slidePanel-dragging',
            willClose: 'slidePanel-will-close'
        },

        closeSelector: null,

        template: function template(options) {
            return '<div class="' + options.classes.base + ' ' + options.classes.base + '-' + options.direction + '">' + '<div class="' + options.classes.content + '"></div>' + '</div>';
        },

        loading: {
            appendTo: 'panel', // body, panel
            template: function template(options) {
                return '<div class="' + options.classes.loading + '"></div>';
            },
            showCallback: function showCallback(options) {
                this.$el.addClass(options.classes.loading + '-show');
            },
            hideCallback: function hideCallback(options) {
                this.$el.removeClass(options.classes.loading + '-show');
            }
        },

        contentFilter: function contentFilter(content, object) {
            return content;
        },

        useCssTransforms3d: true,
        useCssTransforms: true,
        useCssTransitions: true,

        dragTolerance: 150,

        mouseDragHandler: null,
        mouseDrag: true,
        touchDrag: true,
        pointerDrag: true,

        direction: 'right', // top, bottom, left, right
        duration: '500',
        easing: 'ease', // linear, ease-in, ease-out, ease-in-out

        // callbacks
        beforeLoad: $.noop, // Before loading
        afterLoad: $.noop, // After loading
        beforeShow: $.noop, // Before opening
        afterShow: $.noop, // After opening
        onChange: $.noop, // On changing
        beforeChange: $.noop, // Before changing
        beforeHide: $.noop, // Before closing
        afterHide: $.noop, // After closing
        beforeDrag: $.noop, // Before drag
        afterDrag: $.noop // After drag
    };

    // View
    function View() {
        return this.initialize.apply(this, Array.prototype.slice.call(arguments));
    }

    $.extend(View.prototype, {
        initialize: function initialize(options) {
            this.options = options;
            this._instance = null;
            this._showed = false;
            this._isLoading = false;

            this.build();
        },

        setLength: function setLength() {
            switch (this.options.direction) {
                case 'top':
                case 'bottom':
                    this._length = this.$panel.outerHeight();
                    break;
                case 'left':
                case 'right':
                    this._length = this.$panel.outerWidth();
                    break;
            }
        },

        build: function build() {
            if (this._builded) return;

            var options = this.options;

            var html = options.template.call(this, options);
            var self = this;

            this.$panel = $(html).appendTo('body');
            if (options.skin) {
                this.$panel.addClass(options.skin);
            }
            this.$content = this.$panel.find('.' + this.options.classes.content);

            if (options.closeSelector) {
                this.$panel.on('click', options.closeSelector, function () {
                    self.hide();
                    return false;
                });
            }
            this.loading = new Loading(this);

            this.setLength();
            this.setPosition(this.getHidePosition());

            if (options.mouseDrag || options.touchDrag || options.pointerDrag) {
                this.drag = new Drag(this);
            }

            this._builded = true;
        },

        getHidePosition: function getHidePosition() {
            var options = this.options;

            if (options.useCssTransforms || options.useCssTransforms3d) {
                switch (options.direction) {
                    case 'top':
                    case 'left':
                        return '-100';
                    case 'bottom':
                    case 'right':
                        return '100';
                }
            } else {
                switch (options.direction) {
                    case 'top':
                    case 'bottom':
                        return parseFloat(-(this._length / $(window).height()) * 100, 10);
                    case 'left':
                    case 'right':
                        return parseFloat(-(this._length / $(window).width()) * 100, 10);
                }
            }
        },

        empty: function empty() {
            this._instance = null;
            this.$content.empty();
        },

        load: function load(object) {
            var self = this;
            var options = object.options;
            var previous = this._instance;

            _SlidePanel.trigger(this, 'beforeLoad', object);
            this.empty();

            function setContent(content) {
                content = options.contentFilter.call(this, content, object);
                self.$content.html(content);
                self.hideLoading();

                self._instance = object;

                _SlidePanel.trigger(self, 'afterLoad', object);
            }

            if (object.content) {
                setContent(object.content);
            } else if (object.url) {
                this.showLoading();

                $.ajax(object.url, object.settings || {}).done(function (data) {
                    setContent(data);
                });
            } else {
                setContent('');
            }
        },

        showLoading: function showLoading() {
            var self = this;
            this.loading.show(function () {
                self._isLoading = true;
            });
        },

        hideLoading: function hideLoading() {
            var self = this;
            this.loading.hide(function () {
                self._isLoading = false;
            });
        },

        show: function show(callback) {
            this.build();

            _SlidePanel.enter('show');
            _SlidePanel.trigger(this, 'beforeShow');

            $('html').addClass(this.options.classes.base + '-html');
            this.$panel.addClass(this.options.classes.show);

            var self = this;
            Animate.do(this, 0, function () {
                self._showed = true;
                _SlidePanel.trigger(self, 'afterShow');

                if ($.isFunction(callback)) {
                    callback.call(self);
                }
            });
        },

        change: function change(object) {
            _SlidePanel.trigger(this, 'beforeShow');

            _SlidePanel.trigger(this, 'onChange', object, this._instance);

            this.load(object);

            _SlidePanel.trigger(this, 'afterShow');
        },

        revert: function revert(callback) {
            var self = this;
            Animate.do(this, 0, function () {
                if ($.isFunction(callback)) {
                    callback.call(self);
                }
            });
        },

        hide: function hide(callback) {
            _SlidePanel.leave('show');
            _SlidePanel.trigger(this, 'beforeHide');

            var self = this;

            Animate.do(this, this.getHidePosition(), function () {
                self.$panel.removeClass(self.options.classes.show);
                self._showed = false;
                self._instance = null;

                if (_SlidePanel._current === self) {
                    _SlidePanel._current = null;
                }

                if (!_SlidePanel.is('show')) {
                    $('html').removeClass(self.options.classes.base + '-html');
                }

                if ($.isFunction(callback)) {
                    callback.call(self);
                }

                _SlidePanel.trigger(self, 'afterHide');
            });
        },

        makePositionStyle: function makePositionStyle(value) {
            var property,
                x = '0',
                y = '0';

            if (!isPercentage(value) && !isPx(value)) {
                value = value + '%';
            }

            if (this.options.useCssTransforms && Support.transform) {
                if (this.options.direction === 'left' || this.options.direction === 'right') {
                    x = value;
                } else {
                    y = value;
                }

                property = Support.transform.toString();

                if (this.options.useCssTransforms3d && Support.transform3d) {
                    value = "translate3d(" + x + "," + y + ",0)";
                } else {
                    value = "translate(" + x + "," + y + ")";
                }
            } else {
                property = this.options.direction;
            }
            var temp = {};
            temp[property] = value;
            return temp;
        },

        getPosition: function getPosition(px) {
            var value;

            if (this.options.useCssTransforms && Support.transform) {
                value = convertMatrixToArray(this.$panel.css(Support.transform));
                if (!value) {
                    return 0;
                }

                if (this.options.direction === 'left' || this.options.direction === 'right') {
                    value = value[12] || value[4];
                } else {
                    value = value[13] || value[5];
                }
            } else {
                value = this.$panel.css(this.options.direction);

                value = parseFloat(value.replace('px', ''));
            }

            if (px !== true) {
                value = value / this._length * 100;
            }

            return parseFloat(value, 10);
        },

        setPosition: function setPosition(value) {
            var style = this.makePositionStyle(value);
            this.$panel.css(style);
        }
    });

    // Loading
    function Loading() {
        return this.initialize.apply(this, Array.prototype.slice.call(arguments));
    };

    $.extend(Loading.prototype, {
        initialize: function initialize(view) {
            this._view = view;
            this.build();
        },

        build: function build() {
            if (this._builded) return;

            var options = this._view.options;
            var html = options.loading.template.call(this, options);
            this.$el = $(html);

            switch (options.loading.appendTo) {
                case 'panel':
                    this.$el.appendTo(this._view.$panel);
                    break;
                case 'body':
                    this.$el.appendTo('body');
                    break;
                default:
                    this.$el.appendTo(options.loading.appendTo);
            }

            this._builded = true;
        },

        show: function show(callback) {
            this.build();
            var options = this._view.options;
            options.loading.showCallback.call(this, options);

            if ($.isFunction(callback)) {
                callback.call(this);
            }
        },

        hide: function hide(callback) {
            var options = this._view.options;
            options.loading.hideCallback.call(this, options);

            if ($.isFunction(callback)) {
                callback.call(this);
            }
        }
    });

    var Animate = {
        prepareTransition: function prepareTransition($el, property, duration, easing, delay) {
            var temp = [];
            if (property) {
                temp.push(property);
            }
            if (duration) {
                if ($.isNumeric(duration)) {
                    duration = duration + 'ms';
                }
                temp.push(duration);
            }
            if (easing) {
                temp.push(easing);
            } else {
                temp.push(this.easing.css);
            }
            if (delay) {
                temp.push(delay);
            }
            $el.css(Support.transition, temp.join(' '));
        },
        do: function _do(view, value, callback) {
            _SlidePanel.enter('animating');

            var duration = view.options.duration,
                easing = view.options.easing || 'ease';

            var self = this,
                style = view.makePositionStyle(value);
            for (var property in style) {
                break;
            }

            if (view.options.useCssTransitions && Support.transition) {
                setTimeout(function () {
                    self.prepareTransition(view.$panel, property, duration, easing);
                }, 20);

                view.$panel.one(Support.transition.end, function () {
                    if ($.isFunction(callback)) {
                        callback();
                    }

                    view.$panel.css(Support.transition, '');

                    _SlidePanel.leave('animating');
                });
                setTimeout(function () {
                    view.setPosition(value);
                }, 20);
            } else {
                var startTime = getTime();
                var start = view.getPosition();
                var end = value;

                var run = function run(time) {
                    var percent = (time - startTime) / view.options.duration;

                    if (percent > 1) {
                        percent = 1;
                    }

                    percent = Easings[easing].fn(percent);

                    var current = parseFloat(start + percent * (end - start), 10);

                    view.setPosition(current);

                    if (percent === 1) {
                        window.cancelAnimationFrame(self._frameId);
                        self._frameId = null;

                        if ($.isFunction(callback)) {
                            callback();
                        }

                        _SlidePanel.leave('animating');
                    } else {
                        self._frameId = window.requestAnimationFrame(run);
                    }
                };

                self._frameId = window.requestAnimationFrame(run);
            }
        }

        // Drag
    };function Drag() {
        return this.initialize.apply(this, Array.prototype.slice.call(arguments));
    }

    $.extend(Drag.prototype, {
        initialize: function initialize(view) {
            this._view = view;
            this.options = view.options;
            this._drag = {
                time: null,
                pointer: null
            };

            this.bindEvents();
        },
        bindEvents: function bindEvents() {
            var self = this;
            var options = this.options,
                $panel = this._view.$panel;

            if (options.mouseDrag) {
                $panel.on(_SlidePanel.eventName('mousedown'), $.proxy(this.onDragStart, this));
                $panel.on(_SlidePanel.eventName('dragstart selectstart'), function () {
                    if (options.mouseDragHandler) {
                        if (!$(event.target).is(options.mouseDragHandler) && !($(event.target).parents(options.mouseDragHandler).length > 0)) {
                            return;
                        }
                    }
                    return false;
                });
            }

            if (options.touchDrag && Support.touch) {
                $panel.on(_SlidePanel.eventName('touchstart'), $.proxy(this.onDragStart, this));
                $panel.on(_SlidePanel.eventName('touchcancel'), $.proxy(this.onDragEnd, this));
            }

            if (options.pointerDrag && Support.pointer) {
                $panel.on(_SlidePanel.eventName(Support.prefixPointerEvent('pointerdown')), $.proxy(this.onDragStart, this));
                $panel.on(_SlidePanel.eventName(Support.prefixPointerEvent('pointercancel')), $.proxy(this.onDragEnd, this));
            }
        },

        /**
         * Handles `touchstart` and `mousedown` events.
         */
        onDragStart: function onDragStart(event) {
            var self = this;

            if (event.which === 3) {
                return;
            }

            var options = this.options;

            this._view.$panel.addClass(this.options.classes.dragging);

            this._position = this._view.getPosition(true);

            this._drag.time = new Date().getTime();
            this._drag.pointer = this.pointer(event);

            var callback = function callback() {
                _SlidePanel.enter('dragging');
                _SlidePanel.trigger(self._view, 'beforeDrag');
            };

            if (options.mouseDrag) {
                if (options.mouseDragHandler) {
                    if (!$(event.target).is(options.mouseDragHandler) && !($(event.target).parents(options.mouseDragHandler).length > 0)) {
                        return;
                    }
                }

                $(document).on(_SlidePanel.eventName('mouseup'), $.proxy(this.onDragEnd, this));

                $(document).one(_SlidePanel.eventName('mousemove'), $.proxy(function () {
                    $(document).on(_SlidePanel.eventName('mousemove'), $.proxy(this.onDragMove, this));

                    callback();
                }, this));
            }

            if (options.touchDrag && Support.touch) {
                $(document).on(_SlidePanel.eventName('touchend'), $.proxy(this.onDragEnd, this));

                $(document).one(_SlidePanel.eventName('touchmove'), $.proxy(function () {
                    $(document).on(_SlidePanel.eventName('touchmove'), $.proxy(this.onDragMove, this));

                    callback();
                }, this));
            }

            if (options.pointerDrag && Support.pointer) {
                $(document).on(_SlidePanel.eventName(Support.prefixPointerEvent('pointerup')), $.proxy(this.onDragEnd, this));

                $(document).one(_SlidePanel.eventName(Support.prefixPointerEvent('pointermove')), $.proxy(function () {
                    $(document).on(_SlidePanel.eventName(Support.prefixPointerEvent('pointermove')), $.proxy(this.onDragMove, this));

                    callback();
                }, this));
            }

            $(document).on(_SlidePanel.eventName('blur'), $.proxy(this.onDragEnd, this));

            event.preventDefault();
        },

        /**
         * Handles the `touchmove` and `mousemove` events.
         */
        onDragMove: function onDragMove(event) {
            var distance = this.distance(this._drag.pointer, this.pointer(event));

            if (!_SlidePanel.is('dragging')) {
                return;
            }

            if (Math.abs(distance) > this.options.dragTolerance) {
                if (this._willClose !== true) {
                    this._willClose = true;
                    this._view.$panel.addClass(this.options.classes.willClose);
                }
            } else {
                if (this._willClose !== false) {
                    this._willClose = false;
                    this._view.$panel.removeClass(this.options.classes.willClose);
                }
            }

            if (!_SlidePanel.is('dragging')) {
                return;
            }

            event.preventDefault();
            this.move(distance);
        },

        /**
         * Handles the `touchend` and `mouseup` events.
         */
        onDragEnd: function onDragEnd(event) {
            var distance = this.distance(this._drag.pointer, this.pointer(event));

            $(document).off(_SlidePanel.eventName('mousemove mouseup touchmove touchend pointermove pointerup MSPointerMove MSPointerUp blur'));

            this._view.$panel.removeClass(this.options.classes.dragging);

            if (this._willClose === true) {
                this._willClose = false;
                this._view.$panel.removeClass(this.options.classes.willClose);
            }

            if (!_SlidePanel.is('dragging')) {
                return;
            }

            _SlidePanel.leave('dragging');

            _SlidePanel.trigger(this._view, 'afterDrag');

            if (Math.abs(distance) < this.options.dragTolerance) {
                this._view.revert();
            } else {
                _SlidePanel.hide();
            }
        },

        /**
         * Gets unified pointer coordinates from event.
         * @returns {Object} - Contains `x` and `y` coordinates of current pointer position.
         */
        pointer: function pointer(event) {
            var result = {
                x: null,
                y: null
            };

            event = event.originalEvent || event || window.event;

            event = event.touches && event.touches.length ? event.touches[0] : event.changedTouches && event.changedTouches.length ? event.changedTouches[0] : event;

            if (event.pageX) {
                result.x = event.pageX;
                result.y = event.pageY;
            } else {
                result.x = event.clientX;
                result.y = event.clientY;
            }

            return result;
        },

        /**distance
         * Gets the distance of two pointer.
         */
        distance: function distance(first, second) {
            var d = this.options.direction;
            if (d === 'left' || d === 'right') {
                return second.x - first.x;
            } else {
                return second.y - first.y;
            }
        },

        move: function move(value) {
            var position = this._position + value;

            if (this.options.direction === 'right' || this.options.direction === 'bottom') {
                if (position < 0) {
                    return;
                }
            } else {
                if (position > 0) {
                    return;
                }
            }

            if (!this.options.useCssTransforms && !this.options.useCssTransforms3d) {
                if (this.options.direction === 'right' || this.options.direction === 'bottom') {
                    position = -position;
                }
            }

            this._view.setPosition(position + 'px');
        }
    });

    // Instance
    function Instance() {
        return this.initialize.apply(this, Array.prototype.slice.call(arguments));
    };

    $.extend(Instance.prototype, {
        initialize: function initialize(object) {
            var options = arguments[1] || {};

            if (typeof object === 'string') {
                object = {
                    url: object
                };
            } else if (object && object.nodeType == 1) {
                var $element = $(object);

                object = {
                    url: $element.attr('href'),
                    settings: $element.data('settings') || {},
                    options: $element.data() || {}
                };
            }

            if (object && object.options) {
                object.options = $.extend(true, options, object.options);
            } else {
                object.options = options;
            }

            object.options = $.extend(true, {}, SlidePanel.options, object.options);

            $.extend(this, object);

            return this;
        }
    });

    var _SlidePanel = {
        // Current state information.
        _states: {},
        _views: {},
        _current: null,

        /**
         * Checks whether the carousel is in a specific state or not.
         */
        is: function is(state) {
            return this._states[state] && this._states[state] > 0;
        },

        /**
         * Enters a state.
         */
        enter: function enter(state) {
            if (this._states[state] === undefined) {
                this._states[state] = 0;
            }

            this._states[state]++;
        },

        /**
         * Leaves a state.
         */
        leave: function leave(state) {
            this._states[state]--;
        },

        trigger: function trigger(view, event) {
            var method_arguments = Array.prototype.slice.call(arguments, 2),
                data = [view].concat(method_arguments);

            // event
            $(document).trigger('slidePanel::' + event, data);
            if ($.isFunction(view.options[event])) {
                view.options[event].apply(view, method_arguments);
            }
        },

        eventName: function eventName(events) {
            if (typeof events !== 'string' || events === '') {
                return '.slidepanel';
            }
            events = events.split(' ');

            var length = events.length;
            for (var i = 0; i < length; i++) {
                events[i] = events[i] + '.slidepanel';
            }
            return events.join(' ');
        },

        show: function show(object) {
            if (!(object instanceof Instance)) {
                switch (arguments.length) {
                    case 0:
                        object = new Instance();
                        break;
                    case 1:
                        object = new Instance(arguments[0]);
                        break;
                    case 2:
                        object = new Instance(arguments[0], arguments[1]);
                        break;
                }
            }

            var view = this.getView(object.options);
            var self = this;
            var callback = function callback() {
                view.show();
                view.load(object);
                self._current = view;
            };
            if (null !== this._current) {
                if (view === this._current) {
                    this._current.change(object);
                } else {
                    this._current.hide(callback);
                }
            } else {
                callback();
            }
        },

        getView: function getView(options) {
            var code = getHashCode(options);

            if (this._views.hasOwnProperty(code)) {
                return this._views[code];
            }

            return this._views[code] = new View(options);
        },

        hide: function hide(object) {
            if (object) {
                var view = this.getView(object.options);
                view.hide();
            } else {
                if (this._current !== null) {
                    var self = this;
                    this._current.hide();
                }
            }
        }
    };

    $.extend(SlidePanel, {
        is: function is(state) {
            return _SlidePanel.is(state);
        },

        show: function show(object, options) {
            _SlidePanel.show.apply(_SlidePanel, arguments);
            return this;
        },

        hide: function hide() {
            _SlidePanel.hide.apply(_SlidePanel, arguments);
            return this;
        }
    });

    $.fn.slidePanel = function (options) {
        if (typeof options === 'string') {
            var method = options;
            var method_arguments = Array.prototype.slice.call(arguments, 1);

            return this.each(function () {
                var instance = $.data(this, 'slidePanel');

                if (!(instance instanceof Instance)) {
                    instance = new Instance(this, method_arguments);
                    $.data(this, 'slidePanel', instance);
                }

                switch (method) {
                    case 'hide':
                        _SlidePanel.hide(instance);
                        break;
                    case 'show':
                        _SlidePanel.show(instance);
                        break;
                }
            });
        } else {
            return this.each(function () {
                if (!$.data(this, 'slidePanel')) {
                    $.data(this, 'slidePanel', new Instance(this, options));

                    $(this).on('click', function (e) {
                        var instance = $.data(this, 'slidePanel');
                        _SlidePanel.show(instance);

                        e.preventDefault();
                        e.stopPropagation();
                    });
                }
            });
        }
    };
})(jQuery, document, window);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  function require(name) {
    var module = require.modules[name];if (!module) throw new Error('failed to require "' + name + '"');if (!("exports" in module) && typeof module.definition === "function") {
      module.client = module.component = true;module.definition.call(this, module.exports = {}, module);delete module.definition;
    }return module.exports;
  }require.loader = "component";require.helper = {};require.helper.semVerSort = function (a, b) {
    var aArray = a.version.split(".");var bArray = b.version.split(".");for (var i = 0; i < aArray.length; ++i) {
      var aInt = parseInt(aArray[i], 10);var bInt = parseInt(bArray[i], 10);if (aInt === bInt) {
        var aLex = aArray[i].substr(("" + aInt).length);var bLex = bArray[i].substr(("" + bInt).length);if (aLex === "" && bLex !== "") return 1;if (aLex !== "" && bLex === "") return -1;if (aLex !== "" && bLex !== "") return aLex > bLex ? 1 : -1;continue;
      } else if (aInt > bInt) {
        return 1;
      } else {
        return -1;
      }
    }return 0;
  };require.latest = function (name, returnPath) {
    function showError(name) {
      throw new Error('failed to find latest module of "' + name + '"');
    }var versionRegexp = /(.*)~(.*)@v?(\d+\.\d+\.\d+[^\/]*)$/;var remoteRegexp = /(.*)~(.*)/;if (!remoteRegexp.test(name)) showError(name);var moduleNames = Object.keys(require.modules);var semVerCandidates = [];var otherCandidates = [];for (var i = 0; i < moduleNames.length; i++) {
      var moduleName = moduleNames[i];if (new RegExp(name + "@").test(moduleName)) {
        var version = moduleName.substr(name.length + 1);var semVerMatch = versionRegexp.exec(moduleName);if (semVerMatch != null) {
          semVerCandidates.push({ version: version, name: moduleName });
        } else {
          otherCandidates.push({ version: version, name: moduleName });
        }
      }
    }if (semVerCandidates.concat(otherCandidates).length === 0) {
      showError(name);
    }if (semVerCandidates.length > 0) {
      var module = semVerCandidates.sort(require.helper.semVerSort).pop().name;if (returnPath === true) {
        return module;
      }return require(module);
    }var module = otherCandidates.sort(function (a, b) {
      return a.name > b.name;
    })[0].name;if (returnPath === true) {
      return module;
    }return require(module);
  };require.modules = {};require.register = function (name, definition) {
    require.modules[name] = { definition: definition };
  };require.define = function (name, exports) {
    require.modules[name] = { exports: exports };
  };require.register("abpetkov~transitionize@0.0.3", function (exports, module) {
    module.exports = Transitionize;function Transitionize(element, props) {
      if (!(this instanceof Transitionize)) return new Transitionize(element, props);this.element = element;this.props = props || {};this.init();
    }Transitionize.prototype.isSafari = function () {
      return (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)
      );
    };Transitionize.prototype.init = function () {
      var transitions = [];for (var key in this.props) {
        transitions.push(key + " " + this.props[key]);
      }this.element.style.transition = transitions.join(", ");if (this.isSafari()) this.element.style.webkitTransition = transitions.join(", ");
    };
  });require.register("ftlabs~fastclick@v0.6.11", function (exports, module) {
    function FastClick(layer) {
      "use strict";
      var oldOnClick,
          self = this;this.trackingClick = false;this.trackingClickStart = 0;this.targetElement = null;this.touchStartX = 0;this.touchStartY = 0;this.lastTouchIdentifier = 0;this.touchBoundary = 10;this.layer = layer;if (!layer || !layer.nodeType) {
        throw new TypeError("Layer must be a document node");
      }this.onClick = function () {
        return FastClick.prototype.onClick.apply(self, arguments);
      };this.onMouse = function () {
        return FastClick.prototype.onMouse.apply(self, arguments);
      };this.onTouchStart = function () {
        return FastClick.prototype.onTouchStart.apply(self, arguments);
      };this.onTouchMove = function () {
        return FastClick.prototype.onTouchMove.apply(self, arguments);
      };this.onTouchEnd = function () {
        return FastClick.prototype.onTouchEnd.apply(self, arguments);
      };this.onTouchCancel = function () {
        return FastClick.prototype.onTouchCancel.apply(self, arguments);
      };if (FastClick.notNeeded(layer)) {
        return;
      }if (this.deviceIsAndroid) {
        layer.addEventListener("mouseover", this.onMouse, true);layer.addEventListener("mousedown", this.onMouse, true);layer.addEventListener("mouseup", this.onMouse, true);
      }layer.addEventListener("click", this.onClick, true);layer.addEventListener("touchstart", this.onTouchStart, false);layer.addEventListener("touchmove", this.onTouchMove, false);layer.addEventListener("touchend", this.onTouchEnd, false);layer.addEventListener("touchcancel", this.onTouchCancel, false);if (!Event.prototype.stopImmediatePropagation) {
        layer.removeEventListener = function (type, callback, capture) {
          var rmv = Node.prototype.removeEventListener;if (type === "click") {
            rmv.call(layer, type, callback.hijacked || callback, capture);
          } else {
            rmv.call(layer, type, callback, capture);
          }
        };layer.addEventListener = function (type, callback, capture) {
          var adv = Node.prototype.addEventListener;if (type === "click") {
            adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
              if (!event.propagationStopped) {
                callback(event);
              }
            }), capture);
          } else {
            adv.call(layer, type, callback, capture);
          }
        };
      }if (typeof layer.onclick === "function") {
        oldOnClick = layer.onclick;layer.addEventListener("click", function (event) {
          oldOnClick(event);
        }, false);layer.onclick = null;
      }
    }FastClick.prototype.deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0;FastClick.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);FastClick.prototype.deviceIsIOS4 = FastClick.prototype.deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);FastClick.prototype.deviceIsIOSWithBadTarget = FastClick.prototype.deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);FastClick.prototype.needsClick = function (target) {
      "use strict";
      switch (target.nodeName.toLowerCase()) {case "button":case "select":case "textarea":
          if (target.disabled) {
            return true;
          }break;case "input":
          if (this.deviceIsIOS && target.type === "file" || target.disabled) {
            return true;
          }break;case "label":case "video":
          return true;}return (/\bneedsclick\b/.test(target.className)
      );
    };FastClick.prototype.needsFocus = function (target) {
      "use strict";
      switch (target.nodeName.toLowerCase()) {case "textarea":
          return true;case "select":
          return !this.deviceIsAndroid;case "input":
          switch (target.type) {case "button":case "checkbox":case "file":case "image":case "radio":case "submit":
              return false;}return !target.disabled && !target.readOnly;default:
          return (/\bneedsfocus\b/.test(target.className)
          );}
    };FastClick.prototype.sendClick = function (targetElement, event) {
      "use strict";
      var clickEvent, touch;if (document.activeElement && document.activeElement !== targetElement) {
        document.activeElement.blur();
      }touch = event.changedTouches[0];clickEvent = document.createEvent("MouseEvents");clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);clickEvent.forwardedTouchEvent = true;targetElement.dispatchEvent(clickEvent);
    };FastClick.prototype.determineEventType = function (targetElement) {
      "use strict";
      if (this.deviceIsAndroid && targetElement.tagName.toLowerCase() === "select") {
        return "mousedown";
      }return "click";
    };FastClick.prototype.focus = function (targetElement) {
      "use strict";
      var length;if (this.deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf("date") !== 0 && targetElement.type !== "time") {
        length = targetElement.value.length;targetElement.setSelectionRange(length, length);
      } else {
        targetElement.focus();
      }
    };FastClick.prototype.updateScrollParent = function (targetElement) {
      "use strict";
      var scrollParent, parentElement;scrollParent = targetElement.fastClickScrollParent;if (!scrollParent || !scrollParent.contains(targetElement)) {
        parentElement = targetElement;do {
          if (parentElement.scrollHeight > parentElement.offsetHeight) {
            scrollParent = parentElement;targetElement.fastClickScrollParent = parentElement;break;
          }parentElement = parentElement.parentElement;
        } while (parentElement);
      }if (scrollParent) {
        scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
      }
    };FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {
      "use strict";
      if (eventTarget.nodeType === Node.TEXT_NODE) {
        return eventTarget.parentNode;
      }return eventTarget;
    };FastClick.prototype.onTouchStart = function (event) {
      "use strict";
      var targetElement, touch, selection;if (event.targetTouches.length > 1) {
        return true;
      }targetElement = this.getTargetElementFromEventTarget(event.target);touch = event.targetTouches[0];if (this.deviceIsIOS) {
        selection = window.getSelection();if (selection.rangeCount && !selection.isCollapsed) {
          return true;
        }if (!this.deviceIsIOS4) {
          if (touch.identifier === this.lastTouchIdentifier) {
            event.preventDefault();return false;
          }this.lastTouchIdentifier = touch.identifier;this.updateScrollParent(targetElement);
        }
      }this.trackingClick = true;this.trackingClickStart = event.timeStamp;this.targetElement = targetElement;this.touchStartX = touch.pageX;this.touchStartY = touch.pageY;if (event.timeStamp - this.lastClickTime < 200) {
        event.preventDefault();
      }return true;
    };FastClick.prototype.touchHasMoved = function (event) {
      "use strict";
      var touch = event.changedTouches[0],
          boundary = this.touchBoundary;if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
        return true;
      }return false;
    };FastClick.prototype.onTouchMove = function (event) {
      "use strict";
      if (!this.trackingClick) {
        return true;
      }if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
        this.trackingClick = false;this.targetElement = null;
      }return true;
    };FastClick.prototype.findControl = function (labelElement) {
      "use strict";
      if (labelElement.control !== undefined) {
        return labelElement.control;
      }if (labelElement.htmlFor) {
        return document.getElementById(labelElement.htmlFor);
      }return labelElement.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea");
    };FastClick.prototype.onTouchEnd = function (event) {
      "use strict";
      var forElement,
          trackingClickStart,
          targetTagName,
          scrollParent,
          touch,
          targetElement = this.targetElement;if (!this.trackingClick) {
        return true;
      }if (event.timeStamp - this.lastClickTime < 200) {
        this.cancelNextClick = true;return true;
      }this.cancelNextClick = false;this.lastClickTime = event.timeStamp;trackingClickStart = this.trackingClickStart;this.trackingClick = false;this.trackingClickStart = 0;if (this.deviceIsIOSWithBadTarget) {
        touch = event.changedTouches[0];targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
      }targetTagName = targetElement.tagName.toLowerCase();if (targetTagName === "label") {
        forElement = this.findControl(targetElement);if (forElement) {
          this.focus(targetElement);if (this.deviceIsAndroid) {
            return false;
          }targetElement = forElement;
        }
      } else if (this.needsFocus(targetElement)) {
        if (event.timeStamp - trackingClickStart > 100 || this.deviceIsIOS && window.top !== window && targetTagName === "input") {
          this.targetElement = null;return false;
        }this.focus(targetElement);if (!this.deviceIsIOS4 || targetTagName !== "select") {
          this.targetElement = null;event.preventDefault();
        }return false;
      }if (this.deviceIsIOS && !this.deviceIsIOS4) {
        scrollParent = targetElement.fastClickScrollParent;if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
          return true;
        }
      }if (!this.needsClick(targetElement)) {
        event.preventDefault();this.sendClick(targetElement, event);
      }return false;
    };FastClick.prototype.onTouchCancel = function () {
      "use strict";
      this.trackingClick = false;this.targetElement = null;
    };FastClick.prototype.onMouse = function (event) {
      "use strict";
      if (!this.targetElement) {
        return true;
      }if (event.forwardedTouchEvent) {
        return true;
      }if (!event.cancelable) {
        return true;
      }if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
        if (event.stopImmediatePropagation) {
          event.stopImmediatePropagation();
        } else {
          event.propagationStopped = true;
        }event.stopPropagation();event.preventDefault();return false;
      }return true;
    };FastClick.prototype.onClick = function (event) {
      "use strict";
      var permitted;if (this.trackingClick) {
        this.targetElement = null;this.trackingClick = false;return true;
      }if (event.target.type === "submit" && event.detail === 0) {
        return true;
      }permitted = this.onMouse(event);if (!permitted) {
        this.targetElement = null;
      }return permitted;
    };FastClick.prototype.destroy = function () {
      "use strict";
      var layer = this.layer;if (this.deviceIsAndroid) {
        layer.removeEventListener("mouseover", this.onMouse, true);layer.removeEventListener("mousedown", this.onMouse, true);layer.removeEventListener("mouseup", this.onMouse, true);
      }layer.removeEventListener("click", this.onClick, true);layer.removeEventListener("touchstart", this.onTouchStart, false);layer.removeEventListener("touchmove", this.onTouchMove, false);layer.removeEventListener("touchend", this.onTouchEnd, false);layer.removeEventListener("touchcancel", this.onTouchCancel, false);
    };FastClick.notNeeded = function (layer) {
      "use strict";
      var metaViewport;var chromeVersion;if (typeof window.ontouchstart === "undefined") {
        return true;
      }chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];if (chromeVersion) {
        if (FastClick.prototype.deviceIsAndroid) {
          metaViewport = document.querySelector("meta[name=viewport]");if (metaViewport) {
            if (metaViewport.content.indexOf("user-scalable=no") !== -1) {
              return true;
            }if (chromeVersion > 31 && window.innerWidth <= window.screen.width) {
              return true;
            }
          }
        } else {
          return true;
        }
      }if (layer.style.msTouchAction === "none") {
        return true;
      }return false;
    };FastClick.attach = function (layer) {
      "use strict";
      return new FastClick(layer);
    };if (true) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
        "use strict";
        return FastClick;
      }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module !== "undefined" && module.exports) {
      module.exports = FastClick.attach;module.exports.FastClick = FastClick;
    } else {
      window.FastClick = FastClick;
    }
  });require.register("component~indexof@0.0.3", function (exports, module) {
    module.exports = function (arr, obj) {
      if (arr.indexOf) return arr.indexOf(obj);for (var i = 0; i < arr.length; ++i) {
        if (arr[i] === obj) return i;
      }return -1;
    };
  });require.register("component~classes@1.2.1", function (exports, module) {
    var index = require("component~indexof@0.0.3");var re = /\s+/;var toString = Object.prototype.toString;module.exports = function (el) {
      return new ClassList(el);
    };function ClassList(el) {
      if (!el) throw new Error("A DOM element reference is required");this.el = el;this.list = el.classList;
    }ClassList.prototype.add = function (name) {
      if (this.list) {
        this.list.add(name);return this;
      }var arr = this.array();var i = index(arr, name);if (!~i) arr.push(name);this.el.className = arr.join(" ");return this;
    };ClassList.prototype.remove = function (name) {
      if ("[object RegExp]" == toString.call(name)) {
        return this.removeMatching(name);
      }if (this.list) {
        this.list.remove(name);return this;
      }var arr = this.array();var i = index(arr, name);if (~i) arr.splice(i, 1);this.el.className = arr.join(" ");return this;
    };ClassList.prototype.removeMatching = function (re) {
      var arr = this.array();for (var i = 0; i < arr.length; i++) {
        if (re.test(arr[i])) {
          this.remove(arr[i]);
        }
      }return this;
    };ClassList.prototype.toggle = function (name, force) {
      if (this.list) {
        if ("undefined" !== typeof force) {
          if (force !== this.list.toggle(name, force)) {
            this.list.toggle(name);
          }
        } else {
          this.list.toggle(name);
        }return this;
      }if ("undefined" !== typeof force) {
        if (!force) {
          this.remove(name);
        } else {
          this.add(name);
        }
      } else {
        if (this.has(name)) {
          this.remove(name);
        } else {
          this.add(name);
        }
      }return this;
    };ClassList.prototype.array = function () {
      var str = this.el.className.replace(/^\s+|\s+$/g, "");var arr = str.split(re);if ("" === arr[0]) arr.shift();return arr;
    };ClassList.prototype.has = ClassList.prototype.contains = function (name) {
      return this.list ? this.list.contains(name) : !!~index(this.array(), name);
    };
  });require.register("component~event@0.1.4", function (exports, module) {
    var bind = window.addEventListener ? "addEventListener" : "attachEvent",
        unbind = window.removeEventListener ? "removeEventListener" : "detachEvent",
        prefix = bind !== "addEventListener" ? "on" : "";exports.bind = function (el, type, fn, capture) {
      el[bind](prefix + type, fn, capture || false);return fn;
    };exports.unbind = function (el, type, fn, capture) {
      el[unbind](prefix + type, fn, capture || false);return fn;
    };
  });require.register("component~query@0.0.3", function (exports, module) {
    function one(selector, el) {
      return el.querySelector(selector);
    }exports = module.exports = function (selector, el) {
      el = el || document;return one(selector, el);
    };exports.all = function (selector, el) {
      el = el || document;return el.querySelectorAll(selector);
    };exports.engine = function (obj) {
      if (!obj.one) throw new Error(".one callback required");if (!obj.all) throw new Error(".all callback required");one = obj.one;exports.all = obj.all;return exports;
    };
  });require.register("component~matches-selector@0.1.5", function (exports, module) {
    var query = require("component~query@0.0.3");var proto = Element.prototype;var vendor = proto.matches || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;module.exports = match;function match(el, selector) {
      if (!el || el.nodeType !== 1) return false;if (vendor) return vendor.call(el, selector);var nodes = query.all(selector, el.parentNode);for (var i = 0; i < nodes.length; ++i) {
        if (nodes[i] == el) return true;
      }return false;
    }
  });require.register("component~closest@0.1.4", function (exports, module) {
    var matches = require("component~matches-selector@0.1.5");module.exports = function (element, selector, checkYoSelf, root) {
      element = checkYoSelf ? { parentNode: element } : element;root = root || document;while ((element = element.parentNode) && element !== document) {
        if (matches(element, selector)) return element;if (element === root) return;
      }
    };
  });require.register("component~delegate@0.2.3", function (exports, module) {
    var closest = require("component~closest@0.1.4"),
        event = require("component~event@0.1.4");exports.bind = function (el, selector, type, fn, capture) {
      return event.bind(el, type, function (e) {
        var target = e.target || e.srcElement;e.delegateTarget = closest(target, selector, true, el);if (e.delegateTarget) fn.call(el, e);
      }, capture);
    };exports.unbind = function (el, type, fn, capture) {
      event.unbind(el, type, fn, capture);
    };
  });require.register("component~events@1.0.9", function (exports, module) {
    var events = require("component~event@0.1.4");var delegate = require("component~delegate@0.2.3");module.exports = Events;function Events(el, obj) {
      if (!(this instanceof Events)) return new Events(el, obj);if (!el) throw new Error("element required");if (!obj) throw new Error("object required");this.el = el;this.obj = obj;this._events = {};
    }Events.prototype.sub = function (event, method, cb) {
      this._events[event] = this._events[event] || {};this._events[event][method] = cb;
    };Events.prototype.bind = function (event, method) {
      var e = parse(event);var el = this.el;var obj = this.obj;var name = e.name;var method = method || "on" + name;var args = [].slice.call(arguments, 2);function cb() {
        var a = [].slice.call(arguments).concat(args);obj[method].apply(obj, a);
      }if (e.selector) {
        cb = delegate.bind(el, e.selector, name, cb);
      } else {
        events.bind(el, name, cb);
      }this.sub(name, method, cb);return cb;
    };Events.prototype.unbind = function (event, method) {
      if (0 == arguments.length) return this.unbindAll();if (1 == arguments.length) return this.unbindAllOf(event);var bindings = this._events[event];if (!bindings) return;var cb = bindings[method];if (!cb) return;events.unbind(this.el, event, cb);
    };Events.prototype.unbindAll = function () {
      for (var event in this._events) {
        this.unbindAllOf(event);
      }
    };Events.prototype.unbindAllOf = function (event) {
      var bindings = this._events[event];if (!bindings) return;for (var method in bindings) {
        this.unbind(event, method);
      }
    };function parse(event) {
      var parts = event.split(/ +/);return { name: parts.shift(), selector: parts.join(" ") };
    }
  });require.register("switchery", function (exports, module) {
    var transitionize = require("abpetkov~transitionize@0.0.3"),
        fastclick = require("ftlabs~fastclick@v0.6.11"),
        classes = require("component~classes@1.2.1"),
        events = require("component~events@1.0.9");module.exports = Switchery;var defaults = { color: "#64bd63", secondaryColor: "#dfdfdf", jackColor: "#fff", jackSecondaryColor: null, className: "switchery", disabled: false, disabledOpacity: .5, speed: "0.4s", size: "default" };function Switchery(element, options) {
      if (!(this instanceof Switchery)) return new Switchery(element, options);this.element = element;this.options = options || {};for (var i in defaults) {
        if (this.options[i] == null) {
          this.options[i] = defaults[i];
        }
      }if (this.element != null && this.element.type == "checkbox") this.init();if (this.isDisabled() === true) this.disable();
    }Switchery.prototype.hide = function () {
      this.element.style.display = "none";
    };Switchery.prototype.show = function () {
      var switcher = this.create();this.insertAfter(this.element, switcher);
    };Switchery.prototype.create = function () {
      this.switcher = document.createElement("span");this.jack = document.createElement("small");this.switcher.appendChild(this.jack);this.switcher.className = this.options.className;this.events = events(this.switcher, this);return this.switcher;
    };Switchery.prototype.insertAfter = function (reference, target) {
      reference.parentNode.insertBefore(target, reference.nextSibling);
    };Switchery.prototype.setPosition = function (clicked) {
      var checked = this.isChecked(),
          switcher = this.switcher,
          jack = this.jack;if (clicked && checked) checked = false;else if (clicked && !checked) checked = true;if (checked === true) {
        this.element.checked = true;if (window.getComputedStyle) jack.style.left = parseInt(window.getComputedStyle(switcher).width) - parseInt(window.getComputedStyle(jack).width) + "px";else jack.style.left = parseInt(switcher.currentStyle["width"]) - parseInt(jack.currentStyle["width"]) + "px";if (this.options.color) this.colorize();this.setSpeed();
      } else {
        jack.style.left = 0;this.element.checked = false;this.switcher.style.boxShadow = "inset 0 0 0 0 " + this.options.secondaryColor;this.switcher.style.borderColor = this.options.secondaryColor;this.switcher.style.backgroundColor = this.options.secondaryColor !== defaults.secondaryColor ? this.options.secondaryColor : "#fff";this.jack.style.backgroundColor = this.options.jackSecondaryColor !== this.options.jackColor ? this.options.jackSecondaryColor : this.options.jackColor;this.setSpeed();
      }
    };Switchery.prototype.setSpeed = function () {
      var switcherProp = {},
          jackProp = { "background-color": this.options.speed, left: this.options.speed.replace(/[a-z]/, "") / 2 + "s" };if (this.isChecked()) {
        switcherProp = { border: this.options.speed, "box-shadow": this.options.speed, "background-color": this.options.speed.replace(/[a-z]/, "") * 3 + "s" };
      } else {
        switcherProp = { border: this.options.speed, "box-shadow": this.options.speed };
      }transitionize(this.switcher, switcherProp);transitionize(this.jack, jackProp);
    };Switchery.prototype.setSize = function () {
      var small = "switchery-small",
          normal = "switchery-default",
          large = "switchery-large";switch (this.options.size) {case "small":
          classes(this.switcher).add(small);break;case "large":
          classes(this.switcher).add(large);break;default:
          classes(this.switcher).add(normal);break;}
    };Switchery.prototype.colorize = function () {
      var switcherHeight = this.switcher.offsetHeight / 2;this.switcher.style.backgroundColor = this.options.color;this.switcher.style.borderColor = this.options.color;this.switcher.style.boxShadow = "inset 0 0 0 " + switcherHeight + "px " + this.options.color;this.jack.style.backgroundColor = this.options.jackColor;
    };Switchery.prototype.handleOnchange = function (state) {
      if (document.dispatchEvent) {
        var event = document.createEvent("HTMLEvents");event.initEvent("change", true, true);this.element.dispatchEvent(event);
      } else {
        this.element.fireEvent("onchange");
      }
    };Switchery.prototype.handleChange = function () {
      var self = this,
          el = this.element;if (el.addEventListener) {
        el.addEventListener("change", function () {
          self.setPosition();
        });
      } else {
        el.attachEvent("onchange", function () {
          self.setPosition();
        });
      }
    };Switchery.prototype.handleClick = function () {
      var switcher = this.switcher;fastclick(switcher);this.events.bind("click", "bindClick");
    };Switchery.prototype.bindClick = function () {
      var parent = this.element.parentNode.tagName.toLowerCase(),
          labelParent = parent === "label" ? false : true;this.setPosition(labelParent);this.handleOnchange(this.element.checked);
    };Switchery.prototype.markAsSwitched = function () {
      this.element.setAttribute("data-switchery", true);
    };Switchery.prototype.markedAsSwitched = function () {
      return this.element.getAttribute("data-switchery");
    };Switchery.prototype.init = function () {
      this.hide();this.show();this.setSize();this.setPosition();this.markAsSwitched();this.handleChange();this.handleClick();
    };Switchery.prototype.isChecked = function () {
      return this.element.checked;
    };Switchery.prototype.isDisabled = function () {
      return this.options.disabled || this.element.disabled || this.element.readOnly;
    };Switchery.prototype.destroy = function () {
      this.events.unbind();
    };Switchery.prototype.enable = function () {
      if (this.options.disabled) this.options.disabled = false;if (this.element.disabled) this.element.disabled = false;if (this.element.readOnly) this.element.readOnly = false;this.switcher.style.opacity = 1;this.events.bind("click", "bindClick");
    };Switchery.prototype.disable = function () {
      if (!this.options.disabled) this.options.disabled = true;if (!this.element.disabled) this.element.disabled = true;if (!this.element.readOnly) this.element.readOnly = true;this.switcher.style.opacity = this.options.disabledOpacity;this.destroy();
    };
  });if (( false ? 'undefined' : _typeof(exports)) == "object") {
    module.exports = require("switchery");
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return require("switchery");
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    (this || window)["Switchery"] = require("switchery");
  }
})();

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(20);
__webpack_require__(21);
__webpack_require__(19);
__webpack_require__(25);
__webpack_require__(22);
__webpack_require__(23);
__webpack_require__(24);
__webpack_require__(18);
__webpack_require__(13);
__webpack_require__(10);
__webpack_require__(11);
__webpack_require__(12);
__webpack_require__(17);
__webpack_require__(9);
__webpack_require__(14);
__webpack_require__(15);
module.exports = __webpack_require__(16);


/***/ })
],[50]);