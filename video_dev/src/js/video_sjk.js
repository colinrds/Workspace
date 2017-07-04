import css from '../css/v_style.css';
var Hls = require('./s_hls.js');
var panel = require('./panel.js');

$('#level').click(function(){
    hls.currentLevel = 1;
})

function sVideo(options){
    var defaults = {
        widthSize: '800',
        heightSize: '',
        autoStartLoad: true,
        maxBufferSize: 10, //最大缓冲区大小
        playOrStop: true
    };
    this.config = $.extend(defaults, options);
    this.id = document.querySelector(this.config.id);
    this._hls = new Hls(this.config);
    this.panel = panel;
    this.init();
}
sVideo.prototype = {
    panelEvent: function(){
        $(this.id).parents('body').find('.ob_switch').click(this.playOrStop.bind(this));
    },
    playOrStop: function(){
        if(this.playOrStop){
            this.id.play();
            $(this.id).parents('body').find('.ob_switch').removeClass('ob_play_icon').addClass('ob_pause_icon');
            this.playOrStop = false;
        }else{
            this.id.pause();
            $(this.id).parents('body').find('.ob_switch').removeClass('ob_pause_icon').addClass('ob_play_icon');
            this.playOrStop = true;
        }
    },
    playInit: function(){
        this.id.style.cssText = "width:"+this.config.widthSize+"px;";
        $(this.id).parents('.s_video').find('.allTimers').text();
    },
    create: function(){
        var that = this;
        this._hls.on(Hls.Events.MEDIA_ATTACHED,this.onMediaAttached.bind(this));
        this._hls.on(Hls.Events.MANIFEST_PARSED,this.onManifestParsed.bind(this));
        this._hls.on(Hls.Events.FRAG_BUFFERED,this.onBuffered.bind(this))
        this._hls.on(Hls.Events.LEVEL_LOADED,this.onLevelLoaded.bind(this));
        this._hls.on(Hls.Events.ERROR,this.onError.bind(this));
    },
    onBuffered:function(){
        var duration = this.timeConversion(this.id.duration);
        console.log($(this.id).parents('body').find('.ob_time-all'));
        $(this.id).parents('body').find('.ob_time-all').text(duration);
    },
    // 转换秒为分钟
    timeConversion: function(tim){
		var second = tim % 60;				// 秒
		var min = parseInt(tim / 60);	// 分 
		return (Array(2).join(0)+min).slice(-2) + ':' + (Array(2).join(0)+second).slice(-2);
	},
    // 连接到媒体元素时触发
    onMediaAttached: function(){
        var panelCode = this.panel.panelCode();
        this._hls.loadSource(this.config.url);
        $(this.config.id).wrap('<div class="s_video" style="position: relative;display:inline-block;width:'+this.config.widthSize+'px"></div>');
        $(this.id).after(panelCode);
        this.playInit();
        this.panelEvent();
    },
    // 显示播放列表信息
    onManifestParsed: function(event, data){
        console.log(data.levels);
    },
    // 主播放列表加载完成时触发
    onLevelLoaded: function(event, data){

    },
    // HLS错误反馈
    onError: function(event, data){
        if (data.fatal) {
            switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                    // try to recover network error
                    console.log('fatal network error encountered, try to recover');
                    break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                    console.log('fatal media error encountered, try to recover');
                    // this.hls_.recoverMediaError();
                    break;
                default:
                    // cannot recover
                    this.error(data);
                    break;
            }
        }
    },
    // 错误处理
    error: function(data){
        console.log(data);
    },
    init: function(){
        var that = this;
        console.log(this);
        this._hls.attachMedia(this.id);
        this._hls.currentLevel = 0;
        this.create();
    }
}

new sVideo({
    id: '#video_one',
    url: 'https://www.ifreesec.com/test/3001090.m3u8'
})