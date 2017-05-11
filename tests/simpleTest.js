'use strict';

var _client = require('../dist/client');
var _models = require('../dist/models');

var textMail = new _models.Mail({
    recipientList: [
        'Thiago de Castro <thiago.decastro2@gmail.com>',
        'Thiago C de Castro <THIAGO.CIRRUS@ALTERDATA.COM.BR>',
        '<success@simulator.amazonses.com>',
        '<bounce@simulator.amazonses.com>',
        '<ooto@simulator.amazonses.com>',
        '<complaint@simulator.amazonses.com>',
        '<suppressionlist@simulator.amazonses.com>',
    ],
    messageText: 'Simple text message.',
    from: 'Postman <postman@alterdata.com.br>',
    subject: 'Just a test - Sended From Node Client'
});
var client = new _client.Client('1e4be7cdd03545958e34', 'cf8cdba282104ed88f0a', 'http://172.16.72.31:8000');
client.send(textMail).then(function (result) {
    console.log(result);
}, function (error) {
    console.log(error);
});
