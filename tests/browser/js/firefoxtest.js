/**
 * Browser test : Firefox
 */
QUnit.test('firefox test', function(assert) {
    assert.notEqual($.browser.name.indexOf('Firefox'), -1);
    assert.equal($.browser.mozilla, true);
});