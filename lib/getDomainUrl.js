/*global require, module*/
'use strict';

const url = require('url');

const getDomainUrl = function (possibleDomain, baseProtocol) {
    //@param possibleDomain {string} - need no validation: if not string - return null
    // as standart response for incorrect domain
    //@param baseProtocol {string|undefined}
    //@return domain {string|null}
    baseProtocol = baseProtocol || 'http:';
    var domain = null, parsedDomain, temp, tempUrl;
    const hostNameRegex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;

    //if it can quack like a domain - it must be a string and contain more than one dot
    if (typeof possibleDomain !== 'string' || !possibleDomain.includes('.')) {
        return null;
    }

    //validate 'baseProtocol' argument
    if (typeof baseProtocol !== 'string' && typeof baseProtocol !== 'undefined') {
        throw new TypeError('Identifier \'baseProtocol\' must be a string or undefined, not ' + (typeof baseProtocol));
    }

    //guarantee correct format of base protocol for
    // accepting 'http', 'http:', 'http://', etc.
    baseProtocol = baseProtocol.match('[A-Za-z]+') + ':';

    //if checked string has no protocol - add baseProtocol 
    tempUrl = (possibleDomain.indexOf('://') !== -1) ? possibleDomain : baseProtocol + '//' + possibleDomain;
    
    //parse and reformat string as possible domain
    parsedDomain = url.parse(tempUrl);

    //if hostname after parsing is null - we can't get domain url from string
    //if string can quack like a domain - it must contain only correct symbols
    if (parsedDomain.hostname == null || !hostNameRegex.test(parsedDomain.hostname)) {
        return null;
    }

    //prepare response string to formatting
    temp = {};
    temp.protocol = parsedDomain.protocol;
    temp.hostname = parsedDomain.hostname;
    temp.slashes = true;

    domain = url.format(temp);

    return domain;
};


module.exports = getDomainUrl;