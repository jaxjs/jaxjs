/**
 * Load test
 */
$().load(function(){
    $('#mydiv').val('Hello World');
});

QUnit.test('load test', function(assert) {
    QUnit.stop();
    setTimeout(function() {
        assert.equal($('#mydiv').val(), 'Hello World', "Load function successfully triggered");
        QUnit.start();
    }, 500);
});