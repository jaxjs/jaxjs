/**
 * CSS test
 */
QUnit.test('css test', function(assert) {
    $('#mydiv').css({
        "margin"           : "10px",
        "padding"          : "10px",
        "width"            : "200px",
        "height"           : "80px",
        "opacity"          : 50,
        "float"            : "right",
        "background-color" : "#0ff"
    });
    assert.equal($('#mydiv').width(), 220, "Method width() OK");
    assert.equal($('#mydiv').css('width'), 220, "Method css('width') OK");
    assert.equal($('#mydiv').innerWidth(), 200, "Method innerWidth() OK");
    assert.equal($('#mydiv').height(), 100, "Method height() OK");
    assert.equal($('#mydiv').css('height'), 100,  "Method css('height') OK");
    assert.equal($('#mydiv').innerHeight(), 80, "Method innerHeight() OK");
});
