const { JSDOM } = require('jsdom');

function isSameDomain(baseURL, currentURL) {
  let baseDomain = new URL(baseURL);
  let targetDomain = new URL(currentURL);
  return baseDomain.hostname === targetDomain.hostname;
}


async function crawlPage(baseURL, currentURL, pages) {
  if (!isSameDomain(baseURL, currentURL)) return pages;

  let normalizedURL = normalizeURL(currentURL);
  if (pages.hasOwnProperty(normalizedURL)) {
    pages[normalizedURL] += 1;
    return pages;
  } else {
    pages[normalizedURL] = currentURL === baseURL ? 0 : 1;
  }

  let htmlBody = '';
  try {
    let resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log(`Got HTTP error, status code: ${resp.status}`);
      return pages;
    }
    const contentType = resp.headers.get('content-type');
    if (!contentType.includes('text/html')) {
      console.log(`Got non-html response: ${contentType}`);
      return pages;
    }
    htmlBody = await resp.text();
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }

  let nextURLs = getURLsFromHTML(htmlBody, baseURL);
  for (const nextURL of nextURLs) {
    pages = await crawlPage(baseURL, nextURL, pages);
  }

  return pages;
}

function getURLsFromHTML(htmlBody, baseURL) {
  let dom = new JSDOM(htmlBody);
  let links = dom.window.document.querySelectorAll('a');

  return Array.from(links).map(link => {
    let path = link.href;
    if (path[0] == '/') {
      return baseURL + link.href;
    }
    if (normalizeURL(path) != null) {
      return path;
    }
  });
}

function normalizeURL(path) {
  try {
    let urlObj = new URL(path);
    let fullPath = urlObj.hostname + urlObj.pathname;
    if (fullPath.slice(-1) === '/') {
      fullPath = fullPath.slice(0, -1);
    }
    return fullPath;
  } catch {
    return null;
  }
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
  isSameDomain
};
