new function (){
	//alert(123);
   var _self = this;
   _self.width = 640;
   _self.fontSize = 100;
   _self.widthProportion = function(){var p = (document.body&&document.body.clientWidth||document.getElementsByTagName("html")[0].offsetWidth)/_self.width;return p>1?1:p<0.5?0.5:p};
   _self.changePage = function(){
       document.getElementsByTagName("html")[0].setAttribute("style","font-size:"+_self.widthProportion()*_self.fontSize+"px !important");
   }
   _self.changePage();
   window.addEventListener('resize',function(){_self.changePage();},false);
};
// window.onload = function () {
//     loading();
// }
var date_start;	
var date_end;
date_start = getNowFormatDate();
//加载图片
var loading_img_url = [
    "./img/loading.jpg",
     "./img/jindutiao_03.png",
     "./img/loading_bg_03.png",
];

//加载页面
// function loading() {
//     var numbers = 0;
//     var length = loading_img_url.length;

//     for (var i = 0; i < length; i++) {
//         var img = new Image();
//         img.src = loading_img_url[i];
//         img.onerror = function () {
//             numbers += (1 / length) * 100;
//         }
//         img.onload = function () {
//             numbers += (1 / length) * 100;
//             $('.number').html(parseInt(numbers) + "%");
//             console.log(numbers);
//             if (Math.round(numbers) == 100) {
//                 //$('.number').hide();
//                 date_end = getNowFormatDate();
//                 var loading_time = date_end - date_start;
//                 //预加载图片
//                 $(function progressbar() {
//                     var tagHtml = "";
//                     $(".flipbook").append(tagHtml);
//                     var w = $(".graph").width();
//                     $(".flipbook-viewport").show();
//                 });
//                 //配置turn.js
//                 function loadApp() {
//                     var w = $(window).width();
//                     var h = $(window).height();
//                     $('.flipboox').width(w).height(h);
//                     $(window).resize(function () {
//                         w = $(window).width();
//                         h = $(window).height();
//                         $('.flipboox').width(w).height(h);
//                     });
//                     $('.flipbook').turn({
//                         // Width
//                         width: w,
//                         // Height
//                         height: h,
//                         // Elevation
//                         elevation: 50,
//                         display: 'single',
//                         // Enable gradients
//                         gradients: true,
//                         // Auto center this flipbook
//                         autoCenter: true,
//                         when: {
//                             turning: function (e, page, view) {
//                             },
                            
//                             turned: function (e,page,view) {
//                                 if($(".flipbook").turn("page")==1){
//                                    	$(this).turn('peel', 'tr');
//                                 }else{
//                                     $('.flipbook').turn('disable');
//                                 }
//                             },
                           
//                         }
//                     })
//                 }
//                 yepnope({
//                     test: Modernizr.csstransforms,
//                     yep: ['js/turn.js'],
//                     complete: loadApp
//                 });
//             }
//             ;
//         }
//     }
// }

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "";
    var seperator2 = "";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + "" + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}


function kai() {
	$('body').addClass('active');
	$('body').on('touchmove touchstart', function (event) {
    event.preventDefault();
	});
}

function guan() {
	$('body').removeClass('active');
	$("body").unbind('touchmove');
	$("body").unbind('touchstart');
}


$(document).ready(function() {
	for (var e = document.querySelectorAll("img"), t = [], o = 0; o < e.length; o++) t.push(e[o].src);
    new preLoader(t, {
        onProgress: function(t, o, n) {
            var a = (100 / e.length * .01 * n * 100).toFixed(0);
            var left= a-100;
            console.log(left);
            // debugger;
            $("#jindutiao_bg").css({'left':left + '%'})
			//$(".main").hide()
        },
        onComplete: function() {
        	
			$("#loading").hide();
            $(".s2").show();

                /*从头至尾播放*/
                document.getElementById("audio_bgm").play();
                document.addEventListener("WeixinJSBridgeReady", function () {
                    document.getElementById("audio_bgm").play();
                }, false);
			
		},
	});
});