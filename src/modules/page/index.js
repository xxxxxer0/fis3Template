var swiper = require('swiper');
var mySwiper

var C = {
    init: function() {
        //一级tab
        $('.first-tab').on('click',function() {
            $('.first-tab').removeClass('cur')
            var index = $('.first-tab').index($(this))
            $('.first-tab').eq(index).addClass('cur')
            $('.second-tab-group').removeClass('cur')
            $('.second-tab-group').eq(index).addClass('cur')
            $('.second-tab-group').eq(index).find('.second-tab').eq(0).trigger('click')
        })
        //2级tab
        $('.second-tab').on('click',function() {
            $('.second-tab').removeClass('cur')
            var index = $('.second-tab').index($(this))
            $('.second-tab').eq(index).addClass('cur')
            $('.third-tab-wrap').removeClass('cur')
            $('.third-tab-wrap').eq(index).addClass('cur')
        })
    }
}


var V = {

    init: function() {
        V.initSWiper()
        V.renderClock($('#clock'))
        V.interval = setInterval(function() {
            V.renderClock($('#clock'))
        },1000)
    },
    initSWiper: function() {
        mySwiper = new swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay:4000,
            loop:true,
            autoplayDisableOnInteraction : false,
            mode : 'vertical',
        })
        return this
    },

    renderClock: function ($span) {
        var endTime = $span.attr("data-time");
        if ($span.hasClass('yuding_start_time')) {
            endTime = new Date(endTime).getTime() / 1000;
        }
        if ($span && endTime) {

            var now = new Date();
            var nowTime = now.getTime() / 1000;
            var restTime = endTime - nowTime;

            var day = V.paserTime(restTime / (60 * 60 * 24));
            var hour = V.paserTime(restTime % (60 * 60 * 24) / (60 * 60));
            var min = V.paserTime(restTime % (60 * 60 * 24) % (60 * 60) / (60));
            var second = V.paserTime(restTime % (60 * 60 * 24) % (60 * 60) % 60);

            if (parseInt(day)) {
                var str = parseInt(day) + ' 天 ' + hour + " : " + min + " : " + second;
            } else {
                var str = hour + ":" + min + ":" + second;
            }
            $span.text(str);
            if (Math.round(nowTime) >= endTime) {
                //location.reload();
                $span.text('00:00:00'); $span.text('00:00:00');
                window.clearInterval(V.interval);
            }
        }
        return this;
    },

    paserTime: function (data) {
        var str = data.toString();
        var arr = str.split(".");

        if (arr[0].length == 1) {
            return "0" + arr[0];
        }
        return arr[0];
    },
    
}


$(function() {
    V.init()
    C.init()
    
})