/**
 * Val test
 */
QUnit.test('val get test', function(assert) {
    assert.equal($('#mydiv').val(), '<p>Hello World!</p>');
});

QUnit.test('html get test', function(assert) {
    assert.equal($('#mydiv').val(), '<p>Hello World!</p>');
});

QUnit.test('text get test', function(assert) {
    assert.equal($('#mydiv').text(), 'Hello World!');
});

QUnit.test('val set test', function(assert) {
    $('#mydiv').val('<p>Foo Bar!</p>')
    assert.equal($('#mydiv').val(), '<p>Foo Bar!</p>');
});