var express = require('express');
var router = express.Router();
var fs = require('fs');

function trim(str){
  return str.replace(/\s+/g, "");
}
/* GET home page. */
router.get('/', function (req, res, next) {
  //参数1 文件的名字，参数2 编码格式 参数3 回调函数
  var container = [];
  fs.readFile('./data/f.txt', 'utf-8', function (err, data) {
    if (err) {
      console.error(err);
    } else {
      var index = data.indexOf('\n');
      while (index > 1) {
      console.log(index);
        var line = data.substring(0, index);
        data = data.substring(index + 1);
        container.push(line);
        index = data.indexOf('\n');
      }
      res.render('index', { title: 'Express', content: container });
    }
  })
});

router.post('/setdata', function (req, res, next) {
  var str = trim(req.body.text);
  console.log(str);
  fs.appendFile('./data/f.txt', '\r\n'+ str + '\r\n', function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("写入文件ok");
    }
  });
});
module.exports = router;
