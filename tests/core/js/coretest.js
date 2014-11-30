/**
 * Core test
 */
QUnit.test('core selector test', function(assert) {
    var li = $('#mylist > li');
    assert.equal(li.length, 3, "List items length equals 3");
    assert.equal(li[0].innerHTML, 'Item 1', "List item 1 contents retrieved");
    assert.equal(li[1].innerHTML, 'Item 2', "List item 2 contents retrieved");
    assert.equal(li[2].innerHTML, 'Item 3', "List item 3 contents retrieved");
});

QUnit.test('empty test', function(assert) {
    assert.equal($('#mydiv').val(), 'Remove Me', "Div contents exist before being emptied");
    $('#mydiv').empty();
    assert.equal($('#mydiv').val(), '', "Div contents do not exist after being emptied");
});

QUnit.test('remove test', function(assert) {
    assert.notEqual($('#mydiv')[0], undefined, "Div exists before being removed");
    $('#mydiv').remove();
    assert.equal($('#mydiv')[0], undefined, "Div does not exists after being removed");
});