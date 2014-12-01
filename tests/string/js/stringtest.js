/**
 * String test
 */
QUnit.test('string to slug test', function(assert) {
    var str = new window.jax.String('Hello World');
    assert.equal(str.slug(), 'hello-world', "String converted to URL slug");
});

QUnit.test('string to camelcase test', function(assert) {
    var str = new window.jax.String('some-class');
    assert.equal(str.toCamelcase(), 'someClass', "String converted to camel case");
});

QUnit.test('string add slashes test', function(assert) {
    var str = new window.jax.String("Don't do it!");
    assert.equal(str.addslashes(), "Don\\'t do it!", "Add slashes to string");
});

QUnit.test('string strip slashes test', function(assert) {
    var str = new window.jax.String("Don\\'t do it!");
    assert.equal(str.stripslashes(), "Don't do it!", "Strip slashes to string");
});