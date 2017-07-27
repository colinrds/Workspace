;(function (fn) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = new fn();
    } else if (typeof define === "function") {
        define(fn);
    } else {
        this.spStr = new fn();
    }
})(function () {
    var spStr = function () {};
    spStr.prototype = {
        game: function(){
            return this;
        }
    }
    return new spStr();
});