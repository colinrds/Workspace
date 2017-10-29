module.exports = (function () {
    "use strict";
    //http协议模块
    var http = require('http');
    //url解析模块
    var url = require('url');
    //文件系统模块
    var fs = require("fs");
    //路径解析模块
    var path = require("path");
    var querystring = require("querystring");

    function AppRequest() {
        this.config = [];
    };

    AppRequest.prototype.get = function (url, callback) {
        this.config.push({
            url: url,
            callback: callback,
            method: "GET"
        })
    }
    AppRequest.prototype.post = function (url, callback) {
        this.config.push({
            url: url,
            callback: callback,
            method: "POST"
        })
    }
    AppRequest.prototype.listen = function (port) {
        var _self = this;
        this.server = http.createServer(function (req, res) {
            var body = '';
            //获取url参数
            var site = url.parse(req.url);
            //获取请求页面地址
            var pathname = decodeURIComponent(site.pathname);
            //获取请求参数并转成对象输出
            var query = querystring.parse(site.query);
            //添加send方法
            res.send = function (content) {
                res.end(content);
            };
            res.json = function (content) {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify(content));
            };

            //添加query方法
            req.query = query;

            //body获取参数
            req.on('data', function (chunk) {
                // console.log('chunk',chunk.toString())
                body = body + chunk;
            })
            req.on('end', function () {
                console.log(querystring.parse(body));
                console.log(1);
                req.body = querystring.parse(body);
            })

            //查找对象里是否有定义URL
            var route = _self.config.find(function (obj) {
                return obj.url == pathname && obj.method == req.method;
            })
            //输出找到的页面内容，如果没有则返回404错误
            if (route) {
                route.callback(req, res);
            } else {
                res.send('404 error');
            }
        }).listen(port)
    }

    var app = new AppRequest();

    app.get('/', function (req, res) {
        fs.readFile("./index.html", function (err, data) {
            res.writeHead(200, {
                "Context-Type": "text/html;charset=UTF-8"
            });
            res.end(data);
        });
    })
    app.get('/aaa', function (req, res) {
        var name = req.query.name;
        res.send(req.method + '_hello aaa' + name);
    })
    app.get('/bbb', function (req, res) {
        res.send(req.method + '_hello bbb');
    })
    app.post('/ccc', function (req, res) {
        console.log(2);
        var body = req.body;
        console.log(req.body);
        fs.readdir('./view/', function (err, files) {
            if (err) {
                console.error(err);
                return;
            } else {
                var fileList = [];
                files.forEach(function (file) {
                    if(file.indexOf(".") == -1){
                        fileList.push(file);
                    }
                })
                res.json({
                    status: 1,
                    data: fileList,
                    info: '项目正在创建中，请稍后！'
                });
            }
        })
    })
    app.listen(9191);
})();