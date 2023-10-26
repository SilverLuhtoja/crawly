const { JSDOM } = require('jsdom');

async function crawlPage(currentURL) {
  console.log(`crawling ${currentURL}`);
  try {
    let resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log(`Got HTTP error, status code: ${resp.status}`);
      return;
    }
    const contentType = resp.headers.get('content-type')
    if (!contentType.includes('text/html')) {
       console.log(`Got non-html response: ${contentType}`);
       return;
    }

    console.log(await resp.text());

    // const myBlob = await resp.blob();
    // let htmlPageContent = await myBlob.text();

    // let links = getURLsFromHTML(htmlPageContent, currentURL);

    // return links;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
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
};
