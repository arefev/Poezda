// MAIN JAVASCRIPT
var arVideoPlayer = [],
	videoLoad = false,
	isMobile = navigator.userAgent.search(/ipad|iphone|ipod|htc|android|palm|windows\s+phone|blackberry/i) !== -1;

	

$(function(){
	if (isMobile) {
		$(".b-main-video").remove();
		$(".b-main-image__hidden").show();
	}
	
	var mapItems = {
		ircutsk: {
			name: "Иркутская область"
		},
		buryatya: {
			name: "Республика Бурятия"
		},
		chitinsk: {
			name: "Забайкальский край"
		},
		amursk: {
			name: "Амурская область"
		},
		dagestan: {
			name: "Дагестан"
		},
		vologda: {
			name: "Вологодская область"
		},
		speter: {
			name: "Ленинградская область"
		},
		pskov: {
			name: "Псковская область"
		},
		tver: {
			name: "Тверская область"
		},
		kostroma: {
			name: "Костромская область"
		},
		kirov: {
			name: "Кировская область"
		},
		perm: {
			name: "Пермский край"
		},
		nigegorod: {
			name: "Нижегородская область"
		},
		krasnodar: {
			name: "Краснодарский край"
		},
		vladikavkaz: {
			name: "Северная осетия"
		},
		chelyabinsk: {
			name: "Челябинская область"
		},
		orlovsk: {
			name: "Орловская область"
		},
		kursk: {
			name: "Курская область"
		},
		belgorod: {
			name: "Белгородская область"
		},
		voroneg: {
			name: "Воронежская область"
		},
		saratov: {
			name: "Саратовская область"
		},
		samara: {
			name: "Самарская область"
		},
		tambovsk: {
			name: "Тамбовская область"
		},
		penza: {
			name: "Пензенская область"
		},
		tula: {
			name: "Тульская область"
		},
		novgorod: {
			name: "Новгородская область"
		},
		chechnya: {
			name: "Чеченская республика"
		},
	}
	
	$("#map").svg({
		loadURL: '/images/map.svg',
		changeSize: true,
		onLoad: function(){
			var svgObj = $('#map').svg('get');
			
			svgObj.circle(134, 367, 1.5, {
				fill: "#363636"
			});
				
			svgObj.text(132, 364, "Москва", {
				fill: "#000",
				fontSize: 7,
				fontWeight: "bold"
			});
			
			$("#map .section").mouseover(function(){
				var elActive = $(this).find(".active"),
					item = elActive.data("item"),
					name = mapItems[item].name;
					
				$(".b-info-panel").text(name);
				
				$(this).nextAll(".section").prependTo(".active-sections");
				
				$('#map path.active').css({
					'stroke': "#484848",
					'stroke-width': 0.5
				});
				
				elActive.css({
					'stroke': "#FFF",
					'stroke-width': 2
				});
			}).mousemove(function(e) {
				var mouseX = e.pageX,
					mouseY = e.pageY;
				
				$(".b-info-panel").css({
					top: mouseY + 30,
                    left: mouseX - 5
				}).show();
				
			});
			
			$("#map").on("mouseleave", ".section", function(){
				var item = $(this).find(".active").data("item");
						
				$('#map path.active').css({
					'stroke': "#484848",
					'stroke-width': 0.5
				});
				$(".b-info-panel").hide();
			});
			
			$("#map").on("click", ".section", function(){
				var elActive = $(this).find(".active"),
					item = elActive.data("item"),
					popup = $(".b-regions-map__desc[data-map-item=" + item + "]");
					
				$(".b-regions-map__desc").hide();
				popup.show();
				
			});
			
			
		}
	});
	
	$(".b-regions-map__desc-close").click(function(){
		$(this).closest(".b-regions-map__desc").hide();
	});	
	
	$(".b-news .b-btn-black").click(function(){
		var text = $(this).text(),
			textNext = $(this).data("text");
			
		$(this).text(textNext).data("text", text);
		
		$(window).parallax();
	});
	
	
	if (!isMobile) {
		$(".b-main-carousel").each(function(index){
			var $carousel = $(this).find(".b-carousel"),
				$pager = $(this).find(".b-carousel-pager"),
				carouselID = "carousel_" + index;
				
			$(this).find(".b-carousel-arrow_left").attr("id", carouselID + "_left");
			$(this).find(".b-carousel-arrow_right").attr("id", carouselID + "_right");
			
			$carousel.find(".b-carousel__item").each(function(index){
				var itemID = carouselID + "_item_" + index;
				$(this).attr("data-item", itemID);
				$pager.find(".b-carousel-pager__item").eq(index).attr("data-item", itemID);
			});
		 
			$carousel.carouFredSel({
				responsive: true,
				auto: false,
				prev: "#" + carouselID + "_left",
				next: "#" + carouselID + "_right",
				items: {
					visible: 1,
					width: 800,
					height: (600/1500*100) + '%'
				},
				scroll: {
					fx: 'crossfade'
				}
			});
			
			$pager.carouFredSel({
				width: '100%',
				height: 147,
				auto: false,
				scroll: {
					items: 1
				}
			});
			
			$(this).find(".b-carousel-arrow").click(function(){
				var itemActive = $carousel.find(".b-carousel__item").first(),
					itemID = itemActive.attr( 'data-item' ),
					parent = $(this).closest(".b-carousel-pager-wrapper");
					
				$pager.trigger( 'slideTo', [ '.b-carousel-pager__item[data-item="'+ itemID +'"]' ] );
				
				parent.find(".active").removeClass("active");
				$('.b-carousel-pager__item[data-item="'+ itemID +'"]').addClass("active");
			});
			
			$pager.find('.b-carousel-pager__item').click(function() {
				var itemID = $(this).attr( 'data-item' ),
					parent = $(this).closest(".b-carousel-pager");
				
				parent.find(".active").removeClass("active");
				$(this).addClass("active");
				
				$carousel.trigger( 'slideTo', [ '.b-carousel__item[data-item="'+ itemID +'"]' ] );
			});
		});
	} else {
		$(".b-main-carousel").each(function(index){
			var $carousel = $(this).find(".b-carousel"),
				$pager = $(this).find(".b-carousel-pager"),
				carouselID = "carousel_" + index;
				
			$(this).find(".b-carousel-arrow_left").attr("id", carouselID + "_left");
			$(this).find(".b-carousel-arrow_right").attr("id", carouselID + "_right");
			
			$(this).find(".b-carousel-arrow").each(function(){
				$(this).appendTo($carousel.closest(".b-carousel-wrapper"));
			});
		 
			$carousel.carouFredSel({
				responsive: true,
				auto: false,
				prev: "#" + carouselID + "_left",
				next: "#" + carouselID + "_right",
				items: {
					visible: 1,
					width: 800,
					height: (600/1500*100) + '%'
				},
				scroll: {
					fx: 'crossfade'
				}
			});
			

		});
		$(".b-main-frame_carousel").removeClass();
		$(".b-carousel-pager-wrapper").remove();
		$(".b-carousel__item-text").remove();
	}
	
	setVideoParams();
	setSizeVideo();
	
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	
	$(window).parallax();
});

$(window).resize(function(){
	setSizeVideo();
});

$(window).scroll(function() {
	var windowHeight = $(window).height();
	var topOfWindow = $(window).scrollTop() + windowHeight;
		
	if (videoLoad && !isMobile) {
		$('.b-video').each(function(index){
			var videoPosTop = $(this).offset().top,
				videoPosBottom = videoPosTop + windowHeight + windowHeight/2,
				ytplayer = arVideoPlayer[index];
			
			if (videoPosTop < (topOfWindow - windowHeight/2) && videoPosBottom > topOfWindow) {
				ytplayer.playVideo();
			} else {
				ytplayer.pauseVideo();
			}
		});
	}
});

// YOUTUBE VIDEO

function setVideoParams() {
	var params = { allowScriptAccess: "always",  wmode:"transparent" };
	
	$(".b-video").each(function(index){
		var item = $(this).find(".b-video__item"),
			videoLink = item.data("video"),
			id = "videoFrame_" + index;
			
		arVideoPlayer[index] = id;
		
		item.attr("id", id);
	});
}

function setSizeVideo() {
	var windowHeight = $(window).height(),
		windowWidth = $(window).width()+100;
	$(".b-video").each(function(){
		$(this).height(windowHeight);
	});
}



function onYouTubeIframeAPIReady() {
	
	$(".b-video").each(function(index){
		var item = $(this).find(".b-video__item"),
			videoLink = item.data("video"),
			id = item.attr("id");
			
		arVideoPlayer[index] = new YT.Player(id, {
			height: '100%',
			width: '100%',
			videoId: videoLink,
			events: {
				'onReady': onPlayerReady,
				//'onStateChange': onPlayerStateChange
			}
		});
	});
}

function onPlayerReady(event) {
	videoLoad = true;
}


