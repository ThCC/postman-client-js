# postman-client-js
Client service, to send simple text emails or, using a template created at Postman, send more complex emails.

In order to use this library, you must create an account in Postman.

** **It is not currently possible to create an account in Postman, but will soon be** **

How to install:

    pip install postman_client

Follow the examples below to send simple emails or emails with templates:

**Simple Emails:**

    'use strict';

    var _client = require('../dist/client');
    var _models = require('../dist/models');

    var textMail = new _models.Mail({
        recipientList: ['Foo Bar <foo.bar@mail.com>', 'Fulano Aquino <fulano.aquino@mail.com>', '<ciclano.norego@mail.com>'],
        messageText: 'Simple text message.',
        from: 'Beutrano <beutrano@mail.com>',
        subject: 'Just a test - Sended From Client'
    });
    var client = new _client.Client('<your_account_public_key>', '<your_account_secret_key>');
    client.send(textMail).then(function (result) {
        console.log(result);
    }, function (error) {
        console.log(error);
    });

**Template Emails:**

    'use strict';

    var _client = require('../dist/client');
    var _models = require('../dist/models');

    var templateMail = new _models.Mail({
        recipientList: ['Foo Bar <foo.bar@mail.com>', 'Fulano Aquino <fulano.aquino@mail.com>', '<ciclano.norego@mail.com>'],
        from: 'Beutrano <beutrano@mail.com>',
        templateName: 'test-101',
        context: {'foobar': True},
        contextPerRecipient: {
            'foo.bar@gmail.com': {'foo': True},
            'fulano.arquino@gmail.com.br': {'bar': True}
        },
        useTemplateSubject: true,
        useTemplateEmail: false,
        useTemplateFrom: false

    });
    var client = new _client.Client('<your_account_public_key>', '<your_account_secret_key>');
    client.sendTemplate(templateMail).then(function (result) {
        console.log(result);
    }, function (error) {
        console.log(error);
    });

**Mail Parameters:**

Parameter | Type | Required | Description
------------ | ------------ |------------- | -------------
recipientList | List | Yes | List of all the recipients. The expected format is 'Name `<email>`' or '`<email>`'.
subject | String | Yes* | The subject of the email. *In case your sending an email with template and pass `useTemplateSubject` as `True` then you don't need to pass the `subject`.
messageText | String | Yes* | The `message` of the email on text format. *Only Required if your gonna send a simple text email.
messageHtml | String | No | The `message` of the email on html format. *If pass this then you don't need to pass the `templateName`.
tags | Dict/List | No | The `tags` must be an dictionary containing keys and simple values or an list with strings.
from | String | No* | The email of the sender. The expected format is 'Name `<email>`' or '`<email>`'. *In case your sending an email with template and pass `use_template_email` as `True` then you don't need to pass this parameter.
templateName | String | No | The `templateName` is the slug of the template. *Just pass this if your gonna send a email with template.
useTemplateFrom | Bool | No* | If set to `True` it use the default value set to the sender's name.
useTemplateEmail | Bool | No* | If set to `True` it use the default value set to the sender's email.
useTemplateSubject | Bool | No* | If set to `True` it use the default value set to the subject.
getTextFromHtml | Bool | No* | If set to `True` postman will extract from your html template an text version. This will only happen if your template doesn't already have an text version.
activateTracking | Bool | No* | If set to `True` postman will track if your email will be open and how many times. Also it will track any links clicked inside the email.
context | Dict | No | Global variables use in the Template. The format is expressed in the example (above).
contextPerRecipient | Dict | No | Variables set for each recipient. The format is expressed in the example (above).

**Client Parameters:**

Parameter | Type | Required | Description
------------ | ------------ |------------- | -------------
key | String | Yes | Your account's public key in the Postman.
secret | String | Yes | Your account's private key in the Postman.
