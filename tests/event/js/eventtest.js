/**
 * Event test
 */
QUnit.test('event on test', function(assert) {
    $('#mydiv').on('click', function(){
        $('#mydiv').val('Hello World!');
    });
    $('#mydiv').trigger('click');
    assert.equal($('#mydiv').val(), 'Hello World!', "Click event triggered, div content changed");
});

QUnit.test('event on test', function(assert) {
    $('#mydiv').mousedown(function(){
        $('#mydiv').val('Mouse Down!');
    });
    $('#mydiv').trigger('mousedown');
    assert.equal($('#mydiv').val(), 'Mouse Down!', "Mouse down event triggered, div content changed");
});