<h1>jQuery异步上传文件插件v0.9</h1>
<h2>使用方法</h2>
<h3>前端：</h3>
html:
```html
单文件：
<input type="file" name="file" id="fileToUpload">
多文件：
<input type="file" name="file" id="fileToUpload" multiple="multiple">
```
js
```js
	$('input:file').bind('change', function() {
		var $this = $(this);
		uploadFile({//调用上传插件
			element: $(this)[0],//input:file jq节点或dom节点
			url: '/file',//上传路径
			filter: function(element) { //上传限制函数
				return true;
			},
			timeout:20,//超时时间，单位为秒。
			complete:function(status,data){
				/*
				上传完成后自动调用（成功或超时）
				成功：status为success，data和success里的data相同
				超时：status为timeout,data为{};
				*/
			},
			progress: function() { //上传过程中
				console.log('上传中')
			},
			success: function(data) { 
				//上传成功 data为后端返回来的数据对象 例如{url:'exp.jpg',id:'123'};
				console.log('上传完毕')
			}
		})
	});
```
<h3>后端：</h3>
```html
返回JSON格式字符串 :res.end("{code:1,id:'imgID','src':'test.jpg'}");
```
<h3>注意：</h3>
<ul>
	<li>1、上传过程中，会在input:file外套上form（css属性width:100%,display:inline），上传成功后会自动删除。请注意！！</li>
	<li>2、后台返回数据应为JSON格式的<strong>字符串</strong>,不能返回纯JSON数据，因为IE低版会对form提交返回的json数据做下载处理。</li>
</ul>
