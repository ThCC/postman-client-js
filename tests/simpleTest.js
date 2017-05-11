'use strict';

var _client = require('../dist/client');
var _models = require('../dist/models');

var textMail = new _models.Mail({
    recipientList: ['Foo Bar <foo.bar@mail.com>', 'Fulano Aquino <fulano.aquino@mail.com>', '<ciclano.norego@mail.com>'],
    messageText: 'Simple text message.',
    from: 'Beutrano <beutrano@mail.com>',
    subject: 'Just a test - Sended From Client'
});
var client = new _client.Client('2e7be7ced03535958e35', 'ca3cdba202104fd88d01');
client.send(textMail).then(function (result) {
    console.log(result);
}, function (error) {
    console.log(error);
});
