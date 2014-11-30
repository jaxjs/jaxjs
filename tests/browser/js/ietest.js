/**
 * Browser test : Internet Explorer
 */
QUnit.test('internet explorer test', function(assert) {
    assert.notEqual($.browser.name.indexOf('MSIE'), -1, "Browser is detected as Internet Explorer");
    assert.equal($.browser.msie, true, "Browser 'msie' property is set to true");
});