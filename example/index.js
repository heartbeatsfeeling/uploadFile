var express = require('express');
var app = express();
var multer = require('multer');
app.use(express.static(__dirname + '/static')); //设置静态文件地址
app.use(multer({
	dest: './static/file/'
}))

//上传文件区
app.get('/uploadFile', function(req, res) {
	res.sendfile('./static/index.html');
});
app.post('/file', function(req, res) {
	res.end('{"id":"1","src":"id.png"}');
});
app.listen('3000');