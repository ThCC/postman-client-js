import _ from 'lodash';
import exceptions from './exceptions';

export class Mail {
    constructor(params) {
        this.TRACK_EMAIL_REGEX = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
        this.EMAIL_REGEX = /(^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$)/gi;

        this.checkParams(params);

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
            'templateName',
            'useTemplateFrom',
            'useTemplateEmail',
            'useTemplateSubject',
            'contextPerRecipient',
        ];
        const keys = _.keys(params);
        _.forEach(keys, (key) => {
            if (this.expectedKeys.indexOf(key) > -1) {
                this[key] = params[key];
            }
        });
    }
    checkParams(params) {
        if (!_.isObject(params)) {
            throw new exceptions.ParamsShouldBeObject();
        }
        if (!(_.has(params, 'from') || _.has(params, 'useTemplateEmail'))) {
            throw new exceptions.NoReplyEmail();
        }
        if (!(params.from || params.useTemplateEmail)) {
            throw new exceptions.NoReplyEmail();
        }
        if (_.has(params, 'from')) this.validadeFrom(params.from);
        if (!(_.has(params, 'recipientList') && _.isArray(params.recipientList)
            && params.recipientList.length)) {
            throw new exceptions.NoRecipient();
        }
        this.validateRecipients(params.recipientList);
        if (!(_.has(params, 'subject') || _.has(params, 'useTemplateSubject'))) {
            throw new exceptions.NoSubject();
        }
        if (!(params.subject || params.useTemplateSubject)) {
            throw new exceptions.NoSubject();
        }
    }
    trackEmail(text) {
        const tracked = text.match(this.TRACK_EMAIL_REGEX);
        return tracked ? tracked[0] : null;
    }
    isEmailInvalid(text) {
        const email = this.trackEmail(text);
        if (!email) return true;
        const result = email.match(this.EMAIL_REGEX);
        return result === null;
    }
    validateRecipients(recipients) {
        _.forEach(recipients, (recipient) => {
            if (this.isEmailInvalid(recipient)) {
                throw new exceptions.InvalidRecipientList();
            }
        });
    }
    validadeFrom(from) {
        if (this.isEmailInvalid(from)) {
            throw new exceptions.InvalidFrom();
        }
    }
    getPayload(endpoint) {
        if (!endpoint) throw new exception.NoEndpoint();
        if (endpoint === 'text') {
            if (!(_.has(this, 'messageText') && this.messageText)) {
                throw new exceptions.NoText();
            }
        } else {
            if (!(_.has(this, 'templateName') || _.has(this, 'messageHtml'))) {
                throw new exceptions.NoTemplate();
            }
            if (!(this.templateName || this.messageHtml)) {
                throw new exceptions.NoTemplate();
            }
        }

        const payload = {};
        _.forEach(this.expectedKeys, (key) => {
            if (_.has(this, key) && this[key]) {
                payload[_.snakeCase(key)] = this[key];
            }
        });
        return payload;
    }
}
