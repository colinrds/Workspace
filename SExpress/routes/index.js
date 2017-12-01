var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	fs.readFile('./bin/webpack.js', {flag: 'r+', encoding: 'utf8'}, function (err, data) {
		if(err) {
		 console.error(err);ç
		 return;
		}
		res.render('index', {
			title: 'Express',
			content: data
		});
	});
});

router.post('/file_list', function (req, res, next) {
	var body = req.body;
	fs.readdir('./view/', function (err, files) {
		if (err) {
			console.error(err);
			return;
		} else {
			var fileList = [];
			files.forEach(function (file) {
				if (file.indexOf(".") == -1) {
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

router.post('/mkdir', function (req, res, next) {
	var fileListValue = req.body.fileListValue;
	var fileName = req.body.fileName;

	new Promise(function (resolve, reject) {
		fs.mkdir('./view/' + fileListValue + '/' + fileName + '/', function (err) {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	}).then(function (resolve, reject) {
		return new Promise(function (resolve, reject) {
			fs.mkdir('./static/' + fileListValue + '/' + fileName + '/', function (err) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}).then(function () {
		return new Promise(function (resolve, reject) {
			fs.mkdir('./static/' + fileListValue + '/' + fileName + '/img', function (err) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
			fs.mkdir('./static/' + fileListValue + '/' + fileName + '/css', function (err) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
			fs.mkdir('./static/' + fileListValue + '/' + fileName + '/js', function (err) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}).then(function () {
		res.json({
			"status": 1,
			"info": '创建目录成功'
		})
	}).catch(function (err) {
		var errorCon = '';
		if (err.code == 'EEXIST') {
			errorCon = '文件名目录已存在'
		}
		res.json({
			"status": 0,
			"info": errorCon
		})
	})
})
module.exports = router;