var $ = (function () {
    var query = function (selector, context) {
        return new query.fn.init(selector, context);
    };
    var isLetter = function (str) {
        if (str && 'string' == typeof str) {
            str = str.toUpperCase()
            for (var i = 0; i < str.length; i++) {
                var code = str.charCodeAt(i)
                if (code < 65 || code > 90) {
                    return false
                }
            }
            return true;
        }
        return false;
    }, classes = 'boolean number string function array date regexp object error'.split(' ');

    // 原型对象处理
    query.fn = query.prototype = {
        version: '1.0.0',
        constructor: query,
        length: 0,
        init: function (selector, context) {
            if (!selector) return this // query(null)
            var len = selector.length
            if (query.isFunction(selector)) {
                return selector()
            } else if (selector.nodeType) {
                // query(dom)
                this.context = this[0] = selector
                this.length = 1
            } else if ('string' == typeof selector) {
                context = context || document;
                if (context.nodeType) context = query(context) // convert dom to query(dom)
                return context.find(selector)
            } else if (len) {
                // query([dom1, dom2])
                // should after string, because string, function has length too
                for (var i = 0; i < len; i++) {
                    if (selector[i] && selector[i].nodeType) {
                        this[this.length] = selector[i]
                        this.length++;
                    }
                }
            }
            return this;
        },
        find: function (str) {
            var f = function (str, context) {
                var ret = [];
                if (context && context.length) {
                    for (var i = 0, node; node = context[i++];) {
                        ret.push.apply(ret, query.findOne(str, node))
                    }
                } else {
                    ret.push.apply(ret, query.findOne(str, context))
                }
                return ret;
            };
            return query(f(str, this));
        }
    };

    query.fn.init.prototype = query.fn;

    query.extend = query.fn.extend = function () {
        var len = arguments.length;
        var i = 1, obj
        var target = arguments[0] || {};
        if (1 == len) {
            target = this;
            i--
        }
        for (; i < len; i++) {
            obj = arguments[i];
            if (obj && 'object' == typeof obj) {
                for (var k in obj) {
                    target[k] = obj[k]
                }
            }
        }
        return target;
    };

    query.extend({
        isFunction: function (func) {
            return 'function' == query.type(func);
        },
        getClassName: function (val) {
            var ret = {}.toString.call(val).split(' ')[1];
            return ret.substr(0, ret.length - 1).toLowerCase()
        },
        indexOf: function (arr, val, from) {
            from = from || 0;
            if ('string' == typeof arr) {
                var index = arr.substr(from).indexOf(val);
                if (-1 == index) return -1;
                return from + index
            }
            var i = from - 1;
            var len = arr.length;
            while (++i < len) {
                if (arr[i] === val) {
                    return i
                }
            }
            return -1
        },
        type: function (val) {
            var tp = typeof val;
            if (tp == 'object' || tp == 'function') {
                var className = query.getClassName(val);
                if (-1 == query.indexOf(classes, className)) {
                    return 'object'
                }
                return className
            }
            return tp
        },
        findOne: function (str, dom) {
            dom = dom || document
            var nodes, ret = []
            if ('#' == str.charAt(0)) {
                var id = str.substr(1)
                if (id && dom.getElementById) {
                    // query('#id')
                    var el = dom.getElementById(id)
                    if (el) {
                        return [el]
                    }
                }
            }
            if (isLetter(str)) {
                // query('tag')
                nodes = dom.getElementsByTagName(str)
            } else if (dom.querySelectorAll) {
                nodes = dom.querySelectorAll(str)
            }
            // cannot use slice.call because dom object throw error in ie8-
            var len = nodes ? nodes.length : 0
            var ret = []
            for (var i = 0; i < len; i++) {
                ret[i] = nodes[i]
            }
            return ret;
        },
        handler: function (fn, val) {
            var elems = this;
            for (var i = 0; i < elems.length; i++) {
                var el = elems[i];
                fn(el, val);
            }
            return elems;
        },
        handler: function (elems, fn, key, val, isChain) {
            var i = 0
            if (key && 'object' === typeof key) {
                // set multi k, v
                for (i in key) {
                    cquery.handler(elems, fn, i, key[i], true)
                }
            } else if (undefined === val) {
                // get value
                var ret
                if (elems[0]) { // TODO text, html should be ''
                    ret = fn(elems[0], key)
                }
                if (!isChain) {
                    return ret
                }
            } else {
                // set one k, v
                for (i = 0; i < elems.length; i++) {
                    fn(elems[i], key, val)
                }
            }
            return elems;
        }
    })

    query.fn.extend({
        html: function (val) {
            return query.handler(this, function (elem, key, val) {
                if (undefined === val) {
                    return elem.innerHTML;
                }
                elem.innerHTML = '' + val;
            }, null, val);
        }
    })

    return query;
})()


