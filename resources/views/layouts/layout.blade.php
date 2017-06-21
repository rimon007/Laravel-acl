<!DOCTYPE html>
<html class="no-js css-menubar" lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
	<meta name="description" content="bootstrap admin template">
	<meta name="author" content="">
	<title>Dashboard | Remark Admin Template</title>
	<!-- Stylesheets -->
	<link rel="stylesheet" href="/css/vendor.css">
	<!-- Fonts -->
	<link rel="stylesheet" href="/fonts/web-icons/web-icons.min.css">
	<link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Roboto:300,400,500,300italic'>
	<!--[if lt IE 9]>
	<script src="global/vendor/html5shiv/html5shiv.min.js"></script>
	<![endif]-->
	<!--[if lt IE 10]>
	<script src="global/vendor/media-match/media.match.min.js"></script>
	<script src="global/vendor/respond/respond.min.js"></script>
	<![endif]-->
	<!-- Scripts -->
	<script src="js/template-init/modernizr.min.js"></script>
	<script src="js/template-init/breakpoints.min.js"></script>
	<script>
		Breakpoints();
	</script>
</head>
<body class="dashboard">
	<!--[if lt IE 8]>
	    <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
	<![endif]-->
	@include('layouts.top-nav')

	@include('layouts.sidebar-nav')
	
  	<!-- Page -->
	<div class="page">
		<div class="page-content padding-30 container-fluid">
			@yield('content')
		</div>
	</div>
	<!-- End Page -->

	<!-- Footer -->
	<footer class="site-footer">
		<div class="site-footer-legal">© 2015 <a href="http://themeforest.net/item/remark-responsive-bootstrap-admin-template/11989202">Remark</a></div>
		<div class="site-footer-right">
		  Crafted with <i class="red-600 wb wb-heart"></i> by <a href="http://themeforest.net/user/amazingSurge">amazingSurge</a>
		</div>
	</footer>

	<!-- Core  -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script src="/js/manifest.js"></script>
	<script src="/js/vendor.js"></script>
	<script src="/js/app.js"></script>

	<script>
		(function(document, window, $) {
			'use strict';
			var Site = window.Site;
			$(document).ready(function() {
				Site.run();
			});
		})(document, window, jQuery);
	</script>
</body>
</html>