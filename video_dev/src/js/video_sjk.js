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
        this.parentDom.find('.ob_switch').click(this.playOrStop.bind(this));
        this.parentDom.find('.ob_process').on('click',this.percentage.bind(this));
        this.id.onwaiting = function(){
			console.log("加载中");
		}

		//缓冲完毕继续播放事件
		this.id.onplaying = function(){
			console.log("加载完成");
		}
    },
    //播放和暂停事件
    playOrStop: function(){
        if(this.playOrStop){
            this.id.play();
            this.parentDom.find('.ob_switch').removeClass('ob_play_icon').addClass('ob_pause_icon');
            this.playOrStop = false;
        }else{
            this.id.pause();
            this.parentDom.find('.ob_switch').removeClass('ob_pause_icon').addClass('ob_play_icon');
            this.playOrStop = true;
        }
    },
    //播放控制器初始化 
    playInit: function(){
        this.id.style.cssText = "width:"+this.config.widthSize+"px;";
        this.id.ontimeupdate = this.update.bind(this);
    },
    //进度条点击事件
    percentage: function(){
        var widthCurr = this.mouseCurrentX('ob_process') / this.parentDom.find('.ob_process').width()
        this.id.currentTime = widthCurr*this.allTime();
    },
	//计算鼠标相对元素X坐标
	mouseCurrentX: function(dmNm,event){
		var e = event || window.event;
        var dom = this.parentDom.find('.'+dmNm);
        return e.clientX - parseInt(dom.offset().left);
	},	
    //获取元素的宽度
	getDomWidth: function(dmNm){
		var dom = document.getElementById(dmNm);
		return parseInt(dom.width||dom.offsetWidth||dom.clientWidth);
	},
    // 时时监听播放进度
    update: function(){
        var duration = this.timeConversion(parseInt(this.allTime()));
        var currentTime = Math.floor(this.id.currentTime);
        this.parentDom.find('.ob_time-all').text(duration);
        this.parentDom.find('.ob_process_load').css('width',this.bufferedTime()+'%')
        this.parentDom.find('.ob_time-recent').text(this.timeConversion(currentTime));
        this.parentDom.find('.ob_process_play').css('width',this.currentTime()+'%')
        this.parentDom.find('.ob_process_btn').css('left',this.currentTime()+'%');
    },
	//当前播放进度
	currentTime: function(){
		return (this.id.currentTime / this.allTime()).toFixed(3) * 100;
	},
    //当前缓存加载进度
    bufferedTime: function(){
        return (this.id.buffered.end(0) / this.allTime()).toFixed(2) * 100;
    },
    //视频总长度
    allTime: function(){
		return this.id.duration;
	},
    //初始化hls错误事件绑定
    create: function(){
        var that = this;
        this._hls.on(Hls.Events.MEDIA_ATTACHED,this.onMediaAttached.bind(this));
        this._hls.on(Hls.Events.MANIFEST_PARSED,this.onManifestParsed.bind(this));
        this._hls.on(Hls.Events.FRAG_BUFFERED,this.onBuffered.bind(this))
        this._hls.on(Hls.Events.LEVEL_LOADED,this.onLevelLoaded.bind(this));
        this._hls.on(Hls.Events.ERROR,this.onError.bind(this));
    },
    onBuffered:function(){

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
        this.parentDom = $(this.id).parents('.s_video');
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
    url: 'http://cdn.sanjieke.cn/hahahaha/ori.m3u8'
    // url: 'https://www.ifreesec.com/test/3001090.m3u8'
})