import _ from 'lodash';
import Api from './api';
import exceptions from './exceptions';

export class Client extends Api {
    send(mail) {
        Client.checkMail(mail);
        const endpoint = 'text';
        return this.sendRequest(mail.getPayload(endpoint), endpoint);
    }
    sendTemplate(mail) {
        Client.checkMail(mail);
        const endpoint = 'template';
        return this.sendRequest(mail.getPayload(endpoint), endpoint);
    }
    static checkMail(mail) {
        if (!mail) throw new exceptions.NoMail();
        if (!_.isObject(mail)) throw new exceptions.NoMail();
        if (!(mail.constructor.name === 'Mail')) throw new exceptions.NotMailInstance();
    }
}
