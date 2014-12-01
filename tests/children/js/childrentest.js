/**
 * Children test
 */
QUnit.test('has children test', function(assert) {
    assert.equal($('#mylist').hasChildren(), true, "List has children");
});

QUnit.test('first child test', function(assert) {
    var child = $('#mylist').first();
    assert.equal(child.innerHTML, 'Item 1', "First child selected");
});

QUnit.test('last child test', function(assert) {
    var child = $('#mylist').last();
    assert.equal(child.innerHTML, 'Item 3', "Last child selected");
});

QUnit.test('has parent test', function(assert) {
    assert.equal($($('#mylist > li')[0]).hasParent(), true, "Child element has a parent");
    assert.notEqual($($('#mylist > li')[0]).parent(), undefined, "Parent element is defined");
});