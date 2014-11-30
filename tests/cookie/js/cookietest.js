/**
 * Cookie test
 */
QUnit.test('cookie set/load test', function(assert) {
    $.cookie.save('name', 'Bubba');
    assert.equal($.cookie.load('name'), 'Bubba', "Cookie value set and retrieved");
});

QUnit.test('cookie remove test', function(assert) {
    $.cookie.remove('name')
    assert.equal($.cookie.load('name'), '', "Cookie value removed");
});
