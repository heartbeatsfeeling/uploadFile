<h1>jQuery异步上传文件插件</h1>
<h2>使用方法</h2>
<h3>前端：</h3>
html:
```html
<input type="file" name='file' id='file1'>
```
js
```js
	$('input:file').each(function() {
		$(this).bind('change', function() {
			var $this = $(this);
			uploadFile({
				element: $(this)[0],
				url: '/file',
				limit: function(element) { //上传限制函数
					return true;
				},
				progress: function() { //上传过程中
					console.log('上传中')
				},
				complete: function(data) { //上传结束 @data {} 		//后端返回来的数据对象例如{url:'exp.jpg',id:'123'};
					console.log('上传完毕')
				}
			})
		});
	})
```
<h3>后端：</h3>
```html
返回流 :res.end("&lt;body onload=parent.uploadFile.complete("+JSON.stringify(data+"))&gt;&lt;/body&gt;")
window.parent.uploadFile.complete为固定的回调函数。后台返回数据 如{url:'expre.jpg',id:'123'};
```
<h3>注意：</h3>
上传过程中，会在input:file外套上form（css属性width:100%,display:inline），上传成功后会自动删除。请注意！！
