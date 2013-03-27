(function($) {
  "use strict";

  module('jQuery#infinitus', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', function() {
    expect(1);
    // Not a bad test to run on collection methods.
    strictEqual(this.elems.infinitus(), this.elems, 'should be chainable');
  });

}(jQuery));