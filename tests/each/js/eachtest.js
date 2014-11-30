/**
 * Each test
 */
QUnit.test('each instance test', function(assert) {
    var expected = ['Item 1', 'Item 2', 'Item 3'];
    var actual   = [];
    $('#mylist > li').each(function(){
        actual.push(this.innerHTML);
    });
    for (var i = 0; i < expected.length; i++) {
        assert.equal(expected[i], actual[i], "List item " + (i + 1) + " retrieved");
    }
});

QUnit.test('each static test', function(assert) {
    var a        = ['one', 'two', 'three'];
    var expected = ['0 => one', '1 => two', '2 => three'];
    var actual   = [];

    $.each(a, function(k, v) {
        actual.push(k + ' => ' + v);
    });
    for (var i = 0; i < expected.length; i++) {
        assert.equal(expected[i], actual[i], "Array item " + (i + 1) + " retrieved");
    }
});