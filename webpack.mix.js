const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
   .extract([
    	'./resources/assets/vendor/global/vendor/asscroll/jquery-asScroll.js',
    	//'./resources/assets/vendor/global/mousewheel/jquery.mousewheel.js',
    	'./resources/assets/vendor/global/vendor/asscrollable/jquery.asScrollable.all.js',
    	'./resources/assets/vendor/global/vendor/ashoverscroll/jquery-asHoverScroll.js',
    	'./resources/assets/vendor/global/vendor/switchery/switchery.min.js',
    	'./resources/assets/vendor/global/vendor/intro-js/intro.js',
    	'./resources/assets/vendor/global/vendor/screenfull/screenfull.js',
    	'./resources/assets/vendor/global/vendor/slidepanel/jquery-slidePanel.js',
    	'./resources/assets/vendor/global/js/core.js',
    	'./resources/assets/vendor/assets/js/site.js',
    	'./resources/assets/vendor/assets/js/sections/menu.js',
    	'./resources/assets/vendor/assets/js/sections/menubar.js',
    	'./resources/assets/vendor/assets/js/sections/sidebar.js',
    	'./resources/assets/vendor/global/js/configs/config-colors.js',
    	'./resources/assets/vendor/assets/js/configs/config-tour.js',
    	'./resources/assets/vendor/global/js/components/asscrollable.js',
    	'./resources/assets/vendor/global/js/components/slidepanel.js',
    	'./resources/assets/vendor/global/js/components/switchery.js'
	], 'public/js/vendor.js')
   .styles([
	    './resources/assets/vendor/global/css/bootstrap.min.css',
	    './resources/assets/vendor/global/css/bootstrap-extend.min.css',
	    './resources/assets/vendor/assets/css/site.min.css',
	    './resources/assets/vendor/global/vendor/animsition/animsition.css',
	    './resources/assets/vendor/global/vendor/asscrollable/asScrollable.css',
	    './resources/assets/vendor/global/vendor/switchery/switchery.css',
	    './resources/assets/vendor/global/vendor/intro-js/introjs.css',
	    './resources/assets/vendor/global/vendor/slidepanel/slidePanel.css',
	    './resources/assets/vendor/global/vendor/chartist-js/chartist.css',
	    './resources/assets/vendor/global/vendor/jvectormap/jquery-jvectormap.css',
	    './resources/assets/vendor/global/vendor/chartist-plugin-tooltip/chartist-plugin-tooltip.css',
	    './resources/assets/vendor/assets/examples/css/dashboard/v1.css'
   	], 'public/css/vendor.css')
   .mix.copy([
   		'./resources/assets/vendor/global/vendor/modernizr/modernizr.min.js',
   		'./resources/assets/vendor/global/vendor/breakpoints/breakpoints.min.js'
   	], 'public/js/template-init')
   .mix.copy('./resources/assets/vendor/global/fonts/web-icons', 'public/fonts/web-icons');
   //.sass('resources/assets/sass/app.scss', 'public/css');
