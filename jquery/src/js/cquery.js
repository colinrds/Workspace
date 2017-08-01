; (function (fn) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = new fn(document);
    } else if (typeof define === "function") {
        define(fn(document));
    } else {
        this.$$ = cquery = fn(document);
    }
})(function (root) {
    var cquery = function (selector, context) {
        context = (context && root.querySelector(context)) || root;
        return cquery.fn.init.call(context.querySelectorAll(selector), selector, context);
    };

    cquery.fn = cquery.prototype = {
        html: function () {
            if (arguments.length == 0) {
                return this[0].innerHTML;
            } else if (arguments.length == 1) {
                console.log(this);
                this[0].innerHTML = arguments[0];
                return this;
            }
        },
        hide: function () {
            this.style.display = "none";
            return this;
        },
        show: function () {
            this.style.display = "block";
            return this;
        },
        eq: function (i) {
            return this;
        },
        init: function (selector, context) {
            this['content'] = document;
            this['selector'] = selector;
            this['size'] = this.length;
            this["__proto__"] = cquery.fn;
            this['length'] = this.size;
            delete this.size;
            return this;
        }
    }

    var original = ["push"];
    original.forEach(function (method) {
        cquery.fn[method] = Array.prototype[method];
    });

    return cquery;
});