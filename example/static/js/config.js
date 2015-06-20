//config
require.config({
	paths: {
		jquery: 'jquery-1.9.1.min',
		'uploadFile': 'uploadFile'
	},
	shim: {
		uploadFile: {
			deps: ['jquery']
		}
	}
});
require(['jquery', 'uploadFile'], function() {
	$('input:file').each(function() {
		
	})
})