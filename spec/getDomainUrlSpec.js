/*global require*/
'use strict';

const getDomain = require('../lib/getDomainUrl.js');

describe('When testing function getDomainUrl', function() {
    it('should return correct domain url for domain-like string', function () {
        expect(getDomain('http://domain.com/')).toBe('http://domain.com');
    });

    it('should return correct domain url for url-like string', function () {
        expect(getDomain('http://domain.com/p/a/t/h/')).toBe('http://domain.com');
    });
    
    it('should return correct domain url for url-like string without protocol part', function () {
        expect(getDomain('domain.com/p/a/t/h/')).toBe('http://domain.com');
    });

    it('should return correct domain url for url with auth-part', function () {
        expect(getDomain('test:password@domain.com/p/a/t/h/')).toBe('http://domain.com');
    });

    it('should save correct protocol, based on input string protocol-part', function () {
        expect(getDomain('ftp://domain.com/p/a/t/h/?qu=ery#hash')).toBe('ftp://domain.com');
    });

    it('should generate new protocol, if has second argument', function () {
        expect(getDomain('domain.com/samestring', 'https')).toBe('https://domain.com');
    });

    it('should return response as correct domain url, even if hostname-part has incorrect TLD-zone', function () {
        expect(getDomain('domain.imnotexist')).toBe('http://domain.imnotexist');
    });

    it('should return correct domain url in punycode format, if input string has unicode', function () {
        expect(getDomain('тест.рф/страничка/')).toBe('http://xn--e1aybc.xn--p1ai')
    });

    it('should return null if there are no hostname-part', function () {
        expect(getDomain('/p/a/t/h/')).toBe(null);
    });

    it('should return null, if input is empty', function () {
        expect(getDomain()).toBe(null);
    });

    it('should return null, if input string can\'t quack like a domain', function () {
        expect(getDomain('icanquacklikeadomain')).toBe(null);
    });

    it('should return null, if input string generally can\'t quack like a domain', function () {
        expect(getDomain('Trust me, please! I generally can quack like a domain')).toBe(null);
    });

    it('should return null, if hostname part has incorrect format', function () {
        expect(getDomain('http://dom_in.com')).toBe(null);
        expect(getDomain('http://.domain.com')).toBe(null);
        expect(getDomain('http://-domain.com')).toBe(null);
        expect(getDomain('http://domain-.com')).toBe(null);
        expect(getDomain('http://domain..com')).toBe(null);
    });
    
    it('should return TypeError if second argument not string and not undefined', function () {
        expect(function () {getDomain('domain.com', 1)}).toThrowError(TypeError);
        
        expect(function () {
            getDomain('domain.com', 1)
        }).toThrowError('Identifier \'baseProtocol\' must be a string or undefined, not number');
    });
});