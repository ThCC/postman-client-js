import _ from 'lodash';
import {
    NoSubject,
    NoRecipient,
    InvalidFrom,
    NoReplyEmail,
    InvalidRecipientList,
    ParamsShouldBeObject,
    NoTemplateNoFeatures,
} from './exceptions';

export default class Utils {
    static trackEmail(text) {
        const TRACK_EMAIL_REGEX = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
        const tracked = text.match(TRACK_EMAIL_REGEX);
        return tracked ? tracked[0] : null;
    }
    static isEmailInvalid(text) {
        const EMAIL_REGEX = /(^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$)/gi;
        const email = Utils.trackEmail(text);
        if (!email) return true;
        const result = email.match(EMAIL_REGEX);
        return result === null;
    }
    static validateRecipients(recipients) {
        _.forEach(recipients, (recipient) => {
            if (Utils.isEmailInvalid(recipient)) {
                throw new InvalidRecipientList();
            }
        });
    }
    static validadeFrom(from) {
        if (Utils.isEmailInvalid(from)) {
            throw new InvalidFrom();
        }
    }
    static attrNotInParams(params, attr) {
        return !_.has(params, attr) || !params[attr];
    }
    static attrInParams(params, attr) {
        return _.has(params, attr) && params[attr];
    }
    static checkParams(params) {
        if (!_.isObject(params)) {
            throw new ParamsShouldBeObject();
        }
        if (Utils.attrNotInParams(params, 'from')
            && Utils.attrNotInParams(params, 'useTplDefaultEmail')) {
            throw new NoReplyEmail();
        }
        if (_.has(params, 'from')) Utils.validadeFrom(params.from);
        if (!(_.has(params, 'recipientList') && _.isArray(params.recipientList)
            && params.recipientList.length)) {
            throw new NoRecipient();
        }
        Utils.validateRecipients(params.recipientList);
        if (Utils.attrNotInParams(params, 'subject')
            && Utils.attrNotInParams(params, 'useTplDefaultSubject')) {
            throw new NoSubject();
        }
        if (!(params.subject || params.useTplDefaultSubject)) {
            throw new NoSubject();
        }
        if ((Utils.attrInParams(params, 'useTplDefaultSubject')
            || Utils.attrInParams(params, 'useTplDefaultName')
            || Utils.attrInParams(params, 'useTplDefaultEmail'))
            && Utils.attrNotInParams(params, 'templateSlug')) {
            throw new NoTemplateNoFeatures();
        }
    }
}
