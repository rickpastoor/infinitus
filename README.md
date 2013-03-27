Infinitus
=========

A super tiny jQuery plugin to help you implement infinite scrolling.

Basic usage
-----------

Attach the infinitus listener to an object in your page. Provide a `trigger` callback. Inifinitus passes a `done` handler to your trigger callback. You should call this handler as soon as you have finished loading and presenting data.

``` javascript
$('#main').infinitus({
	trigger : function(done) {
	    // The object that reached the bottom edge of the page is available via $(this)
	    var obj = $(this);
	    
	    // Get the next batch of content you want to add to your element		
		$.get('your/data/source', function(data) {
			obj.append(data);
			
			// Invoke the done handler to signal loading complete. Infinitus won't trigger again until you call this
			done();
		});
	},
	onStart : function() {
		// Show something entertaining
		$('.loading').fadeIn();
	},
	onEnd : function() {
		// Hide your entertaining material
		$('.loading').fadeOut();
	}
});
```

Contributing
------------

Please submit any issues or feature requests to our issue tracker!