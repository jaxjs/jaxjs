/**
 * Filter test
 */
QUnit.test('event on test', function(assert) {
    var li = $('#mylist > li').filter(':even');
    assert.equal(li.length, 4, "Even nodes filtered out");
    for (var i = 0; i < li.length; i++) {
        assert.equal(li[i].innerHTML, 'Even', "Even content match");
    }
});