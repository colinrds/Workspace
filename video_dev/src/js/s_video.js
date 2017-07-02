import css from '../css/main.css';
var videojs = require('./video.js');
var Hls = require('./hls.js');

(function (window, videojs, Hls, document, undefined) {
  'use strict';
  /**
   * Initialize the plugin.
   * @param options (optional) {object} configuration for the plugin
   */
  var Component = videojs.getComponent('Component');
  var Tech = videojs.getTech('Tech');
  var Html5 = videojs.getComponent('Html5');
  var Hlsjs = videojs.extend(Html5, {
    createEl: function () {
      this.hls_ = new Hls();
      this.el_ = Html5.prototype.createEl.apply(this, arguments);

      this.hls_.on(Hls.Events.MEDIA_ATTACHED, videojs.bind(this, this.onMediaAttached));
      this.hls_.on(Hls.Events.MANIFEST_PARSED, videojs.bind(this, this.onManifestParsed));
      this.hls_.on(Hls.Events.LEVEL_LOADED, videojs.bind(this, this.onLevelLoaded));
      this.hls_.on(Hls.Events.ERROR, videojs.bind(this, this.onError));
      this.hls_.attachMedia(this.el_);
      this.src(this.options_.source.src);

      this.el_.tech = this;
      return this.el_;
    },
    onMediaAttached: function () {
      this.triggerReady();
    },
    onLevelLoaded: function (event, data) {
      this.duration = data.details.live ? function () {
        return Infinity;
      } : Html5.prototype.duration;
    },
    onManifestParsed: function (event,data) {
      console.log(1111);
      data.levels.forEach(function(val){
        console.log(val.url);
      })
      if (this.player().options().autoplay) {
        this.player().play();
      }
    },
    setSrc: function (src) {
      this.hls_.loadSource(src);
    },
    onError: function (event, data) {
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            // try to recover network error
            console.log('fatal network error encountered, try to recover');
            this.hls_.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            console.log(Hls.ErrorTypes.MEDIA_ERROR)
            console.log('fatal media error encountered, try to recover');
            // this.hls_.recoverMediaError();
            break;
          default:
            // cannot recover
            this.hls_.destroy();
            this.error(data);
            break;
        }
      }
      switch (data.details) {
        case Hls.ErrorDetails.MANIFEST_LOAD_ERROR:
        case Hls.ErrorDetails.MANIFEST_LOAD_TIMEOUT:
        case Hls.ErrorDetails.MANIFEST_PARSING_ERROR:
        case Hls.ErrorDetails.LEVEL_LOAD_ERROR:
        case Hls.ErrorDetails.LEVEL_LOAD_TIMEOUT:
        case Hls.ErrorDetails.LEVEL_SWITCH_ERROR:
        case Hls.ErrorDetails.FRAG_LOAD_ERROR:
        case Hls.ErrorDetails.FRAG_LOOP_LOADING_ERROR:
        case Hls.ErrorDetails.FRAG_LOAD_TIMEOUT:
        case Hls.ErrorDetails.FRAG_PARSING_ERROR:
        case Hls.ErrorDetails.BUFFER_APPEND_ERROR:
        case Hls.ErrorDetails.BUFFER_APPENDING_ERROR:
          console.log(data.type);
          console.log(data.details);
          break;
        default:
          break;
      }
    },
    dispose: function () {
      this.hls_.destroy();
      return Html5.prototype.dispose.apply(this);
    }
  });

  console.log('aaa');
  Hlsjs.isSupported = function () {

    return Hls.isSupported();
  };
  Hlsjs.canPlaySource = function (techId, source) {
    if (Html5.canPlaySource(techId, source)) {
      return false;
    } else {
      console.log('Hls.isSupported');
      return Hls.isSupported();
    }
  };

  // register as Component and Tech;
  Component.registerComponent('Hlsjs', Hlsjs);
  Tech.registerTech('Hlsjs', Hlsjs);
  videojs.options.techOrder.push('Hlsjs');

})(window, videojs, Hls, document);


function sVideo(opt) {
  this.data = $.extend({
    onePlay: true
  }, opt);
  this.init();
}
sVideo.prototype = {
  insertCode: function () {
    var html = '<video class="video-js video vjs-default-skin" height="300" width="600" controls><p>Your browser doesnt support video. Please <a href="http://browsehappy.com/">upgrade your browser</a> to see the example.</p><source src="' + this.data.videoUrl + '" type="application/vnd.apple.mpegurl"></video>'

    return {
      html: html
    }
  },
  setCookie: function (name, value, Hours) {
    var exp = new Date();
    exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
    document.cookie = name + "=" + value + ";expires=" + exp.toGMTString();
  },
  getCookie: function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  },
  init: function () {
    var _this = this;
    var code = this.insertCode();
    var vId = this.data.id;
    $('#' + vId).append(code.html);
    var vId = this.data.id;
    vId = document.querySelector('#' + vId + ' video');
    var player = videojs(vId, {
      bigPlayButton: false,
      autoplay: false,
      controlBar: {
        captionsButton: false,
        chaptersButton: false,
        playbackRateMenuButton: true,
        LiveDisplay: true,
        subtitlesButton: false,
        remainingTimeDisplay: true,
        progressControl: true,
        volumeMenuButton: {
          inline: false,
          vertical: true
        }, //竖着的音量条
        fullscreenToggle: true
      }
    }, function () {
      var that = this;
      this.ready(function () {
        console.log(2222);
        this.time = _this.getCookie(_this.data.id);
      });
      this.on('play', function () {
        this.currentTime(this.time);
        if(_this.data.onePlay){
          _this.data.onePlay = false;
        }
      });
      this.on('timeupdate', function () {
        if(!_this.data.onePlay){
          _this.setCookie(_this.data.id, this.currentTime(), 87600);
          this.time = this.currentTime();
        }
      });
      this.on('seeked', function () {
        // this.time = this.currentTime()
      })
    });
  }
}


new sVideo({
  id: 'video456585',
  videoUrl: 'https://www.ifreesec.com/test/3001090.m3u8'
})
// fire up the plugin