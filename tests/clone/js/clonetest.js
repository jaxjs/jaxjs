/**
 * Clone test
 */
QUnit.test('clone test', function(assert) {
    $('#some_select_new_1').clone({'name' : 'some_select_new_2', 'id' : 'some_select_new_2'}, true, true).appendTo('#clone-div');
    assert.notEqual($('#some_select_new_2')[0], undefined, "Select element cloned and appended to the div");
});




