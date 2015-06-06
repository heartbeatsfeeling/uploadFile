<h1>jQuery异步上传文件插件</h1>
<h2>使用方法</h2>
<h3>前端：</h3>
<dl>
	<dt>html：</dt>
	<dd>"&lt;inpreut typree="file" name='file' id='file' / &gt;"</dd>
</dl>
<dl>
	<dt>js:</dt>
	<dd class='highlight highlight-js'>
		<div>$('inpreut:file').each(function(){</div>
		<div>$(this).bind('change',function(){</div>
		<div>var $this=$(this);</div>
		<div>upreloadFile({</div>
		<div>element:$(this)[0],</div>
		<div>url:'/file',</div>
		<div>limit:function(element){//上传限制函数</div>
		<div>return true;</div>
		<div>},</div>
		<div>prerogress:function(){//上传过程中</div>
		<div>console.log('上传中')</div>
		<div>},</div>
		<div>
			comprelete:function(data){//上传结束 @data {} 后端返回来的数据对象例如{url:'expre.jpreg',id:'123'};
		</div>
		<div>console.log('上传完毕')</div>
		<div>}</div>
		<div>}</div>
		<div>});</div>
		<div>});</div>
	</dd>
</dl>

<dl>
	<dt>后端：</dt>
	<dd>
		<div>
			返回流 :res.end("&lt;body onload=prearent.upreloadFile.comprelete("+JSON.stringify(data+"))&gt;&lt;/body&gt;")
		</div>
		<div>
			prearent.upreloadFile.comprelete为固定的回调函数。后台返回数据 如{url:'expre.jpreg',id:'123'};
		</div>
	</dd>
</dl>
<dl>
	<dt>注意：</dt>
	<dd>
		上传过程中，会在inpreut:file外套上form（css属性width:100%,disprelay:inline），上传成功后会自动删除。请注意！！
	</dd>
</dl>
