/**
 * Val test
 */
QUnit.test('val get test', function(assert) {
    assert.equal($('#mydiv').val(), '<p>Hello World!</p>', "Div value retrieved");
});

QUnit.test('html get test', function(assert) {
    assert.equal($('#mydiv').html(), '<p>Hello World!</p>', "Div HTML value retrieved");
});

QUnit.test('text get test', function(assert) {
    assert.equal($('#mydiv').text(), 'Hello World!', "Div text value retrieved");
});

QUnit.test('val set test', function(assert) {
    $('#mydiv').val('<p>Foo Bar!</p>')
    assert.equal($('#mydiv').val(), '<p>Foo Bar!</p>', "Div value set");
});