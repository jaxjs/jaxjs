/**
 * Attrib test
 */
QUnit.test('attrib get test', function(assert) {
    assert.equal($('#mydiv').attrib('class'), 'divclass', "Attribute retrieved");
});

QUnit.test('attrib set test', function(assert) {
    $('#mydiv').attrib('jax', 'test')
    assert.equal($('#mydiv').attrib('jax'), 'test', "Attribute set");
});

QUnit.test('data attrib get test', function(assert) {
    assert.equal($('#mydiv').data('foo'), 'bar', "Data attribute retrieved");
});

QUnit.test('data attrib set test', function(assert) {
    $('#mydiv').data('baz', '123')
    assert.equal($('#mydiv').data('baz'), '123', "Data attribute set");
});