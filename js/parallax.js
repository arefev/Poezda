/*!
 * parallax v1.0.1
 *
 * by Anton Zhukov
 * toxa@toxa.ru
 */
$(function(){var p=function(a,b){var c=$(a);var d=c.data(b)||"";if(d!=""){a.src=d}c.removeData(b)};if(typeof $.fn.slider==="function"){$(".slider-parallax").each(function(){var h=$(this);var j=h.find(".slider-canvas");var k=h.find(".slider-item");var l=true;var m=[];var n;var o=function(e,f){var g=function(a){var b;var c;var d;b=m[a];if(typeof b!="undefined"){p(b,"slider-src");delete m[a]}};g(e);g(e+1);g(e+2)};var i;k.each(function(i){$(this).find("img[data-slider-src]").each(function(){var a=$(this);var b=a.data("slider-src")||"";if(b!=""){m[i]=this}})});h.slider({"isKeyboard":true,"margin":40,"onReady":function(a,b){n=window.setTimeout(function(){h.addClass("slider-hover")},500)},"onComplete":function(a,b){o(a,b)},"onClick":function(a,b){window.clearTimeout(n);l=!l;if(l){h.addClass("slider-hover")}else{h.removeClass("slider-hover")}}})})}if(typeof $.fn.parallax==="function"){$(typeof parallaxSelector!=="undefined"?parallaxSelector:window).parallax()}});
