class ExtendableError extends Error {
    constructor(message, name) {
        super(message);
        this.name = name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}

class ApiError extends ExtendableError {
    constructor(reason) {
        super(`PostmanError. Reason: ${reason}`, 'ApiError');
    }
}

class NoText extends ExtendableError {
    constructor() {
        super('Impossible to send a simple email without a text content', 'NoText');
    }
}

class NoTemplate extends ExtendableError {
    constructor() {
        super(
            'Impossible to send a template email without a html content. ' +
            'Either you pass the templateSlug or the messageHtml',
            'NoTemplate'
        );
    }
}

class NoTemplateNoFeatures extends ExtendableError {
    constructor() {
        super(
            "Impossible to use template features, without passing 'templateSlug'",
            'NoTemplateNoFeatures'
        );
    }
}

class NoMail extends ExtendableError {
    constructor() {
        super("Impossible to send an email if there's no mail", 'NoMail');
    }
}

class NotMailInstance extends ExtendableError {
    constructor() {
        super('Expecting a Mail instance', 'NotMailInstance');
    }
}

class NoEndpoint extends ExtendableError {
    constructor() {
        super('Impossible to get the payload without the endpoint', 'NoEndpoint');
    }
}

class NoSubject extends ExtendableError {
    constructor() {
        super('Impossible to send email without a subject', 'NoSubject');
    }
}

class NoRecipient extends ExtendableError {
    constructor() {
        super('Impossible to send email without any recipient', 'NoRecipient');
    }
}

class NoPublicKey extends ExtendableError {
    constructor() {
        super("PostmanError. There's no Public Key.", 'NoPublicKey');
    }
}

class NoSecretKey extends ExtendableError {
    constructor() {
        super("PostmanError. There's no Secret Key.", 'NoSecretKey');
    }
}

class InvalidServerUri extends ExtendableError {
    constructor() {
        super('PostmanError. Invalid server uri, it was expecting a string.', 'InvalidServerUri');
    }
}

class NoReplyEmail extends ExtendableError {
    constructor() {
        super('Please provide an reply email', 'NoReplyEmail');
    }
}

class InvalidRecipientList extends ExtendableError {
    constructor() {
        super(
            "Expected format ('Name <email>'; or '<email>') wasn't matched",
            'InvalidRecipientList'
        );
    }
}

class InvalidFrom extends ExtendableError {
    constructor() {
        super("Expected format ('Name <email>'; or '<email>') wasn't matched", 'InvalidFrom');
    }
}

class ParamsShouldBeObject extends ExtendableError {
    constructor() {
        super('Parameters should it be an object', 'ParamsShouldBeObject');
    }
}


export {
    ApiError,
    NoMail,
    NoText,
    NoSubject,
    NoEndpoint,
    NoTemplate,
    InvalidFrom,
    NoPublicKey,
    NoSecretKey,
    NoRecipient,
    NoReplyEmail,
    NotMailInstance,
    InvalidServerUri,
    NoTemplateNoFeatures,
    InvalidRecipientList,
    ParamsShouldBeObject,
};
