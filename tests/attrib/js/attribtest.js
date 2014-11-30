/**
 * Attrib test
 */
QUnit.test('attrib get test', function(assert) {
    assert.equal($('#mydiv').attrib('class'), 'divclass');
});

QUnit.test('attrib set test', function(assert) {
    $('#mydiv').attrib('jax', 'test')
    assert.equal($('#mydiv').attrib('jax'), 'test');
});

QUnit.test('data attrib get test', function(assert) {
    assert.equal($('#mydiv').data('foo'), 'bar');
});

QUnit.test('data attrib set test', function(assert) {
    $('#mydiv').data('baz', '123')
    assert.equal($('#mydiv').data('baz'), '123');
});