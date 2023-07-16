/*********************************************************************************

	Template Name: Belle - Multipurpose eCommerce Bootstrap4 HTML Template
	Description: A perfect template to build beautiful and unique Glasses websites. It comes with nice and clean design.
	Version: 1.0

**********************************************************************************/

/*************************************************
  1. Preloader Loading
  2. Promotional Bar Header
  3. Currency Show/Hide dropdown  
  4. Language Show/Hide dropdown
  5. Top Links Show/Hide dropdown
  6. Minicart Dropdown
  7. Sticky Header
  8. Search Trigger
  9. Mobile Menu
  10 Slick Slider
	 10.1 Homepage Slideshow 
	 10.2 Product Slider Slick
	 10.3 Product Slider Slick Style2
	 10.4 Product Slider Slick Style3
	 10.5 Product Slider Slick Fullwidth
	 10.6 Product Slider Slick Product Page
	 10.7 Collection Slider Slick
	 10.8 Collection Slider Slick 4 items
	 10.9 Logo Slider Slick
	 10.10 Testimonial Slider Slick
  11. Tabs With Accordian Responsive
  12. Sidebar Categories Level links
  13. Price Range Slider
  14. Color Swacthes
  15. Footer links for mobiles
  16. Site Animation
  17. SHOW HIDE PRODUCT TAG
  18. SHOW HIDE PRODUCT Filters
  19. Timer Count Down
  20. Scroll Top
  21. Height Product Grid Image
  22. Product details slider 2
  23. Product details slider 1
  24. Product Zoom
  25. Product Page Popup
  26. Quantity Plus Minus
  27. Visitor Fake Message
  28. Product Tabs
  29. Promotion / Notification Cookie Bar 
  30. Image to background js
  31. COLOR SWATCH ON COLLECTION PAGE
  32. Related Product Slider
  33. Infinite Scroll js
*************************************************/

(function ($) {
	// Start of use strict
	'use strict';
	
    /*-----------------------------------------
	  1. Preloader Loading ----------------------- 
	  -----------------------------------------*/
	function pre_loader(){
		$("#load").fadeOut();
		$('#pre-loader').delay(0).fadeOut('slow');
	}
	pre_loader();
		
	/*-----------------------------------------
	 2. Promotional Bar Header ------------------
	  -----------------------------------------*/
	function promotional_bar(){
		$(".closeHeader").on('click',function() {
			$(".promotion-header").slideUp();  
			Cookies.set('promotion', 'true', { expires: 1});  
			return false;
		});
	}
	promotional_bar();
	
	/*-----------------------------------------
	 3. Currency Show/Hide dropdown -----------
	  -----------------------------------------*/
	function currency_dropdown(){
		$(".selected-currency").on("click", function() {
		  $("#currencies").slideToggle();      
		});
		$("#currencies li").on("click", function() {
			$(this).parent().slideUp();
		});
	}
	currency_dropdown();
	
	/*-----------------------------------------
	  4. Language Show/Hide dropdown ----------
	  -----------------------------------------*/
	function language_dropdown(){  
		$(".language-dd").on("click", function() {
		  $("#language").slideToggle();      
		});
		$("#language li").on("click", function() {
			$(this).parent().slideUp();
		});
	}
	language_dropdown();
	
	/*-----------------------------------------
	  5. Top Links Show/Hide dropdown ---------
	  -----------------------------------------*/
	  function userlink_dropdown(){  
		$('.top-header .user-menu').on("click", function() {
			if ($(window).width() < 990 ) {
				$(this).next().slideToggle(300);
				$(this).parent().toggleClass("active");
			}
		});
	 }
	 userlink_dropdown();
	 
	 /*-----------------------------------------
	  6. Minicart Dropdown ---------------------
	  ------------------------------------------ */
	  function minicart_dropdown(){
		$(".site-header__cart").on("click", function(i) {
			i.preventDefault();
			$("#header-cart").slideToggle();
		});
		// Hide Cart on document click
		$("body").on("click", function(event ) {
		  var $target = $(event.target);
		  if(!$target.parents().is(".site-cart") && !$target.is(".site-cart")){
			$("body").find("#header-cart").slideUp();
		  }
		});
	  }
	 minicart_dropdown();
	
	/*-----------------------------------------
	  7. Sticky Header ------------------------
	  -----------------------------------------*/
	window.onscroll = function(){ myFunction() };
    function myFunction() {
      if($(window).width()>1199) {
            if($(window).scrollTop()>145){
              $('.header-wrap').addClass("stickyNav animated fadeInDown");                   
            } else {
              $('.header-wrap').removeClass("stickyNav fadeInDown");              
            }
       }
    }
	
	/*-----------------------------------------
	  8. Search Trigger -----------------------
	  ----------------------------------------- */
	function search_bar(){
		$('.search-trigger').on('click', function () {
			const search = $('.search');
	
			if (search.is('.search--opened')) {
				search.removeClass('search--opened');
			} else {
				search.addClass('search--opened');
				$('.search__input')[0].focus();
			}
		});
	}
	search_bar();
	$(document).on('click', function (event) {
		if (!$(event.target).closest('.search, .search-trigger').length) {
			$('.search').removeClass('search--opened');
		}
	});
	
	/*-----------------------------------------
	  9. Mobile Menu --------------------------
	  -----------------------------------------*/
	var selectors = {
      	body: 'body',
      	sitenav: '#siteNav',
      	navLinks: '#siteNav .lvl1 > a',
      	menuToggle: '.js-mobile-nav-toggle',
      	mobilenav: '.mobile-nav-wrapper',
      	menuLinks: '#MobileNav .anm',
      	closemenu: '.closemobileMenu'
	};
     
  	$(selectors.navLinks).each(function(){
        if($(this).attr('href') == window.location.pathname) $(this).addClass('active');
    })
	
  	$(selectors.menuToggle).on("click",function(){
      body: 'body',
      $(selectors.mobilenav).toggleClass("active");
      $(selectors.body).toggleClass("menuOn");
      $(selectors.menuToggle).toggleClass('mobile-nav--open mobile-nav--close');
    });
  
    $(selectors.closemenu).on("click",function(){
      body: 'body',
      $(selectors.mobilenav).toggleClass("active");
      $(selectors.body).toggleClass("menuOn");
      $(selectors.menuToggle).toggleClass('mobile-nav--open mobile-nav--close');
    });
    $("body").on('click', function (event) {
      var $target = $(event.target);
      if(!$target.parents().is(selectors.mobilenav) && !$target.parents().is(selectors.menuToggle) && !$target.is(selectors.menuToggle)){
          $(selectors.mobilenav).removeClass("active");
          $(selectors.body).removeClass("menuOn");
          $(selectors.menuToggle).removeClass('mobile-nav--close').addClass('mobile-nav--open');
      }
    });
	$(selectors.menuLinks).on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('anm-plus-l anm-minus-l');
		$(this).parent().next().slideToggle();
    });
	
	
	/*-----------------------------------------
	  10.1 Homepage Slideshow -----------------
	  -----------------------------------------*/
	  function home_slider(){
		 $('.home-slideshow').slick({
			dots: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			fade: true,
			arrows: true,
			autoplay: true,
			autoplaySpeed: 4000,
			lazyLoad: 'ondemand'
		  });
	  }
	  home_slider();
	
	// Full Size Banner on the Any Screen
	$(window).resize(function() {
		var bodyheight = $(this).height() - 20;
		$(".sliderFull .bg-size").height(bodyheight);
	}).resize();
	
	/*-----------------------------------------
	  10.2 Product Slider Slick ---------------
	  -----------------------------------------*/
	function product_slider(){
	 $('.productSlider').slick({
		dots: false,
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		responsive: [
		{
		  breakpoint: 1024,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 1
		  }
		},
		{
		  breakpoint: 600,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 1
		  }
		},
		{
		  breakpoint: 480,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1
		  }
		}
		]
	
	  });
	}
	product_slider();

	/*-----------------------------------------
	  10.3 Product Slider Slick Style2 --------
	  -----------------------------------------*/
	function product_slider1(){
		$('.productSlider-style1').slick({
			dots: false,
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: true,
			responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
			]
		});
	}
	product_slider1();

	/*-----------------------------------------
	  10.4 Product Slider Slick Style3 --------
	  -----------------------------------------*/
	function product_slider2(){
		$('.productSlider-style2').slick({
			dots: false,
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			arrows: true,
			responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
			]
		});
	}
	product_slider2();

	/*-----------------------------------------
	  10.5 Product Slider Slick Fullwidth -----
	  ----------------------------------------- */
	  function product_slider_full(){
		$('.productSlider-fullwidth').slick({
			dots: false,
			infinite: true,
			slidesToShow: 6,
			slidesToScroll: 1,
			arrows: true,
			responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
			]
		});
	  }
	  product_slider_full();

	/*-----------------------------------------
	  10.6 Product Slider Slick Product Page --
	  ----------------------------------------- */
	function product_slider_ppage(){
		$('.productPageSlider').slick({
			dots: false,
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			arrows: true,
			responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 680,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 380,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
			]
		});
	}
	product_slider_ppage();

	/*-----------------------------------------
	  10.7 Collection Slider Slick ------------
	  ----------------------------------------- */
	function collection_slider(){
		$('.collection-grid').slick({
			dots: false,
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			arrows: true,
			responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			}
			]
		});
	}
	collection_slider();

	/*-----------------------------------------
	  10.8 Collection Slider Slick 4 items ----
	  ----------------------------------------- */	  
	function collection_slider1(){
		$('.collection-grid-4item').slick({
			dots: false,
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			arrows: true,
			responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			}
			]
		});
	}
	collection_slider1();

	/*-----------------------------------------
	  10.9 Logo Slider Slick ------------------
	  -----------------------------------------*/
	function logo_slider(){
		$('.logo-bar').slick({
			dots: false,
			infinite: true,
			slidesToShow: 6,
			slidesToScroll: 1,
			arrows: true,
			responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			}
			]
		});
	}
	logo_slider();

	/*-----------------------------------------
	  10.10 Testimonial Slider Slick ----------
	  -----------------------------------------*/
	function testimonial_slider(){
		$('.quotes-slider').slick({
			dots: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
		});
	}
	testimonial_slider();
	  
	/*-----------------------------------
	  11. Tabs With Accordian Responsive
	-------------------------------------*/
	$(".tab_content").hide();
	$(".tab_content:first").show();
	
	/* if in tab mode */
	$("ul.tabs li").on('click', function () {
		$(".tab_content").hide();
		var activeTab = $(this).attr("rel"); 
		$("#"+activeTab).fadeIn();		
		
		$("ul.tabs li").removeClass("active");
		$(this).addClass("active");
		
		$(".tab_drawer_heading").removeClass("d_active");
		$(".tab_drawer_heading[rel^='"+activeTab+"']").addClass("d_active");
		
		$('.productSlider').slick('refresh');
	
	});
	/* if in drawer mode */
	$(".tab_drawer_heading").on('click', function () {
		
		$(".tab_content").hide();
		var d_activeTab = $(this).attr("rel"); 
		$("#"+d_activeTab).fadeIn();
		
		$(".tab_drawer_heading").removeClass("d_active");
		$(this).addClass("d_active");
		
		$("ul.tabs li").removeClass("active");
		$("ul.tabs li[rel^='"+d_activeTab+"']").addClass("active");
		
		$('.productSlider').slick('refresh');
	});
	
	$('ul.tabs li').last().addClass("tab_last");
	
	/*-----------------------------------
	  End Tabs With Accordian Responsive
	-------------------------------------*/
	
	/*-----------------------------------
	  12. Sidebar Categories Level links
	-------------------------------------*/
	function categories_level(){
		$(".sidebar_categories .sub-level a").on("click", function() {
			$(this).toggleClass('active');
			$(this).next(".sublinks").slideToggle("slow");
		}); 
	}
	categories_level();
	
	$(".filter-widget .widget-title").on("click", function () {
		$(this).next().slideToggle('300');
		$(this).toggleClass("active");
	});
	
	/*-----------------------------------
	 13. Price Range Slider
	-------------------------------------*/
	function price_slider(){
		$("#slider-range").slider({
			range: true,
			min: 12,
			max: 200,
			values: [0, 100],
			slide: function(event, ui) {
				$("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
			}
		});
		$("#amount").val("$" + $("#slider-range").slider("values", 0) +
		" - $" + $("#slider-range").slider("values", 1));
	}
	price_slider();
	
	/*-----------------------------------
	 14. Color Swacthes
	-------------------------------------*/
	function color_swacthes(){
		$.each($(".swacth-list"), function() {
			var n = $(".swacth-btn");
			n.on("click", function() {
				$(this).parent().find(n).removeClass("checked");
				$(this).addClass("checked")
			})
		});
	}
	color_swacthes();
	
	/*-----------------------------------
	  15. Footer links for mobiles
	-------------------------------------*/
	function footer_dropdown(){
		$(".footer-links .h4").on('click', function () {
			if($(window).width() < 766){
			  $(this).next().slideToggle();
			  $(this).toggleClass("active");
			}
		});  
	}
	footer_dropdown();
	
	//Resize Function 
	var resizeTimer;
	$(window).resize(function (e) {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			$(window).trigger('delayed-resize', e);
		}, 250);
	});
	$(window).on("load resize",function(e){
		if ($(window).width() > 766 ) {
			$(".footer-links ul").show();
		}
		else {
			$(".footer-links ul").hide();
		}
	});
	
	
	/*-------------------------------
	  16. Site Animation
	----------------------------------*/
	  if($(window).width() < 771) {
		  $('.wow').removeClass('wow');
	  }
	  var wow = new WOW(
	  {
		boxClass:     'wow',      // animated element css class (default is wow)
		animateClass: 'animated', // animation css class (default is animated)
		offset:       0,          // distance to the element when triggering the animation (default is 0)
		mobile:       false,       // trigger animations on mobile devices (default is true)
		live:         true,       // act on asynchronously loaded content (default is true)
		callback:     function(box) {
		  // the callback is fired every time an animation is started
		  // the argument that is passed in is the DOM node being animated
		},
		scrollContainer: null // optional scroll container selector, otherwise use window
	  }
	);
	wow.init();
	
  	/*-------------------------------
	  17. SHOW HIDE PRODUCT TAG
	----------------------------------*/
	$(".product-tags li").eq(10).nextAll().hide(); 
	$('.btnview').on('click', function () {
	$(".product-tags li").not('.filter--active').show();
	 $(this).hide();
	});
	
  	/*-------------------------------
	  18. SHOW HIDE PRODUCT Filters
	----------------------------------*/
    $('.btn-filter').on("click", function() {
       $(".filterbar").toggleClass("active");
    });
    $('.closeFilter').on("click", function() {
      $(".filterbar").removeClass("active");
    });
  	// Hide Cart on document click
    $("body").on('click', function (event) {
      var $target = $(event.target);
      if(!$target.parents().is(".filterbar") && !$target.is(".btn-filter")){
        $(".filterbar").removeClass("active");
      }
    });
	
	/*-------------------------------
	 19. Timer Count Down
	----------------------------------*/
	$('[data-countdown]').each(function () {
		var $this = $(this),
			finalDate = $(this).data('countdown');
		$this.countdown(finalDate, function (event) {
			$this.html(event.strftime('<span class="ht-count days"><span class="count-inner"><span class="time-count">%-D</span> <span>Days</span></span></span> <span class="ht-count hour"><span class="count-inner"><span class="time-count">%-H</span> <span>HR</span></span></span> <span class="ht-count minutes"><span class="count-inner"><span class="time-count">%M</span> <span>Min</span></span></span> <span class="ht-count second"><span class="count-inner"><span class="time-count">%S</span> <span>Sc</span></span></span>'));
		});
	});
	
	/*-------------------------------
	 20.Scroll Top ------------------
	---------------------------------*/
	function scroll_top(){
		$("#site-scroll").on("click", function() {
			$("html, body").animate({ scrollTop: 0 }, 1000);
				return false;
		}); 
	}
	scroll_top();
	
	$(window).scroll(function(){    
		if($(this).scrollTop()>300){
		  $("#site-scroll").fadeIn();
		} else {
		   $("#site-scroll").fadeOut();
		}
	});
	
	/*-------------------------------
	  21. Height Product Grid Image
	----------------------------------*/
	function productGridView() {
	  var gridRows = []; 
	  var tempRow = [];
	  productGridElements = $('.grid-products .item');
	  productGridElements.each(function (index) {
		if ($(this).css('clear') != 'none' && index != 0) {
		  gridRows.push(tempRow);
		  tempRow = []; 
		}
		tempRow.push(this);
	
		if (productGridElements.length == index + 1) {
		  gridRows.push(tempRow);
		}
	  });
	
	  $.each(gridRows, function () {
		var tallestHeight = 0;
		var tallestHeight1 = 0;
		$.each(this, function () {
		  $(this).find('.product-image > a').css('height', '');
		  elHeight = parseInt($(this).find('.product-image').css('height'));
		  if (elHeight > tallestHeight) { tallestHeight = elHeight; }
		});
	
		$.each(this, function () {
		  if($(window).width() > 768) {
			$(this).find('.product-image > a').css('height', tallestHeight);
		  }
		});
	  });
	}
	
	/*----------------------------
       22. Product details slider 2
    ------------------------------ */
	function product_thumb(){
		$('.product-dec-slider-2').slick({
			infinite: true,
			slidesToShow: 5,
			vertical: true,
			slidesToScroll: 1,
			centerPadding: '60px'
		});
	}
	product_thumb();
	
	/*----------------------------
       23. Product details slider 1
    ------------------------------ */
	function product_thumb1(){
		$('.product-dec-slider-1').slick({
			infinite: true,
			slidesToShow: 6,
			stageMargin: 5,
			slidesToScroll: 1
		});
	}
	product_thumb1();
	
	/*--------------------------
      24. Product Zoom
	---------------------------- */
	function product_zoom(){
		$(".zoompro").elevateZoom({
			gallery: "gallery",
			galleryActiveClass: "active",
			zoomWindowWidth: 300,
			zoomWindowHeight: 100,
			scrollZoom: false,
			zoomType: "inner",
			cursor: "crosshair"
		});
	}
	product_zoom();
	
	/*--------------------------
      25. Product Page Popup ---
	---------------------------- */
    function video_popup(){
		if($('.popup-video').length){
			$('.popup-video').magnificPopup({
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,
				fixedContentPos: false
			});
		}
	}
	video_popup();
	
	function size_popup(){
		$('.sizelink').magnificPopup({
			type:'inline',
			midClick: true
		});
	}
	size_popup();
	
	function inquiry_popup(){
		$('.emaillink').magnificPopup({
			type:'inline',
			midClick: true
		});
	}
	inquiry_popup();
	
	/*----------------------------------
	  26. Quantity Plus Minus
	------------------------------------*/
	function qnt_incre(){
		$(".qtyBtn").on("click", function() {
		  var qtyField = $(this).parent(".qtyField"),
			 oldValue = $(qtyField).find(".qty").val(),
			  newVal = 1;
	
		  if ($(this).is(".plus")) {
			newVal = parseInt(oldValue) + 1;
		  } else if (oldValue > 1) {
			newVal = parseInt(oldValue) - 1;
		  }
		  $(qtyField).find(".qty").val(newVal);
		});
	}
	qnt_incre();
	
	/*----------------------------------
	  27. Visitor Fake Message
	------------------------------------*/
    var userLimit = $(".userViewMsg").attr('data-user'),
        userTime = $(".userViewMsg").attr('data-time');
    $(".uersView").text(Math.floor((Math.random() * userLimit)));
    setInterval(function(){
    	$(".uersView").text(Math.floor((Math.random() * userLimit)));
	}, userTime);

	/*----------------------------------
	  28. Product Tabs
	------------------------------------*/
	$(".tab-content").hide();
	$(".tab-content:first").show();
	/* if in tab mode */
	$(".product-tabs li").on('click', function () {
		$(".tab-content").hide();
		var activeTab = $(this).attr("rel"); 
		$("#"+activeTab).fadeIn();		
		
		$(".product-tabs li").removeClass("active");
		$(this).addClass("active");
		
		$(this).fadeIn();
      	if($(window).width()<767) {
          var tabposition = $(this).offset();
          $("html, body").animate({ scrollTop: tabposition.top }, 700);
        }
	});
    
    $('.product-tabs li:first-child').addClass("active");
	$('.tab-container h3:first-child + .tab-content').show();
	
	/* if in drawer mode */
	$(".acor-ttl").on("click", function() {
		$(".tab-content").hide();
		var activeTab = $(this).attr("rel"); 
		$("#"+activeTab).fadeIn();
		
		$(".acor-ttl").removeClass("active");
		$(this).addClass("active");
	});

    
    $(".reviewLink").on('click', function(e){
      e.preventDefault();
        $(".product-tabs li").removeClass("active");
      	$(".reviewtab").addClass("active");
        var tab = $(this).attr("href");
        $(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
      	var tabposition = $("#tab2").offset();
      	if($(window).width()<767) {
          $("html, body").animate({ scrollTop: tabposition.top-50 }, 700);
        } else{
          $("html, body").animate({ scrollTop: tabposition.top-80 }, 700);
        }
    });
	
	/*--------------------------------------
	  29. Promotion / Notification Cookie Bar 
	  -------------------------------------- */
	  function cookie_promo(){
		  if(Cookies.get('promotion') != 'true') {   
			 $(".notification-bar").show();         
		  }
		  $(".close-announcement").on('click',function() {
			$(".notification-bar").slideUp();  
			Cookies.set('promotion', 'true', { expires: 1});  
			return false;
		  });
	  }
	  cookie_promo();
	 /* --------------------------------------
	 	End Promotion / Notification Cookie Bar 
	 -------------------------------------- */
	 
	 /* --------------------------------------
	 	30. Image to background js
	 -------------------------------------- */
    $(".bg-top" ).parent().addClass('b-top');
    $(".bg-bottom" ).parent().addClass('b-bottom');
    $(".bg-center" ).parent().addClass('b-center');
    $(".bg-left" ).parent().addClass('b-left');
    $(".bg-right" ).parent().addClass('b-right');
    $(".bg_size_content").parent().addClass('b_size_content');
    $(".bg-img").parent().addClass('bg-size');
    $(".bg-img.blur-up" ).parent().addClass('');
    jQuery('.bg-img').each(function() {

        var el = $(this),
            src = el.attr('src'),
            parent = el.parent();

        parent.css({
            'background-image': 'url(' + src + ')',
            'background-size': 'cover',
            'background-position': 'center',
            'background-repeat': 'no-repeat'
        });

        el.hide();
    });
	/* --------------------------------------
	 	End Image to background js
	 -------------------------------------- */
	
	/*----------------------------------
	32. Related Product Slider ---------
	------------------------------------*/
	function related_slider(){
		$('.related-product .productSlider').slick({
		  dots: false,
		  infinite: true,
		  item: 5,
		  slidesToScroll: 1,
		  responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToScroll: 1,
			  }
			},        
			{
			  breakpoint: 767,
			  settings: {
				slidesToScroll: 1,
			  }
			}
		  ]
		});
	}
	related_slider();
	/*----------------------------------
	  End Related Product Slider
	  ------------------------------------*/
	
	/*-----------------------------------
	  33. Infinite Scroll js
	  -------------------------------------*/
	function load_more(){
        $(".product-load-more .item").slice(0, 16).show();
        $(".loadMore").on('click', function (e) {
            e.preventDefault();
            $(".product-load-more .item:hidden").slice(0, 4).slideDown();
            if ($(".product-load-more .item:hidden").length == 0) {
                $(".infinitpagin").html('<div class="btn loadMore">no more products</div>');
            }
        });
    }
	load_more();
	
	function load_more_post(){
        $(".blog--grid-load-more .article").slice(0, 3).show();
        $(".loadMorepost").on('click', function (e) {
            e.preventDefault();
            $(".blog--grid-load-more .article:hidden").slice(0, 1).slideDown();
            if ($(".blog--grid-load-more .article:hidden").length == 0) {
                $(".loadmore-post").html('<div class="btn loadMorepost">No more Blog Post</div>');
            }
        });
    }
	load_more_post();
	/*-----------------------------------
	  End Infinite Scroll js
	  -------------------------------------*/
	

})(jQuery);

// Main Js File
$(document).ready(function () {
    'use strict';

    owlCarousels();
    quantityInputs();

    // Header Search Toggle

    var $searchWrapper = $('.header-search-wrapper'),
    	$body = $('body'),
        $searchToggle = $('.search-toggle');

	$searchToggle.on('click', function (e) {
		$searchWrapper.toggleClass('show');
		$(this).toggleClass('active');
		$searchWrapper.find('input').focus();
		e.preventDefault();
	});

	$body.on('click', function (e) {
		if ( $searchWrapper.hasClass('show') ) {
			$searchWrapper.removeClass('show');
			$searchToggle.removeClass('active');
			$body.removeClass('is-search-active');
		}
	});

	$('.header-search').on('click', function (e) {
		e.stopPropagation();
	});

	// Sticky header 
    var catDropdown = $('.category-dropdown'),
        catInitVal = catDropdown.data('visible');
        
	if ( $('.sticky-header').length && $(window).width() >= 992 ) {
		var sticky = new Waypoint.Sticky({
			element: $('.sticky-header')[0],
			stuckClass: 'fixed',
			offset: -300,
            handler: function ( direction ) {
                // Show category dropdown
                if ( catInitVal &&  direction == 'up') {
                    catDropdown.addClass('show').find('.dropdown-menu').addClass('show');
                    catDropdown.find('.dropdown-toggle').attr('aria-expanded', 'true');
                    return false;
                }

                // Hide category dropdown on fixed header
                if ( catDropdown.hasClass('show') ) {
                    catDropdown.removeClass('show').find('.dropdown-menu').removeClass('show');
                    catDropdown.find('.dropdown-toggle').attr('aria-expanded', 'false');
                } 
            }
		});
	}

    // Menu init with superfish plugin
    if ( $.fn.superfish ) {
        $('.menu, .menu-vertical').superfish({
            popUpSelector: 'ul, .megamenu',
            hoverClass: 'show',
            delay: 0,
            speed: 80,
            speedOut: 80 ,
            autoArrows: true
        });
    }

	// Mobile Menu Toggle - Show & Hide
    $('.mobile-menu-toggler').on('click', function (e) {
		$body.toggleClass('mmenu-active');
		$(this).toggleClass('active');
		e.preventDefault();
    });

    $('.mobile-menu-overlay, .mobile-menu-close').on('click', function (e) {
		$body.removeClass('mmenu-active');
		$('.menu-toggler').removeClass('active');
		e.preventDefault();
    });

	// Add Mobile menu icon arrows to items with children
    $('.mobile-menu').find('li').each(function () {
        var $this = $(this);

        if ( $this.find('ul').length ) {
            $('<span/>', {
                'class': 'mmenu-btn'
            }).appendTo($this.children('a'));
        }
    });

    // Mobile Menu toggle children menu
    $('.mmenu-btn').on('click', function (e) {
        var $parent = $(this).closest('li'),
            $targetUl = $parent.find('ul').eq(0);

            if ( !$parent.hasClass('open') ) {
                $targetUl.slideDown(300, function () {
                    $parent.addClass('open');
                });
            } else {
                $targetUl.slideUp(300, function () {
                    $parent.removeClass('open');
                });
            }

        e.stopPropagation();
        e.preventDefault();
    });

	// Sidebar Filter - Show & Hide
    var $sidebarToggler = $('.sidebar-toggler');
    $sidebarToggler.on('click', function (e) {
		$body.toggleClass('sidebar-filter-active');
		$(this).toggleClass('active');
		e.preventDefault();
    });

    $('.sidebar-filter-overlay').on('click', function (e) {
		$body.removeClass('sidebar-filter-active');
		$sidebarToggler.removeClass('active');
		e.preventDefault();
    });

    // Clear All checkbox/remove filters in sidebar filter
    $('.sidebar-filter-clear').on('click', function (e) {
    	$('.sidebar-shop').find('input').prop('checked', false);

    	e.preventDefault();
    });

    // Popup - Iframe Video - Map etc.
    if ( $.fn.magnificPopup ) {
        $('.btn-iframe').magnificPopup({
            type: 'iframe',
            removalDelay: 600,
            preloader: false,
            fixedContentPos: false,
            closeBtnInside: false
        });
    }

    // Product hover
    if ( $.fn.hoverIntent ) {
        $('.product-3').hoverIntent(function () {
            var $this = $(this),
                animDiff = ( $this.outerHeight() - ( $this.find('.product-body').outerHeight() + $this.find('.product-media').outerHeight()) ),
                animDistance = ( $this.find('.product-footer').outerHeight() - animDiff );

            $this.find('.product-footer').css({ 'visibility': 'visible', 'transform': 'translateY(0)' });
            $this.find('.product-body').css('transform', 'translateY('+ -animDistance +'px)');

        }, function () {
            var $this = $(this);

            $this.find('.product-footer').css({ 'visibility': 'hidden', 'transform': 'translateY(100%)' });
            $this.find('.product-body').css('transform', 'translateY(0)');
        });
    }

    // Slider For category pages / filter price
    if ( typeof noUiSlider === 'object' ) {
		var priceSlider  = document.getElementById('price-slider');

		// Check if #price-slider elem is exists if not return
		// to prevent error logs
		if (priceSlider == null) return;

		noUiSlider.create(priceSlider, {
			start: [ 0, 750 ],
			connect: true,
			step: 50,
			margin: 200,
			range: {
				'min': 0,
				'max': 1000
			},
			tooltips: true,
			format: wNumb({
		        decimals: 0,
		        prefix: '$'
		    })
		});

		// Update Price Range
		priceSlider.noUiSlider.on('update', function( values, handle ){
			$('#filter-price-range').text(values.join(' - '));
		});
	}

	// Product countdown
	if ( $.fn.countdown ) {
		$('.product-countdown').each(function () {
			var $this = $(this), 
				untilDate = $this.data('until'),
				compact = $this.data('compact'),
                dateFormat = ( !$this.data('format') ) ? 'DHMS' : $this.data('format'),
                newLabels = ( !$this.data('labels-short') ) ? 
                                ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'] :
                                ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Mins', 'Secs'],
                newLabels1 = ( !$this.data('labels-short') ) ? 
                                ['Year', 'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second'] :
                                ['Year', 'Month', 'Week', 'Day', 'Hour', 'Min', 'Sec'];

            var newDate;

            // Split and created again for ie and edge 
            if ( !$this.data('relative') ) {
                var untilDateArr = untilDate.split(", "), // data-until 2019, 10, 8 - yy,mm,dd
                    newDate = new Date(untilDateArr[0], untilDateArr[1] - 1, untilDateArr[2]);
            } else {
                newDate = untilDate;
            }

			$this.countdown({
			    until: newDate,
			    format: dateFormat,
			    padZeroes: true,
			    compact: compact,
			    compactLabels: ['y', 'm', 'w', ' days,'],
			    timeSeparator: ' : ',
                labels: newLabels,
                labels1: newLabels1

			});
		});

		// Pause
		// $('.product-countdown').countdown('pause');
	}

	// Quantity Input - Cart page - Product Details pages
    function quantityInputs() {
        if ( $.fn.inputSpinner ) {
            $("input[type='number']").inputSpinner({
                decrementButton: '<i class="icon-minus"></i>',
                incrementButton: '<i class="icon-plus"></i>',
                groupClass: 'input-spinner',
                buttonsClass: 'btn-spinner',
                buttonsWidth: '26px'
            });
        }
    }

    // Sticky Content - Sidebar - Social Icons etc..
    // Wrap elements with <div class="sticky-content"></div> if you want to make it sticky
    if ( $.fn.stick_in_parent && $(window).width() >= 992 ) {
    	$('.sticky-content').stick_in_parent({
			offset_top: 80,
            inner_scrolling: false
		});
    }

    function owlCarousels($wrap, options) {
        if ( $.fn.owlCarousel ) {
            var owlSettings = {
                items: 1,
                loop: true,
                margin: 0,
                responsiveClass: true,
                nav: true,
                navText: ['<i class="icon-angle-left">', '<i class="icon-angle-right">'],
                dots: true,
                smartSpeed: 400,
                autoplay: false,
                autoplayTimeout: 15000
            };
            if (typeof $wrap == 'undefined') {
                $wrap = $('body');
            }
            if (options) {
                owlSettings = $.extend({}, owlSettings, options);
            }

            // Init all carousel
            $wrap.find('[data-toggle="owl"]').each(function () {
                var $this = $(this),
                    newOwlSettings = $.extend({}, owlSettings, $this.data('owl-options'));

                $this.owlCarousel(newOwlSettings);
                
            });   
        }
    }

    // Product Image Zoom plugin - product pages
    if ( $.fn.elevateZoom ) {
        $('#product-zoom').elevateZoom({
            gallery:'product-zoom-gallery',
            galleryActiveClass: 'active',
            zoomType: "inner",
            cursor: "crosshair",
            zoomWindowFadeIn: 400,
            zoomWindowFadeOut: 400,
            responsive: true
        });

        // On click change thumbs active item
        $('.product-gallery-item').on('click', function (e) {
            $('#product-zoom-gallery').find('a').removeClass('active');
            $(this).addClass('active');

            e.preventDefault();
        });

        var ez = $('#product-zoom').data('elevateZoom');

        // Open popup - product images
        $('#btn-product-gallery').on('click', function (e) {
            if ( $.fn.magnificPopup ) {
                $.magnificPopup.open({
                    items: ez.getGalleryList(),
                    type: 'image',
                    gallery:{
                        enabled:true
                    },
                    fixedContentPos: false,
                    removalDelay: 600,
                    closeBtnInside: false
                }, 0);

                e.preventDefault();
            }
        });
    }

    // Product Gallery - product-gallery.html 
    if ( $.fn.owlCarousel && $.fn.elevateZoom ) {
        var owlProductGallery = $('.product-gallery-carousel');

        owlProductGallery.on('initialized.owl.carousel', function () {
            owlProductGallery.find('.active img').elevateZoom({
                zoomType: "inner",
                cursor: "crosshair",
                zoomWindowFadeIn: 400,
                zoomWindowFadeOut: 400,
                responsive: true
            });
        });

        owlProductGallery.owlCarousel({
            loop: false,
            margin: 0,
            responsiveClass: true,
            nav: true,
            navText: ['<i class="icon-angle-left">', '<i class="icon-angle-right">'],
            dots: false,
            smartSpeed: 400,
            autoplay: false,
            autoplayTimeout: 15000,
            responsive: {
                0: {
                    items: 1
                },
                560: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 3
                }
            }
        });

        owlProductGallery.on('change.owl.carousel', function () {
            $('.zoomContainer').remove();
        });

        owlProductGallery.on('translated.owl.carousel', function () {
            owlProductGallery.find('.active img').elevateZoom({
                zoomType: "inner",
                cursor: "crosshair",
                zoomWindowFadeIn: 400,
                zoomWindowFadeOut: 400,
                responsive: true
            });
        });
    }

     // Product Gallery Separeted- product-sticky.html 
    if ( $.fn.elevateZoom ) {
        $('.product-separated-item').find('img').elevateZoom({
            zoomType: "inner",
            cursor: "crosshair",
            zoomWindowFadeIn: 400,
            zoomWindowFadeOut: 400,
            responsive: true
        });

        // Create Array for gallery popup
        var galleryArr = [];
        $('.product-gallery-separated').find('img').each(function () {
            var $this = $(this),
                imgSrc = $this.attr('src'),
                imgTitle= $this.attr('alt'),
                obj = {'src': imgSrc, 'title': imgTitle };

            galleryArr.push(obj);
        })

        $('#btn-separated-gallery').on('click', function (e) {
            if ( $.fn.magnificPopup ) {
                $.magnificPopup.open({
                    items: galleryArr,
                    type: 'image',
                    gallery:{
                        enabled:true
                    },
                    fixedContentPos: false,
                    removalDelay: 600,
                    closeBtnInside: false
                }, 0);

                e.preventDefault();
            }
        });
    }

    // Checkout discount input - toggle label if input is empty etc...
    $('#checkout-discount-input').on('focus', function () {
        // Hide label on focus
        $(this).parent('form').find('label').css('opacity', 0);
    }).on('blur', function () {
        // Check if input is empty / toggle label
        var $this = $(this);

        if( $this.val().length !== 0 ) {
            $this.parent('form').find('label').css('opacity', 0);
        } else {
            $this.parent('form').find('label').css('opacity', 1);
        }
    });

    // Dashboard Page Tab Trigger
    $('.tab-trigger-link').on('click', function (e) {
    	var targetHref = $(this).attr('href');

    	$('.nav-dashboard').find('a[href="'+targetHref+'"]').trigger('click');

    	e.preventDefault();
    });

    // Masonry / Grid layout fnction
	function layoutInit( container, selector) {
		$(container).each(function () {
            var $this = $(this);

            $this.isotope({
                itemSelector: selector,
                layoutMode: ( $this.data('layout') ? $this.data('layout'): 'masonry' )
            });
        });
	}
 
	function isotopeFilter ( filterNav, container) {
		$(filterNav).find('a').on('click', function(e) {
			var $this = $(this),
				filter = $this.attr('data-filter');

			// Remove active class
			$(filterNav).find('.active').removeClass('active');

			// Init filter
			$(container).isotope({
				filter: filter,
				transitionDuration: '0.7s'
			});
			
			// Add active class
			$this.closest('li').addClass('active');
			e.preventDefault();
		});
	}

    /* Masonry / Grid Layout & Isotope Filter for blog/portfolio etc... */
    if ( typeof imagesLoaded === 'function' && $.fn.isotope) {
        // Portfolio
        $('.portfolio-container').imagesLoaded(function () {
            // Portfolio Grid/Masonry
            layoutInit( '.portfolio-container', '.portfolio-item' ); // container - selector
            // Portfolio Filter
            isotopeFilter( '.portfolio-filter',  '.portfolio-container'); //filterNav - .container
        });

        // Blog
        $('.entry-container').imagesLoaded(function () {
            // Blog Grid/Masonry
            layoutInit( '.entry-container', '.entry-item' ); // container - selector
            // Blog Filter
            isotopeFilter( '.entry-filter',  '.entry-container'); //filterNav - .container
        });

        // Product masonry product-masonry.html
        $('.product-gallery-masonry').imagesLoaded(function () {
            // Products Grid/Masonry
            layoutInit( '.product-gallery-masonry', '.product-gallery-item' ); // container - selector
        });

        // Products - Demo 11
        $('.products-container').imagesLoaded(function () {
            // Products Grid/Masonry
            layoutInit( '.products-container', '.product-item' ); // container - selector
            // Product Filter
            isotopeFilter( '.product-filter',  '.products-container'); //filterNav - .container
        });
    }

	// Count
    var $countItem = $('.count');
	if ( $.fn.countTo ) {
        if ($.fn.waypoint) {
            $countItem.waypoint( function () {
                $(this.element).countTo();
            }, {
                offset: '90%',
                triggerOnce: true 
            });
        } else {
            $countItem.countTo();
        }    
    } else { 
        // fallback
        // Get the data-to value and add it to element
        $countItem.each(function () {
            var $this = $(this),
                countValue = $this.data('to');
            $this.text(countValue);
        });
    }

    // Scroll To button
    var $scrollTo = $('.scroll-to');
    // If button scroll elements exists
    if ( $scrollTo.length ) {
        // Scroll to - Animate scroll
        $scrollTo.on('click', function(e) {
            var target = $(this).attr('href'),
                $target = $(target);
            if ($target.length) {
                // Add offset for sticky menu
                var scrolloffset = ( $(window).width() >= 992 ) ? ($target.offset().top - 52) : $target.offset().top
                $('html, body').animate({
                    'scrollTop': scrolloffset
                }, 600);
                e.preventDefault();
            }
        });
    }

    // Review tab/collapse show + scroll to tab
    $('#review-link').on('click', function (e) {
        var target = $(this).attr('href'),
            $target = $(target);

        if ( $('#product-accordion-review').length ) {
            $('#product-accordion-review').collapse('show');
        }

        if ($target.length) {
            // Add offset for sticky menu
            var scrolloffset = ( $(window).width() >= 992 ) ? ($target.offset().top - 72) : ( $target.offset().top - 10 )
            $('html, body').animate({
                'scrollTop': scrolloffset
            }, 600);

            $target.tab('show');
        }

    	e.preventDefault();
    });

	// Scroll Top Button - Show
    var $scrollTop = $('#scroll-top');

    $(window).on('load scroll', function() {
        if ( $(window).scrollTop() >= 400 ) {
            $scrollTop.addClass('show');
        } else {
            $scrollTop.removeClass('show');
        }
    });

    // On click animate to top
    $scrollTop.on('click', function (e) {
        $('html, body').animate({
            'scrollTop': 0
        }, 800);
        e.preventDefault();
    });

    // Google Map api v3 - Map for contact pages
    if ( document.getElementById("map") && typeof google === "object" ) {

        var content =   '<address>' +
                            '88 Pine St,<br>' +
                            'New York, NY 10005, USA<br>'+
                            '<a href="#" class="direction-link" target="_blank">Get Directions <i class="icon-angle-right"></i></a>'+
                        '</address>';

        var latLong = new google.maps.LatLng(40.8127911,-73.9624553);

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: latLong, // Map Center coordinates
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP

        });

        var infowindow = new google.maps.InfoWindow({
            content: content,
            maxWidth: 360
        });

        var marker;
        marker = new google.maps.Marker({
            position: latLong,
            map: map,
            animation: google.maps.Animation.DROP
        });

        google.maps.event.addListener(marker, 'click', (function (marker) {
            return function() {
              infowindow.open(map, marker);
            }
        })(marker));
    }

    var $viewAll = $('.view-all-demos');
    $viewAll.on('click', function (e) {
        e.preventDefault();
        $('.demo-item.hidden').addClass('show');
        $(this).addClass('disabled-hidden');
    })

    var $megamenu = $('.megamenu-container .sf-with-ul');
    $megamenu.hover(function() {
        $('.demo-item.show').addClass('hidden');
        $('.demo-item.show').removeClass('show');
        $viewAll.removeClass('disabled-hidden');
    });

    // Product quickView popup
    $('.btn-quickview').on('click', function (e) {
        var ajaxUrl = $(this).attr('href');
        if ( $.fn.magnificPopup ) {
            setTimeout(function () {
                $.magnificPopup.open({
                    type: 'ajax',
                    mainClass: "mfp-ajax-product",
                    tLoading: '',
                    preloader: false,
                    removalDelay: 350,
                    items: {
                      src: ajaxUrl
                    },
                    callbacks: {
                        ajaxContentAdded: function () {
                            owlCarousels($('.quickView-content'), {
                                onTranslate: function(e) {
                                    var $this = $(e.target),
                                        currentIndex = ($this.data('owl.carousel').current() + e.item.count - Math.ceil(e.item.count / 2)) % e.item.count;
                                    $('.quickView-content .carousel-dot').eq(currentIndex).addClass('active').siblings().removeClass('active');
                                }
                            });
                            quantityInputs();
                        },
                        open: function() {
                            $('body').css('overflow-x', 'visible');
                            $('.sticky-header.fixed').css('padding-right', '1.7rem');
                        },
                        close: function() {
                            $('body').css('overflow-x', 'hidden');
                            $('.sticky-header.fixed').css('padding-right', '0');
                        }
                    },

                    ajax: {
                        tError: '',
                    }
                }, 0);
            }, 500);

            e.preventDefault();
        }
    });
    $('body').on('click', '.carousel-dot', function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });

    $('body').on('click', '.btn-fullscreen', function(e) {
        var galleryArr = [];
        $(this).parents('.owl-stage-outer').find('.owl-item:not(.cloned)').each(function() {
            var $this = $(this).find('img'),
                imgSrc = $this.attr('src'),
                imgTitle= $this.attr('alt'),
                obj = {'src': imgSrc, 'title': imgTitle };
            galleryArr.push(obj);
        });

        var ajaxUrl = $(this).attr('href');

        var mpInstance = $.magnificPopup.instance;
        if (mpInstance.isOpen)
            mpInstance.close();

        setTimeout(function () {
            $.magnificPopup.open({
                type: 'ajax',
                mainClass: "mfp-ajax-product",
                tLoading: '',
                preloader: false,
                removalDelay: 350,
                items: {
                  src: ajaxUrl
                },
                callbacks: {
                    ajaxContentAdded: function () {
                        owlCarousels($('.quickView-content'), {
                            onTranslate: function(e) {
                                var $this = $(e.target),
                                    currentIndex = ($this.data('owl.carousel').current() + e.item.count - Math.ceil(e.item.count / 2)) % e.item.count;
                                $('.quickView-content .carousel-dot').eq(currentIndex).addClass('active').siblings().removeClass('active');
                                $('.curidx').html(currentIndex + 1);
                            }
                        });
                        quantityInputs();
                    },
                    open: function() {
                        $('body').css('overflow-x', 'visible');
                        $('.sticky-header.fixed').css('padding-right', '1.7rem');
                    },
                    close: function() {
                        $('body').css('overflow-x', 'hidden');
                        $('.sticky-header.fixed').css('padding-right', '0');
                    }
                },

                ajax: {
                    tError: '',
                }
            }, 0);
        }, 500);
        
        e.preventDefault();
    });

    if(document.getElementById('newsletter-popup-form')) {
        setTimeout(function() {
            var mpInstance = $.magnificPopup.instance;
            if (mpInstance.isOpen) {
                mpInstance.close();
            }

            setTimeout(function() {
                $.magnificPopup.open({
                    items: {
                        src: '#newsletter-popup-form'
                    },
                    type: 'inline',
                    removalDelay: 350,
                    callbacks: {
                        open: function() {
                            $('body').css('overflow-x', 'visible');
                            $('.sticky-header.fixed').css('padding-right', '1.7rem');
                        },
                        close: function() {
                            $('body').css('overflow-x', 'hidden');
                            $('.sticky-header.fixed').css('padding-right', '0');
                        }
                    }
                });
            }, 500)
        }, 10000)
    }
});
