import _ from 'lodash';
import Utils from './utils';
import { NoEndpoint, NoText, NoTemplate } from './exceptions';

export class Mail {
    constructor(params) {
        Utils.checkParams(params);

        this.expectedKeys = [
            'tags',
            'subject',
            'from',
            'messageText',
            'messageHtml',
            'recipientList',
            'activateTracking',
            'getTextFromHtml',
            'headers',
            'context',
            'templateSlug',
            'useTplDefaultName',
            'useTplDefaultEmail',
            'useTplDefaultSubject',
            'contextPerRecipient',
        ];
        const keys = _.keys(params);
        _.forEach(keys, (key) => {
            if (this.expectedKeys.indexOf(key) > -1) {
                this[key] = params[key];
            }
        });
    }
    getPayload(endpoint) {
        if (!endpoint) throw new NoEndpoint();
        if (endpoint === 'text') {
            if (!(_.has(this, 'messageText') && this.messageText)) {
                throw new NoText();
            }
        } else {
            if (!(_.has(this, 'templateSlug') || _.has(this, 'messageHtml'))) {
                throw new NoTemplate();
            }
            if (!(this.templateSlug || this.messageHtml)) {
                throw new NoTemplate();
            }
        }

        const payload = {};
        _.forEach(this.expectedKeys, (key) => {
            if (_.has(this, key) && this[key]) {
                payload[_.snakeCase(key)] = this[key];
            }
        });
        payload.sended_by = 5;
        return payload;
    }
}
