/**
 * Mouse test
 */
var x;
var moveIt = function(event) {
    x = $().mouseX(event);
};
$().on('mousemove', moveIt);

QUnit.test('mouse test', function(assert) {
    QUnit.stop();
    setTimeout(function() {
        assert.equal(typeof x, 'number', "mouseX() returned a number");
        QUnit.start();
    }, 500);
});