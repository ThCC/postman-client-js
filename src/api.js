import _ from 'lodash';
import request from 'request';
import signature from 'apysignature';
import querystring from 'querystring';
import exceptions from './exceptions';

export default class Api {
    constructor(key, secret, serverUri) {
        if (!key || typeof key !== 'string') {
            throw new exceptions.NoPublicKey();
        }
        if (!secret || typeof secret !== 'string') {
            throw new exceptions.NoSecretKey();
        }
        if (serverUri) {
            if (typeof serverUri !== 'string') {
                throw new exceptions.InvalidServerUri();
            }
        }
        this.apiKey = key;
        this.apiSecret = secret;
        this.serverUri = serverUri;

        this.method = '';
        this.endpoint = '';
        this.apis = {
            text: '/api/send_mail/',
            template: '/api/send_mail/template/',
        };
        this.headers = {};
    }
    getUrl() {
        const sendMethod = this.apis[this.endpoint];
        const signedReq = new signature.Request(this.method, sendMethod, {});
        const authKey = this.apiKey;
        const authSecret = this.apiSecret;
        const token = new signature.Token(authKey, authSecret);
        token.sign(signedReq);
        const authDict = signedReq.getAuthDict();
        return `${this.serverUri}${sendMethod}?${querystring.stringify(authDict)}`;
    }
    sendRequest(payload, endpoint, method, headers, timeout) {
        this.timeout = timeout || 25;
        this.method = method ? method.toLowerCase() : 'post';
        this.endpoint = endpoint;
        this.headers = headers || {};
        const url = this.getUrl();
        const options = {
            url,
            method: this.method.toUpperCase(),
            headers: this.headers,
        };
        if (this.method === 'get') {
            options.qs = payload;
        } else {
            options.json = payload;
        }
        return new Promise((f, reject) => {
            request(options, (error, response, body) => {
                if (!error && [200, 201].indexOf(response.statusCode) > -1) {
                    f(body);
                } else {
                    let err = error;
                    if (!err) {
                        err = { Error: _.isString(body) ? body : body.error };
                    }
                    reject(err);
                }
            });
        });
    }
}
