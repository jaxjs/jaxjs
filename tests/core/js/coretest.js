/**
 * Core test
 */
QUnit.test('each instance test', function(assert) {
    var expected = ['Item 1', 'Item 2', 'Item 3'];
    var actual   = [];
    $('#mylist > li').each(function(){
        actual.push(this.innerHTML);
    });
    for (var i = 0; i < expected.length; i++) {
        assert.equal(expected[i], actual[i]);
    }
});

QUnit.test('each static array test', function(assert) {
    var a        = ['one', 'two', 'three'];
    var expected = ['0 => one', '1 => two', '2 => three'];
    var actual   = [];

    $.each(a, function(k, v) {
        actual.push(k + ' => ' + v);
    });
    for (var i = 0; i < expected.length; i++) {
        assert.equal(expected[i], actual[i]);
    }
});

