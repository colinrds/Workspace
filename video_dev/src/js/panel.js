var panel = function () {

}
panel.prototype = {
    panelCode: function () {
        var FZFVIDEO = '<div class="videoState">'+
                        '<div class="videoStateBox">'+
                        '<div class="playOrStop">'+
                        '<i class="play-btn icon-play"></i></div>'+
                        '<div class="currentTimeBox">'+
                        '<span class="currentTimers">0:00</span>'+
                        '<span>/</span>'+
                        '<span class="allTimers">0:00</span></div>'+
                        '<div class="percentage">'+
                        '<div class="currentPerc"></div>'+
                        '<div class="currentPercentage"></div>'+
                        '<div class="currentAll"></div>'+
                        '<div class="currentBG"></div>'+
                        '</div>'+
                        '<div class="videoSpeed">'+
                        '<div class="videoBoxRe">'+
                        '<i class="icon-set"></i>'+
                        '<ul class="videoSpeedList">'+
                        '<li class="videoSpeedStup" class="bs4">2.5倍</li>'+
                        '<li class="videoSpeedStup" class="bs3">2.0倍</li>'+
                        '<li class="videoSpeedStup" class="bs2">1.5倍</li>'+
                        '<li class="videoSpeedStup" class="bs1">默认</li></ul>'+
                        '</div>'+
                        '</div>'+
                        '<div class="videoSound">'+
                        '<div class="videoSoundBox">'+
                        '<i class="sound-btn icon-sound"></i>'+
                        '<div class="soundBar">'+
                        '<div class="currentSound"></div>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '<div class="fullscreen"></div>'+
                        '</div>'+
                        '</div>';
        return FZFVIDEO;
    },
    init: function () {
        console.log(111);
    }
}


module.exports = new panel();