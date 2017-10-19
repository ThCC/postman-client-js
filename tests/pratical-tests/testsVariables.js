const _ = require('lodash');

class TestVariables {
    constructor() {
        _.extend(this, {
            mail: {
                local: {
                    key: '1e4be7cdd03545958e34',
                    secret: 'cf8cdba282104ed88f0a',
                    server: 'http://172.16.72.31:8001'
                },
                official: {
                    key: 'afa35e905ac84b998936',
                    secret: '3d828095d4004284acc1',
                },
                recipientList: [
                    'Thiago de Castro <thiago.decastro2@gmail.com>',
                    'Thiago C de Castro <THIAGO.CIRRUS@ALTERDATA.COM.BR>',
                    '<success@simulator.amazonses.com>',
                    '<bounce@simulator.amazonses.com>',
                    '<ooto@simulator.amazonses.com>',
                    '<complaint@simulator.amazonses.com>',
                    '<suppressionlist@simulator.amazonses.com>',
                ],
                from: 'Postman <postman@alterdata.com.br>',
                subject: 'Enviado pelo Client em nodejs',
                messageText: 'Enviado pelo Client em nodejs',
                messageHtml: '<strong>Enviado pelo</strong> Client <em>em nodejs</em>',
                templateSlug: 'teste-01',
                context: {foobar: true},
                contextPerRecipient: {
                    'thiago.dsn.cir@alterdata.com.br': {foo: true},
                    'thiago.decastro2@gmail.com': {bar: true},
                },
                useTplDefaultSubject: false,
                useTplDefaultEmail: true,
                useTplDefaultName: true,
                activateTracking: true,
            },
            search: {
                appIds: ['1001'],
                end: '2017-10-02',
                start: '2017-04-02',
                nameSender: 'Postman',
                emailSender: 'postman@alterdata.com.br',
                nameReceiver: 'Thiago C',
                emailReceiver: 'thiago.dsn.cir@alterdata.com.br',
                status: '2, 3, 7',
                templateSlug: 'teste-01',
                uuids: ['21da05e09a214bf']
            }
        });
    }
}

module.exports = TestVariables;
exports.TestVariables = TestVariables;