const { crawlPage } = require('./crawl');
const { printReport } = require('./report');

let page = 'https://wagslane.dev';

async function main() {
  var arguments = process.argv.slice(2);
  if (arguments.length != 1) {
    console.log('Error: Only 1 argument have to be given.');
    process.exit(1);
  }
  let BASE_URL = arguments[0];
  console.log(`Crawly is starting to crawl to -> ${BASE_URL}`);

  let pages = await crawlPage(BASE_URL, BASE_URL, {});
  printReport(pages);
}

main();
