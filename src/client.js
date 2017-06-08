import _ from 'lodash';
import Api from './api';
import { NoMail, NotMailInstance } from './exceptions';

function checkMail(mail) {
    if (!mail) throw new NoMail();
    if (!_.isObject(mail)) throw new NoMail();
    if (!(mail.constructor.name === 'Mail')) throw new NotMailInstance();
}

export class Client extends Api {
    send(mail) {
        checkMail(mail);
        const endpoint = 'text';
        return this.sendRequest(mail.getPayload(endpoint), endpoint);
    }
    sendTemplate(mail) {
        checkMail(mail);
        const endpoint = 'template';
        return this.sendRequest(mail.getPayload(endpoint), endpoint);
    }
}
