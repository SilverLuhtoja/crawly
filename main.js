const { crawlPage } = require("./crawl");

async function main() {
  var arguments = process.argv.slice(2); 
  if (arguments.length != 1){
    console.log('Error: Too many arguments given.')
    process.exit(1);
  }
  let BASE_URL = arguments[0];
  console.log(`Crawly is starting to crawl to -> ${BASE_URL}`);


  let links = await crawlPage(BASE_URL)
  console.log(links);
}

main();
