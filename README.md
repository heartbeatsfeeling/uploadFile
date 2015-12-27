<h1>jQuery异步上传文件插件v0.9</h1>
<h2>兼容</h2>
<p>兼容IE6+、Firefox、chrome等主流浏览器</p>
<h2>说明</h2>
<h5>本插件优点</h5>
<ul>
	<li>1、支持html5模式上传</li>
	<li>2、支持单文件和多文件上传</li>
	<li>3、兼容常见主流浏览器（IE6+）</li>
</ul>
<h5>本插件缺点</h5>
<ul>
	<li>1、对错误处理支持不够好，统一放在了timeoutFn函数里</li>
	<li>2、测试不足，如果在使用中发现问题，请及时提交issues</li>
</ul>
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
	$('#fileToUpload').bind('change',function(){
		var $this = $(this);
		$this.uploadFile({
			url: '/test',//上传路径
			html5Mode:true,//是否开启Html5模式，开启后如果浏览器支持window.FormData，则自动切换到HTML5模式上传文件，默认为false
			filter: function($element) {//上传限制函数
				/*
					上传开始时，会触发该函数
					返回true可以上传，返回false则禁止上传
					例如只可以上传gif
					return $(element).val().indexOf('.gif')!==-1
				*/
				return true;
			},
			timeout:10000,//设置上传超时时间，单位为毫秒
			timeoutFn:function($element){//超时函数
				/*
					如果设置了timeout同时上传超时，会触发该函数
				*/
			},
			complete:function($element){//上传完成
				/*
					上传结束（不管成功还是失败）会触发该函数
				*/
			},
			progress: function(data,$element) {//上传过程中
				/*
					上传过程中触发该函数
				*/
				if(data.html5Mode){//是否开启同时支持html5上传模式
					//Math.round(data.loaded/data.total) 上传进度
				}else{

				}
			},
			success: function(data,$element) {//上传成功
				/*
					上传成功会触发该函数
					data为后台返回的json格式字符串
					插件会自动字data转成Object
				*/
			}
		})
	});
```
<h3>后端：</h3>
返回JSON格式<strong>字符串</strong> :res.end("{'code':'1','id':'imgID','src':'test.jpg'}");
<h3>注意：</h3>
<ul>
	<li>1、上传过程中，会在input:file外套上form（css属性width:100%,display:inline），上传成功后会自动删除。</li>
	<li>2、后台返回数据应为JSON格式的<strong>字符串</strong>,而不是纯JSON类型数据，因为IE低版会对form提交返回的纯json类型数据做下载处理。</li>
</ul>
<h3>License</h3>
<p>MIT license</p>
