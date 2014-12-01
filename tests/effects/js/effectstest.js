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

QUnit.test('move test', function(assert) {
    QUnit.stop();
    $('#mydiv').move('+=100', '+=100', {
        tween  : 15,
        speed  : 60,
        easing : $.tween.easein.quad
    });
    setTimeout(function() {
        assert.equal($('#mydiv').css('left'), 100, "Div left position is now 100");
        assert.equal($('#mydiv').css('top'), 100, "Div top position is now 100");
        QUnit.start();
    }, 500);
});

QUnit.test('resize test', function(assert) {
    QUnit.stop();
    $('#mydiv').resize('+=100', '+=100', {
        tween  : 15,
        speed  : 60,
        easing : $.tween.easein.quad
    });
    setTimeout(function() {
        assert.equal($('#mydiv').css('width'), 300, "Div width is now 300");
        assert.equal($('#mydiv').css('height'), 300, "Div height is now 300");
        QUnit.start();
    }, 500);
});
