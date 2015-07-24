//https://github.com/heartbeatsfeeling/uploadFile 
;(function($) {
	var uploadFile = function(config) {
		var url = config.url;
		var target = 'target' + _uuid();
		var $element = $(config.element);
		var $form = $("<form>");
		var $iframe = $("<iframe name='" + target + "'></iframe>"); //set name method -- ie 7 bug
		var filter = config.filter ? config.filter($element) : true;
		var progress = config.progress || _noop;
		var success = config.success || _noop;
		var complete = config.complete || _noop;
		var timeout = config.timeout;
		var timeoutFn = null;
		var _remove = function() {
			$element.unwrap();
			$iframe.remove();
		};
		if (timeout) {
			timeoutFn = setTimeout(function() {
				_remove();
				complete('timeout', {});
			}, timeout * 1000);
		};
		uploadFile.success = function(data) {
			clearTimeout(timeoutFn);
			complete('success', data);
			success(data)
			_remove();
		};
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
		if (filter) {
			document.body.appendChild($iframe[0]);
			$element.wrap($form);
			progress($element, $form);
			$("form[target=" + target + "]").submit();
		} else {

		}
	};
	var _noop = function() {};
	var _uuid = function() {
		return (+new Date).toString() + Math.random().toString(16).substr(2, 8);
	};
	if (typeof exports !== 'undefined') {
		module.exports = uploadFile;
	} else {
		window.uploadFile = uploadFile;
	};
})(jQuery);