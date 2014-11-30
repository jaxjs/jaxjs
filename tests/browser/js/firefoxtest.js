/**
 * Browser test : Firefox
 */
QUnit.test('firefox test', function(assert) {
    assert.notEqual($.browser.name.indexOf('Firefox'), -1, "Browser is detected as Firefox");
    assert.equal($.browser.mozilla, true, "Browser 'mozilla' property is set to true");
    assert.equal($.browser.mobile, false, "Browser 'mobile' property is set to false");
});