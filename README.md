Infinitus
=========

A super tiny jQuery plugin to implement infinite scrolling.

Basic usage
===========

Attach the infinitus listener to an object in your page. Provide a `trigger` callback. Inifinitus passes a `done` handler to your trigger callback. You should call this handler as soon as you have finished loading and presenting data.

``` javascript
$('#main').infinitus({
	trigger : function(done) {
		setTimeout(function() {
			$('#main').append('<div><p>Your loaded content.</p></div>');
			done();
		}, 2000);
	},
	onStart : function() {
		$('.loading').fadeIn();
	},
	onEnd : function() {
		$('.loading').fadeOut();
	}
});
```

Contributing
============

Please submit any issues or feature requests to our issue tracker!