(function () {
    var e;
    var d = function () {};
    var b = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeline", "timelineEnd", "timeStamp", "trace", "warn"];
    var c = b.length;
    var a = (window.console = window.console || {});
    while (c--) {
        e = b[c];
        if (!a[e]) {
            a[e] = d
        }
    }
}());