import _ from 'lodash';
import request from 'request';
import signature from 'apysignature';
import querystring from 'querystring';
import exceptions from './exceptions';

const apis = {
    text: '/api/send_mail/',
    template: '/api/send_mail/template/',
};

function getUrl(options) {
    const sendMethod = apis[options.endpoint];
    const signedReq = new signature.Request(options.method, sendMethod, {});
    const token = new signature.Token(options.apiKey, options.apiSecret);
    token.sign(signedReq);
    const authDict = signedReq.getAuthDict();
    return `${options.serverUri}${sendMethod}?${querystring.stringify(authDict)}`;
}

export default class Api {
    constructor(key, secret, returnRawError, serverUri) {
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
        this.returnRawError = returnRawError || false;
        this.serverUri = serverUri || 'http://postman.alterdata.com.br';
    }
    sendRequest(payload, endpoint, method, headers, timeout) {
        const httpMethod = method ? method.toLowerCase() : 'post';
        const url = getUrl({
            apiKey: this.apiKey,
            apiSecret: this.apiSecret,
            serverUri: this.serverUri,
            method: httpMethod,
            endpoint,
        });
        const options = {
            url,
            method: httpMethod.toUpperCase(),
            headers: headers || {},
            timeout: timeout || 25 * 1000,
        };
        if (httpMethod === 'get') {
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
                    if (this.returnRawError) {
                        reject({ error, body });
                    } else {
                        reject(err);
                    }
                }
            });
        });
    }
}
