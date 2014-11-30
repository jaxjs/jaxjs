/**
 * Ajax test
 */
QUnit.test('basic ajax test', function(assert) {
    $.ajax('./process/test.txt', {
        status : {
            200 : function(response) {
                $('#text').val(response.text);
            }
        }
    });
    assert.notEqual($('#text').html().indexOf('This is a test!'), -1, "Ajax test retrieved and set the test content");
});

QUnit.test('ajax post test', function(assert) {
    $.ajax('./process/ajax.php', {
        method : 'post',
        status : {
            200 : function(response) {
                $('#form-results').val(response.text);
            }
        },
        data  : $('#login-form')[0]
    });
    assert.notEqual($('#form-results').html().indexOf('Your Username: Test Name'), -1, "Ajax test posted the initial form data and retrieved the results");
});

QUnit.test('ajax post test', function(assert) {
    $.post('./process/ajax.php', {
        data : [
            ['user_name',  'Another Test'],
            ['user_email', 'another@test.com']
        ],
        status : {
            200 : function(response) {
                $('#form-results').val(response.text);
            }
        }
    });
    assert.notEqual($('#form-results').html().indexOf('Your Username: Another Test'), -1, "Ajax test posted the override form data and retrieved the results");
});

QUnit.test('ajax json test', function(assert) {
    var json = $.ajax('process/test.json');
    assert.equal(json.firstName + ' ' + json.lastName, 'Oliver Twist', "Ajax JSON test data retrieved");
});

QUnit.test('ajax xml from file test', function(assert) {
    var xml = $.ajax('process/test2.xml');
    assert.equal(xml.test.nodes[0].person.fname, 'Oliver', "Ajax XML file test data retrieved");
});

QUnit.test('ajax xml from string test', function(assert) {
    var xmlString = '<?xml version="1.0" encoding="utf-8" ?>\
<test name="TestXML">\
    <person fname="Oliver" lname="Twist" age="12">Please, sir, I want some more.</person>\
    <person fname="Bubba" lname="Hotep" age="5325">\
        Bubba Hotep is from Egypt\
        <info something="123" onemorething="HelloWorld">Awesomeness!</info>\
        <info onemorething="456" />\
    </person>\
    <someone fname="John" lname="Doe" />\
</test>';

    var xml = $.parseResponse(xmlString);
    assert.equal(xml.test.nodes[0].person.fname, 'Oliver', "Ajax XML string test data retrieved");
});

QUnit.test('ajax csv test', function(assert) {
    var csv = $.ajax('process/test.csv');
    assert.equal(csv[0].fname, 'Oliver', "Ajax CSV file test data retrieved");
});
