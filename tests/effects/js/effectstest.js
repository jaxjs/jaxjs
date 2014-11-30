/**
 * Effects test
 */
QUnit.test('hide test', function(assert) {
    $('#mydiv').hide();
    assert.equal($('#mydiv').css('display'), 'none', "Div display set to 'none' after hiding it");
});

QUnit.test('show test', function(assert) {
    $('#mydiv').show();
    assert.equal($('#mydiv').css('display'), 'block', "Div display set to 'block' after showing it");
});

QUnit.test('toggle test', function(assert) {
    $('#mydiv').toggle();
    assert.equal($('#mydiv').css('display'), 'none', "Div display set to 'none' after toggling it");
    $('#mydiv').toggle();
    assert.equal($('#mydiv').css('display'), 'block', "Div display set to 'block' after toggling it again");
});

