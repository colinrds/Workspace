var panel = function () {

}
panel.prototype = {
    panelCode: function () {
        var FZFVIDEO = '<div class="operate_bar">'+
            '<div class="ob_process">'+
            '<div class="ob_process_load" style="width:50%;"></div>'+
            '<div class="ob_process_play"></div>'+
            '<div class="ob_process_btn"></div>'+
            '</div>'+
            '<div class="ob_switch ob_play_icon"></div>'+
            '<div class="ob_time">'+
            '<span class="ob_time-recent">00:00</span>'+
            '<span>/</span>'+
            '<span class="ob_time-all">00:00</span>'+
            '</div>'+
            '<div class="ob_setting"></div>'+
            '<div class="ob_voice_box">'+
            '<i class="ob_voice ob_voice_big"></i>'+
            '<div class="ob_voice_process"></div>'+
            '</div>'+
            '</div>';
        return FZFVIDEO;
    },
    init: function () {
        console.log(111);
    }
}


module.exports = new panel();