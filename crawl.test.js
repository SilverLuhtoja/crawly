const { test, expect } = require('@jest/globals');
const {
  normalizeURL,
  getURLsFromHTML,
  isSameDomain,
} = require('./crawl.js');

describe('#normalizeURL ', () => {
  test('pathname with /', () => {
    let URL = 'https://blog.boot.dev/path/';
    let expected = 'blog.boot.dev/path';
    let result = normalizeURL(URL);
    expect(result).toEqual(expected);
  });

  test('pathname without /', () => {
    let URL = 'https://blog.boot.dev/path';
    let expected = 'blog.boot.dev/path';
    let result = normalizeURL(URL);
    expect(result).toEqual(expected);
  });

  test('capitals', () => {
    const input = 'https://BLOG.boot.dev/path';
    const result = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(result).toEqual(expected);
  });

  test('empty URL', () => {
    let URL = '';
    let expected = null;
    let result = normalizeURL(URL);
    expect(result).toEqual(expected);
  });
});

describe('#getURLsFromHTML ', () => {
  test('absolute', () => {
    const inputURL = 'https://blog.boot.dev';
    const inputBody =
      '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>';
    const actual = getURLsFromHTML(inputBody, inputURL);
    const expected = ['https://blog.boot.dev/'];
    expect(actual).toEqual(expected);
  });

  test('relative', () => {
    const inputURL = 'https://blog.boot.dev';
    const inputBody =
      '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>';
    const actual = getURLsFromHTML(inputBody, inputURL);
    const expected = ['https://blog.boot.dev/path/one'];
    expect(actual).toEqual(expected);
  });

  test('both', () => {
    const inputURL = 'https://blog.boot.dev';
    const inputBody =
      '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>';
    const actual = getURLsFromHTML(inputBody, inputURL);
    const expected = [
      'https://blog.boot.dev/path/one',
      'https://other.com/path/one',
    ];
    expect(actual).toEqual(expected);
  });

  test('handle error', () => {
    const inputURL = 'https://blog.boot.dev';
    const inputBody =
      '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>';
    const actual = getURLsFromHTML(inputBody, inputURL);
    const expected = [];
    expect(actual).toEqual(expected);
  });
});

describe('#isSameDomain ', () => {
  test('True', () => {
    const baseDomain = 'https://blog.boot.dev';
    const targetDomain = 'https://blog.boot.dev/next/page';
    const actual = isSameDomain(baseDomain, targetDomain);
    expect(actual).toEqual(true);
  });

  test('False', () => {
    const baseDomain = 'https://blog.boot.dev';
    const targetDomain = 'https://blog.anotherboot.dev/next/page';
    const actual = isSameDomain(baseDomain, targetDomain);
    expect(actual).toEqual(false);
  });
});
