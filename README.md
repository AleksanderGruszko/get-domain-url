#get-domain-url.js

##Install

    npm install get-domain-url

##Usage in NodeJS

    const getDomainUrl = require('get-domain-url');

    let correctDomainLink = getDomainUrl('domain.com', 'https'); // 'https://domain.com'

This function expect two parameters

getDomainUrl(possibleDomain [,baseProtocol]);
possibleDomain - string, not required (always return null if missed);
baseProtocol - string, not required, default = 'http';

baseProtocol can accept all notations of protocol: 'http', 'http:', 'http://', but it doesn't check any whitelist of possible network protocols

Function return string with correct domain url if it possible, and null - if not

!!!Warning! It doesn't check if TLD domain zone is correct

    getDomain('domain.incorrectDomainZone'); // 'http:/domain.incorrectDomainZone';

##Examples

    getDomainUrl('my-domain.com');                  // 'http://domain.com'
    getDomainUrl('https://domain.com');             // 'https://domain.com'
    getDomainUrl('domain.com', 'https');            // 'https://domain.com'
    getDomainUrl('domain.com/pa/th/?qu=ery#hash);   // 'https://domain.com'

    //should transform domain url to punycode format
    getDomainUrl('тест.рф);     // 'http://xn--e1aybc.xn--p1ai'

    //should return null if input string can't quack like a domain
    getDomainUrl('simplestring');       //null
    getDomainUrl();                     //null

    // ...and if hostname is invalid
    getDomainUrl('-domain.com')         //null
    getDomainUrl('domain-.com')         //null
    getDomainUrl('dom_in.com')          //null
    getDomainUrl('.dom-in.com')         //null

##Disclaimer

Please, don't use this module in production!

I create this package only for training and never will support it in the future.

Better use this package:
https://www.npmjs.com/package/tldjs

Unfortunately for me, i didn't found it before;
