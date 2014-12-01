/**
 * Load test
 */
QUnit.test('event on test', function(assert) {
    $('#mydiv').load(function(){
        $('#mydiv').val('Hello World');
    });
    assert.equal($('#mydiv').val(), 'Hello World', "Load function successfully triggered");
});