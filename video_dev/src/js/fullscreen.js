function fullScreen() { }
fullScreen.prototype = {
    fullscreenchange: function (t) {
        var that = this;
        // var fullscreenchange = ['fullscreen', 'mozfullscreen', 'webkitfullscreen', 'msfullscreen']
        // for (var i = 0; i < fullscreenchange.length; i++) {
        //     console.log(fullscreenchange[i]+'change');
        //     document.addEventListener(fullscreenchange[i]+'change', function (data) {
        //         console.log(fullscreenchange[i]+'change');
        //         if (!document.fullscreen) {
        //             that.exitFullScreen(t, true);
        //         }
        //     }, false);
        // }
        document.addEventListener("fullscreenchange", function () {
            if(!document.fullscreen){
                that.exitFullScreen(t, true);
            };
        }, false);

        document.addEventListener("mozfullscreenchange", function () {
            if(!document.mozFullScreen){
                that.exitFullScreen(t, true);
            };
        }, false);

        document.addEventListener("webkitfullscreenchange", function () {
            if(!document.webkitIsFullScreen){
                that.exitFullScreen(t, true);
            };
        }, false);
        document.addEventListener("msfullscreenchange", function () {
            if(!document.msFullscreenElement){
                that.exitFullScreen(t, true);
            };
        }, false);
    },
    enterFullScreen: function (t, state) {
        var that = state == undefined ? this : t;
        console.log(that);
        var DOM = that.id.parentNode;
        if (state) {
            DOM.style.width = '100%';
            DOM.style.height = '100%';
            DOM.style.top = '0';
            DOM.style.left = '0';
            that.parentDom.find('.ob_display').removeClass('ob_full_screen').addClass('ob_regain');
        } else {
            if (DOM.requestFullscreen) {
                DOM.requestFullscreen();
            } else if (DOM.mozRequestFullScreen) {
                DOM.mozRequestFullScreen();
            } else if (DOM.webkitRequestFullscreen) {
                DOM.webkitRequestFullscreen();
            } else if (DOM.msRequestFullscreen) {
                DOM.msRequestFullscreen();
            }
            DOM.style.width = '100%';
            DOM.style.height = '100%';
            DOM.style.top = '0';
            DOM.style.left = '0';
            that.parentDom.find('.ob_display').removeClass('ob_full_screen').addClass('ob_regain');
        }
    },
    exitFullScreen: function (t, state) {
        console.log(t);
        var that = state == undefined ? this : t;
        var DOM = that.id.parentNode;
        if (state) {
            console.log(that.id);
            DOM.style.width = that.config.width + "px";
            DOM.style.height = that.config.height + "px";
            that.parentDom.find('.ob_display').removeClass('ob_regain').addClass('ob_full_screen');
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozExitFullScreen) {
                document.mozExitFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            DOM.style.width =  that.config.width + "px";
            DOM.style.height =  that.config.height + "px";
            that.parentDom.find('.ob_display').removeClass('ob_regain').addClass('ob_full_screen');
        }
    }
}

module.exports = new fullScreen();