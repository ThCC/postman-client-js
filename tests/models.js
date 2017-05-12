'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _model = require('../dist/models');
var chai = require('chai');

var should = chai.should();

var _model2 = _interopRequireDefault(_model);

describe('Filling With the Wrong Parameters', function () {
    // should.Throw has a bug in compararing exceptions.
    it("should throw 'ParamsShouldBeObject', complaining that it's not an object", function (done) {
        (function () { new _model2.Mail(''); }).should.Throw(Error);
        done();
    });
    it("should throw 'NoReplyEmail', complaining that there's no reply email", function (done) {
        (function () { new _model2.Mail({}); }).should.Throw(Error);
        done();
    });
    it("should throw 'NoReplyEmail', still complaining that there's no reply email, even if passed an empty string", function (done) {
        (function () { new _model2.Mail({from: ''}); }).should.Throw(Error);
        done();
    });
    it("should throw 'NoReplyEmail', still complaining that there's no reply email, even if passed useTemplateEmail has false", function (done) {
        (function () { new _model2.Mail({useTemplateEmail: false}); }).should.Throw(Error);
        done();
    });
    it("should throw 'InvalidFrom', complaining that the reply email is invalid", function (done) {
        (function () { new _model2.Mail({from: 'foo@bar'}); }).should.Throw(Error);
        done();
    });
    it("should throw 'NoRecipient', complaining that there's no recipients list", function (done) {
        (function () { new _model2.Mail({
            from: 'foo@bar.com'
        }); }).should.Throw(Error);
        done();
    });
    it("should throw 'NoRecipient', still complaining that there's no recipients list, even if passed an empty string", function (done) {
        (function () { new _model2.Mail({
            from: 'foo@bar.com',
            recipientList: ''
        }); }).should.Throw(Error);
        done();
    });
    it("should throw 'NoRecipient', still complaining that there's no recipients list, even if passed an empty list", function (done) {
        (function () { new _model2.Mail({
            from: 'foo@bar.com',
            recipientList: []
        }); }).should.Throw(Error);
        done();
    });
    it("should throw 'InvalidRecipientList', complaining that in the recipients list there's an invalid email", function (done) {
        (function () { new _model2.Mail({
            from: 'foo@bar.com',
            recipientList: ['bar@foo']
        }); }).should.Throw(Error);
        done();
    });
    it("should throw 'NoSubject', complaining that there's no subject", function (done) {
        (function () { new _model2.Mail({
            from: 'foo@bar.com',
            recipientList: ['bar@foo.com']
        }); }).should.Throw(Error);
        done();
    });
    it("should throw 'NoSubject', still complaining that there's no subject, even if passed an empty string", function (done) {
        (function () { new _model2.Mail({
            from: 'foo@bar.com',
            recipientList: ['bar@foo.com'],
            subject: ''
        }); }).should.Throw(Error);
        done();
    });
    it("should throw 'NoSubject', still complaining that there's no subject, even if passed useTemplateSubject has false", function (done) {
        (function () { new _model2.Mail({
            from: 'foo@bar.com',
            recipientList: ['bar@foo.com'],
            useTemplateSubject: false
        }); }).should.Throw(Error);
        done();
    });
    it("should throw 'NoTemplateNoFeatures', complaining that there's no templateName, and therefore can't use the template subject", function (done) {
        (function () { new _model2.Mail({
            from: 'foo@bar.com',
            subject: 'test',
            recipientList: ['bar@foo.com'],
            useTemplateSubject: true
        }); }).should.Throw(Error);
        done();
    });
    it("should throw 'NoTemplateNoFeatures', complaining that there's no templateName, and therefore can't use the template email", function (done) {
        (function () { new _model2.Mail({
            from: 'foo@bar.com',
            subject: 'test',
            recipientList: ['bar@foo.com'],
            useTemplateEmail: true
        }); }).should.Throw(Error);
        done();
    });
    it("should throw 'NoTemplateNoFeatures', complaining that there's no templateName, and therefore can't use the template from", function (done) {
        (function () { new _model2.Mail({
            from: 'foo@bar.com',
            subject: 'test',
            recipientList: ['bar@foo.com'],
            useTemplateFrom: true
        }); }).should.Throw(Error);
        done();
    });
    it("should throw 'NoEndpoint', complaining that in order to get the payload, it should be pass the endpoint", function (done) {
        (function () {
            var mail = new _model2.Mail({
                from: 'foo@bar.com',
                recipientList: ['bar@foo.com'],
                subject: 'test'
            });
            mail.getPayload();
        }).should.Throw(Error);
        done();
    });
    it("should throw 'NoText', complaining that there's no messageText", function (done) {
        (function () {
            var mail = new _model2.Mail({
                from: 'foo@bar.com',
                recipientList: ['bar@foo.com'],
                subject: 'test'
            });
            mail.getPayload('text');
        }).should.Throw(Error);
        done();
    });
    it("should throw 'NoText', still complaining that there's no messageText, even if passed an empty string", function (done) {
        (function () {
            var mail = new _model2.Mail({
                from: 'foo@bar.com',
                recipientList: ['bar@foo.com'],
                subject: 'test',
                messageText: ''
            });
            mail.getPayload('text');
        }).should.Throw(Error);
        done();
    });
    it("should throw 'templateName', complaining that there's no templateName", function (done) {
        (function () {
            var mail = new _model2.Mail({
                from: 'foo@bar.com',
                recipientList: ['bar@foo.com'],
                subject: 'test'
            });
            mail.getPayload('template');
        }).should.Throw(Error);
        done();
    });
    it("should throw 'templateName', still complaining that there's no templateName, even if passed an empty string", function (done) {
        (function () {
            var mail = new _model2.Mail({
                from: 'foo@bar.com',
                recipientList: ['bar@foo.com'],
                subject: 'test',
                templateName: ''
            });
            mail.getPayload('template');
        }).should.Throw(Error);
        done();
    });
    it("should throw 'templateName', still complaining that there's no templateName, even if passed messageHtml has an empty string", function (done) {
        (function () {
            var mail = new _model2.Mail({
                from: 'foo@bar.com',
                recipientList: ['bar@foo.com'],
                subject: 'test',
                messageHtml: ''
            });
            mail.getPayload('template');
        }).should.Throw(Error);
        done();
    });
});
