function getSliderGallerySingleSettings(){return{slidesToShow:1,slidesToScroll:1,arrows:!0,fade:!0,infinite:!0,asNavFor:".lightgallery--nav"}}function getSliderGalleryNavSettings(){return{arrows:!0,slidesToShow:10,slidesToScroll:1,asNavFor:".lightgallery--single",dots:!1,focusOnSelect:!0,infinite:!0,responsive:[{breakpoint:1024,settings:{slidesToShow:4}},{breakpoint:768,settings:{slidesToShow:3}},{breakpoint:576,settings:{slidesToShow:2}}]}}function formatdate(t){if(!t)return"";var e=new Date(t);if("Invalid Date"==e.toString())return"";var s=e.getDate();return s<10&&(s="0"+s),(t=e.getMonth()+1)<10&&(t="0"+t),e.getFullYear()+"-"+t+"-"+s}function formatdate2(t){if(!t)return"";var e=new Date(t);if("Invalid Date"==e.toString())return"";var s=e.getDate();return s<10&&(s="0"+s),(t=e.getMonth()+1)<10&&(t="0"+t),s+"/"+t+"/"+e.getFullYear()}!function(o){o(document).ready((function(){function t(t){o(t).each(((t,e)=>{const s=o(e).closest(".imp-tabs-container");Math.round(s.width())<o(e).get(0).scrollWidth?s.addClass("imp-tabs-over"):s.removeClass("imp-tabs-over")}))}if(o(".slider-01").slick({dots:!0,arrows:!1,infinite:!0,slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:5e3,fade:!0}),o(".slider-02").slick({dots:!0,arrows:!1,infinite:!0,slidesToShow:4,slidesToScroll:2,autoplay:!0,autoplaySpeed:5e3,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:3}},{breakpoint:768,settings:{slidesToShow:1,slidesToScroll:1}}]}),o(".slider-03").slick({dots:!0,arrows:!1,infinite:!0,slidesToShow:6,slidesToScroll:3,autoplay:!0,autoplaySpeed:5e3,responsive:[{breakpoint:1024,settings:{slidesToShow:4,slidesToScroll:4,infinite:!0,dots:!0}},{breakpoint:768,settings:{slidesToShow:3,slidesToScroll:3}},{breakpoint:576,settings:{slidesToShow:2,slidesToScroll:2}}]}),o(".slider-04").slick({dots:!0,arrows:!1,infinite:!0,slidesToShow:3,slidesToScroll:3,autoplay:!0,autoplaySpeed:5e3,responsive:[{breakpoint:768,settings:{slidesToShow:2,slidesToScroll:2,infinite:!0,dots:!0}},{breakpoint:576,settings:{slidesToShow:1,slidesToScroll:1}}]}),o(".investor-top__slider").slick({dots:!0,arrows:!0,infinite:!0,slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:5e3,appendArrows:o(".investor-top__append-arrow")}),o(".imp-banner-slider").slick({dots:!0,arrows:!0,infinite:!0,slidesToShow:2,slidesToScroll:1,autoplay:!0,autoplaySpeed:5e3,appendArrows:o(".investor-top__append-arrow"),responsive:[{breakpoint:768,settings:{slidesToShow:1,slidesToScroll:1}}]}),o(".potential-slider").slick({dots:!0,arrows:!1,infinite:!0,slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:5e3,fade:!0}),o(".achievement-business__slider").slick({dots:!0,arrows:!1,infinite:!0,speed:300,slidesToShow:1,centerMode:!0,variableWidth:!0,autoplay:!0}),o(".hd-btn-hamburger").on("click",(function(t){t.preventDefault(),o(".hd-menu-wrap").addClass("hd-menu-open"),o("html, body").css("overflow-y","hidden")})),o(".hd-btn-close").on("click",(function(t){t.preventDefault(),o(".hd-menu-wrap").removeClass("hd-menu-open"),o("html, body").css("overflow-y","initial")})),o(".btn-menu-dropdown").on("click",(function(t){t.preventDefault(),o(this).parent().find("> .sub-menu"),o(this).parent().hasClass("menu-item-open")?o(this).parent().removeClass("menu-item-open"):o(this).parent().addClass("menu-item-open")})),t(".imp-tabs-nav"),o(window).resize((function(){t(".imp-tabs-nav")})),o(".imp-tabs-wrap").scroll((function(){var t=Math.ceil(o(this).scrollLeft())+5;const s=o(this).closest(".imp-tabs-container").find(".imp-tabs-blur");t=99-t/(o(this).get(0).scrollWidth-o(this).outerWidth())*100,s.css("width",t+"%")})),o(document).on("click",".table-drop__item-label-wrap",(function(t){t.preventDefault(),o(this).closest("li").hasClass("imp-dropdown")?o(this).closest("li").removeClass("imp-dropdown"):(o(this).closest(".table-drop").find("li").removeClass("imp-dropdown"),o(this).closest("li").addClass("imp-dropdown"))})),o(document).on("click",".about-us__milestones-see-more-btn",(function(t){t.preventDefault(),o(this).closest(".about-us__milestones-container").toggleClass("milestones-full"),o(".about-us__milestones-container").hasClass("milestones-full")?o(this).text(o(this).attr("data-collapse")):o(this).text(o(this).attr("data-seemore"))})),o(document).on("click",".backtotop-btn",(function(t){t.preventDefault(),o("html , body").scrollTop(0)})),o(window).scroll((function(t){var e=o("html,body").scrollTop(),s=o("footer .footer-wrap").offset().top-o(window).height();e>o(window).height()+100?(o(".backtotop-btn").show(300),s<e&&(e=Math.abs(o("footer .footer-wrap").offset().top-e-o(window).height())+15,o(".backtotop-btn").css("bottom",e+"px"))):o(".backtotop-btn").hide(300)})),o(".btn-seemore-cateProduct").on("click",(function(t){t.preventDefault(),o(this).closest(".product-categories-wrap").find(".product-categories").toggleClass("show-all"),o(this).closest(".product-categories-wrap").find(".product-categories").hasClass("show-all")?o(this).text(o(this).attr("data-collapse")):o(this).text(o(this).attr("data-seemore"))})),o(document).on("click",".the-media__gallery-image",(function(t){t.preventDefault();var e=o(this).data("target"),s=o(this).closest("[data-slick]").data("slick");t=o(this).closest("[data-modal]").data("modal"),e=o("."+s+' [data-anchor="'+e+'"]').closest(".slick-slide").data("slick-index");o("#"+t).addClass("lightgallery-modal-open"),o("."+s).slick("slickGoTo",e),o("html, body").css("overflow-y","hidden")})),o(".btn-close-lightgallery-modal").on("click",(function(t){t.preventDefault(),o("#lightgalleryVideo").find("iframe").attr("src",""),o(".lightgallery-modal").removeClass("lightgallery-modal-open"),o("html, body").css("overflow-y","initial")})),o(".datepicker-input").datepicker(o.datepicker.regional.vi,{altFormat:"dd/mm/yyyy",language:"vi"}),o(".datepicker-input").change((function(){formatdate2(o(this).datepicker("getDate"))!=o(this).val()&&o(this).datepicker("setDate",null)})),"undefined"!=typeof Storage){localStorage.comfirm||(localStorage.comfirm=!1);let e=window.location.href;o(document).on("click",".menu-item a",(function(t){o(this).closest('.menu-item[data-target="product"]').length&&"false"==localStorage.comfirm&&(e=o(this).attr("href"),t.preventDefault(),o(".popup-confirmation").addClass("popup-confirmation-open"))})),o(document).on("click",".btn-confirm-popup-confirmation",(function(t){t.preventDefault(),localStorage.comfirm=!0,console.log(e),o(".popup-confirmation").removeClass("popup-confirmation-open"),setTimeout((function(){window.location.href=e}),700)})),o(document).on("click",".btn-close-popup-confirmation",(function(t){o(".popup-confirmation").removeClass("popup-confirmation-open")}))}else alert("Browser not support Storage");o(".imp-select-current").on("click",(function(){o(".imp-select").toggleClass("imp-select-show")}));let e=o(".imp-select .active");o(".imp-select-current span").text(e.text()),o(".imp-select li").on("click",(function(){const t=o(this).closest(".imp-select");var e=o(this).text(),s=o(this).attr("data-value");t.find("li").removeClass("active"),o(this).addClass("active"),o(this).closest(".imp-select-wrapper").find(".imp-select-current  span").text(e),s?o(this).closest(".imp-select-wrapper").find(".imp-select-current").attr("data-value",s):o(this).closest(".imp-select-wrapper").find(".imp-select-current").attr("data-value",""),o(".imp-select").removeClass("imp-select-show")})),o(".imp-video-link").on("click",(function(t){t.preventDefault();var e=o(this).data("video-url");t=o(this).closest("div[data-modal]").data("modal"),o("#"+t).addClass("lightgallery-modal-open"),o("#"+t).find("iframe").attr("src",e)}))}))}(jQuery);