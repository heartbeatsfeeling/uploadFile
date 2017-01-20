//https://github.com/heartbeatsfeeling/uploadFile 
;
(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('jquery'));
	} else {
		factory(root.jQuery);
	}
}(window, function($) {
	$.fn.uploadFile = function(config) {
		var url = config.url;
		var target = 'target' + _uuid();
		var $element = $(this);
		var $form = $("<form>");
		var $iframe = $("<iframe name='" + target + "'></iframe>");
		var filter = config.filter ? config.filter($element) : true;
		var progress = config.progress || _noop;
		var success = config.success || _noop;
		var complete = config.complete || _noop;
		var timeout = config.timeout;
		var timeoutFn = config.timeoutFn || _noop;
		var html5Mode = config.html5Mode;
		var formData;
		var xhr = new XMLHttpRequest();
		if (!filter) {
			return false;
		};
		var _remove = function() {
			$element.unwrap($form);
			$iframe.remove();
		};
		var _success = function(data) {
			clearTimeout(timer);
			complete($element);
			success(data, $element);
			_remove();
		};
		var _parseData = function(data) {
			try {
				data = $.parseJSON(data);
			} catch (err) {

			};
			return data;
		};
		var timer = setTimeout(function() {
			timeoutFn($element);
			_remove();
			complete($element);
			xhr.onreadystatechange = null;
			$iframe.unload('load');
		}, timeout || 1000 * 20);
		$form.attr({
			action: url,
			target: target,
			method: 'post',
			enctype: 'multipart/form-data'
		}).css({
			width: '100%',
			display: 'inline'
		});
		$iframe.css({
			display: 'none'
		});
		$element.wrap($form);
		if (!!window.FormData && html5Mode) {
			formData = new FormData($("form[target='" + target + "']")[0]);
			xhr.upload.addEventListener("progress", function(evt) { // progress
				var data = {};
				data.html5Mode = html5Mode;
				data.loaded = evt.loaded;
				data.total = evt.total;
				progress(data, $element)
			}, false);
			xhr.onreadystatechange = function(e) { //complete
				var data = '';
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						data = _parseData(xhr.responseText);
						_success(data);
					} else {
						_remove();
						complete($element);
					};
				};
			};
			// start upload
			xhr.open("POST", url, true);
			xhr.send(formData);
		} else {
			document.body.appendChild($iframe[0]);
			progress({}, $element);
			$("form[target=" + target + "]").submit();
			$iframe.bind('load', function() {
				var $this = $(this);
				var data = $this.contents().find('body').text();
				data = _parseData(data);
				_success(data);
			});
		};
	};
	var _noop = function() {};
	var _uuid = function() {
		return (+new Date).toString() + Math.random().toString(16).substr(2, 8);
	};
}));