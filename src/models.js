import _ from 'lodash';
import exceptions from './exceptions';

const TRACK_EMAIL_REGEX = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
const EMAIL_REGEX = /(^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$)/gi;

function trackEmail(text) {
    const tracked = text.match(TRACK_EMAIL_REGEX);
    return tracked ? tracked[0] : null;
}

function isEmailInvalid(text) {
    const email = trackEmail(text);
    if (!email) return true;
    const result = email.match(EMAIL_REGEX);
    return result === null;
}

function validateRecipients(recipients) {
    _.forEach(recipients, (recipient) => {
        if (isEmailInvalid(recipient)) {
            throw new exceptions.InvalidRecipientList();
        }
    });
}

function validadeFrom(from) {
    if (isEmailInvalid(from)) {
        throw new exceptions.InvalidFrom();
    }
}

function attrNotInParams(params, attr) {
    return !_.has(params, attr) || !params[attr];
}

function attrInParams(params, attr) {
    return _.has(params, attr) && params[attr];
}

function checkParams(params) {
    if (!_.isObject(params)) {
        throw new exceptions.ParamsShouldBeObject();
    }
    if (attrNotInParams(params, 'from') && attrNotInParams(params, 'useTplDefaultEmail')) {
        throw new exceptions.NoReplyEmail();
    }
    if (_.has(params, 'from')) validadeFrom(params.from);
    if (!(_.has(params, 'recipientList') && _.isArray(params.recipientList)
        && params.recipientList.length)) {
        throw new exceptions.NoRecipient();
    }
    validateRecipients(params.recipientList);
    if (attrNotInParams(params, 'subject') && attrNotInParams(params, 'useTplDefaultSubject')) {
        throw new exceptions.NoSubject();
    }
    if (!(params.subject || params.useTplDefaultSubject)) {
        throw new exceptions.NoSubject();
    }
    if ((attrInParams(params, 'useTplDefaultSubject') || attrInParams(params, 'useTplDefaultName')
        || attrInParams(params, 'useTplDefaultEmail')) && attrNotInParams(params, 'templateSlug')) {
        throw new exceptions.NoTemplateNoFeatures();
    }
}

export class Mail {
    constructor(params) {
        checkParams(params);

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
        if (!endpoint) throw new exceptions.NoEndpoint();
        if (endpoint === 'text') {
            if (!(_.has(this, 'messageText') && this.messageText)) {
                throw new exceptions.NoText();
            }
        } else {
            if (!(_.has(this, 'templateSlug') || _.has(this, 'messageHtml'))) {
                throw new exceptions.NoTemplate();
            }
            if (!(this.templateSlug || this.messageHtml)) {
                throw new exceptions.NoTemplate();
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
