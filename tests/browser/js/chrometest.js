/**
 * Browser test : Chrome
 */
QUnit.test('chrome test', function(assert) {
    assert.notEqual($.browser.name.indexOf('Chrome'), -1, "Browser is detected as Chrome");
    assert.equal($.browser.chrome, true, "Browser 'chrome' property is set to true");
});