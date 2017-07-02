var Hls = require('./s_hls.js');

var config = {
    autoStartLoad: true,
};
var video = document.getElementById('video');
var hls = new Hls(config);

// bind them together
hls.attachMedia(video);
hls.config.startPosition = 222;
//设置播放清晰度
hls.currentLevel = 0;
console.log(hls.nextLevel);
hls.on(Hls.Events.MEDIA_ATTACHED, function () {
    hls.loadSource("https://www.ifreesec.com/test/3001090.m3u8");
    hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        console.log(data.levels);
    });
});
hls.on(Hls.Events.LEVEL_LOADED, function(event,data){
    
})

$('#level').click(function(){
    hls.currentLevel = 1;
})