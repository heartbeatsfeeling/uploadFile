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
	var fileName = (req.files.file.path).split('\\').pop();
	var type = " " + fileName.split('.').pop() + " ";
	var filterType = ' png gif jpg ';
	var data=null;
	if (filterType.indexOf(type) != -1) {
		data = {
			flag: true,
			id: 1, //测试使用
			path: 'http://127.0.0.1:3000/file/' + fileName
		};
	} else {
		data={
			flag:false,
			id:'',
			path:''
		}
	};
	res.end("<body onload=" + "parent.uploadFile.success(" + JSON.stringify(data) + ")></body>");
});
app.listen('3000');